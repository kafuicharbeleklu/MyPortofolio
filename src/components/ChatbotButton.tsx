import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const apiUrl = import.meta.env.VITE_CHATBOT_API_URL;
console.log('[Chatbot] API URL au démarrage:', apiUrl);

const normalizeChatbotApiUrl = (value: string | undefined) => {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return '';
  }

  const normalized = trimmed.replace(/\/+$/, '');
  return normalized.endsWith('/api/chat') ? normalized : `${normalized}/api/chat`;
};

const chatbotApiUrl = normalizeChatbotApiUrl(apiUrl);

const assistantGreeting =
  "Bonjour ! Je suis l'assistant virtuel de Kafui. Comment puis-je vous aider aujourd'hui ?";
const localMissingKeyMessage =
  "Le chatbot n'est pas configuré. Ajoutez VITE_CHATBOT_API_URL dans .env.local, puis redémarrez l'application.";
const githubPagesMissingKeyMessage =
  "Le chatbot IA n'est pas disponible sur cette version GitHub Pages. Utilisez plutôt l'email ou LinkedIn pour me contacter.";
const chatbotPanelId = 'chatbot-panel';
const chatbotTitleId = 'chatbot-title';
const maxSessionMessages = 10;
const rateLimitMessage = 'Limite de messages atteinte, réessayez plus tard.';
const genericFailureMessage =
  "Une erreur réseau est survenue. Vérifiez l'URL du worker Cloudflare puis réessayez.";
const temporaryServiceMessage =
  "Le service IA est en cours de mise à jour. Réessayez dans quelques instants.";
const demoLimitMessage = 'Limite de la démo atteinte. Contactez-moi directement.';
const directEmail = 'charbelkafuieklu@gmail.com';
const directPhoneHref = 'tel:+22870664225';
const directPhoneLabel = '+228 70 66 42 25';

type ChatMessage = {
  text: string;
  isUser: boolean;
};

type ChatbotResponsePayload = {
  reply?: string;
  error?:
    | string
    | {
        message?: string;
      };
};

const extractErrorMessage = (payload: ChatbotResponsePayload | null) => {
  if (!payload?.error) {
    return '';
  }

  if (typeof payload.error === 'string') {
    return payload.error;
  }

  return payload.error.message || '';
};

const toUserFacingError = (message: string) => {
  if (!message) {
    return genericFailureMessage;
  }

  if (message.includes('Limite de messages atteinte')) {
    return rateLimitMessage;
  }

  if (
    message.includes('models/') ||
    message.includes('NOT_FOUND') ||
    message.includes('not supported for generateContent')
  ) {
    return temporaryServiceMessage;
  }

  if (message.includes('Missing GEMINI_API_KEY')) {
    return "Le service IA n'est pas configuré correctement pour le moment.";
  }

  return message;
};

const ChatbotButton: React.FC = () => {
  const isGitHubPagesHost =
    typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
  const shouldRenderChatbot = Boolean(chatbotApiUrl) || !isGitHubPagesHost;
  const missingKeyMessage = isGitHubPagesHost
    ? githubPagesMissingKeyMessage
    : localMissingKeyMessage;
  const isChatAvailable = Boolean(chatbotApiUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(
    isChatAvailable ? [{ text: assistantGreeting, isUser: false }] : []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const remainingMessages = Math.max(0, maxSessionMessages - sentCount);
  const isSessionLimitReached = sentCount >= maxSessionMessages;
  const isInputEmpty = !input.trim();
  const isSendDisabled = isInputEmpty || isLoading || isSessionLimitReached;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isSessionLimitReached) {
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setSentCount((prev) => prev + 1);
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    if (!isChatAvailable) {
      setMessages((prev) => [...prev, { text: missingKeyMessage, isUser: false }]);
      return;
    }

    setIsLoading(true);

    try {
      const history = messages.slice(1).map((message) => ({
        role: message.isUser ? 'user' : 'assistant',
        text: message.text,
      }));

      const response = await fetch(chatbotApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const payload = (await response.json().catch(() => null)) as ChatbotResponsePayload | null;
      const workerError = extractErrorMessage(payload);

      if (response.status === 429) {
        throw new Error(workerError || rateLimitMessage);
      }

      if (!response.ok) {
        throw new Error(workerError || 'La requête du chatbot a échoué.');
      }

      const reply = payload?.reply?.trim() || '';
      if (!reply) {
        throw new Error(workerError || temporaryServiceMessage);
      }

      setMessages((prev) => [...prev, { text: reply, isUser: false }]);
    } catch (error) {
      console.error('Erreur chatbot:', error);
      const message =
        error instanceof Error ? toUserFacingError(error.message) : genericFailureMessage;
      setMessages((prev) => [...prev, { text: message, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldRenderChatbot) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div
          className="chat-window"
          id={chatbotPanelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={chatbotTitleId}
        >
          <div className="chat-header">
            <div className="chat-header-left">
              <div className={`chat-status-dot ${isChatAvailable ? 'online' : 'offline'}`}></div>
              <h3 id={chatbotTitleId}>Assistant Virtuel</h3>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages" aria-live="polite" aria-busy={isLoading}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.isUser ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-loading" role="status" aria-live="polite">
                <span className="chat-loading-indicator" aria-hidden="true">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {isChatAvailable ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '12px',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                background: 'white',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                  placeholder="Écrivez un message..."
                  disabled={isLoading || isSessionLimitReached}
                  aria-label="Message à envoyer"
                  style={{
                    flex: 1,
                    height: '44px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                  }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isSendDisabled}
                  aria-label="Envoyer le message"
                  style={{
                    flexShrink: 0,
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#c0392b',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isSendDisabled ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <div className="chat-meta">
                <p className="chat-remaining-count">
                  {remainingMessages}/{maxSessionMessages} messages restants
                </p>
                {isSessionLimitReached && (
                  <div className="chat-limit-note">
                    <p>{demoLimitMessage}</p>
                    <div className="chat-limit-links">
                      <a href={`mailto:${directEmail}`}>{directEmail}</a>
                      <a href={directPhoneHref}>{directPhoneLabel}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="chat-unavailable">
              <p className="chat-unavailable-copy">
                {isGitHubPagesHost
                  ? "Le chatbot IA n'est pas disponible tant que le worker Cloudflare n'est pas configuré."
                  : "Ajoutez une URL de worker Cloudflare pour activer l'assistant."}
              </p>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le chatbot' : 'Ouvrir le chatbot'}
        aria-expanded={isOpen}
        aria-controls={chatbotPanelId}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
};

export default ChatbotButton;
