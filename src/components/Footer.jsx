import { useHover } from '../hooks/useHover';

function FooterLink({ href, onClick, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      className="footer-link"
      href={href}
      onClick={onClick}
      style={{ fontSize: 13.5, color: hovered ? '#F8B181' : 'rgba(255,255,255,0.74)', transition: 'color .16s' }}
      {...hoverProps}
    >
      {children}
    </a>
  );
}

const setIntent = (intent) => () => window.dispatchEvent(new CustomEvent('xt-intent', { detail: intent }));

function ContactLink({ href, icon, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      className="contact-link"
      href={href}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: hovered ? '#F8B181' : 'rgba(255,255,255,0.7)', transition: 'color .16s' }}
      {...hoverProps}
    >
      <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>
      {children}
    </a>
  );
}

function LegalLink({ href, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      className="legal-link"
      href={href}
      style={{ fontSize: 13.5, color: hovered ? '#fff' : 'rgba(255,255,255,0.62)', transition: 'color .16s' }}
      {...hoverProps}
    >
      {children}
    </a>
  );
}

function SocialLink({ href, label, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      className="social-link"
      href={href}
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 6,
        background: hovered ? 'rgba(246,105,35,0.16)' : 'rgba(255,255,255,0.05)',
        border: hovered ? '1px solid rgba(246,105,35,0.4)' : '1px solid rgba(255,255,255,0.06)',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.72)',
        transition: 'all .16s',
      }}
      {...hoverProps}
    >
      <span aria-hidden="true" style={{ display: 'inline-flex' }}>{children}</span>
    </a>
  );
}

function ColumnHeading({ accent = '#F9762F', children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 16, height: 2, borderRadius: 2, background: accent }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
        {children}
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="night-surface" style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Link columns */}
      <div className="footer-grid" style={{ maxWidth: 1480, margin: '0 auto', padding: '56px 48px 48px', display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.1fr', gap: 'clamp(40px,6vw,96px)' }}>
        <div>
          <img src="/images/xentag-logo-white@2x.png" alt="XenTag" style={{ height: 32, width: 'auto', display: 'block' }} />
          <p style={{ marginTop: 16, fontSize: 13.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.68)', maxWidth: '25rem' }}>
            Smart labels for goods worth protecting. XenTag&#8482; and XenAuth&#8482; bring live location, condition and cryptographic authenticity to high-value, high-security shipments, all from a label. Built by ZenduIT &amp; GoFleet.
          </p>
          <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.72)' }}>
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: '#2FBF83' }} />
            Live coverage across 29 countries
          </div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ContactLink
              href="mailto:sales@zenduit.com"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              }
            >
              sales@zenduit.com
            </ContactLink>
            <ContactLink
              href="tel:+18559363848"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            >
              +1 (855) 936-3848
            </ContactLink>
            <address style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontStyle: 'normal', color: 'rgba(255,255,255,0.64)' }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              2355 Skymark Ave &middot; Mississauga, ON
            </address>
          </div>
        </div>
        <div>
          <ColumnHeading>Products</ColumnHeading>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* page order. The Platform link is gone with the section it
                pointed at; nothing substitutes for it. */}
            <FooterLink href="#products">XenTag</FooterLink>
            <FooterLink href="#products">XenAuth</FooterLink>
            <FooterLink href="#integrations">Integrations</FooterLink>
          </div>
        </div>
        <div>
          <ColumnHeading>Company</ColumnHeading>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FooterLink href="https://www.zenduit.com">ZenduIT</FooterLink>
            <FooterLink href="https://www.gofleet.com">GoFleet</FooterLink>
            <FooterLink href="https://xentag.com">XenTag.com</FooterLink>
            <FooterLink href="#industries">Industries</FooterLink>
            <FooterLink href="#compare">Compare</FooterLink>
          </div>
        </div>
        <div>
          <ColumnHeading>Get started</ColumnHeading>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FooterLink href="#book" onClick={setIntent('demo')}>Book a demo</FooterLink>
            <FooterLink href="#video">Watch the lifecycle</FooterLink>
            <FooterLink href="#book" onClick={setIntent('labels')}>Get 10 free labels</FooterLink>
            <FooterLink href="mailto:sales@zenduit.com">Talk to sales</FooterLink>
          </div>
        </div>
      </div>

      {/* Giant wordmark: the brand signs the page off */}
      <div
        aria-hidden="true"
        style={{
          maxWidth: 1480,
          margin: '0 auto',
          height: 'clamp(64px, 11vw, 150px)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 120'%3E%3Ctext x='50%25' y='98' text-anchor='middle' font-family='Archivo,Helvetica,Arial,sans-serif' font-weight='800' font-size='118' letter-spacing='4' fill='white' fill-opacity='0.09'%3EXENTAG%3C/text%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: 'contain',
        }}
      />

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ maxWidth: 1480, margin: '0 auto', padding: '26px 48px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.58)' }}>
          &copy; 2026 ZenduIT. All rights reserved.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <LegalLink href="https://www.zenduit.com/privacy-policy/">Privacy</LegalLink>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SocialLink href="https://www.linkedin.com/company/xentag" label="XenTag on LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
              </svg>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/xentag_/" label="XenTag on Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
