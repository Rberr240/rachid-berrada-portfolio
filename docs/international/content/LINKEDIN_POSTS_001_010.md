# LinkedIn Posts (001–010)

Internal reference. Ready-to-publish drafts. See [BRAND_SYSTEM.md](../BRAND_SYSTEM.md) for voice and [MASTER_BLUEPRINT.md](../MASTER_BLUEPRINT.md) for the verified facts each post is grounded in. Post as-is or lightly adapt; do not add metrics, client names, or claims not present in the source facts.

---

## Post 001 — Portfolio Automation (Pillar: Case Studies / Before-After)

Most contact forms are a dead end. Someone fills it out, hits submit, and then nothing happens until a human remembers to check an inbox.

I didn't want that for my own site, so I built the lead pipeline myself instead of bolting on a CRM.

Here's the actual chain: my contact form submits to a static Netlify Forms detection endpoint. That triggers a Netlify event function — a small serverless function that runs on form submission. It reads a webhook URL from the environment, and if that variable isn't set, it logs a line and exits. It never throws an error back into the user's submission. The webhook goes to a Make.com scenario, which writes a new row into a Google Sheet and sends a Gmail notification.

No manual step. No "we'll get back to you within 48 hours." A lead becomes a tracked row and an email in the time it takes to load the confirmation screen.

The part I'm most proud of isn't the automation itself — it's the failure path. If the webhook URL is missing, the system degrades quietly instead of breaking the form for a real visitor. That's a small decision, but it's the difference between a demo and something you can actually run in production.

This is the smallest system I've shipped, and it's also the most verifiable one — it's running on this exact site, right now.

What's the one manual step in your business that a system like this would remove?

---

## Post 002 — Gold Fitness Architecture (Pillar: Case Studies / Before-After)

A gym in Martil, Morocco, needed something simple: a way for anyone who saw their physical business card to reach them immediately, without hunting across four different apps.

So instead of a full website with a CMS and a navigation menu, I built one mobile-first page — plain HTML, CSS, and JavaScript, hosted on GitHub Pages. It's the entire "backend" a single-location gym like this actually needs.

The card has a QR code. Scan it, and the page opens directly to: a call button, a WhatsApp link, the gym's exact Google Maps location, their Instagram, and a short video gallery of the space. Everything a prospective member needs to decide and act, in one scroll, on one screen.

There's even a second, tiny repository that exists purely to handle the QR redirect — a small piece of infrastructure most people would never think to build, but it's what makes the physical card durable: the destination can change without reprinting a single card.

This is a one-location business, and I built exactly what a one-location business needs — nothing more. No booking engine, no member portal, no features that would sit unused. Just the fastest possible path from "I'm holding a card" to "I called, messaged, or found the door."

Sometimes the right system is the smallest one that actually gets used.

Curious what a single QR-code entry point could simplify in your business?

---

## Post 003 — Mirador Golf Platform (Pillar: Case Studies / Before-After)

A residential golf community needed a better way to get owners registered and coordinated for meetings — without emailing spreadsheets back and forth or sharing a login.

What I built is a secure registration and meeting-coordination flow, not a full property-management platform. Scope matters, and I keep it precise when I talk about this project.

Here's how access works: each owner gets a unique code. That code is HMAC-signed, and verification happens entirely server-side — it's never compared in plaintext anywhere in the flow. Once verified, the owner moves through a multi-step form to submit their contact details, their meeting availability, and the topics they want to propose.

On the data side, everything lives in Supabase Postgres with Row Level Security enabled, and — this is the part I care about most — there is no direct client access to the database at all. Every write goes through a dedicated Edge Function. The browser never talks to the database directly; it talks to a function that talks to the database.

That separation is the actual security model. It's not "we have a password field," it's "the client physically cannot write anything the Edge Function doesn't explicitly allow."

It's a narrow, well-defined problem, solved with a narrow, well-defined system. No feature creep into billing or maintenance tickets — just registration and coordination, done properly.

