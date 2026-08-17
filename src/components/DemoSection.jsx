import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { DEMO } from '../data.jsx';

const STEP_MS = 3400;
const ROUTE = 'M 26 150 Q 70 90 100 66 Q 130 42 170 34';
const ROUTE_PROGRESS = [0, 0.25, 0.5, 0.78, 1];
const ROUTE_SPRING = { type: 'spring', stiffness: 55, damping: 18 };

const SPRING = { type: 'spring', stiffness: 170, damping: 17 };
const SANS = 'var(--font-body)';

const C = {
  panel: '#0F1114',
  stage: '#14171C',
  phonePanel: '#101318',
  hairline: 'rgba(255,255,255,0.07)',
  ink: '#F5F7FB',
  dim: 'rgba(255,255,255,0.78)',
  faint: 'rgba(255,255,255,0.55)',
  orange: '#FF7A2E',
  orangeSoft: '#FFB37E',
  green: '#2FBF83',
};

function StepRail({ step, cycle, onSelect, paused }) {
  return (
    <div className="demo-rail" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, padding: '20px 26px 16px', borderBottom: `1px solid ${C.hairline}`, background: 'rgba(255,255,255,0.025)' }}>
      {DEMO.map((d, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <button
            type="button"
            key={d.title}
            onClick={() => onSelect(i)}
            aria-label={`Step ${i + 1}: ${d.title}`}
            aria-current={active ? 'step' : undefined}
            style={{ position: 'relative', background: 'none', border: 'none', padding: '8px 10px', margin: '-8px -10px', borderRadius: 12, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
          >
            {active && (
              <motion.span
                layoutId="rail-active"
                transition={SPRING}
                style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(255,122,46,0.08)', border: '1px solid rgba(255,122,46,0.22)' }}
              />
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 9, minHeight: 32 }}>
              <motion.span
                animate={{
                  scale: active ? 1.06 : 1,
                  backgroundColor: active ? 'rgba(255,122,46,0.16)' : done ? 'rgba(47,191,131,0.12)' : 'rgba(255,255,255,0.05)',
                  borderColor: active ? 'rgba(255,122,46,0.55)' : done ? 'rgba(47,191,131,0.4)' : 'rgba(255,255,255,0.12)',
                  color: active ? C.orangeSoft : done ? C.green : C.faint,
                }}
                transition={SPRING}
                style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', border: '1px solid', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6.4 4.6 9 10 3" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  d.icon
                )}
              </motion.span>
              <span className="demo-rail-title" style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, lineHeight: 1.2, color: active ? C.ink : done ? 'rgba(255,255,255,0.6)' : C.faint, transition: 'color .3s' }}>
                {d.title}
              </span>
            </div>
            <div style={{ marginTop: 10, height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.09)', overflow: 'hidden' }}>
              {done && <div style={{ width: '100%', height: '100%', background: 'rgba(47,191,131,0.55)' }} />}
              {active && !paused && (
                <motion.div
                  key={`${i}-${cycle}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                  style={{ height: '100%', background: C.orange }}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function PackageStage({ step }) {
  const labelOnBox = step >= 1;
  return (
    <svg className="demo-package-stage" aria-hidden="true" width="300" height="270" viewBox="0 0 200 180" fill="none" style={{ position: 'relative', zIndex: 1, overflow: 'visible', maxWidth: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="dsBoxFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CBB58E" />
          <stop offset="1" stopColor="#B29A72" />
        </linearGradient>
        <linearGradient id="dsBoxTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B49B72" />
          <stop offset="1" stopColor="#A38A61" />
        </linearGradient>
        <filter id="dsGround" x="-60%" y="-200%" width="220%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="167" rx="80" ry="9" fill="rgba(0,0,0,0.55)" filter="url(#dsGround)" />

      {/* box */}
      <path d="M30 60 L48 42 L152 42 L170 60 Z" fill="url(#dsBoxTop)" />
      <path d="M100 42 V60" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <path d="M94 42 L106 42 L107.5 60 L92.5 60 Z" fill="rgba(255,255,255,0.2)" />
      <rect x="30" y="60" width="140" height="100" rx="3" fill="url(#dsBoxFront)" />
      <path d="M30 60 H170" stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
      {/* tape */}
      <rect x="92" y="60" width="16" height="100" fill="rgba(255,255,255,0.22)" />
      <rect x="92" y="60" width="16" height="100" fill="rgba(255,122,46,0.1)" />
      <path d="M92 60 V160 M108 60 V160" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      {/* corrugation hint on the side edges */}
      <path d="M30 68 H170 M30 156 H170" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      {/* fragile print */}
      <text x="42" y="80" fill="#2A241C" style={{ color: '#2A241C', backgroundColor: '#CBB58E' }} fontSize="6.5" fontWeight="bold" fontFamily="JetBrains Mono,monospace" letterSpacing="0.8">FRAGILE</text>

      {/* label roll — visible while unboxing */}
      <motion.g animate={{ opacity: step === 0 ? 1 : 0 }} transition={{ duration: 0.45 }}>
        <rect x="6" y="5" width="50" height="32" rx="16" fill="#1A1E24" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <circle cx="22" cy="21" r="7.5" fill="#242A32" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <circle cx="22" cy="21" r="2.4" fill="rgba(255,255,255,0.35)" />
        <text x="33" y="24" fill="#FFB37E" style={{ color: '#FFB37E', backgroundColor: '#1A1E24' }} fontSize="6.2" fontWeight="bold" fontFamily="JetBrains Mono,monospace" letterSpacing="0.5">ROLL</text>
        <path d="M56 21 h12" stroke="rgba(255,122,46,0.6)" strokeWidth="1.4" strokeDasharray="3 3" />
      </motion.g>

      {/* the label — peels off the roll, lands on the box */}
      <motion.g
        initial={false}
        animate={labelOnBox ? { x: 0, y: 0, rotate: 0, scale: 1 } : { x: -16, y: -60, rotate: -9, scale: 0.9 }}
        transition={SPRING}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
      >
        <motion.rect
          x="50" y="88" width="100" height="54" rx="5" fill="#FFFFFF"
          animate={{ stroke: labelOnBox ? C.orange : 'rgba(255,255,255,0.35)', strokeWidth: labelOnBox ? 1.6 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ filter: 'drop-shadow(0 12px 14px rgba(0,0,0,0.45))' }}
        />
        {/* wordmark + live dot */}
        <text x="58" y="102" fill="#0F1114" style={{ color: '#0F1114', backgroundColor: '#FFFFFF' }} fontSize="8.5" fontWeight="bold" fontFamily={SANS} letterSpacing="0.2">XENTAG&#8482;</text>
        <circle cx="140" cy="98" r="2.2" fill={labelOnBox ? '#1E8A5B' : '#878E96'} />
        {/* barcode */}
        <g fill="#0F1114">
          <rect x="58" y="108" width="2" height="14" /><rect x="61.5" y="108" width="1" height="14" /><rect x="64" y="108" width="2.6" height="14" />
          <rect x="68.5" y="108" width="1" height="14" /><rect x="71" y="108" width="1.8" height="14" /><rect x="74.5" y="108" width="3" height="14" />
          <rect x="79.5" y="108" width="1" height="14" /><rect x="82" y="108" width="1.8" height="14" /><rect x="85.5" y="108" width="2.6" height="14" />
          <rect x="90" y="108" width="1" height="14" /><rect x="92.5" y="108" width="1.8" height="14" /><rect x="96" y="108" width="1" height="14" />
          <rect x="98.5" y="108" width="3" height="14" /><rect x="103.5" y="108" width="1.8" height="14" /><rect x="107" y="108" width="1" height="14" />
        </g>
        <text x="58" y="132" fill="#0F1114" style={{ color: '#0F1114', backgroundColor: '#FFFFFF' }} fontSize="6.5" fontFamily="JetBrains Mono,monospace" letterSpacing="0.4" fontWeight="700">XT-48192 &#183; BLE+LTE-M</text>
        {/* QR */}
        <rect x="113" y="106" width="24" height="24" rx="2" fill="rgba(13,16,20,0.05)" stroke="rgba(13,16,20,0.1)" strokeWidth="0.6" />
        <g fill="#1C1F23">
          <rect x="116" y="109" width="5" height="5" rx="0.6" /><rect x="126" y="109" width="5" height="5" rx="0.6" />
          <rect x="116" y="119" width="5" height="5" rx="0.6" />
          <rect x="123" y="116" width="2.4" height="2.4" /><rect x="127" y="118" width="2.4" height="2.4" />
          <rect x="124" y="122" width="2.4" height="2.4" /><rect x="128" y="124" width="2.4" height="2.4" />
        </g>
        {/* NFC arcs */}
        <g stroke="#0284C7" strokeWidth="1.3" strokeLinecap="round" fill="none">
          <path d="M141 112a7 7 0 0 1 0 10" opacity="0.9" />
          <path d="M138.5 114.5a3.6 3.6 0 0 1 0 5" opacity="0.9" />
        </g>
      </motion.g>

      {/* BLE activation ripples */}
      {labelOnBox && step < 4 && (
        <>
          {[0, 0.7].map((delay) => (
            <motion.circle
              key={delay}
              cx="141"
              cy="117"
              r="10"
              fill="none"
              stroke={C.orange}
              strokeWidth="1.3"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.7, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay }}
              style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            />
          ))}
        </>
      )}

      {/* temperature readout */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={SPRING}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          >
            <rect x="50" y="148" width="100" height="18" rx="4" fill="#0F1114" stroke="rgba(255,122,46,0.55)" strokeWidth="1" />
            <text x="100" y="160" textAnchor="middle" fill="#FFB37E" style={{ color: '#FFB37E', backgroundColor: '#0F1114' }} fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono,monospace">-2.0&#176;C  &#10003; IN RANGE</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* delivered stamp */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          >
            <circle cx="100" cy="44" r="18" fill="rgba(47,191,131,0.18)" />
            <circle cx="100" cy="44" r="15" fill="#1E8A5B" stroke="#0F1114" strokeWidth="0" />
            <motion.path
              d="M93 44.5 L98 49.5 L107.5 39.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

function PhonePanel({ step }) {
  const live = step >= 1;
  const delivered = step >= 4;
  const temp = step >= 2 ? '-2.0°C' : '--.-°C';
  const eta = delivered ? 'Delivered ✓' : '3h 20min';
  return (
    <div className="demo-phone-panel" style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.phonePanel }}>
      {/* Drawn device: shell ring, side keys, island. Object lift via filter —
          box-shadow would read as a nested card inside the console. */}
      <div
        style={{
          position: 'relative',
          width: 264,
          borderRadius: 44,
          background: '#1C1F23',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: 9,
          filter: 'drop-shadow(0 34px 44px rgba(10,11,14,0.7))',
        }}
      >
        <span aria-hidden style={{ position: 'absolute', left: -2.5, top: 96, width: 2.5, height: 24, borderRadius: 2, background: '#2F343A' }} />
        <span aria-hidden style={{ position: 'absolute', left: -2.5, top: 128, width: 2.5, height: 38, borderRadius: 2, background: '#2F343A' }} />
        <span aria-hidden style={{ position: 'absolute', right: -2.5, top: 110, width: 2.5, height: 54, borderRadius: 2, background: '#2F343A' }} />
        <div style={{ position: 'relative', borderRadius: 35, background: '#0A0B0E', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 0', minHeight: 26 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>9:41</span>
            <span aria-hidden style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', width: 64, height: 18, borderRadius: 999, background: '#000', border: '1px solid rgba(255,255,255,0.07)' }} />
            <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true">
              <g fill="rgba(255,255,255,0.9)">
                <rect x="0" y="6" width="2.4" height="4" rx="0.8" /><rect x="3.6" y="4" width="2.4" height="6" rx="0.8" /><rect x="7.2" y="2" width="2.4" height="8" rx="0.8" /><rect x="10.8" y="0" width="2.4" height="10" rx="0.8" />
              </g>
              <rect x="19" y="1.5" width="12" height="7" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <rect x="20.5" y="3" width="7" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
              <rect x="31.6" y="3.5" width="1.6" height="3" rx="0.8" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>
        <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/images/xentag-logo-white.png" alt="XenTag" style={{ height: 13, width: 'auto', display: 'block' }} />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: live ? C.green : 'rgba(255,255,255,0.5)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: live ? C.green : 'rgba(255,255,255,0.35)' }} />
            {live ? 'LIVE' : 'IDLE'}
          </span>
        </div>

        <div style={{ margin: '0 12px', borderRadius: 12, background: '#161A20', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 10px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>
              {delivered ? 'Delivered' : 'ETA 3h 20m'}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>Map</span>
          </div>
          <svg viewBox="0 0 200 168" width="100%" height="168" style={{ display: 'block', borderRadius: 8, background: '#12161C' }}>
            <path d="M -10 26 Q 42 46 30 92 Q 20 130 -10 144 Z" fill="rgba(56,140,220,0.16)" />
            <rect x="128" y="108" width="72" height="54" rx="10" fill="rgba(47,191,131,0.1)" />
            <g stroke="#232932" strokeLinecap="round" fill="none">
              <path d="M -5 110 H 205" strokeWidth="8" />
              <path d="M 56 -5 V 180" strokeWidth="8" />
              <path d="M 132 -5 V 100" strokeWidth="6" />
              <path d="M -5 48 H 205" strokeWidth="4" />
            </g>
            <path
              d={ROUTE}
              stroke="rgba(255,122,46,0.28)"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              opacity={live ? 1 : 0.25}
            />
            <motion.path
              d={ROUTE}
              stroke={C.orange}
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: ROUTE_PROGRESS[step], opacity: live ? 1 : 0 }}
              transition={ROUTE_SPRING}
            />
            <g>
              <rect x="14" y="128" width="18" height="18" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="23" y="160" textAnchor="middle" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.7)" style={{ color: 'rgba(255,255,255,0.7)', backgroundColor: '#12161C' }} fontFamily={SANS}>YARD</text>
            </g>
            <g transform="translate(154,18)">
              <motion.path
                d="M8 0C3.6 0 0 3.6 0 8c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z"
                animate={{ fill: delivered ? '#2FBF83' : '#FF7A2E' }}
                transition={{ duration: 0.4 }}
              />
              <circle cx="8" cy="8" r="3" fill="#0D1013" />
            </g>
            <text x="162" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.7)" style={{ color: 'rgba(255,255,255,0.7)', backgroundColor: '#12161C' }} fontFamily={SANS}>DROP</text>
            <motion.circle
              r="6"
              fill={delivered ? '#2FBF83' : '#FF7A2E'}
              stroke="#0D1013"
              strokeWidth="2"
              initial={false}
              style={{ offsetPath: `path("${ROUTE}")`, offsetRotate: '0deg' }}
              animate={{ offsetDistance: `${ROUTE_PROGRESS[step] * 100}%`, opacity: live ? 1 : 0 }}
              transition={ROUTE_SPRING}
            />
          </svg>
        </div>

        <div style={{ padding: '14px 16px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <StatRow label="Temperature" value={temp} color={step >= 2 ? C.orangeSoft : 'rgba(255,255,255,0.45)'} />
          <StatRow label="Battery" value="94%" color={C.green} />
          <StatRow label="ETA" value={eta} color={delivered ? C.green : '#F5F7FB'} last />
        </div>
        </div>
      </div>
      <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.55, textAlign: 'center', color: 'rgba(255,255,255,0.62)', maxWidth: 240 }}>
        Illustrative lifecycle view. Deployment data appears in your operational dashboard.
      </p>
    </div>
  );
}

function StatRow({ label, value, color, last = false }) {
  return (
    <div
      style={{
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.68)' }}>{label}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.22 }}
          style={{ fontFamily: 'var(--font-machine)', fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function DemoSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);

  useEffect(() => {
    if (reduceMotion) setPaused(true);
  }, [reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (paused || !inView || !pageVisible) return undefined;
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % DEMO.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [step, cycle, paused, inView, pageVisible]);

  const selectStep = (i) => {
    setStep(i);
    setCycle((c) => c + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="demo" style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(88px,9vw,116px) 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 40px' }}>
          <h2 style={{ margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#0F1114' }}>
            One tap in the yard. <span style={{ color: '#C2410C' }}>Live on the map.</span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: '#4B5259', maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Watch the full lifecycle: peel, stick, activate, then monitor location and temperature from any phone.
          </p>
          <button
            type="button"
            className="demo-playback-toggle"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM14 5h4v14h-4z" />}
            </svg>
            {paused ? 'Play walkthrough' : 'Pause walkthrough'}
          </button>
        </div>
        <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(13,16,20,0.16)', background: C.panel, boxShadow: '0 2px 6px rgba(13,16,20,0.08),0 60px 130px -60px rgba(13,16,20,0.55)' }}>
          <StepRail step={step} cycle={cycle} onSelect={selectStep} paused={paused} />
          <div className="demo-inline-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr' }}>
            {/* LEFT: package scene */}
            <div
              className="demo-stage"
              style={{
                position: 'relative',
                padding: '44px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)`,
                backgroundSize: '22px 22px',
                backgroundColor: C.stage,
                minHeight: 480,
                borderRight: `1px solid ${C.hairline}`,
              }}
            >
              <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.orangeSoft }}>
                Illustrated walkthrough
              </div>
              <PackageStage step={step} />
              <div style={{ position: 'relative', zIndex: 1, marginTop: 26, width: '100%', maxWidth: 360, minHeight: 58 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ textAlign: 'center', fontFamily: SANS, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: C.ink }}>
                      {DEMO[step].title}
                    </p>
                    <p style={{ textAlign: 'center', fontSize: 13.5, lineHeight: 1.55, color: C.dim, marginTop: 6 }}>{DEMO[step].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* RIGHT: phone */}
            <PhonePanel step={step} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
