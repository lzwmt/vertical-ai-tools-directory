import "../.astro/types.d.ts";
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly DATABASE_URL?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_AUDIENCE_EMAIL?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly R2_PUBLIC_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
