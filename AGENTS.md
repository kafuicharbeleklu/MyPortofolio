# Repository Guidelines

## Project Structure & Module Organization
`src/main.tsx` boots the React app, and `src/App.tsx` contains the main portfolio flow and section-level page switching. Reusable interactive pieces live in `src/components/`, currently `BackToTop.tsx` and `ChatbotButton.tsx`. Global styling, design tokens, and responsive rules are centralized in `src/index.css`.

Root configuration lives in `index.html`, `vite.config.ts`, `tsconfig.json`, `metadata.json`, and `.env.example`. Large static assets such as PDFs, the profile image, and HTML mockups are stored at the repository root and referenced directly by the UI, so keep filenames stable or update the matching paths in `src/App.tsx`.

## Build, Test, and Development Commands
`npm install` installs dependencies. `npm run dev` starts the Vite dev server on port `3000` and binds to `0.0.0.0`. `npm run build` creates the production bundle in `dist/`. `npm run preview` serves the built app locally for a final check. `npm run lint` runs TypeScript type-checking with `tsc --noEmit`; there is no ESLint setup in this copy.

`npm run clean` removes `dist/` with `rm -rf`. On PowerShell, use `Remove-Item dist -Recurse -Force` if the script is unavailable.

## Coding Style & Naming Conventions
Use TypeScript React function components and follow the existing 2-space indentation style in `.tsx` and CSS files. Component files and exports use PascalCase, while state, refs, helpers, and DOM IDs use camelCase. Prefer the current visual system: CSS variables in `:root`, DM Sans/DM Serif typography, and French-first content for portfolio copy.

## Testing Guidelines
No automated test suite exists yet. Before submitting changes, run `npm run lint` and `npm run build`, then manually verify navigation, responsive layouts, chatbot open/send behavior, and downloadable asset links. If you add tests, place them near the feature as `*.test.ts` or `*.test.tsx` and add the runner script to `package.json`.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so use short imperative commit messages such as `feat: refine hero layout` or `fix: guard chatbot request`. Pull requests should include a concise summary, screenshots for UI changes, any `.env` or Gemini configuration notes, and the manual verification steps you ran.

## Security & Configuration Tips
Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`; never commit real secrets. The current Vite config injects `process.env.GEMINI_API_KEY` into client code, so treat it as frontend-visible configuration.
