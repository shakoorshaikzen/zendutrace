import { useHover } from '../hooks/useHover';
import AutoPlayVideo from './AutoPlayVideo.jsx';

function GetFreeLabelsLink({ closePanel, extraStyle }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      onClick={closePanel}
      href="#book"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '15px 28px',
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 700,
        color: '#fff',
        background: hovered ? '#DA4A10' : '#BC3E10',
        boxShadow: '0 2px 10px -2px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
        ...extraStyle,
      }}
      {...hoverProps}
    >
      Get 10 free labels <span style={{ fontSize: 16 }}>&#8594;</span>
    </a>
  );
}

function WatchLifecycleButton({ openDemo }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      onClick={openDemo}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '15px 26px',
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 600,
        color: '#fff',
        background: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.2)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background .18s',
      }}
      {...hoverProps}
    >
      Watch the lifecycle
    </button>
  );
}

const verticals = [
  { img: '/images/industries/manufacturing.webp', alt: 'XenTag label on a work-in-progress parts case in a precision factory', name: 'Manufacturing' },
  { img: '/images/industries/logistics-freight.webp', alt: 'XenTag label on palletized freight at a cross-dock', name: 'Shipping & Final Mile' },
  { img: '/images/industries/warehousing.webp', alt: 'XenTag label on a reusable tote in a warehouse', name: 'Distribution & Warehousing' },
  { img: '/images/industries/gray-market-security.webp', alt: 'XenTag label on a secure high-value electronics case', name: 'Gray-Market Protection' },
];

function NetworkGraphic({ mode }) {
  const cellular = mode === 'cellular';
  const accent = cellular ? '#00E5A0' : '#5CB3F8';
  return (
    <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', background: cellular ? 'linear-gradient(140deg,#191C17,#0A0C0D)' : 'linear-gradient(140deg,#1D1712,#0A0C0D)' }} aria-hidden>
      <svg viewBox="0 0 640 280" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => <path key={`v-${i}`} d={`M ${i * 64} 0 V 280`} />)}
          {Array.from({ length: 6 }, (_, i) => <path key={`h-${i}`} d={`M 0 ${i * 56} H 640`} />)}
        </g>
        <g stroke={accent} fill="none" strokeLinecap="round">
          {cellular ? (
            <>
              <circle cx="320" cy="144" r="24" strokeWidth="3" />
              <path d="M275 106a62 62 0 0 1 0 76M247 78a102 102 0 0 1 0 132M365 106a62 62 0 0 0 0 76M393 78a102 102 0 0 0 0 132" strokeWidth="3" opacity="0.72" />
            </>
          ) : (
            <>
              <path d="M320 140 150 72M320 140 492 62M320 140 118 212M320 140 520 214M320 140 320 40M320 140 320 242" strokeWidth="2" opacity="0.5" strokeDasharray="7 9" />
              {[[150,72],[492,62],[118,212],[520,214],[320,40],[320,242]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill={accent} stroke="rgba(255,255,255,.8)" strokeWidth="2" />)}
            </>
          )}
        </g>
        <circle cx="320" cy="140" r="19" fill={accent} />
        <circle cx="320" cy="140" r="34" fill="none" stroke={accent} strokeWidth="2" opacity="0.28" />
      </svg>
      <div style={{ position: 'absolute', left: 22, top: 20, fontFamily: 'var(--font-machine)', fontWeight: 700, fontSize: 12, color: accent, letterSpacing: '0.08em' }}>
        {cellular ? '29 COUNTRIES LIVE' : '100M+ RELAY DEVICES'}
      </div>
    </div>
  );
}

