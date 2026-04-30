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
