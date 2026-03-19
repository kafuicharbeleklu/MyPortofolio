# Repository Guidelines

## Project Structure & Module Organization
This repository is a Power Automate package export, not a compiled application. `manifest.json` stores package-level metadata and resource dependencies. `Microsoft.Flow/flows/manifest.json` lists the exported flow assets. The workflow itself lives in `Microsoft.Flow/flows/a58f7242-7df7-4e4f-ab30-2effe51a972e/definition.json`; keep trigger, action, and variable names stable because expressions and `runAfter` links depend on them. `apisMap.json` and `connectionsMap.json` map logical connector names to environment-specific API and connection IDs.

## Build, Test, and Development Commands
There is no local build system in this snapshot. Use PowerShell to validate JSON before importing the package:

```powershell
Get-Content .\manifest.json | ConvertFrom-Json > $null
Get-Content .\Microsoft.Flow\flows\a58f7242-7df7-4e4f-ab30-2effe51a972e\definition.json | ConvertFrom-Json > $null
rg "shared_|operationId|tableId" .\Microsoft.Flow
```

The first two commands catch malformed JSON. The `rg` example helps review connector, action, and Excel table references. After any change, import the package into a non-production Power Automate environment and run an end-to-end check with a sample Veeam backup email.

## Coding Style & Naming Conventions
Preserve the exported JSON schema and keep edits narrowly scoped; avoid wholesale reformatting of `definition.json`, which creates noisy diffs and makes flow reviews harder. Follow the existing naming style: PascalCase for actions like `CheckIfVeeamEmail` and descriptive variable names like `CountSuccess` or `DateBackup`. When adding new actions, prefer names that describe the business step rather than the connector alone.

## Testing Guidelines
No automated test suite is included. Minimum validation should cover: a `Backup` email triggering the flow, job name extraction succeeding, duplicate detection preventing a second Excel row for the same `Date` and `JobName`, and success/error/warning counts plus success rate being written correctly. Record the sample email pattern and target workbook/table used during verification.

## Commit & Pull Request Guidelines
This snapshot does not include `.git`, so there is no local history to infer message conventions from. Use Conventional Commits, for example `fix(flow): harden duplicate detection for backup jobs`. In pull requests, summarize the workflow change, list the edited files under `Microsoft.Flow/flows/...`, note any connector impact (Office 365, Excel Online, Content Conversion), and include screenshots or import/export notes when portal-visible behavior changed.

## Security & Configuration Tips
`definition.json` contains environment-specific addresses, drive IDs, file IDs, and table IDs. Review these values before committing or promoting across tenants. Keep production connection details out of screenshots and verify `connectionsMap.json` matches the destination environment before import.
