function readRuntimeEnv(key: keyof ImportMetaEnv) {
  const runtimeValue = process.env[key];

  if (typeof runtimeValue === "string" && runtimeValue.length > 0) {
    return runtimeValue;
  }

  return import.meta.env[key];
}

export function getPublicSiteUrl() {
  return readRuntimeEnv("PUBLIC_SITE_URL");
}

export function getDatabaseUrl() {
  return readRuntimeEnv("DATABASE_URL");
}

export function getResendApiKey() {
  return readRuntimeEnv("RESEND_API_KEY");
}

export function getResendAudienceEmail() {
  return readRuntimeEnv("RESEND_AUDIENCE_EMAIL");
}

export function getResendFromEmail() {
  return readRuntimeEnv("RESEND_FROM_EMAIL");
}

export function getAssetsBaseUrl() {
  return readRuntimeEnv("R2_PUBLIC_BASE_URL");
}
