import type { APIRoute } from "astro";
import { isDatabaseConfigured } from "@/lib/db/client";
import { isResendConfigured } from "@/lib/mail/resend";

export const GET: APIRoute = async () => {
  const assetDeliveryMode = import.meta.env.R2_PUBLIC_BASE_URL ? "r2" : "local-or-remote";

  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    checks: {
      siteUrlConfigured: Boolean(import.meta.env.PUBLIC_SITE_URL),
      databaseConfigured: isDatabaseConfigured(),
      resendConfigured: isResendConfigured(),
      assetDeliveryMode
    },
    notes: {
      screenshotStrategy:
        assetDeliveryMode === "r2"
          ? "Using R2-backed public asset URLs."
          : "Using repository public/ assets or direct remote image URLs."
    }
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
};
