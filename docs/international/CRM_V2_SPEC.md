# CRM V2 Spec (Future Design — Not Built)

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts this document must stay consistent with.

> **Status: design-only. Nothing in this document is implemented and nothing here should be implemented without Rachid's explicit, separate approval.** The current lead pipeline (Netlify Forms → `lead-automation.mts` → `LEADS_AUTOMATION_WEBHOOK_URL` → Make.com → Google Sheets → Gmail) is stable production infrastructure and is referred to below as **CRM V1**. This document describes what a **CRM V2** could look like later. It does not change V1, the Make.com scenario, or the Google Sheet in any way.

## 1. Purpose

Rachid currently tracks leads in a Google Sheet populated automatically by a Make.com scenario. That is enough for the current volume of leads but has no concept of a sales pipeline stage beyond "new" — every row lands with `status: "Nouveau"` and nothing pushes it further automatically. As international outbound and content-driven inbound both scale, Rachid will eventually want:

- a real pipeline (not just "new" vs. everything else),
- acquisition-channel visibility (which content/outreach produced the lead),
- and fields that support forecasting (estimated value, next action, follow-up date).

This document specifies what that V2 schema and pipeline could look like, so that when Rachid decides to build it, the design work is already done and reviewed. It is a reference for a future decision, not a task queue.

## 2. What CRM V1 actually is today (verified from code)

Confirmed by reading `netlify/functions/lead-automation.mts` on `main` at commit `92bac60`:

- `ProjectForm.tsx` submits to Netlify Forms (`/netlify-forms/contact.html`, form name `contact`).
- Netlify's `formSubmitted` event triggers `lead-automation.mts`.
- `buildLeadPayload()` normalizes the submission into this exact shape and POSTs it as JSON to `LEADS_AUTOMATION_WEBHOOK_URL` (Make.com), which is expected to write it into a Google Sheet and trigger a Gmail notification:

| V1 payload field | Type | Notes |
|---|---|---|
| `leadId` | string (UUID) | generated server-side with `randomUUID()`, not submitted by the user |
| `submittedAt` | string (ISO 8601) | generated server-side at processing time |
| `name` | string | trimmed, capped at 200 chars, CSV-formula-escaped |
| `company` | string | trimmed, capped at 200 chars, CSV-formula-escaped |
| `phone` | string | trimmed, capped at 80 chars, CSV-formula-escaped |
| `email` | string | trimmed, capped at 320 chars, CSV-formula-escaped |
| `projectType` | string | one of the `projectTypes` values in `src/data/profile.ts` |
| `message` | string | trimmed, capped at 5000 chars, CSV-formula-escaped |
| `status` | literal `"Nouveau"` | always this value at submission time; nothing currently updates it downstream |
| `source` | literal `"Portfolio"` | hardcoded, not derived from any tracking |
| `followUpDate` | literal `""` | always empty at submission |
| `notes` | literal `""` | always empty at submission |

Important: this document does **not** have direct visibility into the actual Google Sheet column layout inside the Make.com scenario — only into the JSON shape sent to it. Any real migration must start by confirming the live sheet's actual columns against this table (see [Migration Plan](#5-migration-plan)).

There is no `country`, no UTM/source-attribution data, and no concept of pipeline progression beyond the single `status` string, which is never updated after creation. That is the gap V2 addresses.

## 3. Canonical V2 pipeline stages

A lead should be able to move through a single linear pipeline (a lead can also be marked lost/disqualified at any stage — see note below):

| # | Stage | Meaning |
|---|---|---|
| 1 | **NEW LEAD** | Submission received, unreviewed. Equivalent to V1's `"Nouveau"`. |
| 2 | **QUALIFIED** | Rachid has reviewed the message and confirmed it's a real, in-scope opportunity (budget/fit plausible, not spam, not out of scope). |
| 3 | **CONTACTED** | Rachid has sent a first reply (email/WhatsApp/DM). |
| 4 | **MEETING** | A discovery call or meeting has been scheduled or held. |
| 5 | **PROPOSAL** | A proposal/quote has been sent (see `templates/PROJECT_PROPOSAL_TEMPLATE.md`). |
| 6 | **NEGOTIATION** | Prospect is discussing scope, price, or terms before committing. |
| 7 | **WON** | Prospect has verbally/in writing agreed to proceed (deposit not necessarily received yet). |
| 8 | **PROJECT** | Work is actively in progress (deposit received, project underway). |
| 9 | **DELIVERED** | Final deliverable shipped and accepted by the client. |
| 10 | **TESTIMONIAL** | A testimonial/review has been requested and/or collected (see `templates/TESTIMONIAL_REQUEST.md`). |
| 11 | **REFERRAL** | Client has been asked for, or has given, a referral. |

Notes on using this pipeline:

- Stages are meant to be monotonic (a lead generally only moves forward), but a lead can exit the pipeline at any stage as **LOST** or **DISQUALIFIED** — these are not listed as numbered stages above because they are terminal exits, not progress. If V2 is built, `Status` should allow these as values alongside the 11 stages.
- Not every lead needs every stage populated with a date — e.g., a lead disqualified at stage 2 will never have a `MEETING` date, and that's expected.
- `TESTIMONIAL` and `REFERRAL` existing as pipeline stages (not just tags) is intentional: it keeps post-delivery relationship work visible in the same view instead of leads disappearing once delivered, matching the sales-cycle intent in `SALES_PLAYBOOK.md`.

## 4. Recommended V2 field schema

