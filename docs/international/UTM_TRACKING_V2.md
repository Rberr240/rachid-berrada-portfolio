# UTM & Acquisition Tracking V2 (Future Design — Not Built)

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts this document must stay consistent with.

> **Status: design-only.** This document describes a possible future schema for tracking where leads come from. **Do not alter the production lead payload, the Netlify function, the Make.com mapping, or the Google Sheet schema as part of this document.** Everything below is a proposal gated behind Rachid's explicit future approval — see [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) §6 (Approval gate) and §5 (Migration Plan), which this design would follow if and when it's built.

## 1. Why this matters

Today, every lead in the pipeline is tagged `source: "Portfolio"` regardless of whether the visitor arrived from an Instagram bio link, a cold outreach message, a business card QR code, or a Google search. Once Rachid is running content across multiple platforms plus outbound plus a physical business card (see [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md), [BUSINESS_CARD_SPEC.md](./BUSINESS_CARD_SPEC.md)), that single hardcoded value stops being useful — the KPI scorecard's "lead source" metric (see [KPI_SCORECARD.md](./KPI_SCORECARD.md)) can't be filled in accurately without real acquisition data attached to each lead.

This document defines the tracking vocabulary now, so it's ready to reference whenever channel attribution is actually built.

## 2. Standard UTM parameters

Standard Google Analytics-style UTM parameters, read from the URL query string when a visitor lands on the site:

| Parameter | Purpose | Example values |
|---|---|---|
| `utm_source` | The platform or origin | `instagram`, `tiktok`, `linkedin`, `google`, `business_card`, `email` |
| `utm_medium` | The channel type | `social`, `paid`, `organic`, `referral`, `qr`, `outreach`, `email` |
| `utm_campaign` | The specific initiative | `launch-2026`, `business-card-v1`, `linkedin-post-004`, `outbound-batch-03` |
| `utm_content` | Distinguishes between variants within the same campaign | `bio-link`, `story-swipe-up`, `dm-template-a`, `carousel-slide-3` |
| `utm_term` | Reserved mainly for paid search keyword tracking, if Rachid ever runs paid ads | `web-developer-morocco` (illustrative only — no paid campaigns exist today) |

## 3. Additional context fields (non-standard, still useful)

| Field | Purpose |
|---|---|
| `landing_path` | The page path the visitor first landed on (e.g. `/`, `/fr`, `/realisations/gold-fitness`). Useful even without any UTM params, e.g. for direct traffic or a QR code that points at a specific case-study page. |
| `referrer` | The browser's `document.referrer` value, when present. Distinguishes "someone clicked a link on LinkedIn" from "someone typed the URL directly," even for visitors who didn't arrive via a tagged link. |

## 4. Source taxonomy — what this is meant to distinguish

The mission asks this schema to be able to tell apart the following acquisition channels. Suggested `utm_source` / `utm_medium` pairs for each (illustrative — final campaign names are Rachid's call at the time each link is created):

| Channel | Suggested `utm_source` | Suggested `utm_medium` |
|---|---|---|
| Instagram (bio link, story, DM) | `instagram` | `social` (or `dm` for direct messages specifically) |
| TikTok (bio link, video caption) | `tiktok` | `social` |
| LinkedIn (post, profile link, DM) | `linkedin` | `social` (or `dm`) |
| Google (organic search) | `google` | `organic` |
| Google (paid, if ever run) | `google` | `cpc` |
| Business card / QR code | `business_card` (canonical value — matches [BUSINESS_CARD_SPEC.md](./BUSINESS_CARD_SPEC.md), the mission's own literal example) | `qr` |
| Direct (typed URL, no link) | *(no UTM present — see §5 fallback)* | — |
| Outbound (cold email, cold DM, manual prospecting) | `outbound` | `email` or `dm`, depending on channel used |
| Referral (another person sends a link) | `referral` | `referral` |

Where a specific platform distinguishes further (e.g. Instagram Stories vs. Instagram bio link), that distinction belongs in `utm_content`, not in `utm_source`/`utm_medium`, so the high-level channel rollup (e.g. "how many leads came from Instagram total") stays simple to compute.

## 5. How this would conceptually attach to the existing lead payload (design only)

This is a description of the intended mechanism, not an instruction to build it now:

1. **Capture client-side, on landing.** When a visitor lands on the site, client-side code would read `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from the URL query string, plus `landing_path` (the current path) and `referrer` (`document.referrer`).
2. **Persist for the session.** Because a visitor may land on the homepage and only fill out the contact form several page views later, the captured values would need to survive navigation — e.g. stored in `sessionStorage` (or a first-party cookie) at landing time, not re-read only at submit time.
3. **Fallback when absent.** If no UTM params are present (a bookmarked link, a typed URL, or a link someone forwarded without tags), all UTM fields would simply be empty — that itself is meaningful signal ("direct" traffic) and should not be guessed or defaulted to something invented.
4. **Attach as additional, optional fields on submit.** When `ProjectForm.tsx` submits, the captured values would ride along as additional form fields (e.g. hidden inputs alongside the existing `name`, `email`, `message`, etc.), the same pattern the form already uses for `form-name` and `bot-field`.
5. **Extend the payload additively.** `lead-automation.mts`'s `buildLeadPayload()` would gain new optional fields (`utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`, `landingPath`, `referrer`), defaulting to empty string when not present — the same pattern `followUpDate` and `notes` already use. This mirrors the additive approach described in [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) §5 (Migration Plan): existing fields and existing Make.com mapping are untouched; new fields are appended.
6. **Sheet columns are additive too.** New Google Sheet columns for the UTM fields would be appended to the right of the existing ones, following the same migration discipline as the rest of CRM V2 — not built or added in this pass.

## 6. Explicit non-goals for this document

- No code is written or modified as part of this document. No changes to `ProjectForm.tsx`, `lead-automation.mts`, the Netlify Forms detection file, the Make.com scenario, or the Google Sheet.
- No UTM links are generated or published yet — that would only make sense once the capture mechanism above actually exists.
- No third-party analytics/attribution tool is proposed here. This is about first-party UTM capture tied to the existing lead form, distinct from [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)'s GA4/Search Console setup (GA4 will independently see UTM parameters in its own reports regardless of whether this schema is ever wired into the lead payload).

## 7. Approval gate

Same gate as [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) §6: this is a design only. Implementation — client-side capture code, payload changes, sheet columns, or Make.com mapping changes — requires Rachid's explicit, separate approval and should follow the migration discipline in CRM_V2_SPEC.md §5 when it happens.
