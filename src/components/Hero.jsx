import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useMeshCanvas } from '../hooks/useMeshCanvas';
import { useHover } from '../hooks/useHover';
import { CLIENTS } from '../clientLogos.js';
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
        padding: '16px 30px',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: "var(--font-body)",
        fontSize: 16.5,
        fontWeight: 700,
        color: '#fff',
        background: hovered ? '#D2470A' : '#C2410C',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 2px 10px -2px rgba(0,0,0,0.45)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
      }}
      {...hoverProps}
    >
      Get a free sample <span style={{ fontSize: 17 }}>&rarr;</span>
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
        gap: 9,
        padding: '16px 26px',
        borderRadius: 999,
        fontFamily: "var(--font-body)",
        fontSize: 16.5,
        fontWeight: 600,
        color: '#0F1114',
        background: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(255,255,255,0.5)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'background .18s,transform .18s',
      }}
      {...hoverProps}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
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
          style={{ height: Math.round(c.h * 0.6), width: 'auto', display: 'block', flexShrink: 0, filter: 'grayscale(1) invert(1) brightness(1.35)', mixBlendMode: 'screen', opacity: 0.72 }}
        />
      ))}
    </div>
  );
}

function LabelTilt({ children, disabled }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 160, damping: 18 });

  if (disabled) return children;
  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900, willChange: 'transform' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();
  useMeshCanvas(canvasRef, !videoReady, !reduceMotion);

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', background: '#0A0B0E' }}>
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
          filter: 'saturate(1.08) contrast(1.08) brightness(0.92)',
        }}
      />
      <div
        className="hero-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(90deg,rgba(9,10,13,0.94) 0%,rgba(9,10,13,0.78) 34%,rgba(9,10,13,0.28) 64%,rgba(9,10,13,0.05) 100%),linear-gradient(180deg,rgba(9,10,13,0.5) 0%,transparent 26%,transparent 72%,rgba(9,10,13,0.72) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, flex: 1, width: '100%', maxWidth: 1300, margin: '0 auto', padding: '150px clamp(22px,4vw,44px) 148px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(34px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ minWidth: 0, animation: reduceMotion ? undefined : 'zrise .85s cubic-bezier(0.16,1,0.3,1) both' }}>
            <h1
              style={{
                fontSize: 'clamp(32px,4vw,54px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                margin: 0,
                fontWeight: 800,
                textTransform: 'uppercase',
                animation: reduceMotion ? undefined : 'zstencil 1.05s .08s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              <span style={{ display: 'block', color: '#F5F7FB' }}><span style={{ whiteSpace: 'nowrap' }}>A paper-thin</span> label.</span>
              <span style={{ display: 'block', color: '#FF7A2E' }}>It guards what you</span>
              <span style={{ display: 'block', color: '#FF7A2E' }}>can&rsquo;t afford</span>
              <span style={{ display: 'block', color: '#FF7A2E' }}>to lose.</span>
            </h1>
            <p
              style={{
                margin: '20px 0 0',
                maxWidth: '44ch',
                fontSize: 'clamp(15px,1.2vw,16.5px)',
                lineHeight: 1.55,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                animation: reduceMotion ? undefined : 'zrise .8s .16s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              A peel-and-stick tracking label with live location, temperature monitoring, and global LTE&#8209;M&nbsp;+&nbsp;BLE connectivity.
            </p>
            <div style={{ marginTop: 32, display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap', animation: reduceMotion ? undefined : 'zrise .8s .2s cubic-bezier(0.16,1,0.3,1) both' }}>
              <span
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(72px,7.5vw,108px)',
                  lineHeight: 0.86,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                $10
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 8 }}>
                <span className="font-display" style={{ fontSize: 'clamp(20px,1.8vw,26px)', fontWeight: 700, color: '#FFB37E', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
                  per label
                </span>
                <span style={{ fontSize: 'clamp(14px,1.15vw,16.5px)', fontWeight: 500, color: 'rgba(255,255,255,0.78)' }}>
                  tracking included &middot; 1-year battery &middot; no installers
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 34, animation: reduceMotion ? undefined : 'zrise .8s .34s cubic-bezier(0.16,1,0.3,1) both' }}>
              <SampleButton />
              <WatchLink />
            </div>
          </div>
          {/* RIGHT: flat render of the label itself */}
          <div className="hero-sticker" aria-hidden="true" style={{ minWidth: 0, display: 'flex', justifyContent: 'center', padding: '16px 10px', animation: reduceMotion ? undefined : 'zrise .95s .28s cubic-bezier(0.16,1,0.3,1) both' }}>
            <LabelTilt disabled={!!reduceMotion}>
            <div style={{ width: '100%', maxWidth: 410, transform: 'rotate(-3deg)', animation: reduceMotion ? undefined : 'zfloat 7s ease-in-out infinite' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '13 / 7',
                  borderRadius: 18,
                  background: 'linear-gradient(128deg,#FFFFFF 0%,#F4F4F2 58%,#EDEDEA 100%)',
                  border: '1px solid rgba(13,16,20,0.14)',
                  boxShadow: '0 46px 90px -26px rgba(0,0,0,0.85), 0 12px 28px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.9)',
                  padding: '6.5% 7%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <img src="/images/xentag-logo.png" alt="" style={{ height: 'clamp(20px,2.4vw,30px)', width: 'auto', display: 'block' }} />
                  <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(8px,0.8vw,10.5px)', fontWeight: 700, letterSpacing: '0.14em', color: '#4B5259', textTransform: 'uppercase', paddingTop: 4 }}>
                    Smart tracking label
                  </span>
                </div>
                {/* body row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '6%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '7%', flex: 1, minWidth: 0 }}>
                    <div style={{ width: '30%', flexShrink: 0 }}>
                      <img src="/images/label-qr.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', imageRendering: 'pixelated' }} />
                      <div style={{ marginTop: 5, fontFamily: 'var(--font-machine)', fontSize: 'clamp(8px,0.85vw,11px)', fontWeight: 700, letterSpacing: '0.1em', color: '#0F1114', textAlign: 'center' }}>6000908</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <svg viewBox="0 0 150 30" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(20px,2.6vw,32px)' }} aria-hidden>
                        <g fill="#0F1114">
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
                      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(7px,0.72vw,9.5px)', color: '#4B5259', whiteSpace: 'nowrap' }}>FCC ID: 2A7TQRA0001</span>
                        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 'clamp(7px,0.72vw,9.5px)', fontWeight: 700, color: '#0F1114', whiteSpace: 'nowrap' }}>BLE + LTE-M</span>
                      </div>
                    </div>
                  </div>
                  {/* NFC tap target */}
                  <div style={{ flexShrink: 0, width: '18%', minWidth: 0, textAlign: 'center' }}>
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '14%', border: '1.5px dashed rgba(13,16,20,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 24 24" fill="none" style={{ width: '58%', height: '58%' }} aria-hidden>
                        <path d="M6 8a6 6 0 0 1 12 0M9 11a3 3 0 0 1 6 0" stroke="#0F1114" strokeWidth="1.7" strokeLinecap="round" />
                        <circle cx="12" cy="15" r="1.4" fill="#0F1114" />
                      </svg>
                    </div>
                    <div style={{ marginTop: 5, fontFamily: 'var(--font-machine)', fontSize: 'clamp(6px,0.62vw,8.5px)', fontWeight: 700, letterSpacing: '0.04em', color: '#0F1114', lineHeight: 1.2 }}>TAP</div>
                  </div>
                </div>
              </div>
            </div>
            </LabelTilt>
          </div>
        </div>
      </div>

      {/* client marquee pinned to the hero's bottom edge */}
      <div aria-label="Organizations served across the ZenduIT and GoFleet network" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.09)', background: 'rgba(9,10,13,0.42)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
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
