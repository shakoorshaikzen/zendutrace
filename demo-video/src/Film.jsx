import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  Backdrop,
  Copy,
  CYAN,
  FONT,
  GREEN,
  INK,
  Kicker,
  MetricCard,
  MONO,
  ORANGE,
  ORANGE_LIGHT,
  Parcel,
  StatusPill,
  Title,
  WHITE,
  XenTagLabel,
  XenTagWordmark,
  clampInterpolate,
  sceneOpacity,
  useEnter,
} from './ui.jsx';

const INTRO_DUR = 150;
const APPLY_DUR = 180;
const SIGNAL_DUR = 180;
const MONITOR_DUR = 240;
const OUTRO_DUR = 150;
export const FILM_DUR = INTRO_DUR + APPLY_DUR + SIGNAL_DUR + MONITOR_DUR + OUTRO_DUR;

function FilmBrand({dark = true}) {
  return (
    <div style={{position: 'absolute', left: 78, top: 58, display: 'flex', alignItems: 'center', gap: 24}}>
      <XenTagWordmark white={dark} height={46} />
      <span style={{width: 1, height: 32, background: dark ? 'rgba(255,255,255,0.22)' : 'rgba(7,16,29,0.18)'}} />
      <span style={{fontFamily: MONO, fontSize: 16, fontWeight: 800, letterSpacing: '0.12em', color: dark ? '#AAB7C4' : '#65737D'}}>SMART TRACKING LABEL</span>
    </div>
  );
}

function IntroScene() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = sceneOpacity(frame, INTRO_DUR, 16);
  const labelIn = spring({
    frame,
    fps,
    config: {damping: 17, stiffness: 76, mass: 0.85},
    durationInFrames: 44,
  });
  const titleIn = useEnter(14, 34);
  const copyIn = useEnter(26, 28);
  const ring = 1 + Math.sin(frame / 10) * 0.03;
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop />
      <FilmBrand />
      <div style={{position: 'absolute', left: 118, top: 284, width: 690}}>
        <Kicker style={titleIn}>Visibility at label scale</Kicker>
        <Title size={86} style={{...titleIn, marginTop: 24}}>Know what moved.<br />Know what changed.</Title>
        <Copy style={{...copyIn, marginTop: 28, maxWidth: 610}}>XenTag turns a familiar shipping label into a connected source of location and condition signals.</Copy>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 158,
          top: 276,
          transform: `translateY(${(1 - labelIn) * 70}px) rotate(${(1 - labelIn) * 5 - 2}deg) scale(${0.82 + labelIn * 0.18})`,
          opacity: clampInterpolate(frame, [0, 12], [0, 1]),
        }}
      >
        <div style={{position: 'absolute', inset: -100, borderRadius: '50%', border: '1px solid rgba(230,91,36,0.2)', transform: `scale(${ring})`}} />
        <div style={{position: 'absolute', inset: -46, borderRadius: '50%', border: '1px solid rgba(82,215,232,0.15)', transform: `scale(${2 - ring})`}} />
        <XenTagLabel width={650} active />
      </div>
      <div style={{position: 'absolute', right: 650, bottom: 166, width: 360, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.36))'}} />
    </AbsoluteFill>
  );
}

