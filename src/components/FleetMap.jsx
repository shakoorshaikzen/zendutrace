import { useEffect, useRef, useState } from 'react';

/* The demo network, on real geography.

   Natural Earth 1:50m coastlines, borders and lakes, projected
   EQUIRECTANGULAR so the viewBox is literally degrees: x = lng + 180,
   y = 90 - lat. A pin's coordinates ARE its screen position, so an asset can
   never drift from where it actually is. The geometry module is ~50KB gzipped
   and loads lazily; until it arrives the frame renders water, graticule and
   pins, so the panel is never blank.

   The map ZOOMS, and the zoom is wired to the conversation: when the bot
   answers about assets, the camera flies to frame exactly those pins, and an
   aggregate answer flies it back out. Manual control is still there: buttons,
   double-click, pinch (ctrl+wheel on desktop trackpads), and drag to pan once
   zoomed. Hairlines stay hairlines at any zoom (non-scaling strokes) and pins
   hold their screen size, which is what separates a tracking console from a
   scaled picture. */

const TONE = {
  transit: '#BC3E10',
  delivered: '#1E8A5B',
  breach: '#E45011',
  geofence: '#E45011',
  stale: '#6B6156',
};

const STATE_KEY = [
  ['In transit', '#BC3E10'],
  ['Delivered', '#1E8A5B'],
  ['Alert', '#E45011'],
  ['No signal', '#6B6156'],
];

/* Base frame: 168W to 150E, 60N to 12S, where the demo freight actually is. */
const HOME = { x: 12, y: 30, w: 306, h: 102 };
const MAX_K = 8;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const EASE = (t) => 1 - Math.pow(1 - t, 4); // outQuart, the page's entrance ease

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Clamp a camera so its window never leaves the base frame. */
function clampCam({ cx, cy, k }) {
  const kk = clamp(k, 1, MAX_K);
  const w = HOME.w / kk;
  const h = HOME.h / kk;
  return {
    k: kk,
    cx: clamp(cx, HOME.x + w / 2, HOME.x + HOME.w - w / 2),
    cy: clamp(cy, HOME.y + h / 2, HOME.y + HOME.h - h / 2),
  };
}

const HOME_CAM = { cx: HOME.x + HOME.w / 2, cy: HOME.y + HOME.h / 2, k: 1 };

