// JSON-LD for search engines and AI answer engines. Facts trace to PORTFOLIO-EVIDENCE.md.
// Every price comes from lib/offers.ts and every description that contains one carries PROPOSED_NOTE.
import { SITE } from "./site";
import { OFFERS, PROPOSED_NOTE, type OfferTier } from "./offers";
import { FAQ } from "./faq";
import { A } from "./assets";

export { SITE };

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

const CTX = "https://schema.org";
const PERSON_ID = SITE.url + "/#person";
const WEBSITE_ID = SITE.url + "/#website";
const SERVICE_ID = SITE.url + "/#service";
const sameAs = [SITE.x, SITE.github, SITE.appStoreDeveloper, SITE.linkedin].filter(Boolean);
const address = { "@type": "PostalAddress", addressLocality: "Louisville", addressRegion: "KY", addressCountry: "US" };

const STORE = {
  chargeright: "https://apps.apple.com/us/app/chargeright/id6755695416",
  bendright: "https://apps.apple.com/us/app/bendright/id6779847124",
};

export const personSchema = () => ({
  "@context": CTX,
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  jobTitle: "Electrician",
  description: "Electrician, IBEW Local 369, Louisville, Kentucky. Builds and ships his own iOS apps.",
  image: A.electrician.startsWith("http") ? A.electrician : SITE.url + A.electrician,
  url: SITE.url,
  ...(SITE.email ? { email: SITE.email } : {}),
  address,
  memberOf: { "@type": "Organization", name: "IBEW Local 369" },
  sameAs,
});

export const websiteSchema = () => ({
  "@context": CTX,
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en-US",
});

// One Offer per package. Fixed prices use `price`; "from" prices use a minPrice specification;
// the Care Plan and Extra Day are unit prices. The description always carries the proposed marker.
function offerSchema(o: OfferTier) {
  const base = {
    "@type": "Offer",
    "@id": SITE.url + "/services#" + o.id + "-offer",
    name: o.name,
    description: `${o.short} Price is ${PROPOSED_NOTE}.`,
    url: SITE.url + "/services#" + o.id,
    priceCurrency: "USD",
  };
  if (o.priceMin !== undefined) {
    return {
      ...base,
      priceSpecification: { "@type": "PriceSpecification", minPrice: o.priceMin, priceCurrency: "USD" },
    };
  }
  if (o.recurring) {
    return {
      ...base,
      price: o.priceNum,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: o.priceNum,
        priceCurrency: "USD",
        unitText: o.recurring === "month" ? "MONTH" : "DAY",
      },
    };
  }
  return { ...base, price: o.priceNum };
}

function serviceSchema(o: OfferTier) {
  return {
    "@type": "Service",
    "@id": SITE.url + "/services#" + o.id + "-service",
    name: o.name,
    serviceType: o.name,
    description: `${o.short} Best for: ${o.bestFor}`,
    provider: { "@id": PERSON_ID },
    areaServed: "US",
    offers: offerSchema(o),
  };
}

// Home: ProfessionalService with an offer catalog. No priceRange.
export const professionalServiceSchema = () => ({
  "@context": CTX,
  "@type": "ProfessionalService",
  "@id": SERVICE_ID,
  name: SITE.name + " · Software for trades and small business",
  url: SITE.url,
  ...(SITE.email ? { email: SITE.email } : {}),
  description: SITE.description,
  founder: { "@id": PERSON_ID },
  areaServed: "US",
  address,
  sameAs,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Packages",
    itemListElement: OFFERS.map(offerSchema),
  },
});

export const faqSchema = () => ({
  "@context": CTX,
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Both apps verified via the iTunes lookup API on 2026-10-21.
const chargerightApp = () => ({
  "@type": "MobileApplication",
  name: "ChargeRight",
  operatingSystem: "iOS",
  applicationCategory: "UtilitiesApplication",
  softwareVersion: "4.0.1",
  url: STORE.chargeright,
  author: { "@id": PERSON_ID },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

const bendrightApp = () => ({
  "@type": "MobileApplication",
  name: "BendRight",
  operatingSystem: "iOS",
  applicationCategory: "UtilitiesApplication",
  softwareVersion: "1.1",
  url: STORE.bendright,
  author: { "@id": PERSON_ID },
  offers: { "@type": "Offer", price: "6.99", priceCurrency: "USD" },
});

export const mobileAppsSchema = () => [
  { "@context": CTX, ...chargerightApp() },
  { "@context": CTX, ...bendrightApp() },
];

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": CTX,
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: SITE.url + it.path,
  })),
});

// ---------------------------------------------------------------------------------------------
// Per-page JSON-LD entry points. Pages add breadcrumb() themselves; FAQ uses faqSchema().
// ---------------------------------------------------------------------------------------------
const page = (type: string, path: string, name: string) => ({
  "@type": type,
  "@id": SITE.url + path + "#page",
  url: SITE.url + path,
  name,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
});

// Home: the ProfessionalService with its catalog (the page itself is covered by WebSite).
export const homeJsonLd = () => professionalServiceSchema();

// Services: the page, plus a Service with an Offer for every package.
export const servicesJsonLd = (offers: OfferTier[]) => ({
  "@context": CTX,
  "@graph": [
    {
      ...page("WebPage", "/services", "Prices"),
      description: `Fixed-price packages. Every price is proposed and awaiting approval (${PROPOSED_NOTE}).`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: offers.map((o, i) => ({ "@type": "ListItem", position: i + 1, name: o.name, url: SITE.url + "/services#" + o.id })),
      },
    },
    ...offers.map(serviceSchema),
  ],
});

// Work: an ItemList. The two App Store apps are MobileApplication entries; the rest are named links.
// Entries with no public link and no "Live" stage (InspectRight beta, the lab) are left out.
type WorkEntry = { slug: string; name: string; stage: string[]; links: { href: string }[] };
const workItem = (w: WorkEntry) => {
  if (w.slug === "chargeright") return chargerightApp();
  if (w.slug === "bendright") return bendrightApp();
  const href = w.links[0]?.href;
  return {
    "@type": "CreativeWork",
    name: w.name,
    url: href ?? `${SITE.url}/work#${w.slug}`,
    ...(href ? { sameAs: href } : {}),
    creator: { "@id": PERSON_ID },
  };
};

export const workJsonLd = (works: WorkEntry[]) => ({
  "@context": CTX,
  ...page("CollectionPage", "/work", "Work"),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: works
      .filter((w) => w.links.length > 0 || w.stage.includes("Live"))
      .map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: workItem(w),
      })),
  },
});

export const processJsonLd = (steps: { name: string; text: string }[]) => ({
  "@context": CTX,
  "@type": "HowTo",
  "@id": SITE.url + "/process#howto",
  name: "How a job runs, from the first call to launch",
  url: SITE.url + "/process",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});

export const aboutJsonLd = () => ({
  "@context": CTX,
  ...page("ProfilePage", "/about", "About Jason Walls"),
  dateModified: "2026-10-21",
  mainEntity: { "@id": PERSON_ID },
});

export const contactJsonLd = () => ({
  "@context": CTX,
  ...page("ContactPage", "/contact", "Contact"),
  mainEntity: { "@id": PERSON_ID },
});
