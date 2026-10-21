// JSON-LD for search engines and AI answer engines. Facts trace to PORTFOLIO-EVIDENCE.md.
import { SITE } from "./site";
import { OFFERS } from "./offers";
import { FAQ } from "./faq";

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

const sameAs = [SITE.x, SITE.github, SITE.appStoreDeveloper, SITE.linkedin].filter(Boolean);

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": SITE.url + "/#person",
  name: SITE.name,
  jobTitle: "Electrician and software builder",
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: "Louisville", addressRegion: "KY", addressCountry: "US" },
  memberOf: { "@type": "Organization", name: "IBEW Local 369" },
  sameAs,
});

export const professionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": SITE.url + "/#service",
  name: SITE.name + " · Software for trades and small business",
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  founder: { "@id": SITE.url + "/#person" },
  areaServed: "US",
  address: { "@type": "PostalAddress", addressLocality: "Louisville", addressRegion: "KY", addressCountry: "US" },
  priceRange: "$400 - $30,000",
  sameAs,
  makesOffer: OFFERS.map((o) => ({
    "@type": "Offer",
    name: o.name,
    description: o.short,
    url: SITE.url + "/services#" + o.id,
    priceCurrency: "USD",
    price: o.priceNum ?? o.priceMin,
    ...(o.priceMin ? { priceSpecification: { "@type": "PriceSpecification", minPrice: o.priceMin, priceCurrency: "USD" } } : {}),
    itemOffered: { "@type": "Service", name: o.name, serviceType: o.name, provider: { "@id": SITE.url + "/#person" } },
  })),
});

export const faqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Both apps verified via the iTunes lookup API on 2026-10-21.
export const mobileAppsSchema = () => [
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "ChargeRight",
    operatingSystem: "iOS",
    applicationCategory: "UtilitiesApplication",
    url: "https://apps.apple.com/us/app/chargeright/id6755695416",
    author: { "@id": SITE.url + "/#person" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "BendRight",
    operatingSystem: "iOS",
    applicationCategory: "UtilitiesApplication",
    url: "https://apps.apple.com/us/app/bendright/id6779847124",
    author: { "@id": SITE.url + "/#person" },
    offers: { "@type": "Offer", price: "6.99", priceCurrency: "USD" },
  },
];

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: SITE.url + it.path,
  })),
});
