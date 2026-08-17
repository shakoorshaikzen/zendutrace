/* eslint-disable react/only-export-components */
import React from 'react';
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const INK = '#07101D';
export const INK_2 = '#0D1B2B';
export const PAPER = '#F7F4EE';
export const WHITE = '#F7FAFC';
export const MUTED = '#9AA9B8';
export const ORANGE = '#E65B24';
export const ORANGE_LIGHT = '#FF8A45';
export const CYAN = '#52D7E8';
export const GREEN = '#53D39B';
export const FONT = "'Inter','Helvetica Neue',Arial,sans-serif";
export const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

export const ease = Easing.bezier(0.16, 0.8, 0.3, 1);

export function clampInterpolate(frame, input, output, options = {}) {
  return interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    ...options,
  });
}

export function useEnter(delay = 0, distance = 38) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const value = spring({
    frame: frame - delay,
    fps,
    config: {damping: 18, stiffness: 105, mass: 0.8},
    durationInFrames: 34,
  });
  return {
    opacity: clampInterpolate(frame, [delay, delay + 14], [0, 1]),
    transform: `translateY(${(1 - value) * distance}px)`,
  };
}

export function sceneOpacity(frame, duration, fade = 12) {
  const intro = clampInterpolate(frame, [0, fade], [0, 1]);
  const outro = clampInterpolate(frame, [duration - fade, duration], [1, 0]);
  return intro * outro;
}

