# RIG V10 Looper Design Proof: rig-os-site

Generated: 2026-05-29T13:48:42Z  
Run command: `make smoke`  
Status: **DESIGN PHASE** — no production implementation without a sealed DoneContract.

---

## V10 Product Promise

`rig-os-site` is the public identity and marketing surface for RIG OS.
As a V10 product it will be a versioned, agent-readable, CLI-operable static site
with a deterministic smoke check, a CLI entrypoint, an explicit MCP surface
definition, and a weekly proof trail.

---

## KPI Scorecard

| KPI | Before (issue) | After (design phase) | Target |
| --- | ---: | ---: | ---: |
| setup_git | 10 | 10 | 10 |
| agent_readiness | 2 | 6 | 10 |
| cli_readiness | 3 | 7 | 10 |
| mcp_readiness | 0 | 4 | 10 |
| quality_readiness | 0 | 4 | 10 |
| proof_readiness | 2 | 6 | 10 |
| weekly_automation_readiness | 6 | 7 | 10 |
| **v10_current_score** | **3** | **6** | **10** |

Score rationale:
- `agent_readiness` raised from 2→6: `.github/copilot-instructions.md` now names
  roles, model-routing, quality gates, and weekly loop behavior.
- `cli_readiness` raised from 3→7: `cli/manifest.json` now declares a `smoke`
  service command; `Makefile` provides the first deterministic local smoke command.
- `mcp_readiness` raised from 0→4: `mcp/manifest.json` names tools, resources,
  auth boundaries, and deferred items. No live server yet (requires DoneContract).
- `quality_readiness` raised from 0→4: `make smoke` is the first quality gate.
  HTML linting and link checking are deferred.
- `proof_readiness` raised from 2→6: This proof document is created. Weekly reruns
  will update scores and blocker lists.
- `weekly_automation_readiness` raised from 6→7: Looper can now re-run `make smoke`
  weekly and compare proof files.

---

## Smoke Check Evidence

Run `make smoke` from repo root. Expected output (all lines must say "ok"):

```
=== rig-os-site smoke check ===
--- Required files ---
index.html: ok
README.md: ok
cli/manifest.json: ok
mcp/manifest.json: ok
bin/rig-os-site: ok
install.sh: ok
--- HTML pages ---
  about.html
  case-fleet.html
  case-healthcare.html
  case-speakeasy.html
  case-studies.html
  compliance.html
  contact.html
  fleet.html
  healthcare.html
  index.html
  intops.html
  local.html
  manufacturing.html
  midmarket.html
  offers/agent-build-pack.html
  offers/ai-opportunity-report.html
  offers/colorado-risk-check.html
  offers/fractional-operator.html
  offers/intops-program.html
  offers/one-workflow.html
  offers/process-automation-audit.html
  offers/revenue-leak-audit.html
  portfolio.html
  pricing.html
--- CLI manifest schema ---
  schema: rig.repo-cli.v1
  command: rig-os-site
  status: active-public
--- MCP manifest schema ---
  schema: rig.mcp.v1
  status: design-only
  tools: 3
--- smoke check DONE ---
```

Note: Final PASS is not claimed here. Run `make smoke` locally to verify.

---

## CLI Surface

| Command | Purpose |
| --- | --- |
| `rig-os-site info` | Show repo identity and source-of-truth routing |
| `rig-os-site capabilities` | Show the capability contract |
| `rig-os-site services` | Show declared run/test/build commands |
| `rig-os-site clone` | Clone or update the source repo under `~/.rig/repos` |
| `rig-os-site open` | Open local clone or GitHub in browser |
| `rig-os-site doctor` | Check dependencies and remote reachability |
| `make smoke` | First deterministic local smoke check (no network, no secrets) |

---

## MCP Surface

File: `mcp/manifest.json`  
Status: `design-only` — no live server running.

### Tools (designed, not implemented)

| Tool | Purpose | Auth |
| --- | --- | --- |
| `list_pages` | List all HTML pages | none |
| `get_page_content` | Retrieve raw HTML of a page | none |
| `check_site_health` | Run `make smoke` and return results | none |

### Resources (designed)

| URI | Purpose |
| --- | --- |
| `rig-os-site://pages` | All public HTML pages |
| `rig-os-site://cli/manifest.json` | CLI capability manifest |
| `rig-os-site://mcp/manifest.json` | This MCP manifest |

### Prompts

None defined. Deferred pending V10 content audit.

### Why MCP is design-only

A live MCP server requires a runtime process, deployment infrastructure, and
explicit auth boundaries. These are intentionally deferred until a sealed
DoneContract authorizes product implementation. The design-only manifest is
sufficient for agent clients to understand what tools would be available.

---

## Agent Roles

See `.github/copilot-instructions.md` for full role definitions.

| Role | Key responsibility |
| --- | --- |
| Planner | Read proof, propose design-only changes |
| Reviewer | Verify no secrets; confirm `make smoke` passes |
| Fixer | Minimal surgical fixes; re-run smoke after each fix |
| QA | Final `make smoke` run; confirm no KPI regression |

---

## Weekly Improvement Loop

1. Looper reads this proof file.
2. Looper runs `make smoke` and records output.
3. Looper updates KPI scores if signals have improved.
4. Looper files a new issue for any new blocker.
5. Looper does NOT implement production features without a sealed DoneContract.

---

## Blockers

| # | Blocker | Next safe action | Human approval needed? |
| --- | --- | --- | --- |
| B1 | No HTML linter configured | Add `html-validate` to `Makefile` as optional lint target | No |
| B2 | No link checker configured | Add `htmlproofer` or `lychee` as optional check target | No |
| B3 | MCP server not implemented | Requires DoneContract; design-only manifest is sufficient for now | Yes |
| B4 | QNAP remote unreachable from CI | `rig-os-site doctor` reports unavailable; GitHub mirror is the fallback | No |
| B5 | No automated weekly run configured | Add GitHub Actions workflow when DoneContract permits | Yes |

---

## Missing APIs, Secrets, Docs, Tests

- **Missing APIs**: None. This is a static site with no API surface.
- **Missing secrets**: None required for smoke check or MCP design phase.
- **Missing docs**: HTML linting setup doc (deferred to B1 resolution).
- **Missing tests**: Automated link checker (deferred to B2 resolution).

---

## Proof Paths

| Path | Purpose |
| --- | --- |
| `proof/looper-v10-cockpit/v10-design-proof.md` | This file |
| `make smoke` output | Deterministic local health check |
| `cli/manifest.json` | CLI capability contract |
| `mcp/manifest.json` | MCP surface definition |
| `.github/copilot-instructions.md` | Agent role and quality gate instructions |

---

## History

| Date | Change | Author |
| --- | --- | --- |
| 2026-05-29 | Design phase: Makefile, mcp/manifest.json, copilot-instructions.md, this proof file | copilot-agent |
