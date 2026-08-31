import { useCallback, useEffect, useRef, useState } from 'react';
import { integrations } from '../data.jsx';

/* Works with the tools you already run — the hub.

   The section read flat for one diagnosable reason: every brand mark was forced
   to fill:rgba(255,255,255,.9) at 17px, so the viewer had to READ each logo
   instead of recognising it. Colour now exists in exactly one place — inside
   the bone plate, on the mark itself. Eight marks at ~19px in 38px plates is
   roughly 0.23% of the hub's surface, a twentieth of the ~10% ember budget the
   canon already permits. Quantity was never the risk.

   What causes a sticker sheet is unequal luminance: bare brand colours on this
   charcoal span 1.33:1 (Slack aubergine) to 11.6:1 (Power BI yellow). A single
   neutral plate collapses that spread to zero — every plate is identically
   contrasted against the panel, and every mark then sits on the near-white
   ground its designer actually specified. The composition equalises via the
   plate, never by muting the marks.

   Inside the plate, be the vendor; outside it, be XenTag. */

const LEFT = integrations.slice(0, 4);
const RIGHT = integrations.slice(4, 8);

/* Brand marks are quoted artifacts, exactly like the WhatsApp fidelity
   constants — reproduce them, never normalise them toward our palette.
   Zapier is the one demotion, and by measurement rather than taste: its #FF4F00
   sits ~12° of hue from ember-arrow and would read as one of our own live
   signals. It renders in ink, a legitimate Zapier brand usage. */
const BRAND = {
  Geotab: '#0072CE',
  'Power BI': '#E8A33D',
  Salesforce: '#00A1E0',
  SAP: '#0FAAFF',
  NetSuite: '#125EAB',
  Zapier: '#14110D',
  'Google Sheets': '#0F9D58',
};

/* Slack's mark is four colours by construction; a one-colour Slack is the
   single most recognisable "someone flattened our logo" tell. */
const SLACK = [
  { fill: '#E01E5A', d: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z' },
  { fill: '#36C5F0', d: 'M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z' },
  { fill: '#2EB67D', d: 'M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z' },
  { fill: '#ECB22E', d: 'M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z' },
];

/* the label's barcode — fixed bar widths, drawn not photographed */
const BARS = [2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2];

function BrandMark({ ig }) {
  if (ig.name === 'Slack') {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
        {SLACK.map((s) => (
          <path key={s.fill} d={s.d} fill={s.fill} />
        ))}
      </svg>
    );
  }
  if (!ig.path) {
    return (
      <span className="integ-node-mono" style={{ color: BRAND[ig.name] }}>
        {ig.name.charAt(0)}
      </span>
    );
  }
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={BRAND[ig.name] || '#14110D'} aria-hidden="true">
      <path d={ig.path} />
    </svg>
  );
}

function ToolCard({ ig, side }) {
  return (
    <div className={`integ-node integ-node-${side}`} data-name={ig.name}>
      <span className="integ-node-chip" aria-hidden="true">
        <BrandMark ig={ig} />
      </span>
      <span className="integ-node-id">
        <strong>{ig.name}</strong>
        <em>{ig.cat}</em>
      </span>
    </div>
  );
}

const ENDPOINT = 'POST /v1/labels/XT-48192/subscribe';

const CODE_LINES = [
  [{ t: '{', c: 'p' }],
  [{ t: '  ', c: 'p' }, { t: '"events"', c: 'k' }, { t: ': [', c: 'p' }, { t: '"location"', c: 's' }, { t: ', ', c: 'p' }, { t: '"temp_breach"', c: 's' }, { t: ', ', c: 'p' }, { t: '"shock"', c: 's' }, { t: '],', c: 'p' }],
  [{ t: '  ', c: 'p' }, { t: '"webhook"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"https://hooks.acme.com/zendu"', c: 's' }],
  [{ t: '}', c: 'p' }],
  [],
  [{ t: '→ 200 OK', c: 'ok' }, { t: '  ·  streaming live', c: 'd' }],
];

