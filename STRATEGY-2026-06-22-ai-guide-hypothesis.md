# AI Guide — business audit, hypothesis, and the workflow that made it
**Date:** 2026-06-22 · **For:** Jason Walls · **Trigger:** Sarah Stogner's iMessage pitch + "I need a business person to see the value"

> **Basis labels (honesty rule):**
> - Sarah's words below = **retrieved this session** from iMessage (+1 432 664 0641, Jun 20 2026).
> - Site facts = **read this session** from `~/jason-walls-consulting` (`app/page.tsx`, `app/book/page.tsx`, `lib/offers.ts`).
> - Market numbers (adoption %, named comps, churn analog) = **carried from the Jun-20 32-agent research note** (`project_ai_guide_consulting_validation_2026_06_20.md`), which itself says "subagent-retrieved, not independently re-verified." Treat as directional, not gospel. Re-verify before putting any number on a public page.

---

## 1. The one-sentence verdict (business person's read)
You already have a validated product. **A paying customer (a lawyer) told you what to sell, then bought it for $2,000.** That is the strongest signal a business can get. The problem is not the idea — it is that **the thing she bought is not on your website, and the person who bought it would not recognize herself in your current copy.**

The expansion is not "build more." It is **rename what you already did for Sarah, put it on the menu, and point it at people like her.**

---

## 2. Audit of what Sarah said (her pitch, scored)

Her actual messages, Jun 20:
- "I really think you could start a **boutique consulting firm** to help other people like me"
- "**$1000/month** you set up their Claude... you get it up and running... then you hand over credentials to them to keep refining"
- "Do a year contract. **$10,000 one time payment**... accept **2 new spots a month**... scale up"
- "time intensive on front end and then you remain a consultant on back end... **you build your coaching into the AI**"
- "Do a 1/2 day sit down session like we did. But charge people like **$20,000** for that... **people with money are skeptical of inexpensive things**"
- "You'll fly to them, get a rental car and hotel. Spend a day shadowing"
- "It's like the next personal coaching... Or personal trainer... **Personal AI guide**... Only work with people you jive with"

**What she got RIGHT (keep):**
1. **The reframe is the gold.** "Personal AI guide / personal trainer" moves you off the commodity shelf ("guy who builds websites," competing with agencies and no-code on price) onto a premium shelf ("the person who makes ME AI-capable"). Different shelf, different price, stickier.
2. **The engine is right:** heavy on the front end (setup) → recurring on the back end (you stay the consultant). That is a real recurring-revenue model, not project hopping.
3. **"Build your coaching into the AI"** is the actual moat sentence. You are not selling hours; you are selling a system that carries your judgment.
4. **Price up.** Her instinct ("people with money are skeptical of cheap") matches the research: your current $300 / $2,500 underprices this.
5. **"Only work with people you jive with" + "2 spots/month"** = correct guardrails for a solo operator. Protects against the scope-creep death spiral.

**What needs a business person's pushback (fix before betting on it):**
1. **Her price tiers are anchors, not a plan.** $1k/mo, $10k one-time, $20k day are guesses she threw out warmly. The **$20k fly-to-them day does not launch** — it needs 3 named wins first, or it just doesn't close. (Research agreed.)
2. **The churn trap.** "Personal trainer" and "build-and-hand-off" models churn hard once the client hits their goal (research cited ~50% annual churn in the trainer analog). **If you teach them to be self-sufficient, you have to give the retainer a reason to survive that.** The answer: the retainer is not "I keep doing your work," it is **"I keep you current — every time Claude ships a new model or capability, your system gets upgraded and you are never behind."** That reason persists; "do my work" doesn't.
3. **One channel = fragile.** Every client so far (Sarah, her referrals) is her network. Referral pipelines take 90-180 days to spin up, and "2 closes/month" is a real sales load for someone whose documented weak spot is **closing**. The model has to be designed *around* the closing gap (easy-yes entry first), not assume it away.
4. **Self-cannibalization.** The better you teach, the faster they leave. Resolve it on purpose: lead with the one-time setup (the easy yes), make the retainer about *staying current*, not dependence.

