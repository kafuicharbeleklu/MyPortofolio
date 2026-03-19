# Documentation Backend SmartProcure

## 1) Portee et etat actuel
Ce projet n'a pas de serveur backend dedie aujourd'hui. Le "backend fonctionnel" est implemente dans le frontend (Vite + React + TypeScript), principalement via:
- `services/geminiService.ts` pour l'analyse IA
- `App.tsx` pour la persistance locale (localStorage)

Consequence: les appels IA partent directement du navigateur vers l'API Gemini.

## 2) Architecture logique actuelle
### 2.1 Composants principaux
- `services/geminiService.ts`
  - point d'entree: `analyzeSupplierOffers(...)`
  - preparation des fichiers (PDF/Image)
  - appel Gemini avec schema JSON strict
  - normalisation metier des offres
  - gestion de retry, erreurs, cache memoire
- `App.tsx`
  - persistance des donnees metier dans localStorage
  - gestion de l'etat d'authentification locale
  - gestion des settings globaux

### 2.2 Sources de verite
- Memoire runtime:
  - `analysisCache` (Map) dans `geminiService.ts`
- Persistance navigateur:
  - `smartprocure_auth`
  - `smartprocure_history`
  - `smartprocure_suppliers`
  - `smartprocure_settings`

## 3) Configuration et secrets
### 3.1 Variables
- `VITE_GEMINI_API_KEY` (obligatoire en pratique)

### 3.2 Resolution de cle
`geminiService.ts` lit:
1. `import.meta.env.VITE_GEMINI_API_KEY`
2. fallback localStorage `smartprocure_gemini_api_key`

Si aucune cle valide n'est disponible, l'analyse est bloquee avec un message explicite.

## 4) Contrat de donnees
Les types sont definis dans `types.ts`.

### 4.1 Entites backend metier
- `SupplierOffer`: fournisseur, prix HT/TTC, devise, scores technique/conformite, garantie, delai, points forts/faibles
- `AnalysisResult`: resultat global d'une analyse (titre, date, resume besoin, offres, meilleure option, analyse marche)
- `SupplierEvaluation`: evaluation de cloture (score global + criteres)
- `GlobalSettings`: devise, taux, ponderation, langue, theme

## 5) Pipeline d'analyse IA
Flux de `analyzeSupplierOffers(...)`:
1. Validation de la cle API
2. Emission de statut UI (`READING_FILES`, `SENDING_REQUEST`, `PROCESSING_RESPONSE`)
3. Generation d'une cle de cache SHA-256 basee sur:
   - titre/besoin/specs
   - hash SHA-256 des fichiers
   - taux de change, devise cible, langue, priorite
4. Cache hit: retour direct du resultat (nouvel id/date)
5. Cache miss: preparation des documents
   - PDF: base64 direct
   - Images: resize max 1536px + JPEG qualite 0.6
6. Construction du prompt et `responseSchema` JSON
7. Appel `ai.models.generateContent` (modele `gemini-3-flash-preview`)
8. Retry exponentiel (3 tentatives)
9. Parsing JSON + normalisation metier
10. Sauvegarde cache memoire + retour resultat

## 6) Regles metier backend
- Harmonisation devise (`FCFA/CFA -> XOF`)
- Reconstitution HT/TTC si un seul montant est detecte (TVA 18% en fallback)
- Bornes scores `[0..100]`
- Dedup fournisseurs par nom (conserve l'offre TTC la plus basse)
- Selection meilleure option par score compose selon priorite:
  - `price`
  - `quality`
  - `deadline`

## 7) Gestion d'erreurs
Erreurs traquees et traduites:
- cle API invalide (`API_KEY_INVALID`)
- service desactive / restrictions cle / referer
- JSON invalide
- aucune offre exploitable

Messages FR/EN sont retournes au composant appelant.

## 8) Securite (etat actuel)
Points critiques:
- la cle API est cote client (exposure risquee)
- localStorage non chiffre et modifiable par l'utilisateur
- pas de controle d'acces serveur

Recommandation forte: migrer vers un backend serveur pour proteger la cle et appliquer des policies d'acces.

## 9) Backend cible recommande (production)
### 9.1 Stack cible
- Node.js (Fastify/NestJS)
- PostgreSQL (analyses, fournisseurs, settings, audit)
- Redis (cache analyses)
- stockage objet (S3/GCS) pour documents

### 9.2 Endpoints minimum
- `POST /api/analyses`
- `GET /api/analyses/:id`
- `GET /api/analyses`
- `POST /api/analyses/:id/evaluation`
- `GET /api/suppliers`
- `POST /api/suppliers`
- `PUT /api/settings`

### 9.3 Benefices
- cle Gemini hors frontend
- RBAC, logs d'audit, quotas
- meilleure observabilite (latence, erreurs, cout)
- gouvernance documentaire et retention

## 10) Runbook operationnel
1. Verifier `VITE_GEMINI_API_KEY`
2. Verifier activation `Generative Language API` dans GCP
3. Verifier restrictions de cle (service, referer)
4. Lire logs console sur retries/erreurs
5. Rejouer avec 1 offre PDF simple pour test minimal

## 11) Commandes utiles
- `npm run dev`: demarrage local
- `npm run check`: typecheck + build
- `npm run build`: build production

## 12) Limites connues
- Pas de backend centralise
- Pas de base de donnees serveur
- Pas de queue/batch
- Pas de tests backend dedies

---
Derniere mise a jour: 2026-03-02