export default function TraceModal({ open, closePanel, openDemo }) {
  if (!open) return null;
  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={closePanel}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      aria-label="XenTag overview"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'rgba(6,9,16,0.66)',
        backdropFilter: 'blur(22px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
        padding: 'clamp(14px,3vw,44px) clamp(10px,2vw,24px)',
        animation: 'zfade .3s ease',
      }}
    >
      <div
        onClick={stop}
        style={{
          position: 'relative',
          maxWidth: 1180,
          margin: '0 auto',
          borderRadius: 26,
          background: '#08090B',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 60px 170px -50px rgba(0,0,0,0.95)',
          animation: 'zpop .4s cubic-bezier(.16,.7,.3,1)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={closePanel}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            zIndex: 20,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.16)',
            cursor: 'pointer',
            background: 'rgba(19,20,25,0.85)',
            color: '#fff',
            fontSize: 16,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &#10005;
        </button>
        <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto', padding: 'clamp(38px,4vw,60px) clamp(22px,4vw,52px) clamp(40px,5vw,60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 26 }}>
            <img src="/images/xentag-logo-white.png" alt="XenTag" style={{ height: 30, width: 'auto', display: 'block' }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>
              Global tracking
            </span>
          </div>

          {/* hero */}
          <div className="xt-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,4vw,56px)', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(36px,5.2vw,68px)', lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0 }}>
                Track. <span style={{ color: '#5CB3F8' }}>Trace.</span> Deliver.
              </h2>
              <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.62, color: 'rgba(255,255,255,0.72)', maxWidth: '33rem' }}>
              Peel-and-stick smart labels add location, temperature and shock signals to pallets, parcels and high-value assets across supported routes, all in one operational view. Use the crowdsourced Bluetooth network or direct cellular reporting.
              </p>
              <div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <GetFreeLabelsLink closePanel={closePanel} />
                <WatchLifecycleButton openDemo={openDemo} />
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 44px 100px -40px rgba(10,11,14,0.85)', background: '#0B0C10' }}>
              <AutoPlayVideo
                src="/assets/xentag-film.mp4"
                poster="/assets/xentag-film-poster.webp"
                controls
                style={{ display: 'block', width: '100%', height: 'auto' }}
                aria-label="XenTag product film"
              />
            </div>
          </div>

          {/* stats */}
          <div className="xt-stats" style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            <div style={{ borderRadius: 18, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(30px,2.6vw,40px)', color: '#5CB3F8', lineHeight: 1 }}>100M+</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Crowdsourced BLE nodes in the XenTag network, coverage that already exists.</p>
            </div>
            <div style={{ borderRadius: 18, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(30px,2.6vw,40px)', color: '#F9762F', lineHeight: 1 }}>29</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Countries live today, with global reach across Bluetooth and cellular coverage.</p>
            </div>
            <div style={{ borderRadius: 18, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(30px,2.6vw,40px)', color: '#00E5A0', lineHeight: 1 }}>1 yr</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Battery life from a paper-thin label. Peel, stick and forget.</p>
            </div>
            <div style={{ borderRadius: 18, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(30px,2.6vw,40px)', color: '#FFFFFF', lineHeight: 1 }}>&minus;60&deg;</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Temperature logging built in, from cold chain to cell &amp; gene therapies.</p>
            </div>
          </div>

          {/* how it works */}
          <div style={{ marginTop: 88 }}>
            <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 36px' }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff' }}>
                Apply. Move. Monitor.
              </h3>
            </div>
            <div className="xt-verticals" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0B0C10' }}>
                <img src="/images/industries/cold-chain.webp" alt="XenTag label applied to a temperature-sensitive shipment" width="1536" height="1024" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>1 &middot; Apply</div>
                  <p style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)' }}>Scan the QR, then press the paper-thin label onto the case, pallet or parcel.</p>
                </div>
              </div>
              <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0B0C10' }}>
                <img src="/images/industries/logistics-freight.webp" alt="XenTag labels moving with freight" width="1536" height="1024" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>2 &middot; Move</div>
                  <p style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)' }}>The same label stays with the shipment through handling, line haul and final mile.</p>
                </div>
              </div>
              <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0B0C10' }}>
                <img src="/images/platform-asset-monitoring.png" alt="The production asset-monitoring platform showing mapped assets" width="1440" height="996" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>3 &middot; Monitor</div>
                  <p style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)' }}>Review location and condition events in the production asset-monitoring platform.</p>
                </div>
              </div>
            </div>
          </div>

          {/* connectivity */}
          <div className="xt-flow" style={{ marginTop: 88, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,3vw,44px)' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0B0C10' }}>
              <NetworkGraphic mode="bluetooth" />
              <div style={{ padding: '24px 26px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 999, background: 'rgba(92,179,248,0.14)', border: '1px solid rgba(92,179,248,0.3)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#9CCDFA' }}>
                  Bluetooth
                </div>
                <h4 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: '#fff' }}>XenTag network labels</h4>
                <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>Ultra-thin, year-long battery. Location relayed by 100M+ crowdsourced nodes, with no gateways to buy.</p>
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0B0C10' }}>
              <NetworkGraphic mode="cellular" />
              <div style={{ padding: '24px 26px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 999, background: 'rgba(0,229,160,0.14)', border: '1px solid rgba(0,229,160,0.3)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#6EE7C0' }}>
                  Cellular
                </div>
                <h4 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: '#fff' }}>Independent cellular labels</h4>
                <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>For remote routes with no node density, position reports over the mobile network anywhere.</p>
              </div>
            </div>
          </div>

          {/* solutions */}
          <div style={{ marginTop: 88 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(22px,2.6vw,32px)', letterSpacing: '-0.02em', color: '#fff', textAlign: 'center' }}>
              Built for every leg of the chain
            </h3>
            <p style={{ marginTop: 12, textAlign: 'center', fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>From the plant floor to the final mile, and everything in between.</p>
            <div className="xt-verticals" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {verticals.map((v) => (
                <div key={v.name} style={{ position: 'relative', display: 'block', borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={v.img} alt={v.alt} width="1536" height="1024" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,11,14,0.78),transparent 55%)' }} />
                  <span style={{ position: 'absolute', left: 16, bottom: 14, fontWeight: 700, fontSize: 16, color: '#fff' }}>{v.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 72, borderRadius: 24, padding: 'clamp(40px,5vw,64px)', textAlign: 'center', background: 'linear-gradient(135deg,#14161C,#08090B)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff', maxWidth: '24ch', margin: '0 auto' }}>
              See every shipment. Prove every cold chain.
            </h3>
            <GetFreeLabelsLink closePanel={closePanel} extraStyle={{ marginTop: 28 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
