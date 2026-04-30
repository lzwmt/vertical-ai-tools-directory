import type { APIRoute, GetStaticPaths } from "astro";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => [{ params: { slug: "content-workflow" } }];

export const GET: APIRoute = async ({ redirect }) => redirect("/use-cases/content-workflow", 302);
