# Stock agent architecture evidence

The public walkthrough is a high-level paraphrase of the owner's private
`india-stock-agent` repository at revision `a4e12cf`. No source files, prompts,
signals, credentials, or private data are embedded in this portfolio.

## Source map

| Public explanation                                                                             | Source inspected                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weekday pre-open 07:30 IST and post-close 16:30 IST; independent ingestion jobs                | `scheduler/scheduler.py`, `scheduler/jobs.py`                                                                                                                       |
| Technical snapshots, institutional flows, portfolio state; placeholder news and market context | `scheduler/briefing_inputs.py`, `india_data/crew/context.py`                                                                                                        |
| Nifty 100; 60-bar minimum; four OR screens; max 15; hit-count ranking                          | `india_data/universe.py`, `india_data/technicals.py` (legacy `screen_nifty50` function actually uses `NIFTY_100`)                                                   |
| Pre-triage price filtering; all-invalid early skip                                             | `india_data/crew/briefing.py::_run_briefing_pipeline`                                                                                                               |
| Up to five triage survivors; bypass for <=5; deterministic fallback                            | `india_data/triage.py`                                                                                                                                              |
| Five role views in ONE council call; role-specific schemas                                     | `india_data/crew/briefing.py`, `india_data/crew/context.py`, `india_data/prompts/council.py`                                                                        |
| Ordered candidate loop; first pass returns; failure continues                                  | `india_data/crew/candidate_pipeline.py::evaluate_candidates`                                                                                                        |
| Proposal geometry, post-LLM price checks, challenge, rebuttal, memory, ship gate               | `india_data/crew/candidate_pipeline.py`, `india_data/orchestrator_geometry.py`, `india_data/rebuttal.py`, `india_data/memory_auditor.py`, `india_data/ship_gate.py` |
| Green 3/Opus; amber 2/Sonnet; red 1/Haiku; possible spending-cap block                         | `india_data/fallback_limits.py`, `india_data/kill_switch.py`, `india_data/llm.py`                                                                                   |
| No candidate success becomes an ABSTAIN/no-signal briefing                                     | `india_data/crew/briefing.py`                                                                                                                                       |
| Composer → Telegram HTML with paper disclaimer; persistence                                    | `scheduler/jobs.py`, `india_data/briefing_delivery.py`                                                                                                              |
| Closure → reflection → lessons; historical analogues and enforced-memory checks                | `india_data/signal_closure.py`, `india_data/reflection.py`, `india_data/continuous_learning.py`, `india_data/memory_auditor.py`                                     |

## Boundaries preserved in the UI

- Counts are upper limits. A run may have fewer survivors than its attempt limit.
- Budget model labels describe the selected tier, not a live deployment status.
- Candidate A/B/C scenarios are synthetic illustrations of control flow.
- The simulator assumes sufficient surviving candidates and enables memory/strict
  gates. Actual checks depend on runtime flags; model calls can also be blocked.
- Five council roles are not represented as five independent LLM calls.
- Data-health summaries and audit logs are not universal fail-closed gates.
- The strict gate checks supplied prices, nonzero risk, reward/risk >=1.5, and
  devil's-advocate strength >=3/5. These rules do not establish trading efficacy.
- Scheduled news, sector-flow, and bazaar fields are not fully connected to live
  inputs. The presence of an ingestion job is not proof of downstream integration.
- No financial returns, model accuracy, or current uptime are claimed.

Recheck this source map when updating `lib/stock-agent.ts` or the project copy.
