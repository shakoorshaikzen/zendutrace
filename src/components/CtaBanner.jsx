import { useEffect, useRef, useState } from 'react';
import { useHover } from '../hooks/useHover';
import { useEmailCapture } from '../hooks/useEmailCapture';

const INTENTS = {
  labels: {
    chip: '10 free labels',
    heading: 'Get 10 free labels',
    sub: (
      <>
        Starter roll ships free. First shipments go live on the map the same week, then <strong style={{ color: '#FFFFFF' }}>$10 per label with tracking included</strong>.
      </>
    ),
    request: '10 free XenTag labels',
    button: 'Claim 10 free labels',
    done: 'Request received. We’ll confirm by email and ship your starter roll.',
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
    request: 'Book a 20-minute XenTag demo',
    button: 'Request a demo',
    done: 'Request received. We’ll reach out by email to schedule your demo.',
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

function SubmitButton({ label, sending }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="submit"
      className="cta-submit"
      disabled={sending}
      style={{
        padding: '15px 26px',
        borderRadius: 12,
        border: 'none',
        cursor: sending ? 'default' : 'pointer',
        fontFamily: "var(--font-body)",
        fontSize: 15.5,
        fontWeight: 700,
        color: '#fff',
        background: sending ? 'rgba(194,65,12,0.6)' : hovered ? '#D2470A' : '#C2410C',
        boxShadow: '0 2px 10px -2px rgba(0,0,0,0.4)',
        transform: hovered && !sending ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
        whiteSpace: 'nowrap',
      }}
      {...hoverProps}
    >
      {sending ? 'Sending…' : <>{label} <span style={{ fontSize: 16 }}>&#8594;</span></>}
    </button>
  );
}

export default function CtaBanner({ openDemo }) {
  const [intent, setIntentState] = useState('labels');
  const copy = INTENTS[intent];
  const { email, status, submit, onChange, reset, fallbackHref, honeypotProps } = useEmailCapture(copy.request);
  const resetRef = useRef(reset);
  resetRef.current = reset;

  // Switching intent clears any stale error/failed message from the previous request type.
  const setIntent = (next) => {
    setIntentState(next);
    reset();
  };

  // Nav/footer "Book a demo" buttons dispatch this so the form arrives preset.
  useEffect(() => {
    const onIntent = (e) => {
      if (e.detail === 'demo' || e.detail === 'labels') {
        setIntentState(e.detail);
        resetRef.current();
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
            <IntentChip active={intent === 'labels'} onClick={() => setIntent('labels')} edge="start">{INTENTS.labels.chip}</IntentChip>
            <IntentChip active={intent === 'demo'} onClick={() => setIntent('demo')} edge="end">{INTENTS.demo.chip}</IntentChip>
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 0.98, letterSpacing: '-0.025em', color: '#FFFFFF', maxWidth: '14ch', margin: '0 auto' }}>
            {copy.heading}
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.66, color: '#B9C0C8', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {copy.sub}
          </p>

          {status === 'done' ? (
            <div
              className="cta-success"
              role="status"
              aria-live="polite"
              style={{
                marginTop: 32,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '18px 32px',
                borderRadius: 14,
                background: 'rgba(47,191,131,0.1)',
                border: '1.5px solid rgba(47,191,131,0.45)',
              }}
            >
              <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: '50%', background: '#2FBF83', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F1114" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6" /></svg>
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16.5, fontWeight: 600, color: '#FFFFFF' }}>
                {copy.done}
              </span>
            </div>
          ) : (
            <form className="cta-form" onSubmit={submit} noValidate style={{ marginTop: 32, maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="text" {...honeypotProps} />
              <div className="cta-field" style={{ flex: 1, minWidth: 0 }}>
                <label className="sr-only" htmlFor="cta-email">Work email</label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Your work email"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'cta-email-error' : status === 'failed' ? 'cta-email-failed' : undefined}
                  style={{
                    width: '100%',
                    padding: '15px 18px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    border: status === 'error' ? '1.5px solid #E5484D' : '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontSize: 15,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {status === 'error' && (
                  <div id="cta-email-error" role="alert" style={{ marginTop: 8, textAlign: 'left', fontSize: 13, color: '#FF9AA0', fontFamily: "var(--font-body)" }}>
                    Enter a valid work email address.
                  </div>
                )}
                {status === 'failed' && (
                  <div id="cta-email-failed" role="alert" style={{ marginTop: 8, textAlign: 'left', fontSize: 13, color: '#FF9AA0', fontFamily: "var(--font-body)" }}>
                    We couldn&rsquo;t send that right now. Please{' '}
                    <a href={fallbackHref} style={{ color: '#FFB37E', textDecoration: 'underline' }}>email sales@zenduit.com</a> instead.
                  </div>
                )}
              </div>
              <SubmitButton label={copy.button} sending={status === 'sending'} />
            </form>
          )}

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
