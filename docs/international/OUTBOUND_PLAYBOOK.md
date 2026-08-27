# Outbound Playbook

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts, [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for positioning, and [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) for pricing this document must stay consistent with. Message copy lives in [templates/FOLLOW_UP_MESSAGES.md](./templates/FOLLOW_UP_MESSAGES.md) — this document defines who to target, how to qualify them, and when to follow up.

## 1. Purpose

Define who Rachid prospects, how a lead is qualified before any message is sent, and the cadence for following up. This is the targeting and process layer for outbound prospecting; it does not contain outreach copy.

## 2. Primary target sectors

Listed in priority order, based on where Rachid has direct, verifiable project experience or where the four service pillars map cleanly onto common, recognizable pain points.

1. **Gyms / fitness studios** — Rachid has direct experience here via **Gold Fitness** (Martil, Morocco): a mobile-first single-page site reached via a QR code on a physical card, linking directly to call, WhatsApp, Google Maps, Instagram, and a video gallery. This is a real, verifiable reference point for this sector — a single-location gym, not a multi-location chain. Do not overstate it as a multi-location case study.
2. **Real estate**
3. **Property management / residence management** — Rachid has direct experience here via **Mirador Golf**: a secure owner registration and meeting-coordination system built on Supabase (Postgres with Row Level Security, HMAC-signed access codes, Edge Functions for all writes). Describe it as "secure owner registration & meeting-coordination system," not as a full property-management platform (no billing or maintenance-ticket features were built).
4. **Restaurants**
5. **Clinics / healthcare practices**
6. **Professional practices** (law, accounting, notaries, architects, consultants)
7. **Consultants and agencies**
8. **Hospitality** (hotels, riads, guesthouses, short-term rental operators)
9. **SMEs** (general small/medium businesses without a dedicated web presence or with an outdated one)
10. **E-commerce** (small to mid-size stores needing better conversion flow or backend automation)

When referencing past work in outbound messages or calls, only cite Gold Fitness and Mirador Golf using the framing above. Never claim sector experience Rachid does not have (e.g. do not claim "restaurant clients" or "clinic clients" unless and until real ones exist).

## 3. Ideal customer profile (ICP)

A strong prospect matches most of the following:

- **Business type:** owner-operated or small-team business in one of the sectors above, with a physical location or a locally-bound service area (or a small e-commerce operation with real order volume).
- **Web presence:** has *some* web presence already (so the gap is visible and comparable) — a website, a Google Business Profile, or an Instagram/Facebook page used as a de facto storefront. Businesses with zero online presence are lower priority; there is no visible gap to point to.
- **Decision maker is reachable directly:** owner, founder, managing partner, or office/practice manager — not a large organization with a procurement layer.
- **Visible transaction or inquiry flow:** the business takes bookings, reservations, appointments, leads, or orders online or by phone — meaning a broken or manual flow has a direct, easy-to-explain cost (missed bookings, slow replies, lost leads).
- **Credible budget signal:** business appears active and operating (recent posts, real reviews, physical premises, multiple staff) — not a dormant listing.

## 4. Qualification criteria (before outreach)

Before Rachid spends time personalizing a message, a prospect should clear this checklist:

- [ ] Business is active (recent Google reviews, recent social posts, or a currently-operating location).
- [ ] Business has a public website, Google Business Profile, or Instagram/Facebook page to inspect.
- [ ] At least one **website signal** (Section 6) or **automation-opportunity signal** (Section 7) is present.
- [ ] A named decision-maker (owner, manager, partner) can be identified or reasonably inferred.
- [ ] The business's sector and apparent scale roughly map to one of the four pillars in [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) — i.e., a project here would realistically fall inside a productized offer or a scoped custom quote, not a project too small or too large to be worth proposing.
- [ ] No conflict of interest or existing relationship that would make cold outreach inappropriate.

If fewer than 4 of the 6 boxes are checked, deprioritize the lead rather than sending a generic message.

## 5. Target job titles

- Owner / Founder / Co-Founder
- Managing Director / General Manager
- Practice Manager / Office Manager (clinics, professional practices)
- Marketing Manager / Marketing Coordinator (agencies, hospitality, larger SMEs)
- Operations Manager (property management, hospitality)
- Franchise Owner / Location Manager (multi-location retail or fitness, approached per-location)

Avoid large-company roles with no direct budget authority (e.g. "Digital Marketing Executive" at a 500-person company) — these are outside the ICP defined above.

## 6. Target business size

- **Sweet spot:** 1–20 employees, one to a small handful of locations, owner or small leadership team makes purchasing decisions directly.
- **Upper bound:** small chains (2–5 locations) where a single decision-maker can still approve a project without a formal procurement process.
- **Below the floor:** solo freelancers or micro-businesses with no discretionary budget for a paid website/automation project (evaluate case by case — some solo professionals, e.g. consultants or clinicians, do have budget).
- **Above the ceiling:** enterprises, franchises with centralized IT/marketing departments, or any business where the buying process requires RFPs, procurement portals, or multi-stakeholder sign-off. These require a different (longer, more formal) sales motion not covered by this playbook.

## 7. Pain signals

Signals visible from the outside, before ever speaking to the business, that suggest genuine pain (not just a generic pitch target):

- Phone number or WhatsApp listed as the *only* way to book/contact — no online form, no booking widget.
- Reviews or comments mentioning slow replies, missed bookings, or "call us" friction.
- Business posts on Instagram/Facebook but the bio link goes nowhere useful (dead link, generic Linktree, or no link at all).
- Opening hours or availability information is inconsistent across Google, Instagram, and the website (signals manual, unsynced updates).
- Visible reliance on manual tools (a Google Form for bookings, a plain "email us" mailto link for reservations, a PDF menu/price list instead of a page).
- Recent negative reviews specifically about communication, responsiveness, or booking friction — a strong, specific pain signal to reference (carefully and respectfully) in outreach.

## 8. Website signals

Concrete, checkable signals on the business's website (or lack thereof) that indicate a project opportunity:

- **No mobile optimization** — site is not responsive, text/buttons are hard to use on a phone, horizontal scrolling required.
- **No clear CTA** — homepage does not make it obvious how to book, contact, or buy within a few seconds.
- **Manual-looking contact flow** — a bare `mailto:` link, a contact form with no confirmation step, or a phone number as the only option.
- **Outdated design** — dated visual style, broken layout, unmaintained plugin-based site (obviously old WordPress/Wix template), or a site that still references old branding/pricing.
- **Slow load or broken pages** — visibly slow load, broken images, dead links, expired SSL certificate warnings.
- **No booking/reservation system** — restaurants/clinics/gyms that require a phone call or DM to book, with no online scheduling.
- **No analytics or tracking evidence** — not directly visible, but combined with other signals suggests the business has no visibility into what happens after a visitor lands.
- **No website at all** — only a Google Business Profile or Instagram page serves as the "site." This is a valid target for the Launch Website offer, but confirm there is enough business activity to justify the investment first.

## 9. Automation-opportunity signals

Signals suggesting the **AI & Business Automation** pillar is the stronger entry point, independent of website quality:

- Business clearly handles inbound leads/bookings manually (replies to every DM/comment individually, no visible auto-reply or structured intake).
- Multiple disconnected tools visible (e.g. Instagram DMs + a separate booking app + a paper/whiteboard schedule) with no evidence they talk to each other.
- Business owner is visibly the one doing customer-facing admin work in public posts/stories (a strong proxy for "too busy doing outreach/replies personally").
- Repeated public complaints about slow follow-up (e.g. "sorry for the late reply" patterns in review responses).
- Business already uses one automation building block (e.g. a Calendly link, a WhatsApp Business auto-reply) but stops there — showing willingness to adopt tools, with an incomplete system.
- Growing business (visible expansion, new locations, hiring posts) where manual processes are likely to break down soon — a good, low-pressure reason to reach out proactively.

## 10. Personalized outreach method

Never send a generic message. For every prospect that passes qualification:

1. **Inspect the specific business** — visit the website, Google Business Profile, and main social profile. Note one to three concrete, specific observations (not generic industry statements).
2. **Pick the single clearest signal** from Sections 7–9 as the anchor for the message — the one most visibly true and easiest for the recipient to verify themselves in ten seconds.
3. **Write the message using the OBSERVATION → PROBLEM → IDEA → LOW-FRICTION CTA structure** (see [templates/FOLLOW_UP_MESSAGES.md](./templates/FOLLOW_UP_MESSAGES.md) for full templates and examples). Never open with "Hello, I am a web developer" or an equivalent generic self-introduction.
4. **Choose the channel that matches how the business already communicates:**
   - Business is active on Instagram → Instagram DM.
   - Business lists a professional email and has a formal website → cold email.
   - Business or decision-maker has an active, reachable LinkedIn profile (agencies, consultants, professional practices) → LinkedIn DM.
   - Local, WhatsApp-forward market (common in Morocco and parts of French-speaking Africa/Europe) → WhatsApp, using the same OBSERVATION → PROBLEM → IDEA → LOW-FRICTION CTA structure adapted to a short, informal register.
5. **Keep the first message short.** The goal of message one is a reply or a "yes, show me," not a full pitch or price.
6. **Offer a low-friction next step** — a short recorded review, a two-minute call, or a specific idea in writing — never "let's hop on a call to discuss synergies" as an opener.

## 11. Follow-up cadence

Applies per prospect, per channel, starting from Day 0 (first message sent). Stop the cadence immediately if the prospect replies, asks to stop, or explicitly declines.

| Day | Step | Purpose |
|---|---|---|
| Day 0 | Initial outreach message | Observation → problem → idea → low-friction CTA (see Section 10). |
| Day 3 | Follow-up #1 | Light, no-pressure bump — add one small piece of new value (e.g. a specific example) rather than just "just checking in." |
| Day 7 | Follow-up #2 | Reframe with a slightly different angle or a more concrete offer (e.g. attach the 2-minute review if not already sent). |
| Day 14 | Final follow-up ("after-no-response") | Last touch for this cycle — low-pressure, leaves the door open, signals this is the last message unless they reply. |
| — | No reply after Day 14 | Move to long-term nurture: re-approach only if a relevant trigger appears (e.g. business posts about a new location, a website redesign attempt, a hiring push) — not on a fixed timer. |

Additional cadence rules:

- Maximum of 4 touches per prospect per outreach cycle (Day 0, 3, 7, 14). Do not exceed this without a new, genuine reason to reach out (a trigger event, not persistence alone).
- If a prospect responds positively at any point, exit the cadence and move immediately into the [SALES_PLAYBOOK.md](./SALES_PLAYBOOK.md) pipeline at CONTACTED or MEETING as appropriate.
- If a prospect explicitly declines or asks not to be contacted, stop all outreach permanently for that contact.
- Vary the channel across follow-ups when possible (e.g. Day 0 email, Day 7 LinkedIn) rather than repeating the same channel four times, if the prospect is reachable on more than one.

## 12. Handoff to sales pipeline

The moment a prospect replies with interest, availability for a call, or a question about the idea raised, outbound prospecting ends and the lead moves into the sales pipeline defined in [SALES_PLAYBOOK.md](./SALES_PLAYBOOK.md), starting at **CONTACTED** (or **MEETING** if a call is booked directly from the first reply).
