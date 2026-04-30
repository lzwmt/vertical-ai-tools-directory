import type { APIRoute } from "astro";
import { isDatabaseConfigured } from "@/lib/db/client";
import { recordOutboundClick } from "@/lib/analytics/click";
import { outboundClickSchema } from "@/lib/validation/forms";

export const POST: APIRoute = async ({ request }) => {
  const parsed = outboundClickSchema.safeParse(await request.json());
  if (!parsed.success) {
    return new Response(JSON.stringify({ issues: parsed.error.issues }), { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return new Response(null, { status: 202 });
  }

  await recordOutboundClick(parsed.data);
  return new Response(null, { status: 204 });
};
