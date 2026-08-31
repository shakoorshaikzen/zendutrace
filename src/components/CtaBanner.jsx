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
    edge === 'start' ? '5px 0 0 5px' : edge === 'end' ? '0 5px 5px 0' : 0;
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
        borderRight: edge === 'end' ? 'none' : '1px solid rgba(255,255,255,0.08)',
        background: active ? '#BC3E10' : 'transparent',
        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
        fontFamily: "var(--font-body)",
        fontSize: 13.5,
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
  // waiting: embed not here yet (render nothing extra while it may still arrive)
  // loaded:  gofleet's script injected the form
  // fallback: form never arrived — show the email button instead
  const [formState, setFormState] = useState('waiting');
  const copy = INTENTS[intent];
  const setIntent = setIntentState;

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

  // Load gofleet's embed script AFTER this component (and therefore the
  // placeholder div) is in the DOM. A static <script> tag in index.html runs
  // before React renders, scans for the placeholder, finds nothing and never
  // retries — so the form only mounts reliably when we inject the script here.
  // Note: this is the direct /wp-content/ path, not the /wp-json/ loader,
  // because gofleet.com's firewall 503s script requests to the wp-json route.
  useEffect(() => {
    if (document.querySelector('script[data-dm-zoho-embed]')) return;
    const s = document.createElement('script');
    s.src = 'https://www.gofleet.com/wp-content/plugins/dm-go-zoho-forms/assets/embed/embed.js?v=3.11.01';
    s.setAttribute('data-dm-zoho-embed', '1');
    s.setAttribute('data-dm-zoho-api', 'https://www.gofleet.com/wp-json/dm-zoho/v1');
    s.setAttribute('data-dm-zoho-assets', 'https://www.gofleet.com/wp-content/plugins/dm-go-zoho-forms/assets');
    document.head.appendChild(s);
  }, []);

  // Watch the embed placeholder: if gofleet's script injects the form, mark
  // loaded (even if it arrives late); if nothing shows up within 6s, offer
  // the mailto fallback so the section never sits empty.
  useEffect(() => {
    const el = document.getElementById('dm-zoho-form-embed');
    if (!el) return undefined;
    if (el.childElementCount > 0) {
      setFormState('loaded');
      return undefined;
    }
    const observer = new MutationObserver(() => {
      if (el.childElementCount > 0) setFormState('loaded');
    });
    observer.observe(el, { childList: true });
    const timer = setTimeout(() => {
      if (el.childElementCount === 0) setFormState('fallback');
    }, 6000);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const mailtoHref = `mailto:sales@zenduit.com?subject=${encodeURIComponent(
    intent === 'demo' ? 'Book a 20-minute XenTag demo' : '10 free XenTag labels',
  )}&body=${encodeURIComponent('Name:\nWork email:\nCompany:')}`;

  return (
    <section id="book" className="cta-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="cta-panel night-surface" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', padding: '66px 44px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="cta-intents"
            role="group"
            aria-label="Choose how to get started"
            style={{
              display: 'inline-flex',
              marginBottom: 28,
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}
          >
            <IntentChip active={intent === 'labels'} onClick={() => setIntent('labels')} edge="start">{INTENTS.labels.chip}</IntentChip>
            <IntentChip active={intent === 'demo'} onClick={() => setIntent('demo')} edge="end">{INTENTS.demo.chip}</IntentChip>
          </div>
          <h2 style={{ fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#FFFFFF', maxWidth: '14ch', margin: '0 auto' }}>
            {copy.heading}
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.66, color: '#C9C1B6', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {copy.sub}
          </p>

          {/* Zoho CRM lead form (name + email), served from gofleet.com.
              The dm-zoho loader script injected above watches the DOM and
              renders the form into this placeholder. The form only renders
              on xentag.com and its subdomains (server-side allowlist), so
              this stays empty on localhost / *.vercel.app previews.
              EVERY field the embed renders stays visible: the Name field is
              MANDATORY for the Zoho CRM lead and must never be hidden. */}
          <div
            id="dm-zoho-form-embed"
            data-form-id="40608"
            className="cta-zoho"
            style={{ marginTop: 32, maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}
          />

          {formState === 'fallback' && (
            <div className="cta-fallback" style={{ marginTop: 28 }}>
              <a
                href={mailtoHref}
                style={{
                  display: 'inline-block',
                  padding: '15px 26px',
                  borderRadius: 6,
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  background: '#BC3E10',
                  textDecoration: 'none',
                  boxShadow: '0 1px 0 rgba(20,17,13,0.3)',
                }}
              >
                {intent === 'demo' ? 'Request a demo by email' : 'Claim 10 free labels by email'} <span style={{ fontSize: 16 }}>&#8594;</span>
              </a>
              <div style={{ marginTop: 12, fontSize: 13.5, color: 'rgba(255,255,255,0.55)' }}>
                Emails sales@zenduit.com directly. Our request form is temporarily unavailable.
              </div>
            </div>
          )}

          <div className="cta-meta" style={{ marginTop: 16, display: 'flex', gap: '10px 18px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', fontSize: 13.5, color: 'rgba(255,255,255,0.68)' }}>
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
              style={{ background: 'none', border: 'none', color: '#C9C1B6', fontSize: 13.5, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', padding: 0 }}
            >
              Watch the lifecycle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
