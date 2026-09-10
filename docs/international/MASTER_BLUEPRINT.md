# Rachid Berrada — International Business System V1

Internal strategy document. Not for public publication.

This is the index and executive summary for the international business transformation of Rachid Berrada's technical portfolio into a client acquisition and sales system. Every other document in `docs/international/` is a detail layer under one of the sections below.

## 1. What this is

Rachid Berrada's portfolio (`rachid-berrada-portfolio`, deployed at `https://rachid-berrada-portfolio.netlify.app`) is being repositioned from a generic freelance-developer site into an international B2B system: brand, offers, proof, content, outbound, sales process, and the technical readiness (SEO, analytics, tracking) needed to run it.

**What is explicitly out of scope for this pass:** rebuilding the lead pipeline, replacing Make/Sheets/Gmail, or touching the CRM/UTM schema in production. That pipeline (`ProjectForm.tsx` → `/netlify-forms/contact.html` → Netlify Forms → `lead-automation.mts` → `LEADS_AUTOMATION_WEBHOOK_URL` → Make.com → Google Sheets + Gmail) is stable production infrastructure. See [Contact Pipeline Regression Check](#appendix-a-contact-pipeline-baseline) below for the verified baseline.

## 2. Document map

| Area | File |
|---|---|
| Brand & positioning | [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) |
| Services & pricing | [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) |
| Social profiles | [SOCIAL_BRAND_PACK.md](./SOCIAL_BRAND_PACK.md) |
| Content strategy | [CONTENT_ENGINE.md](./CONTENT_ENGINE.md) |
| Video scripts (30) | [content/SHORTS_001_030.md](./content/SHORTS_001_030.md) |
| Content ideas (100) | [content/CONTENT_IDEA_BANK_100.md](./content/CONTENT_IDEA_BANK_100.md) |
| LinkedIn posts (10) | [content/LINKEDIN_POSTS_001_010.md](./content/LINKEDIN_POSTS_001_010.md) |
| Outbound prospecting | [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md) |
| Sales process | [SALES_PLAYBOOK.md](./SALES_PLAYBOOK.md) |
| Proposal templates | [templates/PROJECT_PROPOSAL_TEMPLATE.md](./templates/PROJECT_PROPOSAL_TEMPLATE.md), [FR version](./templates/PROJECT_PROPOSAL_TEMPLATE_FR.md) |
| Discovery call | [templates/DISCOVERY_CALL.md](./templates/DISCOVERY_CALL.md) |
| Follow-up messages | [templates/FOLLOW_UP_MESSAGES.md](./templates/FOLLOW_UP_MESSAGES.md) |
| Testimonial request | [templates/TESTIMONIAL_REQUEST.md](./templates/TESTIMONIAL_REQUEST.md) |
| CRM V2 design (future, not built) | [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) |
| UTM tracking design (future, not built) | [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md) |
| Analytics setup | [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) |
| Business card / QR | [BUSINESS_CARD_SPEC.md](./BUSINESS_CARD_SPEC.md) |
| Domain & handles | [DOMAIN_AND_HANDLES.md](./DOMAIN_AND_HANDLES.md) |
| KPIs | [KPI_SCORECARD.md](./KPI_SCORECARD.md) |
| 90-day roadmap | [90_DAY_ROADMAP.md](./90_DAY_ROADMAP.md) |
| Launch checklist | [INTERNATIONAL_LAUNCH_CHECKLIST.md](./INTERNATIONAL_LAUNCH_CHECKLIST.md) |
| Manual actions (accounts, domains, analytics) | [MANUAL_ACTIONS.md](./MANUAL_ACTIONS.md) |

## 3. Canonical facts (single source of truth)

Every document and every piece of public copy must stay consistent with this table. If a document disagrees with this table, this table wins.

- **Name:** Rachid Berrada
- **Primary title:** AI & Digital Solutions Engineer
- **Positioning statement:** "I design and build intelligent digital systems, AI automations and custom software for businesses."
- **Commercial promise:** "I help businesses automate operations, improve customer experience and build smarter digital products."
- **Differentiator line:** "I don't just build interfaces. I build complete systems."
- **Public contact email:** rachid.berrada20@gmail.com (from `src/data/profile.ts`)
- **WhatsApp / phone:** +212 6 48 55 22 22 (configurable via `NEXT_PUBLIC_WHATSAPP_NUMBER`)
- **GitHub:** https://github.com/Rberr240
- **LinkedIn:** not yet published — do not invent a URL (`socialLinks` has it disabled in `profile.ts`)
- **Location:** intentionally blank in `profile.ts` pending confirmation — do not invent a city
- **Domain:** not yet confirmed. Site currently resolves via `NEXT_PUBLIC_SITE_URL`; falls back to `localhost` when unset. Do not invent a custom domain in copy or code.
- **Testimonials:** none collected yet (`testimonials` array is empty in `profile.ts`). Never fabricate one.

## 4. Case studies — verified facts only

The mission brief's own case-study suggestions are directional, not verified. Where they conflict with what is actually in `src/data/profile.ts` and the linked repositories, the verified facts below take precedence, per the standing rule to never fabricate scale or capability.

- **Gold Fitness** — one gym, in Martil, Morocco. Mobile-first single-page site (HTML/CSS/JS, GitHub Pages), designed to be reached by scanning a QR code on a physical card: it opens directly to call, WhatsApp, Google Maps location, Instagram, and a video gallery of the gym. A second repo (`gold-fitness-qr`) exists only as the QR redirect target. **This is one location, not multiple** — the mission brief's "multi-location fitness business" framing is not supported by the codebase and must not be used publicly unless Rachid confirms otherwise.
- **Mirador Golf (residence)** — a secure owner registration and meeting-coordination flow, not a full property-management platform. Owners authenticate with a unique access code (HMAC-signed, verified server-side, never compared in plaintext), then submit contact details, meeting availability, and proposed topics through a multi-step form. Data lives in Supabase Postgres with Row Level Security; all writes go through dedicated Edge Functions — no direct client access to the database. Public framing should say "secure owner registration & meeting-coordination system," not imply broader property-management features (billing, maintenance tickets, etc.) that were not built.
- **Portfolio lead automation** — real, running in production today: Netlify Forms → `lead-automation.mts` (Netlify event function) → Make.com webhook → Google Sheets + Gmail notification. This is the strongest public automation case study because it is Rachid's own system and fully verifiable.
- **Gestion des attestations** — full-stack app: React/Vite/Chakra UI frontend, Laravel 12 (PHP 8.2) backend with Sanctum/JWT auth, PDF generation (DOMPDF), Dockerized, with GitHub Actions CI/CD running tests and building the image on every push to main.
- **JARVIS** — personal AI R&D project, not a sold product. LangGraph-based orchestrator routing across multiple LLM providers (Anthropic, Google Gemini, Groq, OpenAI), two-tier memory (SQLite + Qdrant vector store for RAG), independent voice pipeline (wake word, Whisper transcription, TTS) and vision pipeline (screen capture, OCR, image analysis), plus a permissions/security portal. Codebase is frozen as a stable base while the next iteration is developed privately. Public content should show engineering depth only — no internal architecture, roadmap, or credentials.

## 5. Non-negotiables (carried from the mission brief)

- No force push, no history rewrite, no rebase/amend of published commits.
- No secrets, webhook URLs, API keys, or credentials committed or printed.
- No changes to `LEADS_AUTOMATION_WEBHOOK_URL`, the Make.com scenario, or the Google Sheet schema in this pass — see [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) for the migration-gated design.
- No fabricated clients, metrics, testimonials, certifications, partnerships, or awards.
- No invented domains or "available" social handles — verify manually (see [MANUAL_ACTIONS.md](./MANUAL_ACTIONS.md)).
- Work stays on `feat/international-business-v1` until it passes QA and manual review. No merge to `main` without explicit approval.

## Appendix A: Contact pipeline baseline (verified at mission start)

Verified on `2026-08-26` against branch `main` at commit `92bac60` (== `origin/main`, repo clean):

- `src/components/forms/ProjectForm.tsx` submits via `fetch("/netlify-forms/contact.html", …)` with `form-name: "contact"` — confirmed correct, matches the mission's required endpoint.
- `public/netlify-forms/contact.html` — static Netlify Forms detection file, form name `contact`, honeypot field `bot-field`, fields match `ProjectForm.tsx` exactly. **Its own top-of-file comment is stale** (claims the React form posts to `/`, which was true before commit `92bac60` fixed the endpoint to `/netlify-forms/contact.html`). Tracked as a doc-only correction, not a behavior change.
- `netlify/functions/lead-automation.mts` — `formSubmitted` event function, reads `LEADS_AUTOMATION_WEBHOOK_URL` from the environment, no-ops with a log line if unset, never throws back into the Netlify submission path. Intact.
- No webhook URL or secret found in the repository.
