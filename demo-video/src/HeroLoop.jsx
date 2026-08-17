import React from 'react';
import { AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { FONT, GREEN, INK, ORANGE } from './ui.jsx';

const MINT = GREEN;

// Text-free background montage for the landing hero: the full XenTag journey
// (print → seal → label → load → depart → transit → track → deliver), told with
// stock/product footage plus branded tracking-UI overlays instead of captions.

const FADE = 15;

const WordPatch = ({ size = 30, sub, bg = '#F4F2ED' }) => (
  <div style={{ width: '100%', height: '100%', background: bg, borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
    <Img src={staticFile('xentag-logo.png')} style={{ display: 'block', width: '76%', height: Math.max(18, size * 0.72), objectFit: 'contain' }} />
    {sub && <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: size * 0.36, letterSpacing: '0.22em', color: 'rgba(26,22,19,0.6)', whiteSpace: 'nowrap' }}>{sub}</span>}
  </div>
);

const STICK_PATCHES = [{ x: 40, y: 57, w: 13, h: 8, rotate: -1.5, el: <WordPatch size={30} bg="#EDE9E1" /> }];
const PRINT_PATCHES = [{ x: 51.9, y: 79.6, w: 8, h: 13, rotate: -58, el: <div style={{ width: '100%', height: '100%', background: '#F1EFE9', borderRadius: 5 }} /> }];
const LABEL_PATCHES = [
  { x: 48.2, y: 51.5, w: 17.5, h: 15, el: <WordPatch size={42} sub="SMART TRACKING LABEL" bg="#F7F5F0" /> },
  { x: 40.9, y: 8.8, w: 12, h: 5.5, el: <div style={{ width: '100%', height: '100%', background: '#F7F5F0' }} /> },
  { x: 55.5, y: 10.5, w: 12, h: 7.5, el: <div style={{ width: '100%', height: '100%', background: '#15130F', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12%' }}><Img src={staticFile('xentag-logo-white.png')} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} /></div> },
];

// ---- branded tracking-UI overlays (chrome, not captions) ----

function LogoChip({ status = 'LIVE', color = MINT, delay = 20 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 130 } });
  const pulse = 0.55 + Math.abs(Math.sin(frame / 16)) * 0.45;
  return (
    <div style={{ position: 'absolute', top: 54, right: 64, opacity: frame < delay ? 0 : 1, transform: `translateY(${(1 - s) * -30}px)`, display: 'flex', alignItems: 'center', gap: 16, padding: '14px 22px', borderRadius: 14, background: 'rgba(10,14,26,0.72)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <Img src={staticFile('xentag-logo-white.png')} style={{ height: 34, display: 'block' }} />
      <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.2)' }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, opacity: pulse, boxShadow: `0 0 10px ${color}` }} />
        <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.85)' }}>{status}</span>
      </span>
    </div>
  );
}

// Mini map card showing route progress during transit shots.
function MiniTracker({ progress, temp, delay = 14 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <div style={{ position: 'absolute', right: 64, bottom: 64, width: 340, opacity: frame < delay ? 0 : 1, transform: `translateY(${(1 - s) * 60}px)`, borderRadius: 18, overflow: 'hidden', background: 'rgba(10,14,26,0.78)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 30px 60px -25px rgba(0,0,0,0.8)' }}>
      <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Img src={staticFile('xentag-logo-white.png')} style={{ height: 24, display: 'block' }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: MINT, boxShadow: `0 0 8px ${MINT}` }} />
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)' }}>IN TRANSIT</span>
        </span>
      </div>
      <svg width="340" height="130" viewBox="0 0 340 130">
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="130" />)}
          {[0, 1, 2].map((i) => <line key={`h${i}`} x1="0" y1={i * 48} x2="340" y2={i * 48} />)}
        </g>
        <path d="M 30 104 Q 120 82 180 60 Q 245 38 310 26" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeDasharray="7 8" fill="none" />
        <path d="M 30 104 Q 120 82 180 60 Q 245 38 310 26" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={Math.max(0, 1 - progress)} />
        <circle cx="30" cy="104" r="7" fill="#1A1613" stroke="#fff" strokeWidth="2.5" />
        <circle cx="310" cy="26" r="7" fill={progress >= 1 ? GREEN : 'rgba(255,255,255,0.25)'} stroke="#fff" strokeWidth="2.5" />
        {(() => {
          const t = Math.min(1, progress);
          const q = (p0, p1, p2, u) => ({ x: (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * p1.x + u * u * p2.x, y: (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * p1.y + u * u * p2.y });
          const pt = t < 0.5 ? q({ x: 30, y: 104 }, { x: 120, y: 82 }, { x: 180, y: 60 }, t * 2) : q({ x: 180, y: 60 }, { x: 245, y: 38 }, { x: 310, y: 26 }, (t - 0.5) * 2);
          return (
            <g transform={`translate(${pt.x},${pt.y})`}>
              <circle r={11 + Math.sin(frame / 5) * 2.5} fill="rgba(194,65,12,0.3)" />
              <circle r="6" fill={ORANGE} stroke="#fff" strokeWidth="2" />
            </g>
          );
        })()}
      </svg>
      {temp && (
        <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>Temperature</span>
          <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: '#FB8B24' }}>-2.0&deg;C &middot; in range</span>
        </div>
      )}
    </div>
  );
}

