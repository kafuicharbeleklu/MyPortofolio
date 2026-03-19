# Repository Guidelines

## Project Overview

Power BI PBIP dashboard for Microsoft 365 user tracking, license management, and capacity-risk monitoring. The semantic model pulls data from Microsoft Graph API (via `Param_TenantId`, `Param_ClientId`, `Param_Secret` parameters). The model culture is `fr-FR`, with `en-US` source queries.

## Project Structure & Module Organization

`M365_UI.pbip` is the project entry point and links the report to the semantic model.

### Semantic Model (`M365_UI.SemanticModel/`)

| Path | Purpose |
|------|---------|
| `definition/model.tmdl` | Model root — table refs, culture, annotations |
| `definition/expressions.tmdl` | Data-source parameters (tenant/client/secret) |
| `definition/relationships.tmdl` | All inter-table relationships |
| `definition/tables/_Mesures.tmdl` | Shared DAX measures (single source of truth) |
| `definition/tables/T_Utilisateurs_Dim.tmdl` | User dimension (accounts, sign-in, status) |
| `definition/tables/T_Produits_Dim.tmdl` | Product/SKU dimension |
| `definition/tables/T_Affectations_Fact.tmdl` | License-assignment fact table |
| `definition/tables/T_Activite_M365.tmdl` | M365 activity/usage fact table |
| `definition/tables/LocalDateTable_*.tmdl` | Auto-generated date tables (do not edit) |

**Star-schema relationships:**
- `T_Affectations_Fact` → `T_Utilisateurs_Dim` (on `UserPrincipalName`)
- `T_Affectations_Fact` → `T_Produits_Dim` (on `CodeSKU`)
- `T_Utilisateurs_Dim` → `T_Activite_M365` (on `UserPrincipalName`)
- Date columns join to their respective `LocalDateTable_*` tables

### Report (`M365_UI.Report/`)

| Path | Purpose |
|------|---------|
| `definition/report.json` | Report-level config, theme, custom visuals |
| `definition/pages/pages.json` | Page ordering and active page |
| `definition/pages/a4497031bb9f4bfb6556/` | Main page (first in order) |
| `definition/pages/54f9d470ac60b85b18da/` | Second page (active by default) |
| `definition/pages/3c4cbe0b2835dc22b7e2/` | Third page |
| `definition/pages/page_drillthrough_detail_user/` | Drillthrough — user detail (360 profile) |
| `definition/pages/ttv_*/` | Tooltip visuals (~30, KPI cards & detail cards) |
| `definition/bookmarks/` | 12 navigation/state bookmarks |
| `StaticResources/` | Theme JSON (`CY25SU11`) and image assets |

**Custom visuals:** `ScrollingTextVisual1448795304508` (scrolling text marquee).

## Build, Test, and Development Commands

This repository has no compiled build pipeline; development is PBIP source editing.

- `start .\M365_UI.pbip` — Open the project in Power BI Desktop.
- `rg --files M365_UI.SemanticModel\definition` — List model source files quickly.
- `git diff -- M365_UI.SemanticModel M365_UI.Report` — Review serialized changes before commit.

## Coding Style & Naming Conventions

- **File formatting:** Preserve serializer output — tabs in `.tmdl`, 2-space indentation in JSON.
- **Generated IDs:** Do not rename visual folder IDs, page IDs, or lineage tags unless doing an intentional refactor.
- **Table naming:** `T_<Domain>_Dim` for dimensions, `T_<Domain>_Fact` for fact tables.
- **Measures:** Place all reusable DAX measures in `_Mesures.tmdl`. Never duplicate logic across visuals.
- **Business vocabulary:** Use existing French terms consistently (`NbHumainsActifs`, `LicencesAffectees`, `EtatActivite`, `DateRapport`, etc.).
- **Tooltip pages:** Prefix with `ttv_`. Named tooltip pages use descriptive suffixes (e.g., `ttv_dt_card_upn`, `ttv_dt_kpi_actives`).
- **Parameters:** `Param_TenantId`, `Param_ClientId`, `Param_Secret` — always treat as environment-specific; never hard-code real values in committed files.

## Testing Guidelines

No automated tests are currently defined. Validate changes manually in Power BI Desktop:

1. Refresh data and confirm model loads without errors.
2. Check affected pages, bookmarks, and drillthrough behavior (`page_drillthrough_detail_user`).
3. Verify measure outputs under expected slicer/filter combinations, especially `EtatActivite` logic.
4. Test tooltip pages (`ttv_*`) render correctly on hover for their target visuals.
5. Confirm bookmarks restore the expected filter/slicer state.

## Commit & Pull Request Guidelines

Use Conventional Commit style:

- `feat(report): add inactivity trend visual`
- `fix(model): prevent slicer exclusion for disabled accounts`
- `refactor(measures): consolidate duplicate KPI calculations`

For PRs, include:
- Short scope summary and changed paths.
- Screenshots for visual/layout changes.
- Notes about data or model impact.

## Security & Configuration

- **Never commit credentials or tenant secrets.** The current `expressions.tmdl` contains placeholder parameters — replace them with environment-specific values locally.
- Keep machine-specific files in ignored `.pbi` artifacts (`**/.pbi/localSettings.json`, `**/.pbi/cache.abf`).
- Treat `Param_TenantId`, `Param_ClientId`, `Param_Secret` as externalized config.
