import { siteConfig } from "@/lib/config/site";

export function buildCanonical(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}

export function buildMeta({
  title,
  description,
  pathname
}: {
  title: string;
  description: string;
  pathname: string;
}) {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    canonical: buildCanonical(pathname),
    openGraph: {
      title,
      description,
      url: buildCanonical(pathname),
      siteName: siteConfig.name,
      locale: "zh_CN",
      type: "website"
    }
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildItemListSchema({
  title,
  items
}: {
  title: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url
    }))
  };
}

export function buildSoftwareApplicationSchema({
  name,
  description,
  url,
  category
}: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url
    },
    url
  };
}
