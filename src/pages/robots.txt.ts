import type { APIRoute } from "astro";
import { siteConfig } from "@/lib/config/site";

export const GET: APIRoute = async () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${siteConfig.url}/sitemap-index.xml`);
