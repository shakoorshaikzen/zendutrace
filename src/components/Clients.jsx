import { CLIENTS } from '../clientLogos.js';

function LogoRun({ ariaHidden }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 'clamp(64px,7vw,110px)', paddingRight: 'clamp(64px,7vw,110px)' }}>
      {CLIENTS.map((c) => (
        <img
          key={c.name + (ariaHidden ? '-b' : '')}
          aria-hidden={ariaHidden || undefined}
          src={c.src}
          alt={ariaHidden ? '' : c.name}
          title={c.name}
          style={{
            height: c.h,
            width: 'auto',
            display: 'block',
            flexShrink: 0,
            filter: 'grayscale(1)',
            mixBlendMode: 'multiply',
            opacity: 0.7,
            transition: 'filter .25s ease, opacity .25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'grayscale(0)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'grayscale(1)';
            e.currentTarget.style.opacity = '0.7';
          }}
        />
      ))}
    </div>
  );
}

export default function Clients() {
  return (
    <section id="customers" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(13,16,20,0.06)', borderBottom: '1px solid rgba(13,16,20,0.06)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 0.98, letterSpacing: '-0.025em', color: '#0F1114' }}>
            Trusted across the ZenduIT + GoFleet network
          </h2>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: '#5C636B', maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
            XenTag is built by the same operations team supporting fleets and field assets across North America.
          </p>
        </div>
      </div>
      <div className="mq-row mq-mask" style={{ overflow: 'hidden', padding: '56px 0 84px' }}>
        <div className="mq-track" style={{ display: 'flex', alignItems: 'center', animation: 'mqleft 38s linear infinite' }}>
          <LogoRun />
          <LogoRun ariaHidden />
        </div>
      </div>
    </section>
  );
}
