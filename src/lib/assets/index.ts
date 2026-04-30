import { getAssetsBaseUrl } from "@/lib/config/env";

export function resolveAssetPath(path: string) {
  const baseUrl = getAssetsBaseUrl();
  if (!baseUrl || path.startsWith("http")) {
    return path;
  }
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
