interface PlaceholderPageProps {
  title: string;
  description: string;
  items?: string[];
}

export function PlaceholderPage({ title, description, items = [] }: PlaceholderPageProps) {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <p className="eyebrow">页面骨架</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      {items.length > 0 && (
        <section className="page-section">
          <h2>后续模块</h2>
          <div className="placeholder-grid">
            {items.map((item) => (
              <div className="simple-card" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
