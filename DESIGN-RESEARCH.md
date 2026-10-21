# DESIGN-RESEARCH.md — what makes this different, and what the proven sites do

Drafted 2026-10-21 after Jason's verdict on preview v2 (dpl_3QWiQ2eC): "decent... the web design is shit
honestly, but a start. What makes us different? ... We need to re engineer proven systems."
Status: **recommended**. Facts trace to PORTFOLIO-EVIDENCE.md; taste rules to ~/dev/claude-taste/TASTE.md.

## 1. What makes this different (the only things a competitor cannot copy by swapping the logo)

Every comparable site sells one of three things: speed ("MVP in 2 weeks"), price ("fixed, from $5k"),
or AI ("AI-native studio"). All three are now table stakes; 20+ shops say them. Jason's site should say
them once and then lead with the four things none of the 50 surveyed sites can claim:

| # | Difference | Proof on file | How the site shows it |
|---|---|---|---|
| 1 | **An electrician wrote the software.** IBEW Local 369; wrote the NEC Article 220 engine that ChargeRight sells reports from. He knows what a job site, a panel and a crew timesheet actually look like. | PORTFOLIO-EVIDENCE §1.1, §4 | Hero photo is him in the panel room with the lockout tag, not a stock dev at a laptop. The copy names breakers, timesheets, quotes, trucks. |
| 2 | **Two apps on the App Store, one web product taking payments, today.** Most "MVP studios" show mockups; the demo here is live and installable. | §1.1, §1.2, iTunes lookup 2026-10-21 | Real App Store screens in the hero, badge links that open the store, a live ChargeRight link. No logos wall, no fake testimonials. |
| 3 | **Builds with a crew of Claude Code agents from his phone, with an independent verifier.** 40 sessions and 250 agent runs a week; a claims linter so the copy never invents a price or a code citation. | §2, §3 | A "how it's built" strip that shows the actual process (brief → agents build → verifier checks → preview link Friday) instead of a generic 3-step graphic. |
| 4 | **Fixed price, written scope, weekly preview, you own everything.** Matches what contractors say they want (simple pricing, no add-ons, mobile first). | OFFER.md market signal; Clockwork index n=1,247 | Prices on the home page, in full, with "what you provide" and "not for this" under each. Softer CTA ("See prices", "See the work") before "Book a call". |

One-line version for the hero: **"Software built by an electrician who ships."** (kept) with the
subhead rewritten to carry proof, not adjectives: "Two apps on the App Store, a web product taking
payments, and a crew of AI agents I run from my phone. Fixed price. Preview every Friday."

