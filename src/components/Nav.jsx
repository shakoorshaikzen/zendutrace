import { useEffect, useState } from 'react';
import { useHover } from '../hooks/useHover';
import { XenAuthMark, XenTagMark } from './Icons.jsx';

const demoIntent = () => window.dispatchEvent(new CustomEvent('xt-intent', { detail: 'demo' }));

function NavLink({ href, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href={href}
      style={{
        color: hovered ? '#fff' : 'rgba(255,255,255,0.86)',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        transition: 'color .18s',
      }}
      {...hoverProps}
    >
      {children}
    </a>
  );
}

function ProductsLink({ openTrace, openXenAuth }) {
  const [hovered, hoverProps] = useHover();
  const [traceHover, traceHoverProps] = useHover();
  const [xenAuthHover, xenAuthHoverProps] = useHover();

  return (
    <div className="znav-drop" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <a
        href="#products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.86)',
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          transition: 'color .18s',
        }}
        {...hoverProps}
      >
        Products{' '}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="znav-menu" style={{ position: 'absolute', top: '100%', left: '50%', marginLeft: -158, width: 316, paddingTop: 16 }}>
        <div
          className="znav-menu-panel"
          style={{
            padding: 10,
            borderRadius: 16,
            background: 'rgba(16,17,21,0.94)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 70px -24px rgba(0,0,0,0.85)',
          }}
        >
          <button
            type="button"
            onClick={openTrace}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              width: '100%',
              textAlign: 'left',
              padding: '12px 13px',
              borderRadius: 11,
              border: 'none',
              background: traceHover ? 'rgba(255,255,255,0.06)' : 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background .16s',
            }}
            {...traceHoverProps}
          >
            <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 9, background: 'rgba(194,65,12,0.22)', border: '1px solid rgba(255,138,43,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XenTagMark size={22} color="#FF8A2B" />
            </span>
            <span>
              <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: '#fff' }}>XenTag</span>
              <span style={{ display: 'block', marginTop: 2, fontSize: 12.5, lineHeight: 1.4, color: 'rgba(255,255,255,0.55)' }}>BLE + cellular tracking for high-value goods</span>
            </span>
          </button>
          <button
            type="button"
            onClick={openXenAuth}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              width: '100%',
              textAlign: 'left',
              padding: '12px 13px',
              borderRadius: 11,
              border: 'none',
              background: xenAuthHover ? 'rgba(255,255,255,0.06)' : 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background .16s',
            }}
            {...xenAuthHoverProps}
          >
            <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 9, background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(45,212,191,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XenAuthMark size={22} color="#2DD4BF" />
            </span>
            <span>
              <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: '#fff' }}>XenAuth</span>
              <span style={{ display: 'block', marginTop: 2, fontSize: 12.5, lineHeight: 1.4, color: 'rgba(255,255,255,0.55)' }}>NFC product authentication &amp; digital product passports</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BookDemoButton() {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href="#book"
      className="znav-cta"
      onClick={demoIntent}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: hovered ? '#D2470A' : '#C2410C',
        color: '#fff',
        fontSize: 15,
        fontWeight: 600,
        padding: '12px 20px',
        borderRadius: 12,
        flexShrink: 0,
        boxShadow: '0 2px 8px -2px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
      }}
      {...hoverProps}
    >
      Book a demo
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function MobileMenu({ open, close, openTrace, openXenAuth }) {
  const item = {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '13px 16px',
    borderRadius: 11,
    color: 'rgba(255,255,255,0.88)',
    fontSize: 16,
    fontWeight: 500,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  };
  return (
    <div
      id="mobile-navigation"
      className="znav-mobile-menu"
      role="navigation"
      aria-label="Mobile navigation"
      aria-hidden={!open}
      hidden={!open}
      inert={!open}
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: 0,
        right: 0,
        borderRadius: 16,
        padding: 10,
        background: 'rgba(13,14,18,0.96)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 30px 70px -24px rgba(0,0,0,0.85)',
        animation: 'zfade .18s ease',
      }}
    >
      <button type="button" style={item} onClick={() => { close(); openTrace(); }}>XenTag &middot; live tracking labels</button>
      <button type="button" style={item} onClick={() => { close(); openXenAuth(); }}>XenAuth &middot; NFC authentication</button>
      <div style={{ height: 1, margin: '6px 4px', background: 'rgba(255,255,255,0.08)' }} />
      <a style={item} href="#how" onClick={close}>How it works</a>
      <a style={item} href="#industries" onClick={close}>Industries</a>
      <a style={item} href="#platform" onClick={close}>Platform</a>
      <a style={item} href="#integrations" onClick={close}>Integrations</a>
      <a style={item} href="#compare" onClick={close}>Compare</a>
      <div style={{ height: 1, margin: '6px 4px', background: 'rgba(255,255,255,0.08)' }} />
      <a
        style={{ ...item, color: '#FFB37E', fontWeight: 600 }}
        href="#book"
        onClick={() => { demoIntent(); close(); }}
      >
        Book a demo &rarr;
      </a>
    </div>
  );
}

export default function Nav({ scrolled, openTrace, openXenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 981px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener?.('change', closeOnDesktop);
    return () => desktop.removeEventListener?.('change', closeOnDesktop);
  }, []);

  return (
    <nav className="znav" aria-label="Primary navigation" style={{ position: 'fixed', top: 18, left: 0, right: 0, zIndex: 60, display: 'flex', justifyContent: 'center', padding: '0 clamp(16px,3vw,28px)', pointerEvents: 'none' }}>
      <div
        className="znav-shell"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: '100%',
          maxWidth: 1300,
          height: 72,
          padding: '0 20px 0 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          borderRadius: 16,
          background: scrolled || menuOpen ? 'rgba(9,10,13,0.86)' : 'rgba(9,10,13,0.72)',
          backdropFilter: 'blur(18px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.75)',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }}>
          <img className="znav-logo" src="/images/xentag-logo-white.png" alt="XenTag" style={{ height: 40, width: 'auto', display: 'block' }} />
        </a>
        <div className="znav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(26px,3.2vw,50px)' }}>
          <ProductsLink openTrace={openTrace} openXenAuth={openXenAuth} />
          <NavLink href="#how">How it works</NavLink>
          <NavLink href="#industries">Industries</NavLink>
          <NavLink href="#platform">Platform</NavLink>
          <NavLink href="#integrations">Integrations</NavLink>
        </div>
        <div className="znav-actions" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <BookDemoButton />
          <button
            type="button"
            className="znav-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 11,
              border: '1px solid rgba(255,255,255,0.16)',
              background: menuOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            )}
          </button>
        </div>
        <MobileMenu open={menuOpen} close={close} openTrace={openTrace} openXenAuth={openXenAuth} />
      </div>
    </nav>
  );
}
