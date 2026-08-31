import { useEffect, useState } from 'react';

const INTENTS = {
  labels: {
    chip: '10 free labels',
    heading: 'Get 10 free labels',
    sub: (
      <>
        Starter roll ships free. First shipments go live on the map the same week, then <strong style={{ color: '#FFFFFF' }}>$10 per label with tracking included</strong>.
      </>
    ),
  },
  demo: {
    chip: '20-minute demo',
    heading: (
      <>
        Book a <span style={{ whiteSpace: 'nowrap' }}>20-minute</span> demo
      </>
    ),
    sub: (
      <>
        A walkthrough of the live platform built around your use case. We&rsquo;ll also ship <strong style={{ color: '#FFFFFF' }}>sample labels the same week</strong>.
      </>
    ),
  },
};

function IntentChip({ active, onClick, children, edge }) {
  const radius =
    edge === 'start' ? '9px 0 0 9px' : edge === 'end' ? '0 9px 9px 0' : 0;
  return (
    <button
      type="button"
      className="cta-intent"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '12px 22px',
        borderRadius: radius,
        border: 'none',
        borderRight: edge === 'end' ? 'none' : '1px solid rgba(255,255,255,0.12)',
        background: active ? '#C2410C' : 'transparent',
        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'background .18s,color .18s',
        minWidth: 148,
      }}
    >
      {children}
    </button>
  );
}

export default function CtaBanner({ openDemo }) {
  const [intent, setIntentState] = useState('labels');
  const copy = INTENTS[intent];

  // Nav/footer "Book a demo" buttons dispatch this so the section arrives preset.
  useEffect(() => {
    const onIntent = (e) => {
      if (e.detail === 'demo' || e.detail === 'labels') {
        setIntentState(e.detail);
      }
    };
    window.addEventListener('xt-intent', onIntent);
    return () => window.removeEventListener('xt-intent', onIntent);
  }, []);

  return (
    <section id="book" className="cta-section" style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 32px 94px' }}>
      <div className="cta-panel night-surface" style={{ position: 'relative', borderRadius: 26, overflow: 'hidden', padding: '66px 44px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="cta-intents"
            role="group"
            aria-label="Choose how to get started"
            style={{
              display: 'inline-flex',
              marginBottom: 28,
              borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}
          >
            <IntentChip active={intent === 'labels'} onClick={() => setIntentState('labels')} edge="start">{INTENTS.labels.chip}</IntentChip>
            <IntentChip active={intent === 'demo'} onClick={() => setIntentState('demo')} edge="end">{INTENTS.demo.chip}</IntentChip>
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 0.98, letterSpacing: '-0.025em', color: '#FFFFFF', maxWidth: '14ch', margin: '0 auto' }}>
            {copy.heading}
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.66, color: '#B9C0C8', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {copy.sub}
          </p>

          {/* Zoho CRM lead form (name + email), served from gofleet.com.
              The dm-zoho loader script in index.html watches the DOM and
              renders the form into this placeholder. The form only renders
              on xentag.com and its subdomains (server-side allowlist), so
              this stays empty on localhost / *.vercel.app previews. */}
          <div
            id="dm-zoho-form-embed"
            data-form-id="40608"
            className="cta-zoho"
            style={{ marginTop: 32, maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}
          />

          <div className="cta-meta" style={{ marginTop: 18, display: 'flex', gap: '10px 18px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>
            <span>No credit card</span>
            <span aria-hidden="true">&middot;</span>
            <span>Ships this week</span>
            <span aria-hidden="true">&middot;</span>
            <span>Reps &amp; resellers welcome</span>
            <span aria-hidden="true">&middot;</span>
            <button
              type="button"
              className="cta-watch"
              onClick={openDemo}
              style={{ background: 'none', border: 'none', color: '#B9C0C8', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', padding: 0 }}
            >
              Watch the lifecycle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
