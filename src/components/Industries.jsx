import { industryData } from '../data.jsx';

const inds = industryData();
const tabBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  textAlign: 'left',
  padding: '17px 20px',
  borderRadius: 0,
  cursor: 'pointer',
  fontFamily: "var(--font-body)",
  transition: 'background .2s,color .2s',
  background: 'none',
};

export default function Industries({ activeInd, setActiveInd }) {
  const aInd = inds[activeInd] || inds[0];

  return (
    <section id="industries" className="industries-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 48px' }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#0F1114' }}>
          One label, <span style={{ color: '#C2410C' }}>every operation</span>
        </h2>
        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: '#4B5259', maxWidth: '42rem' }}>
          Pick an operation to see exactly how a single XenTag label works in the field.
        </p>
      </div>
      <div className="ind-explorer" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 26, alignItems: 'stretch' }}>
        <div className="industry-tabs" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inds.map((t, i) => {
            const active = i === activeInd;
            return (
              <button
                key={t.name}
                onClick={() => setActiveInd(i)}
                className="industry-tab"
                aria-pressed={active}
                style={{
                  ...tabBase,
                  border: active ? '1px solid rgba(194,65,12,0.45)' : '1px solid rgba(13,16,20,0.08)',
                  background: active ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                  boxShadow: active ? '0 16px 40px -26px rgba(13,16,20,0.4)' : 'none',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: active ? '#9A3412' : '#5C636B',
                  }}
                >
                  {t.iconEl}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: active ? 700 : 600, fontSize: 16, color: active ? '#9A3412' : '#0F1114' }}>{t.name}</span>
              </button>
            );
          })}
        </div>
        <div
          className="industry-stage"
          style={{
            position: 'relative',
            borderRadius: 22,
            overflow: 'hidden',
            border: '1px solid rgba(13,16,20,0.08)',
            minHeight: 440,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 30px 80px -50px rgba(13,16,20,0.5)',
            background: '#0A0B0E',
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              key={aInd.photo}
              src={aInd.photo}
              alt={`XenTag smart label in ${aInd.name.toLowerCase()} operations`}
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'imgsettle .5s cubic-bezier(.22,1,.36,1)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(9,10,13,0.12),rgba(9,10,13,0.88))' }} />
          </div>
          <div style={{ position: 'relative', padding: 40 }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff' }}>
              {aInd.name}
            </h3>
            <p style={{ marginTop: 12, fontSize: 'clamp(15px,1.15vw,17px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: '34rem' }}>{aInd.long}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
