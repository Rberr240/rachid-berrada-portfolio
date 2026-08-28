# KPI Scorecard

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts this document must stay consistent with, and [90_DAY_ROADMAP.md](./90_DAY_ROADMAP.md) for the targets these metrics are measured against.

## 1. Purpose

A small, honest set of numbers Rachid tracks weekly to know whether the international push is working — independent of vanity metrics like follower count. These metrics are designed to be trackable by hand from the CRM sheet, DMs/inbox, and calendar, without needing any new tooling.

## 2. Primary metrics

These are the numbers that matter. Track all of them every week.

| Metric | Definition |
|---|---|
| **Prospects** | Number of new people/companies identified and added to the outbound target list this week (see [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md)). Counts identification, not yet contact. |
| **Qualified leads** | Number of inbound or outbound contacts this week that meet Rachid's basic fit criteria (plausible budget, in-scope project type, genuine interest) — equivalent to a lead reaching `QUALIFIED` in [CRM_V2_SPEC.md](./CRM_V2_SPEC.md)'s pipeline, or the equivalent manual judgment call in the current V1 sheet. |
| **Replies** | Number of prospects who responded to an outbound message this week (any response, including a "not interested," counts as a reply — this measures message quality/targeting, not deal quality). |
| **Conversations** | Number of back-and-forth exchanges (3+ messages, or any two-way exchange that goes beyond a single reply) that are still active this week, whether inbound or outbound in origin. |
| **Meetings** | Number of discovery calls or meetings held this week (see [templates/DISCOVERY_CALL.md](./templates/DISCOVERY_CALL.md)). Scheduled-but-not-yet-held meetings are not counted until they happen. |
| **Proposals** | Number of proposals/quotes sent this week (see [templates/PROJECT_PROPOSAL_TEMPLATE.md](./templates/PROJECT_PROPOSAL_TEMPLATE.md)). |
| **Wins** | Number of prospects who agreed to proceed this week (equivalent to reaching `WON` in the CRM V2 pipeline design). |
| **Revenue** | Total value of deposits/payments actually received this week, in USD (or Rachid's preferred reporting currency — pick one and stay consistent). Distinct from `Estimated Value`, which is a forecast, not cash received. |
| **Average project value** | Total revenue from projects won in a given period, divided by the number of projects won in that period. Recompute monthly, since a single week's average is too noisy to be meaningful (one large or small project skews it heavily). |
| **Lead source** | Breakdown of qualified leads by acquisition channel this week (e.g. Instagram: 3, LinkedIn: 1, outbound: 5, referral: 1). Depends on knowing where each lead came from — see [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md) for the future tracking design; until that exists, this is filled in from memory/context per lead, which is acceptable at current volume. |
| **Conversion rate** | Two versions worth tracking, since they answer different questions: **(a) Qualified → Won rate** = Wins ÷ Qualified leads (measures overall pipeline effectiveness), and **(b) Proposal → Won rate** = Wins ÷ Proposals sent (measures closing effectiveness once a proposal is on the table). Report both as percentages, using cumulative totals (not single-week counts) once volume is low, since a one-week ratio with small numbers is misleading. |

## 3. Secondary metric

| Metric | Definition | Why it's secondary |
|---|---|---|
| **Follower count** | Total followers across Instagram, TikTok, LinkedIn, YouTube, (optional) X, summed or listed per platform. | Vanity metric — does not by itself indicate business results. Useful only as a rough proxy for content reach, and only meaningful alongside the primary metrics above (e.g. rising followers with flat qualified leads signals a targeting problem, not a win). Track it, but never let it substitute for the primary metrics when judging progress. |

## 4. Weekly scorecard table

Copy this table into a spreadsheet, one row per week (ISO week or a simple date range).

| Week of | Prospects | Qualified Leads | Replies | Conversations | Meetings | Proposals | Wins | Revenue | Avg. Project Value (MTD) | Top Lead Source | Qualified→Won % (cumulative) | Proposal→Won % (cumulative) | Follower Count (total) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | |

Suggested spreadsheet hygiene:

- One tab per quarter, one row per week, running totals in a summary row/tab.
- Keep this scorecard separate from the CRM lead sheet (V1 or future V2) — the CRM tracks individual leads; this scorecard tracks aggregate weekly performance. They should agree with each other (scorecard numbers should be derivable from the CRM sheet plus outreach records) but don't need to live in the same file.
- Fill it in on a fixed day each week (e.g. every Sunday or Monday) so the cadence stays consistent and comparisons across weeks are meaningful.

## 5. How this maps to the 90-day roadmap

See [90_DAY_ROADMAP.md](./90_DAY_ROADMAP.md) for the 30/60/90-day targets these weekly numbers roll up into. Those are targets, not guarantees — this scorecard is the instrument for finding out, honestly, how close reality tracks to them.
