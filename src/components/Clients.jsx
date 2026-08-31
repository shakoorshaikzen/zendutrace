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
    <section id="customers" style={{ background: 'var(--bone)', borderTop: '1px solid rgba(20,17,13,0.08)', borderBottom: '1px solid rgba(20,17,13,0.08)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px 0' }}>
        {/* Same heading voice and alignment as every other section h2. */}
        <div style={{ maxWidth: '54rem' }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#14110D', maxWidth: '22ch' }}>
            Trusted across the ZenduIT + GoFleet network
          </h2>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: '#3B352D', maxWidth: '56ch' }}>
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