| Field | Type | Description | Relationship to V1 |
|---|---|---|---|
| `Lead ID` | string (UUID) | Unique identifier | Same as V1 `leadId`, carried forward unchanged |
| `Created Date` | date/datetime | When the lead first arrived | Same as V1 `submittedAt`, renamed |
| `Name` | string | Contact's name | Same as V1 `name` |
| `Company` | string | Contact's company, if any | Same as V1 `company` |
| `Phone` | string | Phone/WhatsApp number | Same as V1 `phone` |
| `Email` | string | Contact email | Same as V1 `email` |
| `Country` | string | Prospect's country | **New in V2.** Not collected today — would require either a new form field or inference (e.g. from phone country code or IP-based geolocation), both design decisions for a future pass, not covered here. |
| `Project Type` | string | Type of project requested | Same as V1 `projectType` |
| `Message` | string | Original inquiry message | Same as V1 `message` |
| `Lead Source` | string | High-level channel (e.g. "Portfolio site", "Outbound DM", "Referral") | Same *concept* as V1 `source`, but V1 hardcodes `"Portfolio"` for every row; V2 would need this to actually vary. See [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md). |
| `UTM Source` | string | e.g. `instagram`, `linkedin`, `google` | **New in V2.** Design detailed in [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md); not collected today. |
| `UTM Medium` | string | e.g. `social`, `cpc`, `referral`, `qr` | **New in V2.** Same as above. |
| `UTM Campaign` | string | e.g. `launch-2026`, `business-card` | **New in V2.** Same as above. |
| `Status` | enum | One of the 11 pipeline stages above, or `LOST`/`DISQUALIFIED` | Replaces V1's static `"Nouveau"` with an actual, updatable pipeline value |
| `Estimated Value` | number (currency) | Rachid's estimate of the deal's value once qualified | **New in V2.** Not collected today. |
| `Last Contact` | date | Date of the most recent interaction | **New in V2.** Not collected today. |
| `Next Action` | string | What Rachid needs to do next (e.g. "Send proposal", "Follow up call") | **New in V2.** Not collected today. |
| `Follow-up Date` | date | When the next action is due | Same *field name* as V1 `followUpDate`, but V1 never actually populates it — always `""` |
| `Notes` | text | Free-form notes accumulated over the relationship | Same *field name* as V1 `notes`, but V1 never actually populates it — always `""` |

## 5. Migration Plan

This section exists so that a future migration has a low-risk path already thought through. **None of these steps are to be executed as part of this documentation task.**

1. **Confirm the live V1 sheet schema.** Before writing a single line of migration code, open the actual Google Sheet and Make.com scenario and confirm the real column layout matches what's assumed in Section 2. This document only had visibility into the JSON payload shape, not the sheet itself.
2. **Additive first.** Add the new V2 columns (`Country`, `UTM Source`, `UTM Medium`, `UTM Campaign`, `Estimated Value`, `Last Contact`, `Next Action`) to the *existing* V1 sheet as new, empty columns, appended to the right of the current ones. Existing Make.com column mapping (by column position or name, whichever the scenario currently uses) must be verified to keep pointing at the correct existing columns — appending new columns should not require remapping old ones, but this must be checked, not assumed.
3. **Extend the payload, don't replace it.** `lead-automation.mts` would gain new *optional* fields on `NormalizedLead` (e.g. `country`, `utmSource`, `utmMedium`, `utmCampaign`) that default to empty string when absent, exactly the way `followUpDate` and `notes` already do today. Existing fields keep their exact names and types so the current Make.com mapping keeps working unmodified during the transition.
4. **Expand `Status` values without breaking existing automations.** If anything downstream (Gmail template, Make.com filter/router) currently checks for the literal string `"Nouveau"`, that logic must be identified and updated in the same change that introduces the new status vocabulary — otherwise notifications could silently stop firing for new leads.
5. **Backfill strategy for existing rows.** Existing V1 rows keep `status = "Nouveau"` (or whatever V1's literal value is) unless Rachid manually reclassifies them into the new pipeline. No automatic reclassification — a script guessing pipeline stage from stale data would produce false confidence. New columns (`Country`, UTM fields, `Estimated Value`, etc.) are simply left blank on historical rows; there is no reliable source to backfill them from.
6. **Parallel-run before cutover.** Run V1 and V2 columns side by side for a period Rachid chooses (e.g. 2–4 weeks) before treating V2 fields as the source of truth, so any mapping bug is caught while V1's original columns still work as a fallback.
7. **Rollback plan.** Because the migration is additive (new columns, new optional payload fields, no removal of existing ones), rollback is simply: stop populating the new fields / ignore the new columns and continue operating exactly as V1 does today. Nothing about this design requires deleting or restructuring existing sheet columns, which is what makes rollback low-risk.
8. **Only after the above is validated:** consider whether pipeline-stage updates should happen manually (Rachid edits the `Status` cell) or via a future lightweight tool. This spec does not recommend building sync automation for status transitions — that is a separate, later decision.

## 6. Approval gate

This document is a design artifact. **Do not implement any part of this schema, migration, or payload change without Rachid's explicit, separate approval**, per the non-negotiables in [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) (§5): no changes to `LEADS_AUTOMATION_WEBHOOK_URL`, the Make.com scenario, or the Google Sheet schema outside of a dedicated, approved migration effort.

## 7. Open questions (for Rachid, not for this pass)

- Where should `Country` actually come from — a new required form field, or inference? Inference adds complexity and accuracy risk; a form field adds friction to the contact form.
- Should `Status` transitions ever be semi-automated (e.g. auto-move to `CONTACTED` when Rachid sends a Gmail reply), or should the sheet stay 100% manually updated to keep the system simple?
- Does Rachid want a real CRM tool (e.g. a lightweight dedicated app or an off-the-shelf CRM) instead of an enhanced Google Sheet once lead volume grows, or is "Google Sheet V2" sufficient indefinitely? This spec assumes the sheet remains the system of record; a tool migration would be a separate, larger design.
