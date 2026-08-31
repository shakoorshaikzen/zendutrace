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
        padding: '16px 22px 16px 16px',
        borderRadius: 8,
        border: hovered ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.08)',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'background .18s,border-color .18s,transform .18s',
        minWidth: 'min(100%, 260px)',
      }}
      {...hoverProps}
    >
      <span
        style={{
          flexShrink: 0,
          width: 46,
          height: 46,
          borderRadius: 8,
          background: iconBg,
          border: '1px solid rgba(255,255,255,0.07)',
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
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#F66923" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="product-chip-tagline" style={{ display: 'block', marginTop: 4, fontSize: 13.5, lineHeight: 1.4, color: 'rgba(255,255,255,0.62)' }}>{tagline}</span>
      </span>
    </button>
  );
}

/* Isometric dieline: pallet → case → item, drawn in the same technical
   wireframe language as the how-it-works band. Shapes only, no SVG text. */
function HierarchyDiagram() {
  const ink = 'rgba(255,255,255,0.4)';
  const faint = 'rgba(255,255,255,0.16)';
  return (
    <svg viewBox="0 0 520 445" fill="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: 'auto', maxWidth: 520 }}>
      {/* ground reference */}
      <path d="M170 250 L330 342 L170 434 L10 342 Z" stroke={faint} strokeWidth="1" />

      {/* pallet slab */}
      <g stroke={ink} strokeWidth="1.1">
        <path d="M150 262 L262 326 L174 377 L62 313 Z" />
        <path d="M62 313 L62 323 L174 387 L174 377" />
        <path d="M174 387 L262 336 L262 326" />
        {/* slats */}
        <path d="M121 279 L233 343M92 296 L204 360" opacity="0.5" />
      </g>

      {/* two sealed cases riding the pallet */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1">
        <path d="M118 216 L156 238 L118 260 L80 238 Z M80 238 L80 264 L118 286 L118 260 M118 286 L156 264 L156 238" />
        <path d="M188 240 L220 258 L188 276 L156 258 Z M156 258 L156 280 L188 298 L188 276 M188 298 L220 280 L220 258" />
      </g>

      {/* aggregation links: pallet → case → item */}
      <path d="M196 232 Q250 190 292 166" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="4 6" />
      <path d="M382 96 Q404 74 421 62" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="4 6" />

      {/* hero case — the package XenTag follows */}
      <g stroke={ink} strokeWidth="1.2">
        <path d="M340 96 L418 141 L340 186 L262 141 Z" />
        <path d="M262 141 L262 203 L340 248 L340 186" />
        <path d="M340 248 L418 203 L418 141" />
        <path d="M301 118.5 L379 163.5" opacity="0.5" />
        <path d="M340 186 L340 248" opacity="0.5" />
      </g>
      {/* XenTag label on the case face, live */}
      <g stroke="#F9762F" strokeWidth="1.6">
        <path d="M356 196 L396 173 L396 199 L356 222 Z" fill="rgba(249,118,47,0.08)" />
      </g>
      <g stroke="#F9762F" strokeWidth="1.1">
        <path d="M363 201 l0 12M368.5 197.8 l0 12M374 194.6 l0 12M379.5 191.4 l0 12M385 188.2 l0 12" />
      </g>
      {/* radio: the case reports live */}
      <g stroke="#F9762F" strokeWidth="1.6" strokeLinecap="round">
        <path d="M424 128 a13 13 0 0 1 0 18" />
        <path d="M432 120 a24 24 0 0 1 0 34" />
      </g>

      {/* the item inside — XenAuth proves it */}
      <g stroke={ink} strokeWidth="1.1">
        <path d="M442 22 L471 39 L442 56 L413 39 Z" />
        <path d="M413 39 L413 63 L442 80 L442 56" />
        <path d="M442 80 L471 63 L471 39" />
      </g>
      {/* teal secure tap */}
      <g stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round">
        <path d="M449 62 a7 7 0 0 1 7 4" />
        <path d="M446 69 a12 12 0 0 1 12 7" />
      </g>
      <circle cx="456" cy="78" r="2.4" fill="#2DD4BF" />
      <circle cx="442" cy="49" r="6" fill="none" stroke="#2DD4BF" strokeWidth="1.4" />
      <circle cx="442" cy="49" r="2.6" fill="#2DD4BF" />
    </svg>
  );
}

/* Factory → DC → Store → Customer coverage handoff, in machine voice. */
function JourneyBar() {
  const mono = { fontFamily: 'var(--font-machine)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' };
  const nodes = [
    { label: 'FACTORY', at: '0%' },
    { label: 'DC', at: '33.4%' },
    { label: 'STORE', at: '66.7%' },
    { label: 'CUSTOMER', at: '100%' },
  ];
  return (
    <div aria-label="Coverage from factory to customer: XenTag tracks live to the store, XenAuth verifies beyond it" style={{ position: 'relative', paddingTop: 26, paddingBottom: 34 }}>
      {/* segment labels */}
      <span className="journey-label-a" style={{ ...mono, position: 'absolute', top: 0, left: '33.4%', transform: 'translateX(-50%)', color: '#F9762F', whiteSpace: 'nowrap' }}>XENTAG &middot; TRACKED LIVE</span>
      <span className="journey-label-b" style={{ ...mono, position: 'absolute', top: 0, left: '83.4%', transform: 'translateX(-50%)', color: '#8FD9C8', whiteSpace: 'nowrap' }}>XENAUTH &middot; VERIFIED</span>
      {/* track */}
      <div style={{ position: 'relative', height: 2, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '66.7%', height: 2, background: '#F9762F' }} />
        <div style={{ position: 'absolute', top: 0, left: '66.7%', right: 0, height: 2, background: 'repeating-linear-gradient(90deg, rgba(245,242,234,0.75) 0 6px, transparent 6px 12px)' }} />
        {nodes.map((n, i) => (
          <span
            key={n.label}
            style={{
              position: 'absolute',
              top: -4,
              left: n.at,
              transform: i === 0 ? 'none' : i === nodes.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i === 3 ? '#2DD4BF' : '#F9762F',
              border: '2px solid #171412',
            }}
          />
        ))}
      </div>
      {/* node labels */}
      {nodes.map((n, i) => (
        <span
          key={n.label}
          style={{
            ...mono,
            position: 'absolute',
            bottom: 0,
            left: n.at,
            transform: i === 0 ? 'none' : i === nodes.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}

export default function ProductsBanner({ openTrace, openXenAuth }) {
  return (
    <section
      className="night-surface omni-band"
      aria-label="One platform for package tracking and product authentication"
      style={{ position: 'relative', background: '#171412', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="omni-grid"
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '78px clamp(22px,4vw,44px) 10px',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(32px,4vw,56px)',
          alignItems: 'center',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(34px,4.4vw,56px)',
              lineHeight: 1.04,
              letterSpacing: '-0.012em',
              color: '#FFFFFF',
            }}
          >
            The package.
            <br />
            The product inside.
            <br />
            <span className="h2-mark">One platform.</span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: '42ch' }}>
            Most tracking ends when the pallet is unwrapped. XenTag follows the case live. XenAuth proves what&rsquo;s inside.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['EU DPP READY', 'DSCSA', 'FSMA 204'].map((reg) => (
              <span
                key={reg}
                style={{
                  fontFamily: 'var(--font-machine)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.72)',
                  padding: '4px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {reg}
              </span>
            ))}
          </div>
          <div className="products-banner-actions" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ProductChip
              onClick={openTrace}
              iconBg="rgba(255,255,255,0.05)"
              name="XenTag"
              tagline="Tracks the case &middot; BLE + cellular, live"
              icon={<XenTagMark size={28} color="#EDE8E0" accent="#F66923" dark />}
            />
            <ProductChip
              onClick={openXenAuth}
              iconBg="rgba(255,255,255,0.05)"
              name="XenAuth"
              tagline="Verifies the item &middot; cryptographic NFC"
              icon={<XenAuthMark size={28} color="#EDE8E0" accent="#2DD4BF" dark />}
            />
          </div>
        </div>
        <div className="omni-diagram" style={{ minWidth: 0 }}>
          <HierarchyDiagram />
        </div>
      </div>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '34px clamp(22px,4vw,44px) 58px' }}>
        <JourneyBar />
      </div>
    </section>
  );
}
