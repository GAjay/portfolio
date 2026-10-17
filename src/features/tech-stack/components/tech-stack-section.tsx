import { RefSection } from "@/shared/components/ref-section";
import { TechStackCarousel } from "./tech-stack-carousel";

export function TechStackSection() {
  return (
    <RefSection
      id="stack"
      revealOrder={1}
      kicker="Tech stack"
      title="Tools I work with"
      description="Modern technologies for scalable, high-performance products."
    >
      <TechStackCarousel />
    </RefSection>
  );
}
