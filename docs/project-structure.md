# Project Asset Structure

This repository now separates public assets by purpose:

- `public/documents/cv/`: downloadable CV files
- `public/media/profile/`: profile and portrait images used across the site
- `public/projects/<slug>/`: project-specific screenshots, mockups, exports, and supporting visuals

Each project folder can also keep lightweight metadata files at its root, for example:

- `projects_data.json`: structured description consumed by the portfolio UI
- `README.md`: optional project-specific notes
- `AGENTS.md`: optional local contributor guidance when the folder mirrors another repository

Recommended convention for each project folder:

- `projects_data.json`: structured project summary when the project is surfaced in the UI
- `cover.*`: hero visual used on cards or detail pages
- `screens/`: UI screenshots or monitoring dashboards
- `diagrams/`: topology, architecture, or workflow diagrams
- `exports/`: PDFs, reports, or presentation-ready deliverables

Suggested slugs already prepared:

- `automate`
- `azure-infra`
- `biasa`
- `dns`
- `lan-wan`
- `mfa`
- `siem`
- `moov`
- `orabank`
- `postgresql_ssl`
- `printtrack`
- `qr`
- `smartprocure`
- `suno`
- `tracker`
- `ubuntu_ldap`
- `wisignal`

If a new project is added, create its folder in `public/projects/` first, then reference assets through `src/config/assets.ts` to keep paths centralized and avoid hard-coded strings inside components.
