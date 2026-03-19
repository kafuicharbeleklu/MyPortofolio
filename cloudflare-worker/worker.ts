type ChatHistoryItem = {
  role: 'user' | 'assistant';
  text: string;
};

type ChatRequestBody = {
  message?: unknown;
  history?: unknown;
};

type WorkerEnv = {
  GEMINI_API_KEY: string;
  RATE_LIMIT_KV?: {
    get(key: string): Promise<string | null>;
    put(
      key: string,
      value: string,
      options?: {
        expirationTtl?: number;
      }
    ): Promise<void>;
  };
};

const ALLOWED_ORIGINS = new Set([
  'https://kafuicharbeleklu.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const SYSTEM_PROMPT =
  "Tu es l'assistant virtuel de Kafui Charbel Eklu, Administrateur Systeme, Reseaux et Digital Workplace. Reponds de maniere professionnelle, concise, utile et prioritairement en francais.";
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MESSAGE = 'Limite de messages atteinte, réessayez plus tard.';
const memoryRateLimit = new Map<string, { count: number; expiresAt: number }>();

const jsonResponse = (
  payload: Record<string, unknown>,
  status: number,
  origin: string | null
) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Access-Control-Allow-Origin': origin && ALLOWED_ORIGINS.has(origin) ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      Vary: 'Origin',
    },
  });

const isChatHistoryItem = (value: unknown): value is ChatHistoryItem => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.text === 'string'
  );
};

const toGeminiContents = (history: ChatHistoryItem[], message: string) => [
  ...history
    .filter((item) => item.text.trim())
    .map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.text.trim() }],
    })),
  {
    role: 'user',
    parts: [{ text: message }],
  },
];

const getClientIp = (request: Request) => {
  const cfIp = request.headers.get('CF-Connecting-IP')?.trim();
  if (cfIp) {
    return cfIp;
  }

  const forwarded = request.headers.get('X-Forwarded-For');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'anonymous';
  }

  return 'anonymous';
};

const getRateLimitKey = (ip: string, now: number) =>
  `chat-rate:${ip}:${Math.floor(now / (RATE_LIMIT_WINDOW_SECONDS * 1000))}`;

const incrementRateLimit = async (env: WorkerEnv, request: Request) => {
  const now = Date.now();
  const key = getRateLimitKey(getClientIp(request), now);

  if (env.RATE_LIMIT_KV) {
    const current = Number((await env.RATE_LIMIT_KV.get(key)) || '0');
    if (current >= RATE_LIMIT_MAX_REQUESTS) {
      return false;
    }

    await env.RATE_LIMIT_KV.put(key, String(current + 1), {
      expirationTtl: RATE_LIMIT_WINDOW_SECONDS + 60,
    });
    return true;
  }

  const current = memoryRateLimit.get(key);
  if (!current || current.expiresAt <= now) {
    memoryRateLimit.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
};

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const origin = request.headers.get('Origin');
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return jsonResponse({}, 204, origin);
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ error: 'Origin not allowed.' }, 403, origin);
    }

    if (url.pathname !== '/api/chat') {
      return jsonResponse({ error: 'Not found.' }, 404, origin);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed.' }, 405, origin);
    }

    if (!env.GEMINI_API_KEY) {
      return jsonResponse({ error: 'Missing GEMINI_API_KEY secret.' }, 500, origin);
    }

    const isWithinLimit = await incrementRateLimit(env, request);
    if (!isWithinLimit) {
      return jsonResponse({ error: RATE_LIMIT_MESSAGE }, 429, origin);
    }

    let body: ChatRequestBody;
    try {
      body = (await request.json()) as ChatRequestBody;
    } catch {
      return jsonResponse({ error: 'Invalid JSON body.' }, 400, origin);
    }

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body.history)
      ? body.history.filter(isChatHistoryItem)
      : [];

    if (!message) {
      return jsonResponse({ error: 'Message is required.' }, 400, origin);
    }

    try {
      const geminiResponse = await fetch(
        `${GEMINI_ENDPOINT}?key=${encodeURIComponent(env.GEMINI_API_KEY)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: toGeminiContents(history, message),
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 400,
            },
          }),
        }
      );

      const payload = (await geminiResponse.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
        error?: {
          message?: string;
        };
      };

      if (!geminiResponse.ok) {
        return jsonResponse(
          {
            error: payload.error?.message || 'Gemini request failed.',
          },
          geminiResponse.status,
          origin
        );
      }

      const reply =
        payload.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || '')
          .join('')
          .trim() || '';

      if (!reply) {
        return jsonResponse({ error: 'Empty Gemini response.' }, 502, origin);
      }

      return jsonResponse({ reply }, 200, origin);
    } catch {
      return jsonResponse(
        { error: 'Unable to reach Gemini from the worker.' },
        502,
        origin
      );
    }
  },
};
