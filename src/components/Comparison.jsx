import { comparison } from '../data.jsx';
import { useHover } from '../hooks/useHover';

function CompareRow({ row, last }) {
  const [hovered, hoverProps] = useHover();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.35fr 1.1fr 1fr',
        alignItems: 'center',
        borderBottom: last ? 'none' : '1px solid rgba(13,16,20,0.08)',
        background: hovered ? 'rgba(194,65,12,0.028)' : 'transparent',
        transition: 'background .16s',
      }}
      {...hoverProps}
    >
      <div style={{ padding: '18px 8px 18px 0', fontSize: 15, fontWeight: 500, color: '#2F343A' }}>
        {row.feature}
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          padding: '18px 16px',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.015em',
          color: '#0F1114',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'rgba(194,65,12,0.04)',
          borderLeft: '1px solid rgba(194,65,12,0.22)',
          borderRight: '1px solid rgba(194,65,12,0.22)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {row.us}
      </div>
      <div
        style={{
          padding: '18px 12px',
          fontSize: 14.5,
          color: '#5C636B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {row.them}
      </div>
    </div>
  );
}

function SaveButton() {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href="#book"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        padding: '13px 16px',
        borderRadius: 12,
        background: hovered ? '#D2470A' : '#C2410C',
        color: '#fff',
        fontFamily: "var(--font-body)",
        fontSize: 14.5,
        fontWeight: 700,
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
      }}
      {...hoverProps}
    >
      Start with free labels &rarr;
    </a>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="comparison-section section-shell" style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 32px' }}>
      <div className="section-heading" style={{ maxWidth: '40rem', marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#0F1114' }}>
          <span style={{ color: '#C2410C' }}>XenTag</span> vs. traditional trackers
        </h2>
        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: '#4B5259', maxWidth: '36rem' }}>
          A $10 peel-and-stick label against a hardwired GPS unit, on cost, battery, setup, and where the signal shows up.
        </p>
      </div>

      {/* Cost lockup — the buyer’s first filter */}
      <div
        className="cmp-cost-lockup"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 20,
          alignItems: 'end',
          marginBottom: 36,
          paddingBottom: 28,
          borderBottom: '1px solid rgba(13,16,20,0.1)',
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#9A3412', marginBottom: 8 }}>XenTag</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(44px,5.5vw,64px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: '#0F1114', fontVariantNumeric: 'tabular-nums' }}>$10</span>
            <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>per label</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 14, color: '#5C636B' }}>Tracking included · 1-year battery · no install</div>
        </div>
        <div className="font-display" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C636B', paddingBottom: 14 }}>vs</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#5C636B', marginBottom: 8 }}>Legacy tracker</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, justifyContent: 'flex-end' }}>
            <span className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(44px,5.5vw,64px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: '#5C636B', fontVariantNumeric: 'tabular-nums' }}>$30+</span>
            <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#5C636B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>per unit</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 14, color: '#5C636B' }}>Hardwired · 3–6 month battery · separate portal</div>
        </div>
      </div>

      <div className="cmp-scroll" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1.1fr 1fr', alignItems: 'end', borderBottom: '1px solid rgba(13,16,20,0.12)', paddingBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C636B' }}>Criteria</div>
            <div style={{ textAlign: 'center', padding: '0 12px' }}>
              <img src="/images/xentag-logo.png" alt="XenTag" style={{ height: 22, width: 'auto', display: 'block', margin: '0 auto 6px' }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9A3412' }}>$10 smart label</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#4B5259' }}>Legacy tracker</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: '#5C636B' }}>Hardwired GPS</div>
            </div>
          </div>

          {comparison.map((row, i) => (
            <CompareRow key={row.feature} row={row} last={i === comparison.length - 1} />
          ))}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.35fr 1.1fr 1fr',
              alignItems: 'center',
              marginTop: 4,
              paddingTop: 18,
              borderTop: '1px solid rgba(13,16,20,0.12)',
            }}
          >
            <div style={{ padding: '8px 8px 8px 0', fontSize: 14, fontWeight: 600, color: '#2F343A' }}>
              Total 3-year cost of ownership
            </div>
            <div style={{ padding: '8px 12px', background: 'rgba(194,65,12,0.04)', borderLeft: '1px solid rgba(194,65,12,0.22)', borderRight: '1px solid rgba(194,65,12,0.22)' }}>
              <SaveButton />
            </div>
            <div style={{ padding: '8px 12px', textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#5C636B' }}>
              About 5&times; higher
            </div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 22, fontSize: 13, lineHeight: 1.5, color: '#5C636B', maxWidth: '62ch' }}>
        Legacy figures reflect a typical hardwired cellular GPS tracker over a 3-year deployment.
      </p>
    </section>
  );
}
