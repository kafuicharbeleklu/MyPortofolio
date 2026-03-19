# Repository Guidelines

## Project Structure & Module Organization
`wifi_simulator_neemba_v8.html` is the only executable artifact. It contains the UI markup, inline CSS, simulation logic, scenario handling, plan upload/calibration, and PDF export in one file. `passation_wifi_neemba.pdf` and `passation_wifi_neemba.docx` are reference handoff documents.

There is no `src/`, `tests/`, or `assets/` directory yet. If the simulator grows, split styles, scripts, and assets before adding large features.

## Build, Test, and Development Commands
Use simple browser-based workflows:

- `Start-Process .\wifi_simulator_neemba_v8.html` opens the simulator in the default browser.
- `python -m http.server 8000` serves the folder locally when `file://` testing is unreliable.
- Open `http://localhost:8000/wifi_simulator_neemba_v8.html` after starting the local server.

There is no build or package step in the current repository.

## Coding Style & Naming Conventions
Keep the existing single-file style consistent:

- Use 2-space indentation in HTML, CSS, and JavaScript blocks.
- Stay with plain browser JavaScript and existing patterns such as `var`, camelCase functions (`computeAll`, `renderWalls`), and uppercase shared constants (`MATERIALS`, `AP_MODELS`).
- Preserve the current CSS naming style based on prefixed component classes such as `.c-header` and `.c-panel`.
- Keep interface text in French unless the feature explicitly changes the target audience.

Add comments only where state transitions or signal calculations are not obvious.

## Testing Guidelines
No automated test suite is present. Validate changes manually in a browser after each edit:

- load the default plan and recalculate coverage;
- add, drag, rename, and remove APs;
- draw and clear walls, then inspect attenuation effects;
- add zones, switch scenarios, compare scenarios, upload a plan, and export PDF.

If you extract reusable logic, prefer pure functions so a future test suite can target them.

## Commit & Pull Request Guidelines
This workspace is not a Git checkout, so no local commit history is available to infer conventions. Use short, imperative commit messages, preferably Conventional Commits such as `fix: correct zone RSSI table` or `feat: add wall material preset`.

Pull requests should include a brief behavior summary, manual verification steps, and screenshots or sample PDF output for UI/report changes. Link the related request when one exists.

## Security & Configuration Tips
The app is mostly self-contained, but the HTML references Google Fonts and includes a browser-side call to Anthropic for AP lookup. Do not hardcode secrets in the page. If AI-backed features expand, route them through a server-side proxy or another non-committed secret-management path.
