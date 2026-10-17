/**
 * Resolves GitHub Pages base path for CI (see deploy workflow).
 * User site repo `owner.github.io` → ""; project repo → `/repo-name`.
 */
export function resolveGithubPagesBasePath() {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/$/, "");
  }
  if (process.env.GITHUB_PAGES !== "1") return "";
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  if (!repo || repo.endsWith(".github.io")) return "";
  return `/${repo}`;
}
