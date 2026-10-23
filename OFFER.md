# OFFER.md — packages, pricing and positioning (PROPOSED, for Jason's approval)

Drafted 2026-10-21. Status: **recommended**. Every price below is PROPOSED and shows on the preview
site with a "proposed" marker in code (`lib/offers.ts`, `PRICING_STATUS`). Nothing is live.
Evidence for what can be sold: `PORTFOLIO-EVIDENCE.md`.

## Positioning

**Line:** "Software built by an electrician who ships. Fixed price. Weekly previews. Weeks, not quarters."

**Who it's for**
1. Trades and home-service companies (electrical, HVAC, plumbing, solar, inspection) that need a
   site that books work, a tool that replaces a spreadsheet, or AI doing the paperwork.
2. Local service businesses and small operators who have been quoted agency prices for small jobs.
3. Founders with one idea who want a working product in weeks and own the code.

**Why him** (all sourced in PORTFOLIO-EVIDENCE.md): two apps on the App Store, a live product that takes
payments and runs an NEC Article 220 engine, a public-interest site built with a Texas attorney, and
an electrician's reading of what a job actually needs. He builds with Claude Code and parallel agents,
reviewed by an independent verifier, so a one-person shop ships at team speed.

## Packages

| # | Package | Price (PROPOSED) | Timeline | Best for |
|---|---|---|---|---|
| 1 | Launch Site | **$3,500** fixed | 1 week | A business that needs a site that books work |
| 2 | Your Business on Claude | **$4,500** fixed | 2 weeks | A small business drowning in paperwork |
| 3 | MVP Web App or Internal Tool | **from $12,000** (scoped first) | 3 weeks | A founder or owner with one idea |
| 4 | iOS App to the App Store | **from $10,000** (scoped first) | 4 weeks | A product that belongs in a pocket |
| + | Care Plan | **$400 / month**, cancel anytime | ongoing | Anything he built, kept alive and improving |
| + | Extra day | **$1,200 / day** | as needed | Changes outside a package or plan |

Payment: 50% to start, 50% at launch (packages 3 and 4: 40 / 30 / 30 at start, mid-build preview, launch).
Discovery call is free, 20 minutes. Every package starts with a written scoped brief and a fixed quote.

### 1. Launch Site — $3,500, 1 week
- **Included:** up to 5 pages (home, services, about, contact/booking, one more); copy drafted from a
  30-minute interview; mobile-first design; booking or quote form that emails the owner; Google Business
  and schema (LocalBusiness/Service, FAQ) so Google and AI answers find it; analytics; fast hosting on
  Vercel; domain connected; one round of revisions; a 20-minute walkthrough recording.
