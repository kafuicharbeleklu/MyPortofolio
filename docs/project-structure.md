# Project Asset Structure

This repository now separates public assets by purpose:

- `public/documents/cv/`: downloadable CV files
- `public/media/profile/`: profile and portrait images used across the site
- `public/projects/<slug>/`: project-specific screenshots, mockups, exports, and supporting visuals

Recommended convention for each project folder:

- `cover.*`: hero visual used on cards or detail pages
- `screens/`: UI screenshots or monitoring dashboards
- `diagrams/`: topology, architecture, or workflow diagrams
- `exports/`: PDFs, reports, or presentation-ready deliverables

Suggested slugs already prepared:

- `siem`
- `moov`
- `orabank`
- `biasa`
- `azure-infra`
- `lan-wan`

If a new project is added, create its folder in `public/projects/` first, then reference assets through `src/config/assets.ts` to keep paths centralized and avoid hard-coded strings inside components.