export default function FleetMap({ fleet, focusIds = [], onPick }) {
  const focused = fleet.filter((a) => focusIds.includes(a.id));
  const [geo, setGeo] = useState(null);
  const [cam, setCam] = useState(HOME_CAM);
  const svgRef = useRef(null);
  const camRef = useRef(cam);
  camRef.current = cam;
  const flight = useRef(null); // rAF id of the current camera flight
  const drag = useRef(null);
  const pinch = useRef(null);

  /* geometry arrives after first paint; the frame never blocks on it */
  useEffect(() => {
    let live = true;
    import('../data/worldMap.js').then((m) => live && setGeo(m));
    return () => {
      live = false;
    };
  }, []);

  const stopFlight = () => {
    if (flight.current) cancelAnimationFrame(flight.current);
    flight.current = null;
  };

  /* Fly the camera to a target. One flight at a time; manual input cancels it. */
  const flyTo = (target, ms = 520) => {
    stopFlight();
    const to = clampCam(target);
    if (prefersReducedMotion() || ms === 0) {
      setCam(to);
      return;
    }
    const from = { ...camRef.current };
    const t0 = performance.now();
    const step = (t) => {
      const p = clamp((t - t0) / ms, 0, 1);
      const e = EASE(p);
      /* zoom interpolates in log space so flying 1x -> 6x moves at a steady
         perceived rate instead of crawling then lurching */
      const k = Math.exp(Math.log(from.k) + (Math.log(to.k) - Math.log(from.k)) * e);
      setCam(clampCam({ cx: from.cx + (to.cx - from.cx) * e, cy: from.cy + (to.cy - from.cy) * e, k }));
      if (p < 1) flight.current = requestAnimationFrame(step);
      else flight.current = null;
    };
    flight.current = requestAnimationFrame(step);
  };

  /* THE LINK: the camera follows the conversation. An answer about specific
     assets frames exactly those pins; an aggregate answer flies home. */
  useEffect(() => {
    if (!focused.length) {
      flyTo(HOME_CAM);
      return;
    }
    const xs = focused.map((a) => a.coord[0] + 180);
    const ys = focused.map((a) => 90 - a.coord[1]);
    const pad = 9; // degrees of breathing room around the framed pins
    const bw = Math.max(...xs) - Math.min(...xs) + pad * 2;
    const bh = Math.max(...ys) - Math.min(...ys) + pad * 2;
    flyTo({
      cx: (Math.min(...xs) + Math.max(...xs)) / 2,
      cy: (Math.min(...ys) + Math.max(...ys)) / 2,
      k: clamp(Math.min(HOME.w / bw, HOME.h / bh), 1, 5),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusIds.join('|')]);

  useEffect(() => stopFlight, []);

  /* pointer coords -> map degrees, for zoom-at-cursor */
  const toMap = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const { cx, cy, k } = camRef.current;
    const w = HOME.w / k;
    const h = HOME.h / k;
    return {
      x: cx - w / 2 + ((e.clientX - r.left) / r.width) * w,
      y: cy - h / 2 + ((e.clientY - r.top) / r.height) * h,
    };
  };

  const zoomAt = (pt, factor) => {
    stopFlight();
    const c = camRef.current;
    const k = clamp(c.k * factor, 1, MAX_K);
    if (k === c.k) return;
    /* keep the point under the cursor fixed while the scale changes */
    const s = c.k / k;
    setCam(clampCam({ k, cx: pt.x - (pt.x - c.cx) * s, cy: pt.y - (pt.y - c.cy) * s }));
  };

  const onWheel = (e) => {
    /* plain wheel keeps scrolling the page; pinch gestures arrive as
       ctrl+wheel and are the only wheel input the map claims */
    if (!e.ctrlKey) return;
    e.preventDefault();
    zoomAt(toMap(e), Math.exp(-e.deltaY * 0.01));
  };

  /* wheel must be a non-passive native listener to be allowed preventDefault */
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return undefined;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (drag.current && drag.current.id !== e.pointerId) {
      pinch.current = { a: drag.current.id, b: e.pointerId, pts: { [drag.current.id]: drag.current.last, [e.pointerId]: { x: e.clientX, y: e.clientY } } };
      drag.current = null;
      return;
    }
    drag.current = { id: e.pointerId, last: { x: e.clientX, y: e.clientY }, moved: false };
  };

  const onPointerMove = (e) => {
    if (pinch.current) {
      const p = pinch.current;
      if (e.pointerId !== p.a && e.pointerId !== p.b) return;
      const before = Math.hypot(p.pts[p.a].x - p.pts[p.b].x, p.pts[p.a].y - p.pts[p.b].y);
      p.pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      const after = Math.hypot(p.pts[p.a].x - p.pts[p.b].x, p.pts[p.a].y - p.pts[p.b].y);
      if (before > 0) {
        const mid = {
          clientX: (p.pts[p.a].x + p.pts[p.b].x) / 2,
          clientY: (p.pts[p.a].y + p.pts[p.b].y) / 2,
        };
        zoomAt(toMap(mid), after / before);
      }
      return;
    }
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const c = camRef.current;
    if (c.k === 1) return; // nothing to pan at home zoom
    const r = svgRef.current.getBoundingClientRect();
    const dx = ((e.clientX - d.last.x) / r.width) * (HOME.w / c.k);
    const dy = ((e.clientY - d.last.y) / r.height) * (HOME.h / c.k);
    if (Math.abs(e.clientX - d.last.x) + Math.abs(e.clientY - d.last.y) > 2) d.moved = true;
    d.last = { x: e.clientX, y: e.clientY };
    stopFlight();
    setCam(clampCam({ ...c, cx: c.cx - dx, cy: c.cy - dy }));
  };

  const onPointerUp = (e) => {
    if (pinch.current && (e.pointerId === pinch.current.a || e.pointerId === pinch.current.b)) pinch.current = null;
    if (drag.current && e.pointerId === drag.current.id) drag.current = null;
  };

  const view = (() => {
    const w = HOME.w / cam.k;
    const h = HOME.h / cam.k;
    return `${cam.cx - w / 2} ${cam.cy - h / 2} ${w} ${h}`;
  })();

  /* pins hold their screen size across zoom */
  const pr = (base) => base / cam.k;
  const zoomed = cam.k > 1.02;

  return (
    <div className="fm">
      <svg
        ref={svgRef}
        className={`fm-svg${zoomed ? ' is-zoomed' : ''}`}
        viewBox={view}
        role="img"
        aria-label={`Zoomable demo network map showing ${fleet.length} labels across North America, Europe, the Middle East and Asia`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => zoomAt(toMap(e), 2)}
        style={{ touchAction: zoomed ? 'none' : 'pan-y' }}
      >
        <rect x={HOME.x} y={HOME.y} width={HOME.w} height={HOME.h} className="fm-water" />

        <g className="fm-grat" aria-hidden="true">
          {[-30, 0, 30, 60].map((lat) => (
            <line key={`p${lat}`} x1={HOME.x} y1={90 - lat} x2={HOME.x + HOME.w} y2={90 - lat} />
          ))}
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => (
            <line key={`m${lng}`} x1={lng + 180} y1={HOME.y} x2={lng + 180} y2={HOME.y + HOME.h} />
          ))}
        </g>

        {geo && (
          <g className="fm-geo">
            <path className="fm-land" d={geo.LAND} />
            <path className="fm-lakes" d={geo.LAKES} />
            <path className="fm-borders" d={geo.BORDERS} />
          </g>
        )}
        <line className="fm-equator" x1={HOME.x} y1="90" x2={HOME.x + HOME.w} y2="90" />

        {fleet.map((a) => {
          if (!a.coord) return null;
          const x = a.coord[0] + 180;
          const y = 90 - a.coord[1];
          const on = focusIds.includes(a.id);
          return (
            <g
              key={a.id}
              className={`fm-pin${on ? ' is-on' : ''}`}
              style={{ '--tone': TONE[a.state] }}
              onClick={(e) => {
                if (drag.current?.moved) return; // a pan is not a pick
                e.stopPropagation();
                onPick(a.id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPick(a.id);
                }
              }}
              aria-label={`${a.id}, ${a.kind}, ${a.place}`}
            >
              <circle className="fm-hit" cx={x} cy={y} r={pr(6)} />
              {on && <circle className="fm-ring" cx={x} cy={y} r={pr(4.6)} />}
              <circle className="fm-halo" cx={x} cy={y} r={pr(on ? 2.9 : 2.2)} />
              <circle className="fm-dot" cx={x} cy={y} r={pr(on ? 1.7 : 1.25)} />
              {/* the serial appears once there is room for it: the label names
                  itself exactly when the zoom makes that legible */}
              {cam.k >= 2.4 && (
                <text className="fm-pin-id" x={x + pr(4.2)} y={y + pr(1.2)} style={{ fontSize: pr(3.4) }}>
                  {a.id}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <span className="fm-status font-machine" aria-live="polite">
        <i className="fm-status-dot" aria-hidden="true" />
        {focused.length === 1
          ? `${focused[0].id} · ${focused[0].place}`
          : focused.length > 1
            ? `Showing ${focused.length} labels`
            : `${fleet.length} labels · live positions`}
      </span>

      <div className="fm-controls" role="group" aria-label="Map zoom">
        <button type="button" className="fm-btn" onClick={() => zoomAt(camRef.current && { x: camRef.current.cx, y: camRef.current.cy }, 1.7)} aria-label="Zoom in" disabled={cam.k >= MAX_K}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>
        <button type="button" className="fm-btn" onClick={() => zoomAt({ x: camRef.current.cx, y: camRef.current.cy }, 1 / 1.7)} aria-label="Zoom out" disabled={cam.k <= 1}>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 6h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>
        {zoomed && (
          <button type="button" className="fm-btn" onClick={() => flyTo(HOME_CAM)} aria-label="Reset map view">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4.5V2h2.5M10 7.5V10H7.5M2 2l3 3M10 10 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="fm-caption">
        <span className="fm-key" aria-hidden="true">
          {STATE_KEY.map(([name, tone]) => (
            <span key={name} className="fm-key-item">
              <i style={{ background: tone }} />
              {name}
            </span>
          ))}
        </span>
        <span className="fm-cap-note font-machine">Demo dataset · drag to pan when zoomed</span>
      </div>
    </div>
  );
}
