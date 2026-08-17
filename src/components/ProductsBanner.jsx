import { useHover } from '../hooks/useHover';
import { XenAuthMark, XenTagMark } from './Icons.jsx';

function ProductChip({ onClick, iconBg, icon, name, tagline }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      className="product-chip"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 24px 18px 18px',
        borderRadius: 12,
        border: hovered ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.12)',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'background .18s,border-color .18s,transform .18s',
        minWidth: 'min(100%, 280px)',
      }}
      {...hoverProps}
    >
      <span
        style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 10,
          background: iconBg,
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </span>
      <span className="product-chip-copy" style={{ minWidth: 0 }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: hovered ? 'translateX(3px)' : 'none', transition: 'transform .18s' }}>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#FF8A2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="product-chip-tagline" style={{ display: 'block', marginTop: 4, fontSize: 13.5, lineHeight: 1.4, color: 'rgba(255,255,255,0.62)' }}>{tagline}</span>
      </span>
    </button>
  );
}

export default function ProductsBanner({ openTrace, openXenAuth }) {
  return (
    <section style={{ background: '#0B0C0E', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        className="products-banner"
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '32px clamp(22px,4vw,44px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(20px,3vw,44px)',
          flexWrap: 'wrap',
        }}
      >
        <h2
          className="font-display"
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 'clamp(22px,2.2vw,30px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            maxWidth: '18ch',
          }}
        >
          Track what moves. <span style={{ color: '#FF8A2B' }}>Authenticate what matters.</span>
        </h2>
        <div className="products-banner-actions" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ProductChip
            onClick={openTrace}
            iconBg="rgba(194,65,12,0.22)"
            name="XenTag"
            tagline="Live tracking label · BLE + cellular"
            icon={<XenTagMark size={26} color="#FF8A2B" />}
          />
          <ProductChip
            onClick={openXenAuth}
            iconBg="rgba(13,148,136,0.2)"
            name="XenAuth"
            tagline="Tap-to-verify NFC · anti-counterfeit"
            icon={<XenAuthMark size={26} color="#2DD4BF" />}
          />
        </div>
      </div>
    </section>
  );
}
