import { integrations } from '../data.jsx';

function IntegrationChip({ ig }) {
  return (
    <div
      className="integration-cell"
      style={{
        '--chip': ig.chip,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 0,
        padding: '11px 14px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        transition: 'background .18s,border-color .18s',
      }}
    >
      <div
        className="integration-mark"
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 9,
          background: 'rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 12.5,
          letterSpacing: '0.02em',
          transition: 'background .18s,color .18s',
        }}
      >
        {ig.mono}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14.5, color: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap' }}>{ig.name}</div>
        <div style={{ marginTop: 1, fontSize: 12, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{ig.cat}</div>
      </div>
    </div>
  );
}

const BEAM_LEFT = [60, 155, 250, 345].map((y) => `M470 200 C 420 200, 380 ${y}, 310 ${y}`);
const BEAM_RIGHT = [60, 155, 250, 345].map((y) => `M530 200 C 580 200, 620 ${y}, 690 ${y}`);

function HubNode() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span aria-hidden style={{ position: 'absolute', width: 104, height: 104, borderRadius: '50%', border: '1px solid rgba(255,122,46,0.4)', animation: 'zping 2.6s ease-out infinite' }} />
      <div aria-hidden="true" style={{ position: 'relative', width: 150, borderRadius: 12, background: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '11px 13px', filter: 'drop-shadow(0 18px 30px rgba(10,11,14,0.55))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/images/xentag-logo.png" alt="" style={{ height: 12, width: 'auto', display: 'block' }} />
          <span style={{ display: 'inline-flex', width: 6, height: 6, borderRadius: '50%', background: '#1E8A5B' }} />
        </div>
        <svg viewBox="0 0 104 18" style={{ display: 'block', width: '100%', height: 15, marginTop: 9 }}>
          <g fill="#0F1114">
            <rect x="0" width="2" height="18" /><rect x="4" width="1" height="18" /><rect x="7" width="3" height="18" />
            <rect x="12" width="1" height="18" /><rect x="15" width="2" height="18" /><rect x="19" width="4" height="18" />
            <rect x="25" width="1" height="18" /><rect x="28" width="2" height="18" /><rect x="32" width="3" height="18" />
            <rect x="37" width="1" height="18" /><rect x="40" width="2" height="18" /><rect x="44" width="1" height="18" />
            <rect x="47" width="4" height="18" /><rect x="53" width="2" height="18" /><rect x="57" width="1" height="18" />
            <rect x="60" width="3" height="18" /><rect x="65" width="2" height="18" /><rect x="69" width="1" height="18" />
            <rect x="72" width="2" height="18" /><rect x="76" width="4" height="18" /><rect x="82" width="1" height="18" />
            <rect x="85" width="2" height="18" /><rect x="89" width="3" height="18" />
          </g>
        </svg>
        <div style={{ marginTop: 7, fontFamily: 'var(--font-machine)', fontSize: 10, fontWeight: 700, color: '#0F1114', letterSpacing: '0.06em' }}>XT-4821 · LIVE</div>
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section id="integrations" className="integrations-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 48px' }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#0F1114' }}>
          Works with the tools <span style={{ color: '#C2410C' }}>you already run</span>
        </h2>
        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: '#4B5259', maxWidth: '40rem' }}>
          Push live location, temperature and events into the systems your team lives in, or pull them through an open REST API and webhooks.
        </p>
      </div>
      <div className="integ-bento" style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0A0B0E' }}>
      <div className="integ-hub" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 'clamp(18px,4vw,60px)', alignItems: 'stretch', padding: '36px clamp(20px,3.5vw,44px)' }}>
        <svg className="integ-beams" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {[...BEAM_LEFT, ...BEAM_RIGHT].map((d, i) => (
            <g key={d}>
              <path d={d} pathLength="400" fill="none" stroke="rgba(255,122,46,0.3)" strokeWidth="1.4" />
              <path
                d={d}
                pathLength="400"
                fill="none"
                stroke="#FF7A2E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="14 386"
                style={{ animation: `beamflow 3.2s linear infinite`, animationDelay: `${(i % 4) * 0.55 + (i > 3 ? 0.28 : 0)}s` }}
              />
            </g>
          ))}
        </svg>
        <div className="integ-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          {integrations.slice(0, 4).map((ig) => (
            <IntegrationChip key={ig.name} ig={ig} />
          ))}
        </div>
        <HubNode />
        <div className="integ-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          {integrations.slice(4).map((ig) => (
            <IntegrationChip key={ig.name} ig={ig} />
          ))}
        </div>
      </div>
      <div className="api-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0F1114', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ padding: '44px 42px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(22px,2.4vw,30px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Build anything on the open API
          </h3>
          <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', maxWidth: '26rem' }}>
            Subscribe to any label&rsquo;s events, stream them to your endpoint, and drive your own dashboards, tickets and automations. No middleware required.
          </p>
          <p
            style={{
              marginTop: 22,
              fontFamily: "var(--font-machine)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            REST API <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>/</span> Webhooks <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>/</span> OAuth 2.0
          </p>
        </div>
        <div style={{ position: 'relative', padding: 32, background: '#15171B', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center' }}>
          <pre style={{ margin: 0, width: '100%', fontFamily: "var(--font-machine)", fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <span style={{ color: '#FF8A2B' }}>POST</span> /v1/labels/<span style={{ color: '#FFB37E' }}>LZ-4821</span>/subscribe
            {'\n\n'}
            {'{\n  '}
            <span style={{ color: '#FFB37E' }}>&quot;events&quot;</span>
            {': ['}
            <span style={{ color: 'rgba(255,255,255,0.88)' }}>&quot;location&quot;</span>
            {', '}
            <span style={{ color: 'rgba(255,255,255,0.88)' }}>&quot;temp_breach&quot;</span>
            {', '}
            <span style={{ color: 'rgba(255,255,255,0.88)' }}>&quot;shock&quot;</span>
            {'],\n  '}
            <span style={{ color: '#FFB37E' }}>&quot;webhook&quot;</span>
            {': '}
            <span style={{ color: 'rgba(255,255,255,0.88)' }}>&quot;https://hooks.acme.com/zendu&quot;</span>
            {'\n}'}
            {'\n\n'}
            <span style={{ color: '#2FBF83' }}>&rarr; 200 OK</span> <span style={{ color: 'rgba(255,255,255,0.45)' }}>&middot;</span> <span style={{ color: 'rgba(255,255,255,0.55)' }}>streaming live</span>
          </pre>
        </div>
      </div>
      </div>
    </section>
  );
}
