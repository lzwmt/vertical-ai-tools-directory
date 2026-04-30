export function resolveAssetPath(path: string) {
  const baseUrl = import.meta.env.R2_PUBLIC_BASE_URL;
  if (!baseUrl || path.startsWith("http")) {
    return path;
  }
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
