/** From `NEXT_PUBLIC_BASE_PATH` (e.g. `/portfolio` on GitHub project Pages). */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function withBasePath(href: string): string {
  if (!basePath || href.startsWith("http")) return href;
  if (href.startsWith("/#")) return `${basePath}${href}`;
  if (href.startsWith("#")) return `${basePath}/${href}`;
  if (href.startsWith("/")) return `${basePath}${href}`;
  return `${basePath}/${href}`;
}

/** `public/` files (images, icons) — must include basePath on GitHub project Pages. */
export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return withBasePath(path);
}
