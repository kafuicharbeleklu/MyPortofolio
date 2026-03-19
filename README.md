# MyPortofolio

Portfolio React/Vite de **Kafui Charbel Eklu**, oriente administration systemes, reseaux, cybersecurite et Digital Workplace.

Site public : `https://kafuicharbeleklu.github.io/MyPortofolio/`

## Apercu

Le projet presente :

- un hero bilingue avec diaporamas et navigation one-page
- des sections `About`, `Projects`, `Contact` et `Footer`
- un catalogue projets avec recherche, filtres et pages detail
- un bouton `Back to top` anime
- un toggle de langue `FR / EN`
- un chatbot Gemini avec fallback propre si aucune cle n'est disponible

## Stack

- `React 19`
- `TypeScript`
- `Vite 6`
- `Tailwind Vite plugin`
- `motion`
- CSS global centralise dans `src/index.css`

## Structure

```text
src/
  components/
    sections/        # Hero, About, Projects, Contact, Footer
  config/assets.ts   # chemins centralises des assets publics
  hooks/             # hooks UI partages
  App.tsx            # orchestration principale du portfolio
  data.tsx           # competences, experiences, formation
  translations.ts    # contenus FR / EN
public/
  documents/cv/      # CV telechargeable
  media/profile/     # photo de profil
  projects/<slug>/   # assets specifiques a chaque projet
docs/
  project-structure.md
```

## Lancement local

Prerequis recommandes : `Node.js 22+`

```bash
npm install
npm run dev
```

Autres commandes utiles :

```bash
npm run lint
npm run build
npm run preview
```

## Configuration

Cree un fichier `.env.local` :

```env
VITE_GEMINI_API_KEY=your_key_here
```

Variables prises en charge :

- `VITE_GEMINI_API_KEY` : cle Gemini cote client
- `GEMINI_API_KEY` : fallback compatible
- `VITE_BASE_PATH=/MyPortofolio/` : optionnel en local, deja gere en production

Note : GitHub Pages est un hebergement statique. Sans backend/proxy, le chatbot ne doit pas exposer une vraie cle publique en production.

## Assets et organisation

Les assets publics passent par `src/config/assets.ts` pour eviter les chemins codes en dur.

Convention recommandee pour chaque projet :

- `public/projects/<slug>/cover.*`
- `public/projects/<slug>/screens/`
- `public/projects/<slug>/diagrams/`
- `public/projects/<slug>/exports/`

Le detail est documente dans `docs/project-structure.md`.

## Deploiement

Le depot est configure pour **GitHub Pages** avec base path `/MyPortofolio/`.

Workflow habituel :

```bash
npm run build
git push origin main
```

Le workflow GitHub Actions publie ensuite le contenu construit sur GitHub Pages.
