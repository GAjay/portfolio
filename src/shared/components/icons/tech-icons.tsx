type TechIconProps = {
  slug: string;
};

export function TechIcon({ slug }: TechIconProps) {
  return (
    <img
      src={`/assets/tech/${slug}.svg`}
      alt=""
      className="tech-svg"
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      draggable={false}
      aria-hidden
    />
  );
}
