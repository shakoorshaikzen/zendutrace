function IncidentCard({ x, ariaHidden }) {
  return (
    <div
      className="incident-card"
      aria-hidden={ariaHidden || undefined}
      style={{
        flexShrink: 0,
        borderRadius: 12,
        padding: '14px 20px',
        background: 'rgba(255,255,255,0.045)',
        border: '1px solid rgba(255,255,255,0.09)',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1, letterSpacing: '-0.02em', color: x.color, flexShrink: 0, whiteSpace: 'nowrap' }}>
        {x.stat}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em', color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap' }}>{x.label}</div>
        <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.58)', whiteSpace: 'nowrap' }}>{x.source}</div>
      </div>
    </div>
  );
}

function LogoRun({ items, ariaHidden }) {
  return (
    <div style={{ display: 'flex', flexShrink: 0, gap: 14, paddingRight: 14 }}>
      {items.map((x, i) => (
        <IncidentCard key={i} x={x} ariaHidden={ariaHidden} />
      ))}
    </div>
  );
}

export default function RiskSection({ incidents }) {
  return (
    <section id="risk" className="night-surface" style={{ padding: '52px 0 56px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto', padding: '0 clamp(24px,4vw,48px)' }}>
        <div style={{ maxWidth: '46rem', margin: '0 auto 30px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px,2.6vw,32px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: '#F5F7FB' }}>
            Flying blind is <span style={{ color: '#FF7A2E' }}>expensive</span>
          </h2>
          <p style={{ marginTop: 10, fontSize: 'clamp(13.5px,1vw,15px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
            What the public record shows, and what a $10 label helps prevent.
          </p>
        </div>
      </div>
      <div className="mq-row mq-mask" style={{ overflow: 'hidden' }}>
        <div className="mq-track" style={{ display: 'flex', animation: 'mqleft 64s linear infinite' }}>
          <LogoRun items={incidents} />
          <LogoRun items={incidents} ariaHidden />
        </div>
      </div>
    </section>
  );
}