What would you rather have: a longer feature list, or a system that's actually secure end to end?

---

## Post 004 — Build in Public (Pillar: Build in Public)

I'm rebuilding my own portfolio right now, and I'm doing it the same way I'd approach a client project: on a dedicated branch, with a defined scope, and a hard rule not to touch the parts that already work.

The site had a real, running lead pipeline — Netlify Forms into a serverless function into Make.com into Google Sheets and Gmail. That pipeline is production infrastructure for me. So the rebuild happens around it, not through it. No changes to the webhook, no changes to the automation logic, no "quick fixes" to something that isn't broken.

What is changing: positioning, structure, visual direction, and content. I went through my own case studies the same way I'd audit a client's claims — checking every sentence against the actual code, removing anything I couldn't verify. A gym became "one location," not "a chain." A registration flow became "registration and meeting coordination," not "a full platform." It's tempting to round up. I'd rather round down and be exact.

That discipline — protect what works, verify every claim, keep the history clean — is the same discipline I bring to client work. Building this in public is partly marketing, but mostly it's just showing my actual process instead of a polished result with the seams hidden.

What's a project you're rebuilding right now, and what are you refusing to touch while you do it?

---

## Post 005 — AI Workflows (Pillar: AI Automation)

"AI workflow" gets used to describe everything from a single chatbot widget to a genuinely orchestrated system. The difference matters, and it's usually invisible from the outside.

A real AI workflow has a few unglamorous parts that don't show up in a demo: routing — which model or provider actually handles this request, and why — memory — what does the system need to remember between interactions, and where does that live — and failure handling — what happens when a provider is slow, rate-limited, or down.

On JARVIS, my personal AI research project, the routing layer sends requests across multiple LLM providers instead of hard-coding one, built as a LangGraph orchestrator. Memory is split into two tiers: fast local storage for immediate context, and a vector store for retrieval when the system needs to pull in something from further back. Neither tier is exciting on its own. Together, they're the difference between a system that "chats" and one that actually functions over time.

None of this is about having the smartest model. It's about the plumbing around the model — the part that decides what the model even sees, and what happens to its answer afterward.

If you're evaluating an "AI automation" for your business, ask about the routing and the failure handling before you ask about the model. That's usually where the real engineering lives.

What's the automation you'd actually want built first?

---

## Post 006 — Business Automation (Pillar: Business Transformation)

Most businesses don't need more software. They need fewer manual steps between "a customer did something" and "the business responded."

The clearest example I can point to is my own site. When someone submits my contact form, it doesn't sit in an inbox waiting to be noticed. It triggers a chain: a serverless function picks it up, sends it to an automation webhook, and within seconds it's a new row in a spreadsheet and a notification in my inbox. I didn't buy a CRM to get this — I built a small, specific chain of tools that talk to each other.

That's the actual definition of business automation I work from: not "add AI," but "remove the manual handoff." A lead that used to depend on someone remembering to check email now depends on nothing. It just happens.

The businesses that benefit most from this aren't necessarily the biggest ones — they're the ones where a single person is currently the bottleneck for follow-up, data entry, or coordination. A solo gym owner. A small clinic front desk. A two-person agency. The system doesn't need to be complex to remove real friction. It needs to match the actual size of the problem.

Before automating anything, I ask one question: what's the manual step, exactly, and what happens if it's just gone?

What's yours?

---

## Post 007 — Software Architecture (Pillar: Software Engineering)

Every system I build starts with the same question, before a single line of code: where does state live, and who is allowed to write to it?

On a recent full-stack project — a document and attestation management app — the answer shaped the whole architecture. The frontend is React with Vite and Chakra UI. The backend is a separate Laravel 12 API on PHP 8.2, handling authentication through Sanctum/JWT, generating PDFs server-side with DOMPDF instead of in the browser, and running in Docker both locally and in CI. GitHub Actions runs the test suite and builds the image on every push to main.

