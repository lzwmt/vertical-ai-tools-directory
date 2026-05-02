import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection("use-cases");
  return pages.map((page) => ({ params: { slug: page.data.slug } }));
};

export const GET: APIRoute = async ({ params, redirect }) => redirect(`/best/${params.slug}`, 301);