---

## 3. Audit of what we have (the live site)

**Strong bones — keep all of this:**
- Premium, honest design. No fabricated testimonials (stubbed with a no-fabrication note), honest press framing, real receipts (ChargeRight 680K+, Lennox Fields, ZombieWells, Cortex). Trust bar carries Cuban / Sunday Times / Anthropic / IBEW.
- A real offer ladder already exists: $300 → $2,500 → $5k → $15k, plus $299/mo and $4,000/mo retainers.
- Sophisticated conversion craft already shipped: 30-day refund, capacity scarcity, a "not for this" disqualifier on every tier.

**The gaps (this is the work):**
1. **The proven product is missing from the menu.** The site sells *"I build it FOR you."* Sarah bought *"set it up WITH me, teach me, hand me the keys, stay on call."* There is **no "AI Guide / setup + teach + handoff" tier** anywhere. The one thing that has actually closed is not for sale.
2. **The ICP excludes the buyer.** Hero + lede say "electricians, low-voltage crews, fiber shops running 1-10 trucks." Sarah is a **lawyer**. The named market in the research is **solo professionals / domain experts**. "People like me" cannot find themselves on this page.
3. **No proof asset from Sarah.** Her outcome (what the CJIS deadline agent saved her — hours, a result) is the single most valuable conversion asset you can own, and it is not captured. Testimonials are still stubbed.
4. **Booking friction.** `/book` is mailto-only (no live scheduler — `NEXT_PUBLIC_BOOKING_URL` is unset). That is a leak at the exact moment of highest intent.
5. **Confirm the plumbing.** Contact is `hi@jasonwalls.work` (different domain than ChargeRight). Confirm it is monitored before driving traffic.

---

## 4. THE HYPOTHESIS (the business model to expand around)

> **We help domain experts who have deep, unwritten know-how (lawyers, inspectors, electricians, advocates, niche operators) become AI-capable — we build their first real AI system WITH them, hand over the keys, and keep it current as the models evolve.**
> **Priced:** $3,500-5,000 setup (easy yes) → $2,000-2,500/mo "stay current" retainer.
> **Defensible because:** systems that encode unwritten domain rules resist no-code and the next model (Ardent VC thesis, per research) — your NEC + CJIS edge, generalized.
> **Falsifiable:** if you cannot close 2 of the next ~8 qualified "people like Sarah" on the setup fee within 60 days, the wedge or the price is wrong.

**The offer architecture (what goes on the menu):**
| Tier | Price | Role |
|---|---|---|
| AI Guide Setup (NEW) | **$4,000** flat (or 3,500-5,000 scoped) | The proven product. In-person or remote: shadow, build the first working system, teach, hand over credentials. This is what Sarah bought. The easy yes. |
| Stay-Current Retainer (reframe of "Embedded") | **$2,000/mo** | NOT "I do your work." "Your system stays current with every model release + 1 improvement/mo + you're never behind." Sold *after* setup. |
| VIP build day | $10k-20k | **Off the menu** until 3 named wins. |

Keep the existing build tiers ($5k Custom Build, $15k MVP) — they serve the "build it for me" buyer who is real too. The AI Guide line is the **expansion**, not a replacement.

**The wedge market (who to point it at first):** domain-expert professionals who are AI *non-adopters* — the ~82% who think "AI doesn't apply to my work" (research). Sarah is the proof. Start where her network already is (legal / public-interest / Texas professional circles) because that is your warmest channel and it fights the closing gap.

**Why this beats the current positioning:** "guy who builds websites for trades" competes with every agency and Squarespace on earth. "the person who makes domain experts AI-capable and keeps them current" has almost no competitors who also (a) ship real production software and (b) carry a real trade license. That is a category of roughly one.

---

## 5. THE WORKFLOW — "Hypothesis Engine" (the reusable thing you asked for)
A repeatable method to turn any opportunity signal into a testable business-model hypothesis. Re-run it on the next customer pitch, the next repeated request, the next thing you sell once by accident. Each step is a question; the output of step 6 is the bet, step 7 is how you test it cheap.

