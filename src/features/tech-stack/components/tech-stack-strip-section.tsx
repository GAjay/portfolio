import { TechStackMarquee } from "./tech-stack-marquee";

export function TechStackStripSection() {
  return (
    <section id="stack" className="stack-strip" aria-label="Tech stack">
      <TechStackMarquee />
    </section>
  );
}