export function Backdrop({accent = ORANGE, light = false}) {
  const bg = light
    ? 'linear-gradient(145deg,#FBFAF7 0%,#EEE9E0 100%)'
    : `radial-gradient(circle at 72% 30%, ${accent}22 0%, transparent 34%), linear-gradient(145deg,${INK_2},${INK} 70%)`;
  const grid = light ? 'rgba(7,16,29,0.055)' : 'rgba(255,255,255,0.055)';
  return (
    <>
      <div style={{position: 'absolute', inset: 0, background: bg}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: light ? 0.55 : 0.7,
          backgroundImage: `linear-gradient(${grid} 1px,transparent 1px),linear-gradient(90deg,${grid} 1px,transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom,black,transparent 92%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: light
            ? 'inset 0 0 220px rgba(51,39,25,0.08)'
            : 'inset 0 0 240px rgba(0,0,0,0.45)',
        }}
      />
    </>
  );
}

export function XenTagWordmark({white = false, height = 54, style}) {
  return (
    <Img
      src={staticFile(white ? 'xentag-logo-white.png' : 'xentag-logo.png')}
      style={{height, width: 'auto', objectFit: 'contain', ...style}}
    />
  );
}

// Canonical product artwork used everywhere in the motion system.
export function XenTagLabel({width = 520, active = false, style}) {
  return (
    <svg
      width={width}
      height={(width * 270) / 520}
      viewBox="0 0 520 270"
      fill="none"
      style={{
        filter: active
          ? 'drop-shadow(0 18px 26px rgba(7,16,29,0.28)) drop-shadow(0 0 20px rgba(230,91,36,0.28))'
          : 'drop-shadow(0 18px 26px rgba(7,16,29,0.22))',
        ...style,
      }}
    >
      <rect x="5" y="5" width="510" height="260" rx="20" fill="#FFFFFF" stroke={active ? ORANGE : '#C9D0D5'} strokeWidth={active ? 4 : 3} />
      <image href={staticFile('xentag-logo.png')} x="32" y="28" width="192" height="52" preserveAspectRatio="xMinYMid meet" />
      <text x="484" y="44" textAnchor="end" fill="#50606B" fontSize="12" fontWeight="700" fontFamily={MONO} letterSpacing="1.4">SMART TRACKING LABEL</text>
      <text x="484" y="64" textAnchor="end" fill="#111820" fontSize="14" fontWeight="800" fontFamily={MONO} letterSpacing="1.1">BLE + CELLULAR</text>

      <rect x="32" y="99" width="84" height="84" rx="6" fill="#FFF" stroke="#D7DCE0" strokeWidth="2" />
      <image href={staticFile('label-qr.png')} x="38" y="105" width="72" height="72" preserveAspectRatio="xMidYMid meet" />
      <text x="74" y="202" textAnchor="middle" fill="#111820" fontSize="11" fontWeight="800" fontFamily={MONO} letterSpacing="1.5">XT 6000908</text>

      <g fill="#111820">
        {Array.from({length: 29}, (_, i) => (
          <rect
            key={i}
            x={138 + i * 8}
            y="108"
            width={i % 4 === 0 ? 5 : i % 3 === 0 ? 3 : 2}
            height={58}
          />
        ))}
      </g>
      <text x="138" y="187" fill="#111820" fontSize="14" fontWeight="800" fontFamily={MONO} letterSpacing="1.4">XT-48192</text>
      <text x="138" y="207" fill="#5B6871" fontSize="11" fontFamily={MONO} letterSpacing="0.6">TEMP · SHOCK · LOCATION</text>
      <rect x="138" y="220" width="223" height="22" rx="6" fill="#EEF8F4" stroke="#B7DFCF" strokeWidth="1.5" />
      <text x="249.5" y="235.5" textAnchor="middle" fill="#177A55" fontSize="11.5" fontWeight="800" fontFamily={MONO} letterSpacing="1.2">READY TO ACTIVATE</text>

      <rect x="402" y="102" width="82" height="82" rx="12" fill="#F9FBFC" stroke="#8B9AA5" strokeWidth="2" strokeDasharray="6 6" />
      <g transform="translate(420,117)" stroke="#158AA0" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M7 10a16 16 0 0 1 0 26" />
        <path d="M18 4a26 26 0 0 1 0 38" />
      </g>
      <circle cx="421" cy="140" r="4" fill="#158AA0" />
      <text x="443" y="202" textAnchor="middle" fill="#111820" fontSize="10" fontWeight="800" fontFamily={MONO} letterSpacing="1">TAP TO ACTIVATE</text>
    </svg>
  );
}

export function Parcel({label = true, labelWidth = 270, style, labelStyle}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 660,
        height: 430,
        borderRadius: 22,
        background: 'linear-gradient(145deg,#E7D7BE,#CDB895)',
        border: '2px solid rgba(80,59,31,0.22)',
        boxShadow: '0 55px 90px rgba(0,0,0,0.28)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{position: 'absolute', inset: '0 0 auto', height: 76, background: 'rgba(116,87,48,0.12)', borderBottom: '2px solid rgba(80,59,31,0.12)'}} />
      <div style={{position: 'absolute', top: 0, left: 278, width: 104, height: '100%', background: 'rgba(239,218,180,0.62)', borderLeft: '2px solid rgba(80,59,31,0.1)', borderRight: '2px solid rgba(80,59,31,0.1)'}} />
      <div style={{position: 'absolute', left: 40, bottom: 34, fontFamily: MONO, fontSize: 17, fontWeight: 700, color: 'rgba(55,42,24,0.55)', letterSpacing: '0.12em'}}>HANDLE WITH CARE</div>
      {label && (
        <XenTagLabel
          width={labelWidth}
          active
          style={{position: 'absolute', top: 104, right: 42, transform: 'rotate(-1.5deg)', ...labelStyle}}
        />
      )}
    </div>
  );
}

export function StatusPill({children, color = GREEN, dark = true, style}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 18px',
        borderRadius: 999,
        background: dark ? 'rgba(7,16,29,0.78)' : '#FFFFFF',
        border: dark ? '1px solid rgba(255,255,255,0.13)' : '1px solid rgba(7,16,29,0.1)',
        boxShadow: '0 16px 34px rgba(0,0,0,0.12)',
        ...style,
      }}
    >
      <span style={{width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 14px ${color}`}} />
      <span style={{fontFamily: MONO, fontSize: 17, fontWeight: 800, letterSpacing: '0.11em', color: dark ? WHITE : INK}}>{children}</span>
    </div>
  );
}

export function MetricCard({label, value, accent = WHITE, style}) {
  return (
    <div
      style={{
        padding: '22px 24px',
        borderRadius: 18,
        background: 'rgba(10,22,36,0.88)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 22px 45px rgba(0,0,0,0.16)',
        ...style,
      }}
    >
      <div style={{fontFamily: MONO, fontSize: 15, color: MUTED, letterSpacing: '0.08em', textTransform: 'uppercase'}}>{label}</div>
      <div style={{marginTop: 10, fontFamily: FONT, fontSize: 28, fontWeight: 750, color: accent}}>{value}</div>
    </div>
  );
}

export function Kicker({children, light = false, style}) {
  return (
    <div style={{fontFamily: MONO, fontSize: 20, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: light ? '#9A411E' : ORANGE_LIGHT, ...style}}>
      {children}
    </div>
  );
}

export function Title({children, light = false, size = 76, style}) {
  return (
    <div style={{fontFamily: FONT, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.04em', fontWeight: 760, color: light ? INK : WHITE, ...style}}>
      {children}
    </div>
  );
}

export function Copy({children, light = false, style}) {
  return (
    <div style={{fontFamily: FONT, fontSize: 31, lineHeight: 1.42, color: light ? '#53606A' : '#B5C0CC', ...style}}>
      {children}
    </div>
  );
}
