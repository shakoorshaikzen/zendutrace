export default function TrustBar({ trustLoop }) {
  return (
    <section style={{ borderTop: '1px solid rgba(13,16,20,0.06)', borderBottom: '1px solid rgba(13,16,20,0.06)', background: 'rgba(255,255,255,0.6)', overflow: 'hidden' }}>
      <div className="mq-row mq-mask" style={{ overflow: 'hidden', padding: '17px 0' }}>
        <div className="mq-track" style={{ display: 'flex', alignItems: 'center', animation: 'mqright 44s linear infinite' }}>
          {trustLoop.map((t, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0 30px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <span style={{ display: 'inline-flex' }}>{t.iconEl}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: '0.01em', color: '#2F343A' }}>{t.textEl}</span>
              </div>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