function ApiPanel() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    const body = `${ENDPOINT}\n\n{\n  "events": ["location", "temp_breach", "shock"],\n  "webhook": "https://hooks.acme.com/zendu"\n}`;
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — say nothing rather than fake a success state */
    }
  }, []);

  return (
    <div className="api-code">
      <div className="api-bar">
        <svg className="api-bar-glyph" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
        </svg>
        <span className="api-bar-endpoint">{ENDPOINT}</span>
        <button type="button" className="api-copy" onClick={copy}>
          {copied ? <span className="api-copy-dot" aria-hidden="true" /> : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M6 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
            </svg>
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="api-pre">
        {CODE_LINES.map((line, i) => (
          <span key={i} className="api-line">
            <i className="api-ln" aria-hidden="true">{i + 1}</i>
            <span className="api-code-text">
              {line.map((tok, j) => (
                <span key={j} className={`api-t-${tok.c}`}>{tok.t}</span>
              ))}
            </span>
          </span>
        ))}
      </pre>
    </div>
  );
}

export default function Integrations() {
  const hubRef = useRef(null);
  const [beams, setBeams] = useState({ w: 0, h: 0, paths: [] });

  useEffect(() => {
    const el = hubRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const compute = () => {
      const hub = el.getBoundingClientRect();
      const label = el.querySelector('.integ-label');
      if (!label || hub.width < 900) {
        setBeams({ w: 0, h: 0, paths: [] });
        return;
      }
      const c = label.getBoundingClientRect();
      const cy = c.top + c.height / 2 - hub.top;
      const paths = [];
      el.querySelectorAll('.integ-node').forEach((node) => {
        const r = node.getBoundingClientRect();
        const fromLeft = node.classList.contains('integ-node-left');
        const x1 = (fromLeft ? r.right : r.left) - hub.left;
        const y1 = r.top + r.height / 2 - hub.top;
        const x2 = (fromLeft ? c.left : c.right) - hub.left;
        // horizontal-tangent S-curve: both controls at exactly half the x-span,
        // so beams leave the card and enter the label flat
        const dx = Math.abs(x2 - x1) * 0.5;
        paths.push(`M ${x1} ${y1} C ${x1 + (fromLeft ? dx : -dx)} ${y1}, ${x2 + (fromLeft ? -dx : dx)} ${cy}, ${x2} ${cy}`);
      });
      setBeams({ w: hub.width, h: hub.height, paths });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="integrations" className="integrations-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, color: '#14110D' }}>
          Works with the tools <span className="h2-ember">you already run</span>
        </h2>
        <p style={{ marginTop: 16, color: '#3B352D' }}>
          Push live location, temperature and events into the systems your team lives in, or pull them through an open REST API and webhooks.
        </p>
      </div>

      <div className="integ-bento">
        {/* the readout bar is what turns a concept diagram into an instrument */}
        <div className="integ-chrome">
          <span className="integ-chrome-live">
            <i aria-hidden="true" />
            LABEL XT-48192 · STREAMING
          </span>
          <span className="integ-chrome-meta">8 systems · REST + webhooks</span>
        </div>

        <div className="integ-hub" ref={hubRef}>
          {beams.paths.length > 0 && (
            <svg className="integ-beams" width={beams.w} height={beams.h} viewBox={`0 0 ${beams.w} ${beams.h}`} aria-hidden="true">
              {beams.paths.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="rgba(249,118,47,0.22)" strokeWidth="1" />
              ))}
            </svg>
          )}

          <div className="integ-col integ-col-left">
            {LEFT.map((ig) => <ToolCard key={ig.name} ig={ig} side="left" />)}
          </div>

          <div className="integ-stage">
            <div className="integ-label" role="img" aria-label="A live XenTag label, serial XT-48192, connected to the systems around it">
              <span className="integ-label-head">
                <img src="/images/xentag-mark@2x.png" alt="" width="18" height="18" style={{ display: 'block', borderRadius: '50%' }} />
                <span className="integ-label-word">XENTAG</span>
                <span className="integ-label-dot" />
              </span>
              <span className="integ-barcode" aria-hidden="true">
                {BARS.map((w, i) => <i key={i} style={{ width: w }} />)}
              </span>
              <span className="integ-label-serial font-machine">XT-48192 · LIVE</span>
            </div>
          </div>

          <div className="integ-col integ-col-right">
            {RIGHT.map((ig) => <ToolCard key={ig.name} ig={ig} side="right" />)}
          </div>
        </div>

        <div className="api-grid">
          <div className="api-copy-col">
            <h3 className="api-h3">Build anything on the open API</h3>
            <p className="api-lede">
              Subscribe to any label&rsquo;s events, stream them to your endpoint, and drive your own dashboards, tickets and automations. No middleware required.
            </p>
            <p className="api-stack">
              REST API <span>/</span> Webhooks <span>/</span> OAuth 2.0
            </p>
          </div>
          <ApiPanel />
        </div>
      </div>
    </section>
  );
}
