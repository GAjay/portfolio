import { CompaniesCarousel } from "./companies-carousel";

export function CompaniesBandSection() {
  return (
    <section
      id="companies"
      className="companies-strip"
      aria-label="Companies and brands"
    >
      <CompaniesCarousel variant="strip" />
    </section>
  );
}
