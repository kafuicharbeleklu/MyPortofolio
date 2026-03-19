# AGENTS.md — Repository Guidelines for Codex

## Project Overview

**PRINT_TRACK** is a single-page inventory management application for tracking printer consumables (toner cartridges and paper). It is aimed at organizations that need to follow purchases, stock levels, service-department assignments, and costs across multiple printer brands (HP, Konica Minolta, Samsung, Kyocera). All currency values are in **FCFA (XOF)** and the UI locale is **French (fr-FR)**.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Language | TypeScript | 5.8 |
| Bundler | Vite | 6+ |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + vanilla CSS |  |
| Design System | IBM Carbon Design System (custom implementation) |  |
| Animations | `motion` (Framer Motion successor) |  |
| Charts | Recharts 3 |  |
| Icons | Lucide React |  |
| Toasts | Sonner |  |
| CSS Utilities | `clsx`, `tailwind-merge` |  |
| AI | `@google/genai` (Gemini API) |  |

---

## Project Structure & Module Organization

```
PRINT_TRACK/
├── index.html              # Vite HTML entry
├── vite.config.ts          # Vite + React + Tailwind config, path alias @/ → root
├── tsconfig.json           # TS config (ES2022, bundler resolution, jsx: react-jsx, path alias @/)
├── package.json
├── .env.example            # Required: GEMINI_API_KEY, APP_URL
├── metadata.json
├── replace.cjs / replace2.cjs  # One-off migration scripts (not part of the app)
├── dist/                   # Production build output
├── screenshot/             # UI screenshots
└── src/
    ├── main.tsx            # React root mount
    ├── App.tsx             # Top-level composition: tab routing + PrintTrackProvider
    ├── index.css           # Global styles: IBM Plex Sans, Carbon color tokens, animations
    ├── types.ts            # Domain interfaces: TonerReference, Purchase, Assignment, StockInfo, Service
    ├── constants.ts        # Default catalog (DEFAULT_CATALOG), services (DEFAULT_SERVICES), formatCurrency, formatDate
    ├── context/
    │   └── PrintTrackContext.tsx  # Central state: React Context + Provider (purchases, assignments, catalog, services, stock calculations)
    └── components/
        ├── Layout.tsx           # Shell: sidebar nav + header + main content area
        ├── SidePanel.tsx        # Sidebar navigation component
        ├── Dashboard.tsx        # Overview: KPI cards, charts, stock summary
        ├── Stock.tsx            # Stock levels table with search/filter
        ├── Purchases.tsx        # Purchase records CRUD
        ├── Assignments.tsx      # Service-assignment records CRUD
        ├── Costs.tsx            # Cost analysis and reporting
        ├── Services.tsx         # Service (department) management CRUD
        ├── Modal.tsx            # Shared modal dialog component
        └── AccordionSection.tsx # Shared collapsible section component
```

---

## Build, Test & Development Commands

```bash
npm install          # Install all dependencies
npm run dev          # Start Vite dev server on port 3000 (--host=0.0.0.0)
npm run build        # Create production bundle in dist/
npm run preview      # Serve the built bundle for smoke testing
npm run lint         # TypeScript type-check only (tsc --noEmit)
npm run clean        # Remove dist/ (uses rm -rf; on PowerShell use Remove-Item -Recurse -Force dist)
```

> **Note:** There is no automated test framework configured. Validate changes with `npm run lint` and `npm run build` at minimum.

---

## Architecture & Data Flow

### State Management

All application state lives in `PrintTrackContext` (React Context + `useState` hooks):

- **`catalog`** — `TonerReference[]` — master list of known consumable references
- **`purchases`** — `Purchase[]` — purchase records (qty, unit price, date, linked `refId`)
- **`assignments`** — `Assignment[]` — assignments of stock to departments (qty, PMP at assignment time, date, linked `refId` + `svcId`)
- **`services`** — `Service[]` — departments / cost centers
- **`highlightedRefId`** — cross-component UI state for highlighting a reference

### Key Business Logic (in `PrintTrackContext`)

- **PMP (Prix Moyen Pondéré / Weighted Average Cost):** calculated dynamically from `totalCost / totalPurchased`; falls back to `prixRef` when no purchases exist.
- **Stock availability:** `totalPurchased - totalAssigned`. The context blocks assignments when stock is insufficient and fires toast alerts at thresholds ≤ 0 (rupture) and ≤ 2 (low stock).
- **Assignment cost:** Uses the PMP *at the time of assignment* (snapshot).

### Tab Routing

