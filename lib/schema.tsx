// JSON-LD generators. Person + Organization + Service shared everywhere.
// Article + FAQPage scoped per route. Boosts AI citation rate ~4.2x vs basic markup
// (per AEO consensus 2026).

import { OFFERS } from "./offers";

export const SITE = {
  name: "Jason Walls",
  url: "https://jason-walls.vercel.app", // update on domain swap
  tagline: "Sites. iOS apps. AI tools. Built by a Master Electrician.",
  description:
    "A working Master Electrician who ships software with Claude. Websites, iOS apps, AI tools, and agent infrastructure — built fixed-fee, the way an electrician charges. Pay for the build, not the build time.",
};

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jason Walls",
  alternateName: "AI-Native Builder",
  jobTitle: "Master Electrician + AI Builder",
  description: SITE.description,
  url: SITE.url,
  worksFor: {
    "@type": "Organization",
    name: "IBEW Local 369",
  },
  knowsAbout: [
    "Web application development (Next.js, React, TypeScript)",
    "iOS app development (Capacitor)",
    "AI workflow design",
    "Claude Code",
    "Anthropic Claude API",
    "Stripe integration",
    "Custom agent infrastructure (MCP servers, knowledge graphs)",
    "Electrical engineering",
    "EV charging infrastructure",
    "NEC 220.82 load calculations",
    "Fixed-fee software delivery",
  ],
  sameAs: [
    "https://x.com/jason_walls",
    "https://www.linkedin.com/in/jason-walls",
    "https://github.com/jasonwalls",
  ],
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name + " · AI Builds",
  url: SITE.url,
  description: SITE.description,
  founder: { "@type": "Person", name: "Jason Walls" },
});

export const servicesSchema = () =>
  OFFERS.map((o) => {
    const price = o.priceMin ?? o.priceNum ?? 0;
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: o.name,
      description: o.short,
      provider: { "@type": "Person", name: "Jason Walls" },
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: SITE.url + o.bookHref,
        ...(o.recurring
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price,
                priceCurrency: "USD",
                unitText: "MONTH",
                billingDuration: "P1M",
              },
            }
          : o.priceMin
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: o.priceMin,
                  priceCurrency: "USD",
                },
              }
            : {}),
      },
    };
  });

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (
  trail: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: t.url,
  })),
});

export const productSchema = (p: {
  name: string;
  description: string;
  priceNum: number;
  url: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  category: p.category,
  brand: { "@type": "Brand", name: "Jason Walls" },
  offers: {
    "@type": "Offer",
    price: p.priceNum,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: p.url,
    seller: { "@type": "Person", name: "Jason Walls" },
  },
});

export const articleSchema = (a: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.headline,
  description: a.description,
  author: { "@type": "Person", name: "Jason Walls" },
  datePublished: a.datePublished,
  dateModified: a.dateModified,
  mainEntityOfPage: { "@type": "WebPage", "@id": a.url },
});

// Helper: emit a <script type="application/ld+json"> element from a server component
export const JsonLd = ({ data }: { data: object | object[] }) => {
  const json = Array.isArray(data) ? data : [data];
  return json.map((d, i) => (
    <script
      key={i}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
    />
  ));
};