- **Client provides:** logo, 10+ real photos, services list and prices, domain login, one call.
- **Not included:** logo or brand design, photography, paid ads, blog content after launch, e-commerce
  catalogs (that's package 3).

### 2. Your Business on Claude — $4,500, 2 weeks
- **Included:** a half-day working session to map the paperwork; one to three AI workflows built and
  installed where the business already works (phone, email, Slack, a browser page), e.g. quote drafting
  from site notes, photo of a handwritten timesheet to a spreadsheet, dispatch or job summaries, customer
  replies in the owner's voice; a claims/guardrail check so it never invents prices or code citations;
  plain-English docs; two training sessions for the team; 30 days of fixes.
- **Client provides:** examples of the real paperwork (10+), access to the tools in use, a Claude
  subscription or API key in the business's name (he sets it up with them).
- **Not included:** custom software with a database (package 3), hosting of the AI itself beyond the
  vendor's plan, ongoing monitoring (Care Plan).

### 3. MVP Web App or Internal Tool — from $12,000, 3 weeks
- **Included:** scoped brief and fixed quote first; accounts/login, database, admin view, payments
  (Stripe) if needed, one AI feature if needed (vision, extraction, assistant); tests on the money and
  data paths; weekly preview link; launch on the client's own accounts (they own code, domain, data);
  handover docs and a recorded walkthrough; 30 days of fixes.
- **Client provides:** a decision maker available weekly, example data, accounts (Vercel, Stripe, etc.)
  in their name; third-party fees (hosting, APIs) are theirs.
- **Not included:** native mobile (package 4), ongoing feature work (Care Plan or day rate), marketing.
- Typical range after scoping: $12,000 to $25,000.

### 4. iOS App to the App Store — from $10,000, 4 weeks
- **Included:** scoped brief; Capacitor (web + iOS from one codebase) or native SwiftUI, chosen on the
  call; StoreKit purchases if sold; privacy page and policy; App Store listing, screenshots and
  submission handled through approval; TestFlight builds weekly; 30 days of fixes after approval.
- **Client provides:** an Apple Developer account in their name ($99/yr to Apple), app name and icon
  direction, content, a tester with an iPhone.
- **Not included:** Android (quoted separately), backend beyond what the app needs (package 3 if large),
  ongoing releases (Care Plan).
- Typical range after scoping: $10,000 to $30,000.

### Care Plan — $400 / month
- Hosting and uptime watch, dependency and security updates, up to 3 hours of changes a month, a
  monthly 1-page report, priority reply within one business day. Unused hours don't roll over.
  Cancel anytime; no minimum.

### Extra day — $1,200
- A full day on one scoped list, booked a week ahead. For clients and former clients only.

## Guarantee (proposed wording; use only if Jason agrees)
"The quote is the price. If scope changes, you get a written change order before anything is billed.
If the first weekly preview doesn't match the brief, stop there and pay only for that week."
- Why not "full refund in 30 days, keep what shipped" (the current site): it invites free work and is
  not something a one-person shop can honour on a $12,000 build.

## Process (shown on /process)
1. Discovery call (20 min, free) → 2. Scoped brief (what, what not, what you provide, price) →
3. Fixed quote, 50% to start → 4. Build with a preview link updated weekly →
5. Launch on your accounts, you own everything → 6. Care, if you want it.

## Pricing research (2026, fetched 2026-10-21; most sources are vendor blogs, so they are bands, not facts)

| Package | Market band found | Source | Proposed, and why |
|---|---|---|---|
| Launch Site | Freelance landing page $300–1,500; custom conversion page $1,500–3,000; 5–10 page small-business site $2,000–8,000; agency landing $1,500–5,000; freelancers $1,500–15,000 | [projectcostestimator](https://projectcostestimator.com/landing-page-cost), [uwindi](https://uwindi.com/how-much-does-a-landing-page-cost/), [agiled](https://agiled.app/hub/agencies/how-to-price-web-design-services), [parallelhq](https://parallelhq.com/blog/website-design-prices) | $3,500: top of the freelance band, below agencies, justified by booking, schema, analytics and copy being included, delivered in a week |
| Your Business on Claude | SMB AI setup $1,500–5,000 (wider $1,500–15,000); managed retainers $500–1,500/mo | [codewave](https://codewave.com/feeds/blog/ai-automation-agency-pricing), [taskip](https://taskip.net/ai-automation-agency-cost/), [agencygrowth](https://agencygrowth.com/resources/how-much-do-ai-automation-agencies-charge) | $4,500: top of the setup band; includes training and guardrails most agencies charge monthly for |
| MVP / internal tool | AI-native studio fixed-price $5,000–15,000 in 4–6 weeks; vendor menus $3,999 / $7,499 / from $14,999; agency simple MVP $12,000–18,000; general $10,000–50,000 | [startuphub](https://www.startuphub.ai/ai-news/insights/2026/how-much-does-it-cost-to-build-an-mvp-in-2026), [beevr](https://beevr.ai/blog/ai-mvp-studio), [uxcontinuum](https://uxcontinuum.com/blog/startup-cto/mvp-developer-cost), [houseofmvps](https://houseofmvps.com/mvp-development-cost) | from $12,000: the floor of the agency band and the ceiling of the AI-studio band; a 3-week build at $4,000/week, with a shipped-product track record behind it |
| iOS app | Simple app $10,000–40,000; US freelance $100–250/hr; cross-platform 20–45% cheaper than two natives; Apple $99/yr | [adalo](https://www.adalo.com/posts/cost-to-hire-an-ios-developer/), [tekrevol](https://www.tekrevol.com/blogs/cost-to-develop-an-ios-app/), [kellton](https://www.kellton.com/node/10749), [lowcode.agency](https://www.lowcode.agency/blog/app-store-publishing-cost) | from $10,000: bottom of the "simple app" band, with submission handled; he has done it twice |
| Care plan | Maintenance $25–600/mo; most small sites $50–500/mo; AI monitoring $100–300/mo | [apexure](https://www.apexure.com/blog/website-maintenance-cost), [ueni](https://ueni.com/blog/website-maintenance-cost/), [taskip](https://taskip.net/ai-automation-agency-pricing/) | $400/mo: upper-mid, because 3 hours of real changes are included, not just backups |
| Day rate | US mid full-stack $85–135/hr; AI/automation freelance $50–150/hr; Toptal senior $100–150/hr | [secondtalent](https://www.secondtalent.com/cost-to-hire/full-stack-developer/), [adsnipper](https://adsnipper.com/blog/cost-to-hire-ai-developer/) | $1,200/day (≈$150/hr): Toptal-senior level, which the shipped work supports |

Correction, 2026-10-22 (site board, pricing seat and claims verifier): the beevr.ai page shows $4K / $18K / $38K, not "$5,000–15,000 in 4–6 weeks", so that band's attribution in the MVP row is wrong. Verified medians with sources are in research/market-2026-10-22.md (MVP web app, n=8: low median $12,450). The table above has no derived-from or falsified-by columns; the board's proposed ladder in research/board-2026-10-22.md carries both.

## Market signal check (2026-10-21, Jason's ask: what people need)
Vendor surveys, so directional: contractors rank price-calculation accuracy (71%), mobile experience (58%) and QuickBooks
integration (52%) highest ([estimatorsuite survey, n=287](https://estimatorsuite.com/research/2026-contractor-software-adoption-survey/));
74% want simpler pricing without add-ons and use only 31% of paid features ([Clockwork index, n=1,247](https://runclockwork.com/research/contractor-software-satisfaction-index-2026));
about 47% of contractors offer online booking and 52% of home-service firms are investing in AI tools ([schedulingkit roundup](https://schedulingkit.com/statistics/home-services-statistics), sources unclear).
Applied: packages name estimates/invoices and phone-in-the-truck use; the QuickBooks mention was removed on 2026-10-22 as unsupported (board claims pass); pricing stays flat with no add-on modules.

## Changes from the current site (lib/offers.ts, 2026-05-10)
- Strategy Hour $300 → dropped; the discovery call is free and short. (Keep if Jason wants a paid working session.)
- Workflow in a Week $2,500 → Your Business on Claude $4,500 (2 weeks, 1–3 workflows, training, guardrails).
- Custom Build from $5,000 → folded into MVP from $12,000 and Launch Site $3,500.
- Idea → Live MVP from $15,000 (14 days) → MVP from $12,000 (3 weeks). Lower floor, honest timeline.
- iOS added as its own package (two apps shipped since that pricing was set).
- Tool + Tune-up $299/mo → Care Plan $400/mo with 3 hours included.
- Embedded Builder $4,000/mo → replaced by the $1,200 day rate (sells the same time without a 90-day lock-in).
- Guarantee rewritten (see above).

## Decisions for Jason
1. Approve or edit the six numbers.
2. Approve the guarantee wording, or say none.
3. Keep or drop a paid Strategy Hour.
4. ZombieWells timing claim: "built in a day" (proposed) or keep "45 minutes" if he can defend it.
