import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMeshCanvas } from '../hooks/useMeshCanvas';
import { useHover } from '../hooks/useHover';
import { CLIENTS } from '../clientLogos.js';
import { ArrowRightSmall } from './Icons.jsx';
import AutoPlayVideo from './AutoPlayVideo.jsx';

function SampleButton() {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href="#book"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '17px 30px',
        borderRadius: 6,
        cursor: 'pointer',
        fontFamily: "var(--font-body)",
        fontSize: 16,
        fontWeight: 700,
        color: '#fff',
        background: hovered ? '#DA4A10' : '#BC3E10',
        boxShadow: '0 1px 0 rgba(20,17,13,0.3)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
      }}
      {...hoverProps}
    >
      Get a free sample{' '}
      <span aria-hidden style={{ display: 'inline-flex', transform: hovered ? 'translateX(2px)' : 'none', transition: 'transform .18s' }}>
        <ArrowRightSmall />
      </span>
    </a>
  );
}

function WatchLink() {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href="#video"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '17px 26px',
        borderRadius: 6,
        fontFamily: "var(--font-body)",
        fontSize: 16,
        fontWeight: 600,
        color: '#14110D',
        background: hovered ? '#FFFFFF' : '#F5F2EA',
        border: '1px solid rgba(20,17,13,0.2)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'background .18s,transform .18s',
      }}
      {...hoverProps}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
      </svg>
      Watch it work
    </a>
  );
}