Every one of those choices answers "who's allowed to write to what." PDFs generate server-side because a document's contents shouldn't depend on what a browser decided to render. Auth lives behind a dedicated API, not scattered across frontend logic. The same container that runs in CI runs in production, so "it works on my machine" isn't a valid excuse for a failure.

None of this is exotic. It's a deliberate, slightly boring set of decisions that make the system predictable under load, under a bad deploy, and under a browser doing something unexpected.

Good architecture is mostly invisible when it's working. You only notice it in the moment something goes wrong and the blast radius turns out to be small.

What's an architecture decision you had to defend even though it slowed things down short-term?

---

## Post 008 — JARVIS: A Safe Public Overview (Pillar: AI Automation)

For a while now, I've been building a personal AI research project called JARVIS — not a product I sell, a system I use to learn how far I can push orchestration, memory, and multimodal input before it breaks.

At a high level: it's a LangGraph-based orchestrator that routes requests across multiple LLM providers rather than depending on one. It has a two-tier memory system — fast local storage plus a vector store for retrieval — so it can hold both immediate context and things from much further back. It runs an independent voice pipeline (wake word detection, transcription, text-to-speech) and a separate vision pipeline (screen capture, OCR, image analysis), plus a permissions and security layer that governs what the system is actually allowed to do.

I'm intentionally not sharing the internals, the roadmap, or how the security layer is implemented — that's the point of a research project rather than a shipped product. What I will say is that building it has taught me more about failure modes, latency trade-offs, and the real cost of "just add another provider" than any client project could have.

The current version is frozen as a stable base while the next iteration gets built privately. It's less a finished product than a lab.

If you're curious what a piece of that architecture — routing, memory, or permissions — could look like applied to an actual business problem, that's a conversation I'm happy to have.

What would you want an AI system to actually remember about you?

---

## Post 009 — Manual Processes SMEs Still Run in 2026 (Pillar: Business Transformation)

It's 2026, and I still regularly see small and mid-sized businesses running core operations on a shared inbox nobody fully owns, a spreadsheet updated by hand, and a phone call to confirm what a form should have already captured.

None of this is a criticism — it's usually not a technology gap, it's a time gap. Nobody sat down to design the process; it accumulated one workaround at a time until it became "how we do things."

The pattern I see most often: a lead or request comes in through some channel, a person manually copies the relevant details somewhere else, another person eventually follows up, and there's no record of how long any of that took. Multiply that by every new lead, every week, and the actual cost is hours of skilled people doing data entry instead of the work only they can do.

The fix is rarely "buy an all-in-one platform." It's usually smaller and more specific: connect the two or three tools that already exist so the handoff between them stops depending on a person remembering. My own lead pipeline is built exactly that way — a form, a function, an automation platform, a spreadsheet, an inbox — nothing exotic, just nothing manual in between.

If you had to name the one manual handoff costing your team the most time right now, what would it be?

---

## Post 010 — Idea to Production Engineering (Pillar: Software Engineering)

An idea is worth very little until it survives contact with a real user, a real edge case, and a real failure. The gap between "I have an idea" and "this runs in production" is where most of the actual engineering happens — and it's the part that's hardest to see from the outside.

Take something as simple as a contact form. The idea is trivial: let someone send a message. Getting it to production means deciding where it posts, what happens if the automation behind it is temporarily unavailable, whether a bot can spam it, and what a real user sees if any of that fails. On my own site, that meant a static form-detection endpoint, a serverless function that fails silently and safely instead of breaking the user's submission, and a downstream automation that never blocks the response back to the browser.

Or take a document-generation system: the idea is "issue a certificate." Production means authentication, server-side PDF rendering so the output can't be tampered with client-side, a Dockerized environment so it behaves the same in testing and in production, and a CI pipeline that actually runs the tests before anything ships.

The idea is the cheap part. The discipline to carry it through auth, failure states, testing, and deployment — without cutting corners a user will eventually find — is the actual job.

What's an idea you have that's stuck at the "someday" stage?
