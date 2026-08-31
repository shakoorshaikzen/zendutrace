import { useHover } from '../hooks/useHover';
import { ArrowRightSmall, CheckIcon, XenAuthMark } from './Icons.jsx';

function SpecRow({ color = '#BC3E10', children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#3B352D', padding: '10px 0', borderBottom: '1px solid rgba(18,17,16,0.08)' }}>
      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
        <CheckIcon color={color} />
      </span>
      {children}
    </li>
  );
}

function ExploreXenTagButton({ openTrace }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      className="product-explore"
      onClick={openTrace}
      style={{
        marginTop: 24,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 12 : 8,
        color: '#8E2D10',
        fontSize: 13.5,
        fontWeight: 600,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'gap .18s',
      }}
      {...hoverProps}
    >
      Explore XenTag <ArrowRightSmall size={13} />
    </button>
  );
}

function ExploreXenAuthButton({ openXenAuth }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      className="product-explore"
      onClick={openXenAuth}
      style={{
        marginTop: 24,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 12 : 8,
        color: '#292219',
        fontSize: 13.5,
        fontWeight: 600,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'gap .18s',
      }}
      {...hoverProps}
    >
      Explore XenAuth <ArrowRightSmall size={13} />
    </button>
  );
}

export default function Products({ openTrace, openXenAuth }) {
  return (
    <section id="products" className="products-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 'clamp(34px,4.4vw,56px)',
            lineHeight: 1.04,
            letterSpacing: '-0.012em',
            color: '#14110D',
          }}
        >
          Two labels. One job.
        </h2>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: '#3B352D' }}>
          Keep high-value goods tracked in transit and provably authentic on arrival.
        </p>
      </div>
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* XenTag */}
        <div
          className="product-card product-card--trace"
          style={{
            position: 'relative',
            borderRadius: 8,
            padding: 36,
            background: '#FFFFFF',
            border: '1px solid rgba(18,17,16,0.09)',
            boxShadow: '0 1px 2px rgba(20,17,13,0.03),0 28px 56px -40px rgba(20,17,13,0.35)',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="product-card-visual" style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 8, background: 'var(--cloud)' }}>
              <div aria-hidden="true" style={{ width: '100%', maxWidth: 300, borderRadius: 8, background: '#FFFFFF', filter: 'drop-shadow(0 18px 22px rgba(18,17,16,0.28))', border: '1px solid rgba(18,17,16,0.07)', padding: '15px 17px', transform: 'rotate(-3deg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <img src="/images/xentag-logo@2x.png" alt="XenTag" style={{ height: 15, width: 'auto', display: 'block' }} />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', color: '#1E8A5B' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E8A5B' }} />
                    LIVE
                  </span>
                </div>
                <svg viewBox="0 0 260 56" style={{ display: 'block', width: '100%', height: 'auto', marginTop: 12 }}>
                  <path d="M10 38 Q40 8 70 38 T130 38 T190 38 T250 38" fill="none" stroke="rgba(188,62,16,0.5)" strokeWidth="2" />
                  <circle cx="10" cy="38" r="3" fill="#BC3E10" />
                  <circle cx="250" cy="38" r="3" fill="#BC3E10" />
                  <g>
                    <path d="M206 20a11 11 0 0 1 15 0" stroke="#0284C7" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                    <path d="M210 24a6 6 0 0 1 7 0" stroke="#0284C7" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                    <circle cx="213.5" cy="28" r="1.6" fill="#0284C7" />
                  </g>
                </svg>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 8 }}>
                  <svg width="104" height="24" viewBox="0 0 104 24">
                    <g fill="#121110">
                      <rect x="0" width="2" height="24" />
                      <rect x="4" width="1" height="24" />
                      <rect x="7" width="3" height="24" />
                      <rect x="12" width="1" height="24" />
                      <rect x="15" width="2" height="24" />
                      <rect x="19" width="4" height="24" />
                      <rect x="25" width="1" height="24" />
                      <rect x="28" width="2" height="24" />
                      <rect x="32" width="3" height="24" />
                      <rect x="37" width="1" height="24" />
                      <rect x="40" width="2" height="24" />
                      <rect x="44" width="1" height="24" />
                      <rect x="47" width="4" height="24" />
                      <rect x="53" width="2" height="24" />
                      <rect x="57" width="1" height="24" />
                      <rect x="60" width="3" height="24" />
                      <rect x="65" width="2" height="24" />
                      <rect x="69" width="1" height="24" />
                      <rect x="72" width="2" height="24" />
                      <rect x="76" width="4" height="24" />
                      <rect x="82" width="1" height="24" />
                      <rect x="85" width="2" height="24" />
                      <rect x="89" width="3" height="24" />
                    </g>
                  </svg>
                  <div style={{ fontFamily: 'var(--font-machine)', fontSize: 11, fontWeight: 700, color: '#3B352D' }}>XT-48192</div>
                </div>
              </div>
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: '#121110' }}>XenTag&#8482;</h3>
            <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.62, color: '#3B352D', maxWidth: '26rem' }}>
              Peel-and-stick tracking for high-value goods with real-time location, temperature and shock. One charge lasts a full year, with no line of sight and no infrastructure to install.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 20, borderTop: '1px solid rgba(18,17,16,0.08)' }}>
              <SpecRow>Live GPS + BLE positioning, 3&nbsp;m precision</SpecRow>
              <SpecRow>Temperature &amp; shock monitoring with alerts</SpecRow>
              <SpecRow>1-year battery &middot; global LTE-M coverage</SpecRow>
            </ul>
            <ExploreXenTagButton openTrace={openTrace} />
          </div>
        </div>
        {/* XenAuth */}
        <div
          className="product-card product-card--auth"
          style={{
            position: 'relative',
            borderRadius: 8,
            padding: 36,
            background: '#FFFFFF',
            border: '1px solid rgba(18,17,16,0.09)',
            boxShadow: '0 1px 2px rgba(20,17,13,0.03),0 28px 56px -40px rgba(20,17,13,0.35)',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="product-card-visual" style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 8, background: 'var(--cloud)' }}>
              <div className="xenauth-card-mock" aria-hidden="true" style={{ width: '100%', maxWidth: 300, borderRadius: 8, background: '#FFFFFF', filter: 'drop-shadow(0 18px 22px rgba(18,17,16,0.28))', border: '1px solid rgba(18,17,16,0.07)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16, transform: 'rotate(2.5deg)' }}>
                <div className="xenauth-card-mark" style={{ position: 'relative', flexShrink: 0, width: 78, height: 78, borderRadius: 8, overflow: 'hidden', background: '#111111', border: '1px solid rgba(18,17,16,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XenAuthMark size={48} color="#EDE8E0" accent="#2DD4BF" dark />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 700, color: '#121110' }}>XenAuth&#8482;</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', color: '#0D9488', background: 'rgba(13,148,136,0.12)', padding: '2px 6px', borderRadius: 6 }}>VERIFIED</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 10, color: '#6B6156' }}>NTAG 424 DNA &middot; secure element</div>
                  <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: '#292219' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11V7a3 3 0 0 1 6 0v4" stroke="#292219" strokeWidth="1.8" />
                      <rect x="6" y="11" width="12" height="9" rx="2" stroke="#292219" strokeWidth="1.8" />
                    </svg>
                    TAP TO VERIFY
                  </div>
                </div>
              </div>
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: '#121110' }}>XenAuth&#8482;</h3>
            <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.62, color: '#3B352D', maxWidth: '26rem' }}>
              Tap-to-verify authentication on a secure NFC chip puts product information, origin and proof of custody one tap away, with no app download. Cryptographically signed and ready for the EU Digital Product Passport.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 20, borderTop: '1px solid rgba(18,17,16,0.08)' }}>
              <SpecRow color="#3B352D">Unclonable, tamper-evident secure element</SpecRow>
              <SpecRow color="#3B352D">Tap-to-verify with any phone, no app needed</SpecRow>
              <SpecRow color="#3B352D">EU DPP-ready &middot; resale, warranty &amp; loyalty</SpecRow>
            </ul>
            <ExploreXenAuthButton openXenAuth={openXenAuth} />
          </div>
        </div>
      </div>
    </section>
  );
}