function HeroLogoRun({ ariaHidden }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 'clamp(48px,5.5vw,84px)', paddingRight: 'clamp(48px,5.5vw,84px)' }}>
      {CLIENTS.map((c) => (
        <img
          key={c.name + (ariaHidden ? '-b' : '')}
          aria-hidden={ariaHidden || undefined}
          src={c.src}
          alt={ariaHidden ? '' : c.name}
          title={c.name}
          style={{ height: Math.round(c.h * 0.72), width: 'auto', display: 'block', flexShrink: 0, filter: 'grayscale(1) invert(1) brightness(1.95) contrast(1.1)', mixBlendMode: 'screen', opacity: 1 }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();
  useMeshCanvas(canvasRef, !videoReady, !reduceMotion);

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', background: '#151210' }}>
      <canvas ref={canvasRef} id="zmesh" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      <AutoPlayVideo
        className="hero-video"
        src="/assets/hero-loop.mp4"
        reduceMotion={!!reduceMotion}
        pauseWhenHidden={false}
        onReady={() => setVideoReady(true)}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: videoReady ? 0.92 : 0,
          transition: 'opacity 1.6s ease',
          filter: 'saturate(1.02) contrast(1.08) brightness(0.9) sepia(0.16)',
        }}
      />
      <div
        className="hero-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(90deg,rgba(21,17,13,0.94) 0%,rgba(21,17,13,0.78) 34%,rgba(21,17,13,0.28) 64%,rgba(21,17,13,0.05) 100%),linear-gradient(180deg,rgba(21,17,13,0.5) 0%,transparent 26%,transparent 72%,rgba(21,17,13,0.72) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, flex: 1, width: '100%', maxWidth: 1300, margin: '0 auto', padding: '150px clamp(22px,4vw,44px) 148px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(34px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ minWidth: 0, animation: reduceMotion ? undefined : 'zrise .85s cubic-bezier(.16,1,.3,1) both' }}>
            <h1
              style={{
                fontSize: 'clamp(34px,4.2vw,58px)',
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
                margin: 0,
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#F5F2EA',
                animation: reduceMotion ? undefined : 'zstencil 1.05s .08s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              <span style={{ display: 'block' }}><span style={{ whiteSpace: 'nowrap' }}>A paper-thin</span> label.</span>
              <span style={{ display: 'block' }}>It guards what you</span>
              <span style={{ display: 'block' }}>
                <span className="h2-mark">can&rsquo;t afford to lose.</span>
              </span>
            </h1>
            <p
              style={{
                margin: '20px 0 0',
                maxWidth: '44ch',
                fontSize: 'clamp(16px,1.2vw,19px)',
                lineHeight: 1.55,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                animation: reduceMotion ? undefined : 'zrise .8s .16s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              A peel-and-stick label with live location, temperature and shock reporting, so you find out in transit, not at the dock.
            </p>
            <div style={{ marginTop: 32, display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', animation: reduceMotion ? undefined : 'zrise .8s .2s cubic-bezier(.16,1,.3,1) both' }}>
              <span
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(72px,7.5vw,108px)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.022em',
                  // ember-bright: the ember-on-charcoal step, so the price is
                  // the one loud thing on the footage
                  color: '#F9762F',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                $10
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 8 }}>
                <span className="font-display" style={{ fontSize: 'clamp(20px,1.8vw,24px)', fontWeight: 700, color: '#F5F2EA', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
                  per label
                </span>
                <span style={{ fontSize: 'clamp(13.5px,1.15vw,16px)', fontWeight: 500, color: 'rgba(255,255,255,0.78)' }}>
                  tracking included &middot; 1-year battery &middot; no installers
                </span>
              </span>
            </div>
            <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 32, animation: reduceMotion ? undefined : 'zrise .8s .34s cubic-bezier(.16,1,.3,1) both' }}>
              <SampleButton />
              <WatchLink />
            </div>
          </div>
          {/* RIGHT: flat render of the label itself */}
          <div className="hero-sticker" aria-hidden="true" style={{ minWidth: 0, display: 'flex', justifyContent: 'center', padding: '16px 10px', animation: reduceMotion ? undefined : 'zrise .95s .28s cubic-bezier(.16,1,.3,1) both' }}>
            <div style={{ width: '100%', maxWidth: 410 }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '13 / 7',
                  borderRadius: 12,
                  background: '#FBF8F1',
                  border: '1px solid rgba(18,17,16,0.1)',
                  boxShadow: '0 18px 40px -22px rgba(0,0,0,0.6), 0 8px 18px -10px rgba(0,0,0,0.45)',
                  padding: '6.5% 7%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <img src="/images/xentag-logo@2x.png" alt="" style={{ height: 'clamp(20px,2.4vw,30px)', width: 'auto', display: 'block' }} />
                  <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(8px,0.8vw,10.5px)', fontWeight: 700, letterSpacing: '0.14em', color: '#3B352D', textTransform: 'uppercase', paddingTop: 4 }}>
                    Smart tracking label
                  </span>
                </div>
                {/* body row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '6%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '7%', flex: 1, minWidth: 0 }}>
                    <div style={{ width: '30%', flexShrink: 0 }}>
                      <img src="/images/label-qr.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', imageRendering: 'pixelated' }} />
                      <div style={{ marginTop: 4, fontFamily: 'var(--font-machine)', fontSize: 'clamp(8px,0.85vw,11px)', fontWeight: 700, letterSpacing: '0.04em', color: '#121110', textAlign: 'center' }}>6000908</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <svg viewBox="0 0 150 30" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(20px,2.6vw,32px)' }} aria-hidden>
                        <g fill="#121110">
                          <rect x="0" width="3" height="30" /><rect x="5" width="1.4" height="30" /><rect x="9" width="4" height="30" /><rect x="15" width="1.4" height="30" />
                          <rect x="19" width="2.6" height="30" /><rect x="24" width="5" height="30" /><rect x="31" width="1.4" height="30" /><rect x="35" width="2.6" height="30" />
                          <rect x="40" width="4" height="30" /><rect x="46" width="1.4" height="30" /><rect x="50" width="2.6" height="30" /><rect x="55" width="1.4" height="30" />
                          <rect x="58" width="5" height="30" /><rect x="66" width="2.6" height="30" /><rect x="71" width="1.4" height="30" /><rect x="75" width="4" height="30" />
                          <rect x="81" width="2.6" height="30" /><rect x="86" width="1.4" height="30" /><rect x="90" width="2.6" height="30" /><rect x="95" width="5" height="30" />
                          <rect x="102" width="1.4" height="30" /><rect x="106" width="2.6" height="30" /><rect x="111" width="4" height="30" /><rect x="117" width="1.4" height="30" />
                          <rect x="121" width="2.6" height="30" /><rect x="126" width="1.4" height="30" /><rect x="130" width="4" height="30" /><rect x="136" width="2.6" height="30" />
                          <rect x="141" width="1.4" height="30" /><rect x="145" width="3" height="30" />
                        </g>
                      </svg>
                      <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(7px,0.72vw,9.5px)', color: '#3B352D', whiteSpace: 'nowrap' }}>FCC ID: 2A7TQRA0001</span>
                        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(7px,0.72vw,9.5px)', fontWeight: 700, color: '#121110', whiteSpace: 'nowrap' }}>BLE + LTE-M</span>
                      </div>
                    </div>
                  </div>
                  {/* NFC tap target */}
                  <div style={{ flexShrink: 0, width: '18%', minWidth: 0, textAlign: 'center' }}>
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '14%', border: '1.5px dashed rgba(18,17,16,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: '58%', height: '58%' }} aria-hidden>
                        <path d="M6 8a6 6 0 0 1 12 0M9 11a3 3 0 0 1 6 0" stroke="#121110" strokeWidth="1.7" strokeLinecap="round" />
                        <circle cx="12" cy="15" r="1.4" fill="#121110" />
                      </svg>
                    </div>
                    <div style={{ marginTop: 4, fontFamily: 'var(--font-machine)', fontSize: 'clamp(6px,0.62vw,8.5px)', fontWeight: 700, letterSpacing: '0.04em', color: '#121110', lineHeight: 1.2 }}>TAP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* client marquee pinned to the hero's bottom edge */}
      <div aria-label="Organizations served across the ZenduIT and GoFleet network" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(21,17,13,0.42)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div className="mq-row mq-mask" style={{ overflow: 'hidden', padding: '20px 0' }}>
          <div className="mq-track" style={{ display: 'flex', alignItems: 'center', animation: 'mqleft 42s linear infinite' }}>
            <HeroLogoRun />
            <HeroLogoRun ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
