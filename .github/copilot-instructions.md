# Copilot Agent Instructions: rig-os-site

## Repo Identity

| Field | Value |
| --- | --- |
| Name | `rig-os-site` |
| Lane | `public-web` |
| Status | `active-public` |
| Visibility | `public` |
| Primary language | HTML (static site) |
| Smoke command | `make smoke` |
| CLI command | `rig-os-site` |
| MCP manifest | `mcp/manifest.json` (design-only) |

## V10 Product Promise

`rig-os-site` is the public identity and marketing surface for RIG OS. As a V10
product, it is a versioned, agent-readable, CLI-operable static site with:

- A deterministic local smoke check (`make smoke`) that verifies required files
  without network or secrets.
- A CLI entrypoint (`bin/rig-os-site`) installable via `install.sh` that exposes
  `info`, `capabilities`, `services`, `clone`, `doctor`, and `open` sub-commands.
- An MCP surface definition (`mcp/manifest.json`) naming future tools, resources,
  and the explicit reason write/deploy tools are human-approval-gated.
- A proof trail under `proof/looper-v10-cockpit/` updated by Looper weekly.

## Agent Roles and Scope

### Planner
- Reads `proof/looper-v10-cockpit/v10-design-proof.md` and the KPI scorecard.
- Proposes only design or documentation changes unless a sealed DoneContract
  permits product implementation.
- Does not deploy, publish, send messages, or activate schedules.

### Reviewer
- Checks that no secrets, tokens, cookies, or private paths appear in any commit.
- Verifies that `make smoke` passes before approving changes.
- Verifies that `mcp/manifest.json` and `cli/manifest.json` remain valid JSON.

### Fixer
- Applies minimal, surgical changes to resolve a named blocker.
- Runs `make smoke` after every fix to confirm no regression.
- Records fix in `proof/looper-v10-cockpit/v10-design-proof.md`.

### QA
- Re-runs `make smoke` after all fixes are applied.
- Confirms KPI scores have not regressed.
- Does not approve production deployment without a sealed DoneContract.

## Model-Routing Expectations

| Priority | Provider | Use case |
| ---: | --- | --- |
| 1 | A1 deterministic Python | Repeatable decisions, file checks |
| 2 | Local RIG mesh (LiteLLM/Open WebUI) | Default coding/orchestration |
| 3 | Claude/Codex paid burst | Frontier reasoning when needed |
| 4 | Human approval | Public, destructive, or sensitive actions |

Agents must not guess model routing. If the route is unclear, escalate to human.

## Quality Gates

1. `make smoke` must exit 0 (all required files present and parseable).
2. `cli/manifest.json` must be valid JSON with `schema`, `command`, and `status`.
3. `mcp/manifest.json` must be valid JSON with `schema`, `tools`, and `status`.
4. No secret, token, cookie, or private path in any committed file.
5. `proof/looper-v10-cockpit/v10-design-proof.md` must be updated with each
   meaningful change.

## What Must Never Run Without Human Approval

- Deployment or publishing of any page to a live host.
- Sending messages, emails, or notifications.
- Activating new schedules or cron jobs.
- Resetting, deleting, or overwriting user work.
- Pushing changes to the QNAP canonical remote.
- Any action that reads or writes outside the repo working directory.

## Weekly Improvement Loop

1. Looper reads `proof/looper-v10-cockpit/v10-design-proof.md`.
2. Looper runs `make smoke` and records the output.
3. Looper updates KPI scores if signals have improved.
4. Looper files a new issue for any new blocker discovered.
5. Looper does NOT implement production features unless a sealed DoneContract
   permits it.

## Boundaries

- Never print secrets, tokens, cookies, browser session state, or raw private paths.
- Never deploy, publish, or activate external services from this issue.
- Never reset, clean, delete, or overwrite user work.
- Prefer deterministic scripts (`make smoke`, `rig-os-site doctor`) before agentic
  workflows.
- All MCP write or deploy tools require human approval before execution.
