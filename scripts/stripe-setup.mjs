#!/usr/bin/env node
// One-time Stripe setup for the consulting packages. Safe to re-run: existing objects are found by
// metadata and reused, nothing is duplicated, nothing is charged.
//
//   STRIPE_SECRET_KEY=sk_live_... node scripts/stripe-setup.mjs
//
// On the account the key belongs to it creates one Product per package, a deposit (or monthly)
// Price, a balance Price for the 50/50 packages, and Payment Links. It prints the
// NEXT_PUBLIC_STRIPE_LINK_* lines for Vercel plus the private balance links to send at launch.
// Amounts mirror lib/offers.ts and PAYMENT_TERMS (50% to start, 50% at launch). The key is read
// from the environment only and is never printed or written anywhere.

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) {
  console.error("Set STRIPE_SECRET_KEY: a restricted key with write access to Products, Prices and Payment Links.");
  process.exit(1);
}
const TEST = KEY.startsWith("sk_test_") || KEY.startsWith("rk_test_");
const SITE_URL = "https://jason-walls.vercel.app";
const AFTER = "Thanks. Jason will email you to set the start date and the kickoff call.";

// Copy below is the site's own (lib/offers.ts). Amounts are cents.
const PACKAGES = [
  {
    id: "launch-site", name: "Launch Site", full: 350000, split: true,
    description: "A site that books work. Up to five pages, live in a week, on your own domain. Fixed price $3,500: 50% to start, 50% at launch.",
    field: "Your business, and what the site is for",
  },
  {
    id: "business-on-claude", name: "Your Business on Claude", full: 450000, split: true,
    description: "One to three AI workflows that do the paperwork, installed where your crew already works. Two weeks, fixed price $4,500: 50% to start, 50% at launch.",
    field: "Your business, and the paperwork you want gone",
  },
  {
    id: "care", name: "Care Plan", amount: 40000, recurring: { interval: "month" },
    description: "Anything Jason built for you, kept alive and improving. $400 a month, cancel anytime.",
    field: "Which site or app this covers", statement: "JASON WALLS CARE PLAN",
  },
  {
    id: "day", name: "Extra Day", amount: 120000, adjustable: { enabled: true, minimum: 1, maximum: 10 },
    description: "A full day on one scoped list, booked a week ahead. Clients and former clients only. $1,200 a day.",
    field: "What the day is for",
  },
];

// Stripe takes form-encoded bodies; nested objects and arrays use bracket keys.
function encode(obj, prefix = "", out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object") encode(v, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out.join("&");
}

async function api(method, path, body) {
  const res = await fetch("https://api.stripe.com" + path, {
    method,
    headers: { Authorization: "Basic " + Buffer.from(KEY + ":").toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? encode(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path}: ${json.error?.message ?? res.status}`);
  return json;
}

async function listAll(path) {
  const out = [];
  let after = "";
  for (;;) {
    const page = await api("GET", `${path}${path.includes("?") ? "&" : "?"}limit=100${after ? `&starting_after=${after}` : ""}`);
    out.push(...page.data);
    if (!page.has_more) return out;
    after = page.data[page.data.length - 1].id;
  }
}

const META = { site: "jason-walls-consulting" };

async function ensureProduct(p) {
  const found = await api("GET", `/v1/products/search?query=${encodeURIComponent(`active:'true' AND metadata['package']:'${p.id}'`)}`);
  if (found.data[0]) return found.data[0];
  return api("POST", "/v1/products", {
    name: p.name, type: "service", description: p.description, url: `${SITE_URL}/services`,
    ...(p.statement ? { statement_descriptor: p.statement } : {}),
    metadata: { ...META, package: p.id, full_price_cents: String(p.full ?? p.amount) },
  });
}

async function ensurePrice(product, p, kind) {
  const prices = await listAll(`/v1/prices?product=${product.id}&active=true`);
  const have = prices.find((x) => x.metadata.kind === kind);
  if (have) return have;
  const amount = p.split ? p.full / 2 : p.amount;
  return api("POST", "/v1/prices", {
    product: product.id, currency: "usd", unit_amount: amount,
    nickname: kind === "deposit" ? "50% to start" : kind === "balance" ? "50% at launch" : p.recurring ? "monthly" : "one day",
    ...(p.recurring ? { recurring: p.recurring } : {}),
    metadata: { ...META, package: p.id, kind },
  });
}

async function ensureLink(links, price, p, kind) {
  const have = links.find((l) => l.active && l.metadata.package === p.id && l.metadata.kind === kind);
  if (have) return have;
  const oneTime = !p.recurring;
  const submit = kind === "deposit" ? "This is the 50% to start. The other 50% is due at launch."
    : kind === "balance" ? "This is the 50% due at launch. Thank you."
    : p.recurring ? "Monthly. Cancel anytime from the receipt email." : "One scoped day, booked a week ahead.";
  return api("POST", "/v1/payment_links", {
    line_items: [{ price: price.id, quantity: 1, ...(p.adjustable ? { adjustable_quantity: p.adjustable } : {}) }],
    metadata: { ...META, package: p.id, kind },
    after_completion: { type: "hosted_confirmation", hosted_confirmation: { custom_message: AFTER } },
    custom_text: { submit: { message: submit } },
    billing_address_collection: "auto",
    ...(kind !== "balance" ? { custom_fields: [{ key: "project", type: "text", label: { type: "custom", custom: p.field }, text: { maximum_length: 200 } }] } : {}),
    ...(oneTime
      ? {
          submit_type: "pay",
          customer_creation: "always",
          invoice_creation: { enabled: true },
          payment_intent_data: { description: `${p.name} · ${kind}`, statement_descriptor_suffix: "JASONWALLS" },
        }
      : { subscription_data: { description: `${p.name}, monthly, cancel anytime` } }),
  });
}

const envName = (id) => "NEXT_PUBLIC_STRIPE_LINK_" + id.toUpperCase().replace(/-/g, "_");

const links = await listAll("/v1/payment_links");
const publicLines = [];
const privateLines = [];
for (const p of PACKAGES) {
  const product = await ensureProduct(p);
  const mainKind = p.split ? "deposit" : p.recurring ? "monthly" : "day";
  const main = await ensurePrice(product, p, mainKind);
  const link = await ensureLink(links, main, p, mainKind);
  publicLines.push(`${envName(p.id)}=${link.url}`);
  if (p.split) {
    const bal = await ensurePrice(product, p, "balance");
    const balLink = await ensureLink(links, bal, p, "balance");
    privateLines.push(`${p.name} · 50% at launch ($${(p.full / 200).toLocaleString("en-US")}): ${balLink.url}`);
  }
  console.error(`ok ${p.name}`);
}

console.log(TEST ? "\n# TEST MODE links (sk_test key). Re-run with the live key for the site.\n" : "\n# Add these to Vercel (Production) and to .env.local:\n");
console.log(publicLines.join("\n"));
console.log("\n# Private, for Jason to send at launch (not on the site):\n");
console.log(privateLines.join("\n"));
console.log("\n# Vercel, one line each:\n" + PACKAGES.map((p) => `vercel env add ${envName(p.id)} production`).join("\n"));
