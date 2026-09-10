# Sales Playbook

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts, [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for positioning, and [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) for pricing philosophy this document must stay consistent with. For how prospects are found and qualified before entering this pipeline, see [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md).

## 1. Canonical sales pipeline

Every lead sits in exactly one stage at a time. Stages move forward in order; a lead can be lost from any stage (tracked separately, not as a pipeline stage).

```
NEW LEAD → QUALIFIED → CONTACTED → MEETING → PROPOSAL → NEGOTIATION → WON
   → PROJECT → DELIVERED → TESTIMONIAL → REFERRAL
```

| Stage | Definition | Exit condition |
|---|---|---|
| **NEW LEAD** | Prospect identified (inbound form submission or outbound target) but not yet checked against qualification criteria. | Qualification checklist reviewed. |
| **QUALIFIED** | Passes the qualification checklist (Section 3). | First outreach or first response sent/received. |
| **CONTACTED** | At least one direct message/call exchanged with the prospect. | Discovery call scheduled. |
| **MEETING** | Discovery call scheduled or completed. | Discovery call completed and scope understood. |
| **PROPOSAL** | Proposal sent using [templates/PROJECT_PROPOSAL_TEMPLATE.md](./templates/PROJECT_PROPOSAL_TEMPLATE.md) (or FR version). | Client responds with questions, changes, or a decision. |
| **NEGOTIATION** | Client is discussing scope, price, or timeline changes before committing. | Terms agreed by both sides. |
| **WON** | Client has verbally or in writing agreed to proceed; deposit invoice sent. | Deposit received. |
| **PROJECT** | Deposit received; development underway. | All milestones and final deliverable complete. |
| **DELIVERED** | Final deliverable handed off and accepted by the client. | Final payment received and delivery checklist signed off. |
| **TESTIMONIAL** | Testimonial requested per [templates/TESTIMONIAL_REQUEST.md](./templates/TESTIMONIAL_REQUEST.md). | Testimonial received (or politely declined — still exit the stage). |
| **REFERRAL** | Referral requested per Section 9. | Referral asked for, regardless of outcome — this is the final stage. |

A lead can be marked **LOST** from any stage before WON. Record the stage it was lost from and, if known, the reason (no budget, no response, chose a competitor, timing) — this is useful signal for refining the outbound targeting in [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md), not a judgment on the prospect.

## 2. Sales process (execution flow)

The pipeline above tracks lead status; this is the step-by-step process Rachid actually runs for a WON deal:

```
Discovery Call → Qualification → Proposal → Deposit → Development
   → Milestones → Final Payment → Delivery → Testimonial → Referral
```

Each step is detailed below.

## 3. Discovery call

Full script and question list live in [templates/DISCOVERY_CALL.md](./templates/DISCOVERY_CALL.md). Purpose: understand the business, confirm the problem is real and worth solving, and gather enough scope information to write an accurate proposal.

Minimum outcomes before ending the call:
- The specific business problem is understood in the client's own words.
- A rough sense of budget range and timeline expectations exists (even if not an exact number).
- The client understands the next step is a written proposal, and roughly when to expect it.

## 4. Qualification checklist

Beyond the outbound-stage qualification in [OUTBOUND_PLAYBOOK.md](./OUTBOUND_PLAYBOOK.md), re-confirm fit after the discovery call before investing time in a proposal:

- [ ] The client has a specific, describable problem (not just "we want a website" with no goal behind it).
- [ ] The problem maps clearly to one or more of the four service pillars in [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md).
- [ ] The client has authority to approve the project and the budget (or a clear path to get approval).
- [ ] The scope discussed is realistic against the internal reference ranges in [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) — neither so small it isn't worth a formal proposal, nor so large it needs a different engagement model (e.g. a paid discovery phase first, per the pricing philosophy).
- [ ] Timeline expectations are achievable given Rachid's current capacity.
- [ ] No red flags on working relationship (unclear decision-making, unwillingness to share basic information, unrealistic "free trial project" requests).

If any box fails, either address it directly on the call/in a follow-up message, or move the lead to LOST with a reason rather than sending a proposal that will not close.

## 5. Scope checklist

Before drafting the proposal, confirm the following are documented from the discovery call (used to fill in [templates/PROJECT_PROPOSAL_TEMPLATE.md](./templates/PROJECT_PROPOSAL_TEMPLATE.md)):

- [ ] Core problem statement, in plain language.
- [ ] Primary objective(s) — what changes for the business if this succeeds.
- [ ] Functional scope — pages, features, integrations, automations required.
- [ ] Explicit out-of-scope items discussed on the call (to avoid later disputes).
- [ ] Any existing systems/tools that must be integrated with or migrated from.
- [ ] Content/asset ownership — who provides copy, images, brand assets.
- [ ] Rough timeline expectation from the client side (launch date, event, season).
- [ ] Budget signal — even an approximate range mentioned or implied.
- [ ] Decision-maker(s) and who signs off on approval/payment.

## 6. Proposal structure

Use [templates/PROJECT_PROPOSAL_TEMPLATE.md](./templates/PROJECT_PROPOSAL_TEMPLATE.md) (English) or [templates/PROJECT_PROPOSAL_TEMPLATE_FR.md](./templates/PROJECT_PROPOSAL_TEMPLATE_FR.md) (French) for the full document. The proposal always includes, in order: Client, Problem, Objectives, Proposed solution, Scope, Deliverables, Architecture, Timeline, Investment, Payment schedule, Assumptions, Out of scope, Revision policy, Launch, Support, Acceptance.

Pricing inside the proposal must stay consistent with [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md): productized offers (Launch Website, Business Website Pro) as fixed prices; automation, custom software, and AI work scoped and quoted per the pricing philosophy (value + complexity + risk + time + support, not hourly rate).

Every proposal/contract-adjacent document sent to a client must include the line: **"Business template — obtain appropriate local legal review before relying on it."**

## 7. Payment structure

Payment principle, consistent with [OFFERS_AND_PRICING.md](./OFFERS_AND_PRICING.md) Section 5:

- **Deposit:** 30–50% of the total project value, invoiced at WON and due before development (PROJECT stage) begins.
- **Fixed-price projects** (Launch Website, Business Website Pro): deposit + final payment on delivery. No intermediate milestones needed unless the client requests a split for cash-flow reasons.
- **Milestone-based projects** (Custom Software, AI Systems Engineering, larger automation builds): deposit, then payments tied to specific delivered milestones (e.g. discovery/architecture sign-off, core build complete, integration complete), then a final payment on delivery/acceptance.
- **Discovery-phase engagements** (ambiguous scope): a small paid discovery engagement produces the fixed-price proposal itself, per the pricing philosophy — this is invoiced and paid before the full proposal is written.
- Final payment is always tied to the delivery checklist (Section 8) being complete, not to a calendar date alone.

## 8. Project kickoff checklist

Run immediately after deposit is received, before development starts:

- [ ] Deposit payment confirmed received.
- [ ] Proposal/contract signed or confirmed in writing by the client.
- [ ] All required client assets collected (copy, logo, images, brand guidelines, existing credentials/access if needed).
- [ ] Communication channel and expected response times agreed (email, WhatsApp, or other).
- [ ] Milestone dates (if applicable) confirmed with the client.
- [ ] Any third-party accounts/services needed (domain, hosting, analytics, CRM) identified and access arranged.
- [ ] Kickoff confirmation sent to the client summarizing scope, timeline, and next milestone.

## 9. Delivery checklist

Run before marking a project DELIVERED and requesting final payment:

- [ ] All deliverables listed in the proposal are complete and match the agreed scope.
- [ ] Client has reviewed and tested the delivered work (not just been sent a link).
- [ ] Any agreed revision rounds (per the proposal's revision policy) have been completed.
- [ ] Final payment invoiced and received.
- [ ] Access/credentials handed over as agreed (domain, hosting, CMS, analytics, source code if included).
- [ ] Support terms confirmed with the client (what's included post-launch, for how long, and what isn't).
- [ ] Client sign-off / acceptance confirmation received (written, even if informal — an email or message confirming acceptance is sufficient).

## 10. Testimonial request process

After DELIVERED and final payment/sign-off are complete, move to TESTIMONIAL. Use [templates/TESTIMONIAL_REQUEST.md](./templates/TESTIMONIAL_REQUEST.md) for the exact message (English and French versions).

Process:
1. Wait until the client has had a short window to actually use the delivered system (a few days to a couple of weeks, depending on project type) so the testimonial reflects real use, not just delivery relief.
2. Send the low-friction request from the template — keep it short and specific about what would be most helpful (a sentence or two, a specific outcome, permission to use their name/business).
3. If no response within a week, send at most one polite reminder. Do not chase further — a testimonial is a bonus, not owed.
4. Store any testimonial received exactly as given; never edit its substance, and never publish it without the client's clear agreement, per the no-fabrication rule in [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) (testimonials must never be invented).

## 11. Referral request process

Runs alongside or immediately after the testimonial request — REFERRAL is the final pipeline stage regardless of outcome.

Process:
1. Ask only after the client has expressed genuine satisfaction (in the testimonial, in conversation, or through repeat contact).
2. Keep the ask specific and low-friction: request an introduction to one relevant person or business, rather than a generic "let me know if you know anyone."
3. Make it easy to forward — offer a short, ready-to-share description of the work rather than asking the client to write one from scratch.
4. Do not make the referral ask conditional on anything (e.g. no discounts explicitly traded for referrals unless Rachid decides to offer that independently) — keep it a genuine, no-pressure request.
5. Log the outcome (introduction made, no response, declined) and close the pipeline for that client at REFERRAL regardless of outcome.

## 12. Notes on tone across the pipeline

Consistent with [BRAND_SYSTEM.md](./BRAND_SYSTEM.md): direct, technical, confident, outcome-focused at every stage — discovery calls, proposals, and follow-ups should all read as a systems engineer solving a real business problem, not a generic freelancer selling a service menu.
