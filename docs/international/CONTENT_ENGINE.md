# Content Engine

Internal strategy document. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts and [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for voice and positioning this content must stay consistent with.

## 1. Purpose

The content engine exists to do one job: make Rachid visible as **the engineer who actually builds things**, not another "AI tips" account. Every piece of content should make a viewer think "this person could build my system," not "this person has opinions about AI."

Rules that apply to all content, regardless of pillar or format:

- Ground every claim in a verified project fact from [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) §4. Never invent metrics, client names, testimonials, revenue, or user counts.
- Gold Fitness is one gym in Martil, Morocco — never "multi-location" or "a chain."
- Mirador Golf is a secure owner registration and meeting-coordination flow — never described as a full property-management platform.
- JARVIS is a personal R&D project, not a sold product. Content shows engineering depth only — never internal architecture details beyond what's already public-safe, no roadmap, no credentials.
- Generic sector content (gyms, clinics, restaurants, agencies, etc. that Rachid has not actually built for) must read as illustrative or conceptual, never as a completed client engagement.
- No fake thought-leadership platitudes ("AI is changing everything," "the future is now"). Replace with a specific technical detail, a specific decision, or a specific trade-off.

## 2. The five content pillars

### Pillar 1 — Build in Public

**What it's for:** Showing the work as it happens — this exact portfolio rebuild, the lead pipeline, the branch-by-branch decisions — so the audience sees a real engineer working, not a finished highlight reel. This pillar builds trust through process transparency.

**Example topics (from verified project facts):**
- Rebuilding this portfolio from a generic freelance site into a positioned B2B system — and why that distinction matters.
- Why the lead pipeline runs on Netlify Forms + a Netlify event function + Make.com instead of a paid CRM.
- The decision to keep the French site at `/fr` instead of adopting a full i18n framework.
- What changed in the hero and header (scroll-linked collapse, floating glass navbar) and why.
- Keeping `LEADS_AUTOMATION_WEBHOOK_URL` and the Make.com scenario untouched while everything around them gets rebuilt — the discipline of not touching stable production infrastructure.
- Working on a dedicated branch (`feat/international-business-v1`) instead of pushing straight to main.

### Pillar 2 — AI Automation

**What it's for:** Demonstrating automation and AI competence through real, running systems first, and clearly-labeled illustrative concepts second. This is proof of the "AI & Business Automation" and "AI Systems Engineering" service pillars from [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md).

**Example topics (from verified project facts):**
- How the portfolio's own contact form becomes a Google Sheets row and a Gmail notification with zero manual steps (Netlify Forms → `lead-automation.mts` → Make.com webhook → Sheets + Gmail).
- Why the automation function no-ops silently instead of throwing when a webhook URL is missing — designing for graceful failure, not silent data loss.
- JARVIS at a high level: an orchestrator that routes a request across multiple LLM providers instead of hard-coding one model (safe public framing only — no internals, no roadmap).
- Two-tier memory in an AI system, conceptually: fast local storage plus a vector store for retrieval, and why that split matters for an assistant that has to remember things.
- A conceptual walkthrough of what a RAG-based internal knowledge assistant could look like for a professional practice (illustrative, not a delivered project).
- What "AI automation" actually means in practice versus what it's marketed as — routing, retrieval, and orchestration, not magic.

### Pillar 3 — Business Transformation

**What it's for:** Speaking to the business owner, not the developer — the operational cost of manual processes, and what changes when a workflow gets systematized. This pillar sells the outcome, not the code.

**Example topics (from verified project facts and general SME patterns):**
- The real cost of a contact form nobody follows up on — and why "we'll check our email" is a business process, not a system.
- What changes for a single-location business (like a gym) when its entire online presence collapses into one QR code instead of five links to manage.
- Manual meeting coordination by phone and email versus a structured registration flow with defined steps — the Mirador Golf pattern, described at the process level, not the client level.
- Why so many SMEs in 2026 still run core operations — bookings, intake, follow-up — through spreadsheets, shared inboxes, and phone calls.
- The gap between "we have a website" and "we have a system that generates and tracks leads."
- Illustrative scenarios (clearly framed as conceptual, not delivered work) for what automation could look like in gyms, real estate offices, restaurants, clinics, professional practices, consultancies, agencies, hospitality businesses, and e-commerce shops.

### Pillar 4 — Software Engineering

**What it's for:** Proving technical depth to a more technical audience (and to business owners who ask a technical friend to vet Rachid). This is where the real architecture gets discussed.

**Example topics (from verified project facts):**
- Why the attestations app splits into a React/Vite/Chakra UI frontend and a separate Laravel 12 (PHP 8.2) API instead of one monolith.
- Sanctum/JWT authentication choices and what they protect against.
- Generating PDFs server-side with DOMPDF instead of client-side — and why that decision matters for a document-issuing system.
- Running the same app in Docker locally and in CI, with GitHub Actions testing and building the image on every push to main.
- HMAC-signed access codes verified server-side and never compared in plaintext — the Mirador Golf authentication pattern, described as a general technique.
- Supabase Postgres with Row Level Security and Edge Functions as the only write path — no direct client access to the database — as a general pattern for securing multi-tenant data.
- The difference between a working prototype and a production system: tests, CI/CD, environment separation, and graceful failure handling.

### Pillar 5 — Case Studies / Before-After

**What it's for:** Grounded, specific before/after narratives from Rachid's own verified projects. This pillar carries the most credibility because every claim is checkable against real code.

**Example topics (from verified project facts):**
- Gold Fitness before/after: before, a gym with a phone number, a WhatsApp, an Instagram, and a Maps pin that a customer had to hunt for separately; after, one QR code on a physical card opening a single mobile-first page with call, WhatsApp, location, Instagram, and a video gallery.
- Mirador Golf before/after: before, owner meetings coordinated ad hoc; after, a secure registration flow where owners authenticate with a signed access code and submit contact details, availability, and topics through a multi-step form, with all writes going through Edge Functions.
- Portfolio lead automation before/after: before, a contact form is a dead end until someone checks an inbox; after, every submission becomes a tracked row in Google Sheets and an instant Gmail notification, automatically.
- Attestations app before/after: before, certificate/document issuance is a manual, ad hoc process; after, a full-stack app with authenticated roles, server-generated PDFs, and a CI/CD pipeline that tests and builds on every push.

## 3. Canonical short-form video structure

Use this structure for every short-form video (Reels, TikTok, Shorts) regardless of pillar. It is optimized for a viewer who decides whether to keep watching in the first two seconds.

| Segment | Time | Purpose |
|---|---|---|
| **Hook** | 0–2s | One sentence or visual that states the problem or the surprising result. No intro, no logo, no "hey guys." |
| **Problem** | 2–7s | Make the pain concrete — what was broken, slow, or manual before. |
| **Demo / Solution** | 7–20s | Show the actual system working — screen recording, code, or the real flow (QR scan, form submit, Sheet updating, etc.). This is the proof section. |
| **Result** | 20–30s | State the concrete outcome in plain terms — what changed, in verified language only (no invented numbers). |
| **Final CTA** | last 1–2s / on-screen text | One clear next step (see CTA list below). |

Keep total runtime tight — most pieces should land under 30–45 seconds. Longer breakdowns (technical deep dives) can run longer but should still open with the same Hook → Problem structure before slowing down.

## 4. CTA examples

Use short, low-pressure CTAs — never a hard sell. Rotate across these (or close variants that match the tone):

- "I build systems like this for businesses."
- "Need something similar for your business?"
- "Want to automate this in your company?"
- "Let's build it."

Pair the spoken/on-screen CTA with a low-friction next step (comment a keyword, DM, or visit the portfolio) rather than a direct pitch in the video itself.

## 5. Posting cadence guidance

Cadence should ramp gradually rather than starting at full volume, in line with the project's 90-day build-out:

- **Weeks 1–2 (setup):** focus on establishing formats and pillars rather than volume. A small, consistent number of posts across platforms is enough while templates, hooks, and editing workflow get established.
- **Weeks 3–6 (ramp):** increase frequency as the format that works becomes clearer. Aim toward the low end of a sustainable short-form range rather than forcing daily output before the workflow supports it.
- **Weeks 7–12 and ongoing (steady state):** once cadence is established, **aim for roughly 3–5 short-form pieces per week**, supplemented by 1–2 long-form posts per week (LinkedIn posts, written breakdowns). Consistency over a 90-day window matters more than any single week's volume.
- Prioritize quality and factual accuracy over hitting a number — a pause to verify a claim beats publishing something that overstates a case study.
- Reuse across pillars: a single real event (e.g., shipping a feature) can generate a Build in Public short, a Software Engineering breakdown, and a LinkedIn post without duplicating effort.
