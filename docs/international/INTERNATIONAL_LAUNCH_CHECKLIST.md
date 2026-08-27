# International Launch Checklist

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for the document map and canonical facts this checklist must stay consistent with.

> This is a consolidated go/no-go checklist. It doesn't replace the detail documents it references — check each item against its source document, don't just tick boxes from memory. Nothing here should be treated as already done; every box starts unchecked until verified.

## Brand & positioning

- [ ] Positioning statement, commercial promise, and differentiator locked as final (see [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) §1)
- [ ] Voice/tone guidelines reviewed and applied consistently across site copy, content, and templates (BRAND_SYSTEM.md §2)
- [ ] Visual identity unchanged from the existing premium/technical direction — no redesign, only refinement (BRAND_SYSTEM.md §3)
- [ ] Target markets and language mix confirmed (BRAND_SYSTEM.md §5)

## Offers

- [ ] Four service pillars finalized and consistent across site, proposals, and content (see [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) §1)
- [ ] Public pricing framing applied correctly — "Starting from" only on Launch Website / Business Website Pro, "Request a quote" everywhere else (OFFERS_AND_PRICING.md §2–3)
- [ ] No internal reference price ranges published verbatim on public-facing pages

## Portfolio internationalization

- [ ] English-first public site experience live at `/`, French preserved and reachable (BRAND_SYSTEM.md §5)
- [ ] Case studies match verified facts only — Gold Fitness described as a single location, Mirador Golf described as registration/meeting-coordination (not full property management), no fabricated scale (MASTER_BLUEPRINT.md §4)
- [ ] No fabricated testimonials — testimonials section stays empty/hidden until real ones exist (MASTER_BLUEPRINT.md §3)
- [ ] No invented domain, location, or LinkedIn URL anywhere in copy (MASTER_BLUEPRINT.md §3)

## Social profiles

- [ ] Instagram created and configured
- [ ] TikTok created and configured
- [ ] LinkedIn created and configured
- [ ] YouTube created and configured
- [ ] X created and configured, if Rachid chooses to use it (optional)
- [ ] Handle, display name, bio, and profile link consistent across all created platforms — see [MANUAL_ACTIONS.md](./MANUAL_ACTIONS.md) for exact per-platform instructions

## Content readiness

- [ ] First content batch drafted and ready to publish (see [CONTENT_ENGINE.md](./CONTENT_ENGINE.md), [content/SHORTS_001_030.md](./content/SHORTS_001_030.md), [content/CONTENT_IDEA_BANK_100.md](./content/CONTENT_IDEA_BANK_100.md), [content/LINKEDIN_POSTS_001_010.md](./content/LINKEDIN_POSTS_001_010.md))
- [ ] Publishing cadence for the first 30 days decided and realistic given Rachid's actual available time

## Outbound readiness

- [ ] Target prospect criteria defined (industry, geography, company size) per [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md)
- [ ] First outbound message sequences drafted and reviewed
- [ ] Follow-up message templates ready ([templates/FOLLOW_UP_MESSAGES.md](./templates/FOLLOW_UP_MESSAGES.md))

## CRM & analytics readiness

- [ ] Current lead pipeline (Netlify Forms → `lead-automation.mts` → Make.com → Google Sheets → Gmail) confirmed intact and unmodified — see Contact Pipeline Regression Check below
- [ ] CRM V2 and UTM V2 designs reviewed as reference material only — explicitly **not** implemented without separate approval ([CRM_V2_SPEC.md](./CRM_V2_SPEC.md), [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md))
- [ ] Google Analytics 4 property created and Measurement ID set in Netlify env vars, if Rachid has chosen to enable analytics ([ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) §2–3)
- [ ] Google Search Console property added and verified, if Rachid has chosen to enable it (ANALYTICS_SETUP.md §5–6)
- [ ] Weekly KPI scorecard set up and ready to start logging ([KPI_SCORECARD.md](./KPI_SCORECARD.md) §4)

## QA

- [ ] Site QA passed on both `/` (English) and `/fr` (French) — links, forms, responsive layout, no console errors
- [ ] All public copy checked against MASTER_BLUEPRINT.md §3 canonical facts (no invented email, phone, domain, testimonials, or location)
- [ ] No secrets, webhook URLs, API keys, or credentials committed anywhere in the repo (MASTER_BLUEPRINT.md §5)

## Contact pipeline regression check

- [ ] `ProjectForm.tsx` still submits via `fetch("/netlify-forms/contact.html", …)` with `form-name: "contact"`
- [ ] `public/netlify-forms/contact.html` still exists, form name `contact`, honeypot field `bot-field`, fields matching `ProjectForm.tsx` exactly
- [ ] `netlify/functions/lead-automation.mts` still reads `LEADS_AUTOMATION_WEBHOOK_URL` from the environment, still no-ops safely with a log line when unset, still never throws back into the Netlify submission path
- [ ] A real test submission (or a code-level review of the above three points) confirms the pipeline is unbroken before merging any branch that touches the contact form, the Netlify function, or the site's form-handling pages
- [ ] No webhook URL or secret has been introduced into the repository

## Final gate

- [ ] All sections above reviewed together as a single go/no-go before merging `feat/international-business-v1` (or successor branch) to `main` — per MASTER_BLUEPRINT.md §5, no merge to `main` without explicit approval