1. **SIGNAL — what actually happened?** Capture the raw input verbatim and source it. *Who said it, when, and did money change hands?* A customer who paid outranks a customer who praised, which outranks a stranger's opinion. (Here: Sarah, Jun 20, $2,000 — top tier.)
2. **SEPARATE — split it into three.** (a) the JOB they hired you for, (b) the MODEL they proposed, (c) the PRICE anchor they named. Do not let a warm price guess masquerade as a plan.
3. **STRESS-TEST — red-team the model.** Run it against the five killers: **churn, channel, capacity, self-cannibalization, commoditization.** Write the failure mode for each, label your confidence (retrieved / inference / guess). If you can't answer one, that's the research to do.
4. **MOAT — what resists the next model and no-code?** If a no-code tool or the next Claude makes this trivial in 18 months, it's a feature, not a business. Keep only what encodes something hard to copy (your domain rules, your relationships, your judgment baked into the system).
5. **PRICE TO VALUE — anchor on their alternative, not your hours.** What does NOT solving this cost the buyer? Set (a) an easy-yes entry, (b) a recurring engine, (c) **the reason the recurring survives the client getting good.** No good answer to (c) = no real retainer.
6. **ONE-LINE HYPOTHESIS — make it falsifiable.** Fill: *"We help [WHO] get [OUTCOME] by [MECHANISM], priced [ENTRY] → [RECURRING], defensible because [MOAT]. False if [the metric that would kill it]."*
7. **CHEAPEST TEST — smallest experiment, <30 days, kill/scale metric set up front.** Usually: reposition one page + pitch N named warm prospects + capture 1 named outcome. Decide the number that means "scale it" vs "kill it" *before* you run it, so you can't rationalize after.

(Step 7 for THIS hypothesis is in section 6.)

---

## 6. The cheapest test for THIS bet (your next moves, ranked by closeness to cash)
1. **CLOSE/PROOF first:** capture Sarah's outcome in one sentence with a number (hours saved, deadlines caught). That one quote unlocks pricing every future client higher. She's warm right now — ask her this week.
2. **CONVERT:** add the **AI Guide Setup ($4,000)** tier to `lib/offers.ts` and reframe the hero/ICP to include "domain experts," not just trades. (Concrete edit proposed below — your call to ship it.)
3. **ACQUIRE:** list 8 "people like Sarah" from her world (legal / public-interest / professional Texas network), pitch the setup fee. Kill/scale metric: **2 closes in 60 days = the model is real; 0 = the wedge or price is wrong.**

---

## 7. Proposed page edit (for your yes/no — I did NOT touch the live site)
**A. New offer tier** in `lib/offers.ts` (drops into the existing grid automatically):
- id: `ai-guide`, name: **"AI Guide Setup"**, price: **$4,000**, duration: "2-3 days · remote or on-site"
- short: "I set up your first real AI system with you, teach you to run it, and hand over the keys. The way I did it for an attorney who now runs her own agents."
- whatYouGet: ["A working AI system built on your real material, with you", "Hands-on training so you actually run it, not just own it", "Full credential handoff + a plain-English runbook", "First month of the Stay-Current retainer included"]
- notForThis: ["Not for 'just build it and I'll never touch it' — that's a Custom Build", "Not for a team of 20 — this is for the expert who IS the business"]

**B. Reframe the hero ICP** (one line): from "electricians, low-voltage crews, and fiber shops running 1-10 trucks" → add the guide audience, e.g. "for the expert who runs the show — tradespeople, attorneys, inspectors, anyone whose knowledge is the business."

**C. Rename "Embedded Builder" retainer → "Stay-Current"** and rewrite its promise around *staying current with model releases*, not "I ship for you."

**One decision for you:** Do I (1) ship edits A+B+C to the live site now, (2) just A (add the AI Guide tier, leave positioning), or (3) hold and you read this first? Reply 1 / 2 / 3.
