type ProjectPreviewProps = {
  variant: "banking" | "asriui" | "saas";
};

export function ProjectPreview({ variant }: ProjectPreviewProps) {
  if (variant === "asriui") {
    return (
      <div className="project-preview project-preview--asriui">
        <div className="project-preview__chrome">
          <span /><span /><span />
        </div>
        <div className="project-preview__body">
          <div className="project-preview__sidebar" />
          <div className="project-preview__main">
            <div className="project-preview__card" />
            <div className="project-preview__card project-preview__card--sm" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "banking") {
    return (
      <div className="project-preview project-preview--banking">
        <div className="project-preview__chrome">
          <span /><span /><span />
        </div>
        <div className="project-preview__body project-preview__body--bank">
          <div className="project-preview__hero-line" />
          <div className="project-preview__grid2">
            <div /><div />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="project-preview project-preview--saas">
      <div className="project-preview__chrome">
        <span /><span /><span />
      </div>
      <div className="project-preview__body">
        <div className="project-preview__chart" />
        <div className="project-preview__rows">
          <div /><div /><div />
        </div>
      </div>
    </div>
  );
}
