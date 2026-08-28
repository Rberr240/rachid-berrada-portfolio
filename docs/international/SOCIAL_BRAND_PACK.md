# Social & Brand Pack

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts and [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for voice/positioning — this document must stay consistent with both.

## 1. Ground rules for this document

- **No handle is confirmed available.** Every handle below is a recommendation to check manually on the platform itself before creating an account. Nothing here should be read as "this is free" or "this is registered."
- **No domain is confirmed.** Until a custom domain is purchased and wired up (`NEXT_PUBLIC_SITE_URL` in the codebase), every public link in this pack uses the current production URL: `https://rachid-berrada-portfolio.netlify.app`.
- **No fabricated testimonials, client counts, metrics, or awards** appear anywhere in this pack, per the standing rule in `MASTER_BLUEPRINT.md`.
- **GitHub is the one exception to "not yet created."** The GitHub account already exists and is live in production: `https://github.com/Rberr240` (linked from `src/data/profile.ts` and the deployed site). This pack does not recommend changing it — see the GitHub section below and the open question at the end.
- **LinkedIn has no public URL yet.** `socialLinks` in `profile.ts` has LinkedIn disabled with an empty `href`. Do not invent or publish a LinkedIn URL anywhere until the profile exists and Rachid confirms the link.
- Platform username rules differ (e.g. GitHub usernames cannot contain periods; some platforms disallow leading digits, enforce length minimums, or block characters others allow). Confirm each platform's character rules at signup time — do not assume a handle format that worked on one platform will be accepted on another.

## 2. Recommended handle priority list

Use this list, in order, when checking availability on any given platform (Instagram, TikTok, YouTube, X). Stop at the first one that is actually available on that specific platform — priority order is a starting point, not a requirement to exhaust the whole list everywhere.

1. `@rachidberrada` — to be verified manually, not confirmed available
2. `@rachidberrada.dev` — to be verified manually, not confirmed available
3. `@rachidberrada.ai` — to be verified manually, not confirmed available
4. `@rberrada.dev` — to be verified manually, not confirmed available

Notes:
- Periods are not accepted in every handle format — where a platform rejects `.`, try the same string without it (e.g. `rachidberradadev`) before moving to the next item on the list.
- Keep the **same** final choice across as many platforms as possible for brand consistency; document the actual chosen handle per platform once confirmed (this file currently has none confirmed).

## 3. Platform-by-platform specs

### Instagram
- **Handle:** per priority list above, verify manually.
- **Account type:** Professional/Creator account (enables contact buttons, insights, category label).
- **Category label suggestion:** "Software Company" or "Product/Service" (choose whichever Instagram's own category list offers closest to a technical/software service).
- **Bio:** see Section 4.
- **Link:** `https://rachid-berrada-portfolio.netlify.app` (swap for confirmed domain later; consider a link-in-bio tool only if more than one destination is ever needed — not required today with a single portfolio link).

### TikTok
- **Handle:** per priority list above, verify manually.
- **Account type:** Business/Creator account for analytics access.
- **Bio:** see Section 4 (TikTok bios are shorter — trim to fit TikTok's character limit if needed, keep the CTA line).
- **Link:** same portfolio URL as above (TikTok requires certain follower/verification thresholds for a clickable bio link on some account tiers — confirm current TikTok policy manually before assuming the link will be clickable).

### LinkedIn
- **Profile URL:** none yet — do not invent or publish one. Create the profile first, then confirm the vanity URL (also check availability manually; LinkedIn vanity URLs use plain lowercase, e.g. `linkedin.com/in/rachidberrada`, subject to availability).
- **Headline:** see Section 5.
- **About:** see Sections 6–7 (English + French).
- **Featured section:** link to the portfolio URL once the profile exists.

### GitHub
- **Existing, live account:** `https://github.com/Rberr240` — already referenced in production (`profile.ts`, deployed site footer/nav). This pack does not recommend registering a new GitHub handle or migrating.
- **Bio:** see Section 8.
- **Profile README / pinned repos:** optional future polish, out of scope for this pack — flagged as an open question below.

### YouTube
- **Handle:** per priority list above, verify manually (YouTube handles are the `@name` shown under the channel, separate from the channel's display name).
- **Channel display name suggestion:** "Rachid Berrada" (matches canonical name; keep simple, no subtitle appended to the channel name itself — put positioning in the channel description instead).
- **Channel description:** reuse the LinkedIn About (English) copy from Section 6, or a shortened version of it — do not draft a separate narrative that could drift out of sync.
- **Status:** no channel exists yet per anything in this repo; treat as new account.

### X (Twitter) — optional
- **Handle:** per priority list above, verify manually.
- **Bio:** reuse the Instagram/TikTok bio direction (Section 4), shortened to fit X's bio limit.
- **Status:** marked optional by the mission brief — lower priority than Instagram/TikTok/LinkedIn/GitHub. Only pursue if bandwidth allows; do not let it block higher-priority accounts.

### WhatsApp Business
- Not a "handle" platform — it is tied to the existing phone number `+212 6 48 55 22 22` (canonical per `MASTER_BLUEPRINT.md`, configurable via `NEXT_PUBLIC_WHATSAPP_NUMBER`). No new number is being recommended here.
- Convert the existing WhatsApp number to a WhatsApp Business account (or set up Business alongside personal, per WhatsApp's own dual-account rules — verify current WhatsApp policy manually).
- Content specs (business description, welcome message, away message, inquiry-response template): see Section 9.

## 4. Bio copy — Instagram / TikTok

**Base direction (as briefed):**
```
AI & Digital Solutions Engineer
I build apps, automations & AI systems.
Web • AI • Automation
↓ Work with me
```

**Five alternative bios:**

**Alt. 1 — outcome-first**
```
AI & Digital Solutions Engineer
Turning business problems into working software
Web • AI • Automation
↓ Start a project
```

**Alt. 2 — systems framing (matches the differentiator line)**
```
I build the systems businesses run on
Web apps · AI · Automation
Architecture to production, end to end
↓ Let's talk
```

**Alt. 3 — plain and direct**
```
AI & Digital Solutions Engineer
Web apps, automations, AI tools — built properly
↓ Contact below
```

**Alt. 4 — international framing**
```
AI & Digital Solutions Engineer
Web • AI • Automation — for businesses worldwide
Available for international projects
↓ Work with me
```

**Alt. 5 — short, punchy (best fit for TikTok's tighter limit)**
```
Systems > interfaces.
Web · AI · Automation
↓ Start a project
```

## 5. LinkedIn headline

**Primary (as briefed):**
```
AI & Digital Solutions Engineer | Web Applications • AI Automation • Custom Software
```

**Five alternatives:**

1. `AI & Digital Solutions Engineer | Building Web Apps, Automations & AI Systems for Businesses`
2. `Software Engineer — Web Applications, AI Automation & Custom Business Software`
3. `I Build Intelligent Digital Systems | Web • AI • Automation • Custom Software`
4. `AI & Digital Solutions Engineer | Helping Businesses Automate, Build & Scale with Technology`
5. `Full-Stack & AI Engineer | Custom Software, Automation Systems, AI-Powered Tools`

## 6. LinkedIn About — English

I design and build intelligent digital systems — combining software engineering, web development, AI and automation — that help businesses run better and grow faster.

My work sits at the intersection of four disciplines: web applications, business process automation, custom software, and AI systems engineering. Rather than delivering isolated features, I take projects the full distance — from understanding a business problem, through architecture and development, to automation, AI integration, deployment and production support.

**What I help businesses with:**
- Custom web applications and digital experiences that convert visitors into customers
- AI-powered tools — assistants, document processing, intelligent search, RAG systems
- Business process automation — connecting tools, eliminating repetitive manual work, and building reliable workflows (forms → CRM → notifications → reporting)
- Client portals, dashboards and secure client areas
- Internal business systems and operational tooling built around how a company actually works, rather than generic software that forces a company to adapt to it
- AI agents and intelligent, multi-step workflows
- End-to-end digital product development — from the first architecture decision to a system running in production

I don't just build interfaces. I build complete systems — the kind that keep working quietly in the background long after launch.

I'm available for international projects and collaborations — remote-first, and comfortable working across time zones with businesses in Europe, North America, the Gulf and beyond.

Let's talk about what you're trying to build.

## 7. LinkedIn About — French

Je conçois et je développe des systèmes numériques intelligents — combinant ingénierie logicielle, développement web, intelligence artificielle et automatisation — pour aider les entreprises à mieux fonctionner et à se développer plus vite.

Mon travail se situe au croisement de quatre domaines : les applications web, l'automatisation des processus métier, les logiciels sur mesure et l'ingénierie de systèmes IA. Plutôt que de livrer des fonctionnalités isolées, je prends en charge un projet dans son intégralité — de la compréhension du besoin métier à l'architecture, au développement, à l'automatisation, à l'intégration de l'IA, jusqu'au déploiement et au support en production.

**Ce que je peux apporter à une entreprise :**
- Des applications web sur mesure et des expériences digitales qui transforment les visiteurs en clients
- Des outils propulsés par l'IA — assistants, traitement de documents, recherche intelligente, systèmes RAG
- L'automatisation des processus métier — connecter les outils, éliminer les tâches manuelles répétitives et fiabiliser les flux de travail (formulaires → CRM → notifications → reporting)
- Des espaces clients, tableaux de bord et zones sécurisées
- Des systèmes internes et des outils opérationnels conçus autour du fonctionnement réel de l'entreprise, plutôt que des logiciels génériques imposant leur propre logique
- Des agents IA et des workflows intelligents, multi-étapes
- Le développement de produits digitaux de bout en bout — de la première décision d'architecture jusqu'à un système en production

Je ne me contente pas de construire des interfaces. Je construis des systèmes complets, capables de continuer à fonctionner de façon fiable bien après le lancement.

Je suis disponible pour des projets et collaborations à l'international — en télétravail, à l'aise pour travailler avec des entreprises en Europe, en Amérique du Nord, dans le Golfe et au-delà.

Parlons de ce que vous souhaitez construire.

## 8. GitHub bio

```
AI & Digital Solutions Engineer. Web apps, AI systems & automation — Next.js, Laravel, LangGraph, RAG. Complete systems, not just interfaces.
```

(141 characters — fits comfortably under GitHub's bio field limit.)

## 9. WhatsApp Business content

**Business description (profile "About"/description field):**
```
Rachid Berrada — AI & Digital Solutions Engineer. I design and build web applications, AI-powered tools and business automation systems for companies internationally. Message me to discuss your project.
```

**Welcome message (auto-sent on first contact):**
```
Hi 👋 Thanks for reaching out to Rachid Berrada. I design and build web apps, AI systems and business automations for companies internationally. Tell me a bit about your project and I'll get back to you shortly.
```

**Away message (short, outside working hours):**
```
Thanks for your message — I'm away right now but I'll reply as soon as I can, usually within one business day.
```

**Project-inquiry response template (first reply once someone describes a project):**
```
Thanks for the details — that's helpful. Based on what you've described, this sounds like a [web / automation / custom software / AI] project. To scope it properly, could you share: (1) the main goal of the project, (2) your rough timeline, and (3) whether you already have a budget range in mind? Once I have that, I can suggest next steps — usually a short call to confirm scope before I put together a proposal.
```

Do not quote a fixed price in this template — pricing is scope-dependent per `OFFERS_AND_PRICING.md`; the template routes toward a discovery conversation instead.

## Open questions / placeholders

- **No handle on this list has been checked for availability on any platform.** All of Section 2's list, and every per-platform handle referenced above, needs manual verification before account creation.
- **GitHub rename:** `Rberr240` is live in production and linked from the deployed site. Renaming it to match the brand handle list (e.g. `rachidberrada`) is a possible future polish, not something this pack recommends doing now — GitHub does forward old profile URLs after a rename, but the repository URLs under the old namespace (e.g. `github.com/Rberr240/JARVIS-V2`, linked from `profile.ts` project data) would need to be checked and possibly updated too. Flagging as a decision for Rachid, not executing it here.
- **LinkedIn vanity URL** cannot be chosen until the profile exists; confirm availability at that point.
- **YouTube channel and X account** do not exist yet per anything found in this repository — treat both as net-new.
- **TikTok bio-link clickability** may depend on TikTok's current follower/verification requirements — confirm at signup time, policy may have changed since this was written.
- **GitHub profile README / pinned repos** were not in scope for this pack and are not drafted here.