Navigation is handled via `useState('dashboard')` in `App.tsx` — not a router library. Tabs: `dashboard`, `stock`, `purchases`, `assignments`, `costs`, `services`.

---

## Domain Types (`src/types.ts`)

| Type | Purpose | Key Fields |
|---|---|---|
| `ConsumableCategory` | Union: `'mono' \| 'K' \| 'C' \| 'M' \| 'Y' \| 'papier'` | — |
| `TonerReference` | Catalog entry | `id`, `cat`, `family?`, `brand`, `name`, `model`, `prixRef` |
| `Purchase` | Purchase record | `id`, `refId`, `qty`, `pu`, `date`, `note` |
| `Assignment` | Dept. assignment | `id`, `svcId`, `refId`, `qty`, `pu` (PMP snapshot), `date`, `note` |
| `StockInfo` | Computed stock | `refId`, `totalPurchased`, `totalAssigned`, `available`, `pmp`, `value` |
| `Service` | Department | `id`, `name`, `color` |

---

## Design System & Styling Rules

The UI follows the **IBM Carbon Design System** visual language:

1. **Typography:** IBM Plex Sans (body) and IBM Plex Mono (code/numbers). Loaded via Google Fonts in `index.css`.
2. **Color palette:** Carbon Gray scale (`--color-carbon-gray-10` through `--color-carbon-gray-100`), IBM Blue (`#0f62fe`), semantic colors (`--color-ok: #198038`).
3. **Border radius:** Always `0` (sharp, geometric corners) — enforced globally on inputs, selects, textareas, and scrollbars.
4. **Focus states:** Inset bottom border in `--color-int` (IBM Blue).
5. **Animations:** Page enter, bell-swing, fade-in, slide-fade-in — all defined in `index.css`.
6. **Light theme only** with custom scrollbar styling.

### Styling conventions

- Use Tailwind CSS v4 utility classes (via `@tailwindcss/vite` plugin) combined with custom CSS in `index.css`.
- Use `clsx` and `tailwind-merge` for conditional / merged class names.
- Custom theme tokens are defined under `@theme { ... }` in `index.css`.
- **Never add border-radius** to any element.

---

## Coding Style & Naming Conventions

- **Components:** TypeScript React function components with hooks. PascalCase filenames and exports (e.g., `SidePanel.tsx`, `Dashboard`).
- **Variables/functions:** camelCase (e.g., `getStockInfo`, `highlightedRefId`).
- **Formatting:** 2-space indentation, semicolons, single quotes.
- **Types:** Keep shared interfaces in `src/types.ts`. Prefer explicit types over `any`.
- **Imports:** Use `@/` alias for project-root relative imports (configured in `tsconfig.json` and `vite.config.ts`).
- **Locale:** All user-facing text, number formatting, and dates use **French (fr-FR)**. Currency is formatted as FCFA (XOF) via `formatCurrency()` in `constants.ts`.

---

## Adding New Features — Checklist

1. If introducing a **new domain entity**, add its interface to `src/types.ts`.
2. Add CRUD actions and state to `PrintTrackContext.tsx`; expose them through the context value.
3. Create the UI component in `src/components/` following the existing pattern (PascalCase, function component, use `usePrintTrack()` hook).
4. Register the new tab in `App.tsx` (`renderContent` switch + import).
5. Add a nav item in `Layout.tsx` / `SidePanel.tsx`.
6. Use `formatCurrency()` and `formatDate()` from `constants.ts` for all displayed values.
7. Follow Carbon Design System conventions: 0px border-radius, IBM Plex Sans, Carbon Gray palette, IBM Blue accents.
8. Validate with `npm run lint` and `npm run build`.

---

## Testing Guidelines

No test runner is configured. **At minimum**, validate every change with:

```bash
npm run lint
npm run build
```

When adding tests in the future, place them beside source files as `*.test.ts` or `*.test.tsx`. Prioritize coverage on:
- Stock calculations (PMP, availability, thresholds)
- Assignment constraints (insufficient stock blocking)
- Key rendering flows (tab switching, CRUD forms)

---

## Commit & Pull Request Guidelines

Adopt **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`. Keep commits atomic and scoped to one concern. PRs should include a short summary, linked issue/task, reproducible validation steps, and screenshots for UI changes.

---

## Security & Configuration

- **Never commit secrets.** Store credentials in `.env.local`.
- Keep `.env.example` updated when new environment variables are introduced.
- Required env vars: `GEMINI_API_KEY` (for Gemini AI features), `APP_URL` (hosting URL).
- The `GEMINI_API_KEY` is injected at build time via `vite.config.ts` → `process.env.GEMINI_API_KEY`.
