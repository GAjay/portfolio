import { assetPath } from "@/shared/config/base-path";
import type { Company } from "../data/companies";

type CompanyMarkProps = {
  company: Company;
};

export function CompanyMark({ company }: CompanyMarkProps) {
  const brand = `company-logo company-logo--${company.id}`;
  const mono = company.monoDark ? " company-logo--mono" : "";

  return (
    <span className="company-mark">
      {/* Native img — reliable sizing for SVG/PNG brand assets in the carousel */}
      <img
        src={assetPath(company.logo)}
        alt=""
        className={`${brand}${mono}`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
