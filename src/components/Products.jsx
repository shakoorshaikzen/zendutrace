import { useHover } from '../hooks/useHover';
import { XenAuthMark } from './Icons.jsx';

function ExploreXenTagButton({ openTrace }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      className="product-explore"
      onClick={openTrace}
      style={{
        marginTop: 26,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 12 : 8,
        color: '#9A3412',
        fontSize: 14.5,
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
      Explore XenTag &#8594;
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
        marginTop: 26,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? 12 : 8,
        color: '#1C1F23',
        fontSize: 14.5,
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
      Explore XenAuth &#8594;
    </button>
  );
}

export default function Products({ openTrace, openXenAuth }) {
  return (
    <section id="products" className="products-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '100px 32px 44px' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 52px' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 'clamp(32px,4.2vw,52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#0F1114',
          }}
        >
          Two labels. <span style={{ color: '#C2410C' }}>One job.</span>
        </h2>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: '#4B5259' }}>
          Keep high-value goods tracked in transit and provably authentic on arrival.
        </p>
      </div>
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* XenTag */}
        <div
          className="product-card product-card--trace"
          style={{
            position: 'relative',
            borderRadius: 22,
            padding: 36,
            background: '#FBF5EF',
            border: '1px solid rgba(194,65,12,0.22)',
            boxShadow: '0 1px 2px rgba(13,16,20,0.03),0 24px 60px -34px rgba(13,16,20,0.28)',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="product-card-visual" style={{ marginBottom: 26, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 22, borderRadius: 16, background: '#FBF3EC' }}>
              <div aria-hidden="true" style={{ width: '100%', maxWidth: 300, borderRadius: 14, background: '#FFFFFF', filter: 'drop-shadow(0 18px 22px rgba(13,16,20,0.28))', border: '1px solid rgba(13,16,20,0.08)', padding: '15px 17px', transform: 'rotate(-3deg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <img src="/images/xentag-logo.png" alt="XenTag" style={{ height: 15, width: 'auto', display: 'block' }} />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#1E8A5B' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E8A5B' }} />
                    LIVE
                  </span>
                </div>
                <svg viewBox="0 0 260 56" style={{ display: 'block', width: '100%', height: 'auto', marginTop: 12 }}>
                  <path d="M10 38 Q40 8 70 38 T130 38 T190 38 T250 38" fill="none" stroke="rgba(194,65,12,0.5)" strokeWidth="2" />
                  <circle cx="10" cy="38" r="3" fill="#C2410C" />
                  <circle cx="250" cy="38" r="3" fill="#C2410C" />
                  <g>
                    <path d="M206 20a11 11 0 0 1 15 0" stroke="#0284C7" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                    <path d="M210 24a6 6 0 0 1 7 0" stroke="#0284C7" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                    <circle cx="213.5" cy="28" r="1.6" fill="#0284C7" />
                  </g>
                </svg>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 8 }}>
                  <svg width="104" height="24" viewBox="0 0 104 24">
                    <g fill="#0F1114">
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
                  <div style={{ fontFamily: 'var(--font-machine)', fontSize: 11, fontWeight: 700, color: '#2F343A' }}>XT-48192</div>
                </div>
              </div>
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: '#0F1114' }}>XenTag&#8482;</h3>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.62, color: '#4B5259', maxWidth: '26rem' }}>
              Peel-and-stick tracking for high-value goods with real-time location, temperature and shock. One charge lasts a full year, with no line of sight and no infrastructure to install.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(194,65,12,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                Live GPS + BLE positioning, 3&nbsp;m precision
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(194,65,12,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                Temperature &amp; shock monitoring with alerts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(194,65,12,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                1-year battery &middot; global LTE-M coverage
              </li>
            </ul>
            <ExploreXenTagButton openTrace={openTrace} />
          </div>
        </div>
        {/* XenAuth */}
        <div
          className="product-card product-card--auth"
          style={{
            position: 'relative',
            borderRadius: 22,
            padding: 36,
            background: '#FAFBFC',
            border: '1px solid rgba(13,16,20,0.11)',
            boxShadow: '0 1px 2px rgba(13,16,20,0.03),0 24px 60px -34px rgba(13,16,20,0.28)',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="product-card-visual" style={{ marginBottom: 26, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 22, borderRadius: 16, background: '#F1F7F5' }}>
              <div className="xenauth-card-mock" aria-hidden="true" style={{ width: '100%', maxWidth: 300, borderRadius: 14, background: '#FFFFFF', filter: 'drop-shadow(0 18px 22px rgba(13,16,20,0.28))', border: '1px solid rgba(13,16,20,0.08)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16, transform: 'rotate(2.5deg)' }}>
                <div className="xenauth-card-mark" style={{ position: 'relative', flexShrink: 0, width: 78, height: 78, borderRadius: 14, overflow: 'hidden', background: '#111111', border: '1px solid rgba(13,16,20,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XenAuthMark size={42} color="#2DD4BF" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 700, color: '#0F1114' }}>XenAuth&#8482;</span>
                    <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.05em', color: '#0D9488', background: 'rgba(13,148,136,0.12)', padding: '2px 6px', borderRadius: 5 }}>VERIFIED</span>
                  </div>
                  <div style={{ marginTop: 5, fontSize: 10.5, color: '#5C636B' }}>NTAG 424 DNA &middot; secure element</div>
                  <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#1C1F23' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11V7a3 3 0 0 1 6 0v4" stroke="#1C1F23" strokeWidth="1.7" />
                      <rect x="6" y="11" width="12" height="9" rx="2" stroke="#1C1F23" strokeWidth="1.7" />
                    </svg>
                    TAP TO VERIFY
                  </div>
                </div>
              </div>
            </div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: '#0F1114' }}>XenAuth&#8482;</h3>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.62, color: '#4B5259', maxWidth: '26rem' }}>
              Tap-to-verify authentication on a secure NFC chip puts product information, origin and proof of custody one tap away, with no app download. Cryptographically signed and ready for the EU Digital Product Passport.
            </p>
            <ul style={{ listStyle: 'none', marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(13,148,136,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                Unclonable, tamper-evident secure element
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(13,148,136,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                Tap-to-verify with any phone, no app needed
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14.5, color: '#2F343A' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(13,148,136,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                EU DPP-ready &middot; resale, warranty &amp; loyalty
              </li>
            </ul>
            <ExploreXenAuthButton openXenAuth={openXenAuth} />
          </div>
        </div>
      </div>
    </section>
  );
}
