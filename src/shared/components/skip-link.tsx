import { withBasePath } from "@/shared/config/base-path";

export function SkipLink() {
  return (
    <a href={withBasePath("/#main-content")} className="skip-link">
      Skip to main content
    </a>
  );
}
