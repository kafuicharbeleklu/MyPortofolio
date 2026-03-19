# Cloudflare Worker Chat API

Ce worker expose `POST /api/chat` pour relayer les messages du portfolio vers Gemini sans jamais exposer la cle API au navigateur.

## 1. Deploy

Place-toi dans `cloudflare-worker/`, puis deploie le worker avec Wrangler ou le dashboard Cloudflare Workers.

Le fichier a deployer est :

- `cloudflare-worker/worker.ts`

## 2. Secret Gemini

Ajoute le secret `GEMINI_API_KEY` dans Cloudflare.

Via le dashboard :

1. Ouvre ton Worker
2. Va dans `Settings`
3. Ouvre `Variables and Secrets`
4. Cree un secret nomme `GEMINI_API_KEY`
5. Colle ta vraie cle Gemini

## 3. Domaine autorise

Le worker autorise deja les requetes venant de :

- `https://kafuicharbeleklu.github.io`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Si tu changes le domaine public du portfolio, mets a jour la liste `ALLOWED_ORIGINS` dans `cloudflare-worker/worker.ts`.

## 4. Frontend

Dans le frontend, configure :

```env
VITE_CHATBOT_API_URL=https://ton-worker.ton-compte.workers.dev/api/chat
```

Le composant React appellera ensuite directement cette URL en `fetch()`.

## 5. Important

- Ne mets jamais `GEMINI_API_KEY` dans `.env` cote frontend
- GitHub Pages reste 100% statique : seul le Worker execute l'appel Gemini
- Le client ne doit connaitre que `VITE_CHATBOT_API_URL`