function DeliveredBadge({ delay = 40 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 150 } });
  return (
    <div style={{ position: 'absolute', right: 64, bottom: 64, opacity: frame < delay ? 0 : 1, transform: `scale(${s})`, transformOrigin: 'bottom right', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderRadius: 16, background: 'rgba(10,14,26,0.78)', border: `2px solid ${GREEN}`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <span style={{ width: 44, height: 44, borderRadius: '50%', background: GREEN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6" /></svg>
      </span>
      <div>
        <Img src={staticFile('xentag-logo-white.png')} style={{ height: 22, display: 'block' }} />
        <div style={{ marginTop: 5, fontFamily: FONT, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', color: MINT }}>DELIVERED</div>
      </div>
    </div>
  );
}

// Full-frame dark map interstitial (matches the site's XenTag platform aesthetic).
function MapShot({ dur }) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [8, dur - 20], [0.1, 0.92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  const ROUTE = 'M 240 860 Q 640 660 960 520 Q 1330 360 1700 240';
  const q = (p0, p1, p2, u) => ({ x: (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * p1.x + u * u * p2.x, y: (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * p1.y + u * u * p2.y });
  const pt = progress < 0.5 ? q({ x: 240, y: 860 }, { x: 640, y: 660 }, { x: 960, y: 520 }, progress * 2) : q({ x: 960, y: 520 }, { x: 1330, y: 360 }, { x: 1700, y: 240 }, (progress - 0.5) * 2);
  return (
    <>
      <AbsoluteFill style={{ background: '#0D1322' }} />
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1.5">
          {Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 128} y1="0" x2={i * 128} y2="1080" />)}
          {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 128} x2="1920" y2={i * 128} />)}
        </g>
        {[[480, 300], [1440, 760], [820, 900], [1620, 500], [340, 520]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="9" fill="#232D45" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" opacity="0.55" />
        ))}
        <path d={ROUTE} stroke="rgba(255,255,255,0.15)" strokeWidth="5" strokeDasharray="12 14" fill="none" />
        <path d={ROUTE} stroke={ORANGE} strokeWidth="6.5" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} />
        <circle cx="240" cy="860" r="13" fill="#1A1613" stroke="#fff" strokeWidth="4" />
        <g transform="translate(1682,196)">
          <path d="M18 0C8 0 0 8 0 18c0 13 18 26 18 26s18-13 18-26C36 8 28 0 18 0z" fill={ORANGE} />
          <circle cx="18" cy="18" r="6.5" fill="#fff" opacity="0.9" />
        </g>
        <g transform={`translate(${pt.x},${pt.y})`}>
          <circle r={32 + Math.sin(frame / 5) * 6} fill="rgba(194,65,12,0.22)" />
          <circle r="15" fill={ORANGE} stroke="#fff" strokeWidth="4" />
        </g>
      </svg>
      <LogoChip status="TRACKING" delay={10} />
    </>
  );
}

// ---- shot list: the journey in order ----

const SHOTS = [
  // 1. ops intro
  { type: 'video', src: 'photos/hero.mp4', dur: 100 },
  // 2. label comes off the printer
  { type: 'photo', src: 'photos/activate.jpg', dur: 90, from: { scale: 1.03, x: 0, y: 0 }, to: { scale: 1.12, x: -40, y: -16 }, patches: PRINT_PATCHES },
  // 3. XenTag label on the box — activated
  { type: 'photo', src: 'photos/stick.jpg', dur: 90, from: { scale: 1.16, x: 20, y: -14 }, to: { scale: 1.04, x: 0, y: 0 }, patches: STICK_PATCHES, overlay: <LogoChip status="ACTIVATED" color={GREEN} delay={24} /> },
  // 4. loaded with the freight
  { type: 'video', src: 'stock/31998.mp4', dur: 100, startFrom: 10 },
  // 5. truck departs the warehouse
  { type: 'video', src: 'stock/23011.mp4', dur: 110, startFrom: 30, overlay: <LogoChip status="LIVE" delay={20} /> },
  // 6. in transit — tracked
  { type: 'video', src: 'stock/28787.mp4', dur: 120, startFrom: 60, overlay: <MiniTracker progress={0.72} temp /> },
  // 7. the XenTag platform view
  { type: 'map', dur: 120 },
  // 8. handoff — delivered
  { type: 'video', src: 'stock/24279.mp4', dur: 120, startFrom: 150, overlay: <DeliveredBadge delay={38} /> },
  // 9. brand end card
  { type: 'photo', src: 'photos/label-cellular.jpg', dur: 90, from: { scale: 1.05, x: 330, y: 0 }, to: { scale: 1.14, x: 380, y: 8 }, patches: LABEL_PATCHES, dim: 0.18 },
];

export const HERO_LOOP_DUR = SHOTS.reduce((s, x) => s + x.dur, 0) - FADE * (SHOTS.length - 1);

function Shot({ shot }) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [shot.dur - FADE, shot.dur], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const t = interpolate(frame, [0, shot.dur], [0, 1], { easing: Easing.inOut(Easing.quad) });

  if (shot.type === 'map') {
    return (
      <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
        <MapShot dur={shot.dur} />
      </AbsoluteFill>
    );
  }

  if (shot.type === 'video') {
    const scale = 1.02 + t * 0.08;
    return (
      <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: INK }}>
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale})` }}>
          <OffthreadVideo muted src={staticFile(shot.src)} startFrom={shot.startFrom || 0} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {shot.overlay}
      </AbsoluteFill>
    );
  }

  const { from, to } = shot;
  const scale = from.scale + (to.scale - from.scale) * t;
  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;
  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, background: INK }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale}) translate(${x}px, ${y}px)` }}>
        <Img src={staticFile(shot.src)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        {(shot.patches || []).map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, height: `${p.h}%`, transform: `translate(-50%,-50%) rotate(${p.rotate || 0}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {p.el}
          </div>
        ))}
      </div>
      {shot.dim && <AbsoluteFill style={{ background: `rgba(10,14,26,${shot.dim})` }} />}
      {shot.overlay}
    </AbsoluteFill>
  );
}

export default function HeroLoop() {
  let at = 0;
  return (
    <AbsoluteFill style={{ background: INK }}>
      {SHOTS.map((shot, i) => {
        const from = at;
        at += shot.dur - FADE;
        return (
          <Sequence key={i} from={from} durationInFrames={shot.dur}>
            <Shot shot={shot} />
          </Sequence>
        );
      })}
      {/* baked-in grade: dim + vignette so the loop sits behind UI */}
      <AbsoluteFill style={{ background: 'rgba(10,14,26,0.34)' }} />
      <AbsoluteFill style={{ background: 'radial-gradient(120% 100% at 50% 40%, rgba(10,14,26,0) 40%, rgba(10,14,26,0.55) 100%)' }} />
    </AbsoluteFill>
  );
}
