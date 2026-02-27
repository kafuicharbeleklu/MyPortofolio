# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript portfolio app.

- `src/main.tsx`: app entry point.
- `src/App.tsx`: router and top-level providers.
- `src/pages/`: route-level pages (`Home`, `ProjectDetails`).
- `src/components/`: reusable UI sections (e.g., `Hero`, `Projects`, `Navbar`).
- `src/context/`: shared state (`LanguageContext`).
- `src/index.css`: global styles and Tailwind-driven styling.
- `images/`: static project images grouped by topic.
- Root config: `vite.config.ts`, `tsconfig.json`, `.env.example`.

Use `@/` alias imports (configured in `vite.config.ts`) when paths become deep.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server on port `3000` (`0.0.0.0` host).
- `npm run build`: create production build in `dist/`.
- `npm run preview`: serve the built app locally.
- `npm run lint`: TypeScript type-check (`tsc --noEmit`).
- `npm run clean`: remove `dist/` output.

## Coding Style & Naming Conventions
- Language: TypeScript + React functional components.
- Indentation: 2 spaces; prefer single quotes and trailing semicolons.
- Components/pages/context providers: `PascalCase` file names (`TechStack.tsx`).
- Hooks, variables, functions: `camelCase`; constants: `UPPER_SNAKE_CASE` only when truly constant.
- Keep components focused; move shared cross-page logic into `src/context/` or small utilities.

## Testing Guidelines
No automated test framework is currently configured in this snapshot.

- Minimum gate before PR: `npm run lint` and manual verification of `/` and `/project/:id`.
- When adding tests, prefer Vitest + React Testing Library.
- Test naming pattern: `ComponentName.test.tsx`, colocated with component or in a nearby `__tests__/` directory.

## Commit & Pull Request Guidelines
Local `.git` history is not available in this workspace export, so follow Conventional Commits:

- Examples: `feat: add project detail hero`, `fix: handle missing translation key`.
- Keep commits small and scoped to one concern.
- PRs should include: summary, changed paths, validation steps, screenshots/GIFs for UI changes, and linked issue/ticket when available.

## Security & Configuration Tips
- Do not commit secrets. Keep API keys in `.env.local`; use `.env.example` as the template.
- Review `vite.config.ts` `define` values carefully to avoid exposing unintended environment variables.