function ApplyScene() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = sceneOpacity(frame, APPLY_DUR, 14);
  const packageIn = spring({frame, fps, config: {damping: 18, stiffness: 86}, durationInFrames: 40});
  const apply = spring({frame: frame - 30, fps, config: {damping: 19, stiffness: 72}, durationInFrames: 58});
  const active = frame >= 92;
  const scan = clampInterpolate(frame, [90, 128], [0, 1], {easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop light />
      <FilmBrand dark={false} />
      <div style={{position: 'absolute', left: 104, top: 252, width: 560}}>
        <Kicker light>01 · Apply</Kicker>
        <Title light size={76} style={{marginTop: 24}}>Place XenTag on the asset.</Title>
        <Copy light style={{marginTop: 28}}>A single, consistent product label for packages, pallets, equipment, and high-value inventory.</Copy>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 292,
          transform: `translateY(${(1 - packageIn) * 60}px) rotateY(-7deg)`,
          opacity: clampInterpolate(frame, [0, 14], [0, 1]),
        }}
      >
        <Parcel label={false} />
        <XenTagLabel
          width={270}
          active={active}
          style={{
            position: 'absolute',
            top: 104 - (1 - apply) * 178,
            right: 42 + (1 - apply) * 455,
            transform: `rotate(${-1.5 - (1 - apply) * 7}deg) scale(${0.9 + apply * 0.1})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 106,
            right: 42 + (1 - scan) * 270,
            width: 4,
            height: 138,
            borderRadius: 4,
            background: CYAN,
            boxShadow: '0 0 22px rgba(82,215,232,0.9)',
            opacity: frame < 88 ? 0 : clampInterpolate(frame, [88, 98, 134, 146], [0, 1, 1, 0]),
          }}
        />
      </div>
      <StatusPill
        dark={false}
        color={GREEN}
        style={{
          position: 'absolute',
          right: 520,
          top: 216,
          opacity: clampInterpolate(frame, [108, 124], [0, 1]),
          transform: `translateY(${clampInterpolate(frame, [108, 138], [28, 0])}px)`,
        }}
      >
        ACTIVE
      </StatusPill>
    </AbsoluteFill>
  );
}

const SIGNAL_ROUTE = 'M 210 790 C 430 740 540 540 780 520 S 1170 410 1380 330 S 1610 230 1745 250';

function SignalScene() {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, SIGNAL_DUR, 14);
  const progress = clampInterpolate(frame, [18, 150], [0.01, 0.99], {easing: Easing.inOut(Easing.cubic)});
  const ping = 28 + (frame % 36) * 1.8;
  const px = clampInterpolate(progress, [0, 0.32, 0.68, 1], [210, 730, 1270, 1745]);
  const py = clampInterpolate(progress, [0, 0.32, 0.68, 1], [790, 525, 365, 250]);
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop accent={CYAN} />
      <FilmBrand />
      <div style={{position: 'absolute', left: 100, top: 182}}>
        <Kicker>02 · Move</Kicker>
        <Title size={70} style={{marginTop: 18}}>Signals travel with the asset.</Title>
      </div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        {[[300,370],[520,860],[850,290],[1110,800],[1450,510],[1710,740]].map(([x, y], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="9" fill="rgba(255,255,255,0.22)" />
            <circle cx={x} cy={y} r={24 + Math.sin((frame + index * 8) / 7) * 4} fill="none" stroke="rgba(82,215,232,0.18)" strokeWidth="2" />
          </g>
        ))}
        <path d={SIGNAL_ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="8" strokeDasharray="13 17" />
        <path d={SIGNAL_ROUTE} fill="none" stroke={ORANGE} strokeWidth="9" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} />
        <g transform={`translate(${px} ${py})`}>
          <circle r={ping} fill="none" stroke="rgba(230,91,36,0.26)" strokeWidth="3" opacity={1 - (frame % 36) / 36} />
          <circle r="18" fill={ORANGE} stroke="#FFF" strokeWidth="5" />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          right: 112,
          bottom: 80,
          padding: 20,
          borderRadius: 22,
          background: 'rgba(7,16,29,0.8)',
          border: '1px solid rgba(255,255,255,0.13)',
          opacity: clampInterpolate(frame, [28, 46], [0, 1]),
        }}
      >
        <XenTagLabel width={320} active />
      </div>
      <StatusPill color={CYAN} style={{position: 'absolute', left: 102, bottom: 82}}>LOCATION + CONDITION SIGNALS</StatusPill>
    </AbsoluteFill>
  );
}

function MonitorScene() {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, MONITOR_DUR, 14);
  const route = clampInterpolate(frame, [18, 186], [0.05, 0.96], {easing: Easing.inOut(Easing.cubic)});
  const eventFrame = frame > 132;
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop />
      <FilmBrand />
      <div style={{position: 'absolute', left: 94, top: 154}}>
        <Kicker>03 · Monitor</Kicker>
        <Title size={66} style={{marginTop: 16}}>One clear operational view.</Title>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 330,
          width: 1190,
          height: 620,
          borderRadius: 28,
          overflow: 'hidden',
          background: 'rgba(9,20,33,0.94)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 42px 90px rgba(0,0,0,0.32)',
        }}
      >
        <div style={{height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <span style={{fontFamily: MONO, color: '#B8C4D0', fontSize: 18, letterSpacing: '0.09em'}}>XENTAG / XT-48192</span>
          <StatusPill color={GREEN} style={{padding: '8px 14px'}}>IN TRANSIT</StatusPill>
        </div>
        <svg width="1190" height="548" viewBox="0 0 1190 548">
          <g stroke="rgba(255,255,255,0.055)" strokeWidth="1">
            {Array.from({length: 13}, (_, i) => <line key={`mv${i}`} x1={i * 100} y1="0" x2={i * 100} y2="548" />)}
            {Array.from({length: 6}, (_, i) => <line key={`mh${i}`} x1="0" y1={i * 100} x2="1190" y2={i * 100} />)}
          </g>
          <path d="M90 442 C260 410 390 305 555 340 S850 255 1095 102" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="7" strokeDasharray="11 14" />
          <path d="M90 442 C260 410 390 305 555 340 S850 255 1095 102" fill="none" stroke={ORANGE_LIGHT} strokeWidth="8" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - route} />
          <circle cx={90 + route * 1005} cy={442 - route * 340} r="14" fill={ORANGE} stroke="#FFF" strokeWidth="4" />
        </svg>
      </div>
      <div style={{position: 'absolute', right: 84, top: 342, width: 470, display: 'grid', gap: 16}}>
        {[
          ['Last signal', '12 seconds ago', CYAN],
          ['Temperature', eventFrame ? '6.1 °C' : '4.2 °C', eventFrame ? ORANGE_LIGHT : GREEN],
          ['Shock', 'Normal', GREEN],
          ['Route', 'On schedule', WHITE],
        ].map(([label, value, accent], index) => (
          <MetricCard
            key={label}
            label={label}
            value={value}
            accent={accent}
            style={{
              opacity: clampInterpolate(frame, [20 + index * 10, 36 + index * 10], [0, 1]),
              transform: `translateX(${clampInterpolate(frame, [20 + index * 10, 52 + index * 10], [42, 0])}px)`,
            }}
          />
        ))}
        <div
          style={{
            marginTop: 8,
            padding: '22px 24px',
            borderRadius: 18,
            background: eventFrame ? 'rgba(230,91,36,0.16)' : 'rgba(82,215,232,0.09)',
            border: eventFrame ? '1px solid rgba(255,138,69,0.42)' : '1px solid rgba(82,215,232,0.25)',
            opacity: clampInterpolate(frame, [106, 124], [0, 1]),
          }}
        >
          <div style={{fontFamily: MONO, fontSize: 15, color: eventFrame ? ORANGE_LIGHT : CYAN, fontWeight: 800, letterSpacing: '0.1em'}}>CONDITION EVENT</div>
          <div style={{marginTop: 8, fontFamily: FONT, color: WHITE, fontSize: 23, fontWeight: 700}}>{eventFrame ? 'Temperature change detected' : 'Monitoring conditions'}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function OutroScene() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = sceneOpacity(frame, OUTRO_DUR, 18);
  const labelIn = spring({frame, fps, config: {damping: 18, stiffness: 80}, durationInFrames: 44});
  const titleIn = useEnter(14, 36);
  const copyIn = useEnter(28, 28);
  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop />
      <div style={{position: 'absolute', left: 132, top: 250, width: 760}}>
        <XenTagWordmark white height={72} style={titleIn} />
        <Title size={86} style={{...titleIn, marginTop: 42}}>Make every move visible.</Title>
        <Copy style={{...copyIn, marginTop: 28, maxWidth: 650}}>Apply the label. Move the asset. Monitor what matters.</Copy>
        <div style={{...copyIn, marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 14, padding: '17px 26px', borderRadius: 14, background: ORANGE, boxShadow: '0 20px 40px rgba(230,91,36,0.24)'}}>
          <span style={{fontFamily: FONT, color: '#FFF', fontSize: 22, fontWeight: 800}}>Explore XenTag</span>
          <span style={{fontFamily: FONT, color: '#FFF', fontSize: 28}}>→</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 150,
          top: 300,
          transform: `translateY(${(1 - labelIn) * 70}px) rotate(${-2 + (1 - labelIn) * 8}deg) scale(${0.82 + labelIn * 0.18})`,
          opacity: clampInterpolate(frame, [0, 14], [0, 1]),
        }}
      >
        <XenTagLabel width={680} active />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 52, textAlign: 'center', fontFamily: MONO, fontSize: 15, letterSpacing: '0.14em', color: '#738496'}}>XENTAG · CONNECTED ASSET VISIBILITY</div>
    </AbsoluteFill>
  );
}

const SCENES = [
  [IntroScene, INTRO_DUR],
  [ApplyScene, APPLY_DUR],
  [SignalScene, SIGNAL_DUR],
  [MonitorScene, MONITOR_DUR],
  [OutroScene, OUTRO_DUR],
];

export default function Film() {
  let cursor = 0;
  return (
    <AbsoluteFill style={{background: INK}}>
      {SCENES.map(([Scene, duration]) => {
        const from = cursor;
        cursor += duration;
        return (
          <Sequence key={from} from={from} durationInFrames={duration}>
            <Scene />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
