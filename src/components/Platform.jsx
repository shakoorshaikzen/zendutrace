import { CheckIcon } from './Icons.jsx';

export default function Platform() {
  return (
    <section id="platform" className="platform-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      {/* The section announces itself in bone like every other one; the console
          below is evidence for the section, not the section itself. Previously
          the only h2 on the page that lived inside a dark box, at a smaller
          size — which broke both the One Scale Rule and the reader's scan. */}
      <div className="section-heading">
        <h2 style={{ margin: 0, color: '#14110D' }}>The signal lands where your team <span className="h2-ember">already works</span></h2>
        <p style={{ marginTop: 14, color: '#3B352D' }}>
          Built on the production asset-monitoring platform running across the ZenduIT and GoFleet network.
        </p>
      </div>
      <div
        className="platform-grid"
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          background: '#151210',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 1px 3px rgba(18,17,16,0.04),0 14px 32px -18px rgba(18,17,16,0.22)',
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          alignItems: 'center',
        }}
      >
        <div className="platform-copy" style={{ padding: '56px 46px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', fontStretch: '100%', lineHeight: 'calc(1em + 4px)', letterSpacing: 'var(--ls-title)', color: '#F5F2EA' }}>
            XenTag signals, inside the view your team already runs
          </h3>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.64, color: 'rgba(255,255,255,0.7)', maxWidth: '26rem' }}>
            XenTag pilots add piece-level location and condition to the same operational picture, so nobody learns a second system.
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Live location, temperature & dwell time per asset', 'Geofence, tamper & breach alerts to your phone', 'Audit-ready history, open API & webhooks'].map((line) => (
              <div key={line} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13.5, color: 'rgba(255,255,255,0.82)' }}>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
                  <CheckIcon color="#F9762F" />
                </span>
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="platform-shot" style={{ position: 'relative', padding: '48px 40px 56px 8px', background: 'transparent', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 34px 60px rgba(0,0,0,0.6)' }}>
            <img
              src="/images/platform-dashboard.webp"
              alt="Production ZenduIT asset-monitoring dashboard showing mapped assets and trip status"
              width="1440"
              height="996"
              loading="lazy"
              decoding="async"
              style={{ display: 'block', width: '109%', maxWidth: 'none', height: 'auto', marginLeft: '-5.5%', marginTop: '-1.5%' }}
            />
          </div>
          <p
            className="platform-caption"
            style={{
              marginTop: 12,
              alignSelf: 'flex-end',
              fontFamily: "var(--font-body)",
              fontSize: 13.5,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: '#2FBF83' }} />
            Production platform view
          </p>
        </div>
      </div>
    </section>
  );
}