Things the site must NOT do (claims.json + Jason's rules): "Master Electrician"; invented numbers;
fake testimonials or client logos; AI-generated faces; the case file, custody, medical, legal, kids,
Tamara or finances anywhere.

## 2. Survey of 50 comparable sites

Two sweeps on 2026-10-21, text fetch of each homepage plus 14 pricing pages; 48 readable
(brennandunn.com down, metalab.com thin). Full per-site records with headline, hero visual, proof,
pricing, process, nav and the "swap the logo" verdict: `research/survey-batch-a.md` (productized
studios, AI-MVP shops, solo builders, design agencies) and `research/survey-batch-b.md` (trade-marketing
agencies, field-service SaaS, dev-tool products, dev shops, consultants). Caveat: text-only fetches, so
motion and mobile behaviour were not observed; the layout facts below are what the copy and structure show.

What the 48 do, counted:

| Pattern | Count | Who does it best |
|---|---|---|
| "Book a call / demo" as the primary hero CTA | 11/24 (batch B); contact CTA as last nav item 19/48 | thoughtbot, Hook, Raft |
| Named-person testimonials | 18/24 B, 8/25 A | Raycast (20 named figures, no logo wall) |
| Quantified case studies or outcome numbers on home | 11/24 B, 12/25 A | Raft ("54 shipped client stories"), Hook ($240M+) |
| Client logo wall | 11/24 B, 10/25 A | agencies only; 0 solo builders |
| Prices on the home page | 6/24 B, 5/25 A; 0/10 established agencies | Hook (per-service), Raft ("starts at $10,000"), House of MVPs (3 tiers), UX Continuum (full menu) |
| Numbered process on home | 5/24 B; 6/6 productized or AI-MVP shops; 0/10 agencies | Raft (by week), Hook (5 steps) |
| Text-only hero | 5/24 B, ~10/25 A | Raft, UX Continuum, Vercel |
| Real photo of the person in the hero | 4/24 B, 4/25 A | Marc Lou, Jonathan Stark, Josh Comeau, Hook, Jobber (real customers) |
| Product screenshots in the hero | 4/24 B | Linear, Basecamp, ServiceTitan, Superhuman |
| Intent picker (visitor chooses a path) | 2/25 A + industry pickers 8/24 B | House of MVPs, BeevR, Scorpion |
| Fixed price + "you own the code" stated as promises | 4/25 A, 3/5 trade agencies | BeevR ("demo every Friday"), Raft |
| Agent-facing surfaces named on home (llms.txt, .md, MCP) | 7/24 B | Vercel, Resend, Brian Lovin |

Verdicts that matter for this site:
- **Nobody in the sample combines a real photo of the builder, real installable product and prices on
  the page.** Hook has people and prices but no product. Linear has product but no person and no price.
  Marc Lou has person and product but no offer. That gap is the design.
- The **sites that feel like one person** (Marc Lou, Jonathan Stark, UX Continuum, 37signals, Rauno) win
  by a stance, not by polish: a scoreboard that includes failures, one crusade, "no junior bench behind
  this page", a numbered essay index.
- The **sites that sell fixed-price builds** (House of MVPs, Raft, BeevR, Singh Labs, iBUILDMVP) all show
  a numbered process and a price band on the home page. Agencies hide both. Jason sells like the former.
- The **trade-marketing agencies** (Hook, Rynoss, Blue Corona, Scorpion, Rocket) use "Home Services" in
  the headline, real staff photos, review counts and case numbers, and 6–8 nav items with mega menus.
  The copy pattern transfers (name the trades, name the paperwork); the mega-menu does not.
- Mobile proof is absent from every source; it has to be judged on Jason's phone.

## 3. The proven system

One sequence, drawn from the sites that publish prices and ship fixed-scope work, with the trade-agency
proof pattern folded in. Every direction in §4 keeps this order; they differ in what carries each beat.

1. **Hero states the result, not the service.** Marc Lou "I've built 38 startups solo"; Raft "You bring
   the problem. We ship the software."; Hook "Join 100s of satisfied contractors". One primary CTA, one
   softer one ("See prices" / "See the work"), per the guides that found softer CTAs convert first-timers.
2. **Proof directly under the hero,** as something checkable: store badges that open the listing, a live
   URL, a number with a source. No logo wall, no testimonials until there are real named ones.
3. **Who it's for,** named in the buyer's words (trades, paperwork at night, one idea).
4. **Prices on the page,** with what you get, what you provide, what it isn't (House of MVPs, UX Continuum).
   Recommended tier marked (Jobber's "Recommended", Linear's highlighted plan).
5. **Process by week** (Raft) with the written-brief and Friday-preview promises (BeevR).
6. **The one thing only he can say:** the electrician, the agent crew run from a phone, the independent
   checker. This is the section that passes the swap-the-logo test; everything else is table stakes.
7. **FAQ** (objections in order: price, time, ownership, what if it goes wrong).
8. **Closing CTA** repeating the hero's, plus email for people who won't book a call (Jonathan Stark, UXC).

Nav: 5 items max, last one the CTA (19/48), bottom tab bar on phones (thumb reach, TASTE.md).
Machines: prices and CTA as live text, Service/Person/MobileApplication schema, llms.txt, agent catalog
(already built).

## 4. Directions for Jason to pick (phone-judged; /v/a, /v/b, /v/c on the preview)

| | A — Panel room | B — Scoreboard | C — Product first |
|---|---|---|---|
| Borrowed from | Hook (real people + prices), Raft (price in hero), Marc Lou (result headline), Jobber (real faces) | Marc Lou (scoreboard incl. non-wins), UX Continuum (one-engineer voice, plain price menu), 37signals (text, stance), Jonathan Stark | Linear/Basecamp (product UI hero), House of MVPs/BeevR (intent picker), Jobber (recommended tier), Raft (week timeline), sticky CTA bar |
| Hero | Full-bleed photo of Jason in the switchgear room with the lockout tag; Roboto Slab 800 headline "Two apps on the App Store. Built by an electrician."; price in the subhead | Small real photo, name, one sentence: "I'm an electrician. I build software that ships." | Phone frame cycling three real App Store screens; "Software built by an electrician who ships."; three intent buttons |
| Proof | Two real phones with the live screens + store badges | A six-row scoreboard with live dots, honest states (live / web beta / prototype), swipe strip of six real screens | The phone itself, store badges under it |
| Prices | Four package cards on the home page | A plain three-column table, all six offers | Package cards grouped under each intent, MVP marked recommended |
| Process | Prose + the agent-crew panel | First-person paragraph | Day 0 / week 1 / 2 / 3 timeline |
| Colour / type | Mid-navy #10203d, Electric Blue, slab headlines | Paper #f6f2ea, Electric Blue, tight Plex headlines | Navy #0f1f3a, Electric Blue, Plex headlines, phone glow |
| Mobile | Photo fills the first screen, bottom tab bar | Single column, swipe strip, bottom tab bar | Sticky "from $3,500 · Book a call" bar replaces the tab bar |
| Risk | Photo quality on a big screen; dark page on a bright site | Quietest; may read as a personal page, not a shop | Most "SaaS"; depends on the screens being recognisably his |

Recommendation: **A** for first impression (the photo is the one asset no competitor has, and the
survey shows real-person heroes are rare: 8/48), with C's sticky price bar and intent picker folded in
after the pick. B is the fallback if Jason wants the site to read like him rather than a shop.

Taste scores (hypothesis, not proof; RENDERED unscored until seen on his phone):

| Axis | A | B | C | Note |
|---|---|---|---|---|
| SPECIFIC | 9 | 8 | 7 | A's photo and C's screens are unswappable; C's layout is the most borrowed |
| LESS | 7 | 9 | 6 | C carries three intents plus three package groups |
| GRAB | 8 | 6 | 8 | A: the face and the switchgear; C: the cycling phone; B: a sentence |
| REAL | 9 | 9 | 9 | All real photos and real store screens; no generated faces, no fake quotes |
| VOICE | 7 | 9 | 7 | B is whole first-person sentences; A and C keep some card copy |
| PURPOSE | 8 | 7 | 9 | C routes each visitor to a priced package fastest |
| MACHINES | 8 | 8 | 8 | Prices and CTAs are live text in all three; schema and llms.txt unchanged |
