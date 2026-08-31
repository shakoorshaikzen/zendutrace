import { useEffect, useRef, useState } from 'react';
import { useFleetSim, fmtClock, STATE_LABEL } from '../hooks/useFleetSim.js';
import FleetMap from './FleetMap.jsx';

/* Ask-on-WhatsApp, outdoor edition — the same interaction the ZenduCare demo
   uses for indoor tracking, rebuilt for shipments in transit:
     left  · the real cellular-coverage render over the demo fleet manifest
     right · a WhatsApp thread you can actually type into
   The fleet is a running simulation (useFleetSim): pings age in real time,
   transit assets advance along real waypoints, ETAs fall with the clock, and
   sensor values walk deterministic curves. The bot answers from that same
   live state through the same formatters, so the thread and the manifest can
   never disagree. Everything here is a labelled demo dataset — no live
   customer data. */

const REPLY_MS = 1500;


const PIN_TONE = {
  transit: '#BC3E10',
  delivered: '#1E8A5B',
  breach: '#E45011',
  geofence: '#E45011',
  stale: '#6B6156',
};

const GREETING =
  'XenTag demo network. Ask where a shipment is, what is running late, what broke its temperature range, or what left its yard.';

/* Tappable prompts, cycled two at a time so the tray keeps teaching without
   turning into a wall of buttons. */
const SUGGESTIONS = [
  'Where is XT-48192?',
  'Anything out of temperature range?',
  'What left its yard?',
  'Which labels have gone quiet?',
  'What is late?',
  'Battery on XT-48276?',
  'Give me a summary',
  'What can I ask?',
];

const clock = () => fmtClock(Date.now());

/* ── The resolver ─────────────────────────────────────────────────────────

   Answers any question the demo dataset can actually support, from the live
   simulation, and says so plainly when it cannot. Three rules:

   1. EVERY answer is read from `fleet` at answer time, so the thread, the
      manifest and the map can never disagree.
   2. A list answers with ALL of its matches, not the first one. "Anything in
      transit?" returning one of four would be a wrong answer, not a short one.
   3. Anything outside the dataset gets a real reply that says what is missing
      and what can be asked instead — never a guess, and never a shrug.

   Returns { assets, lines }: `assets` is what lights up on the map and in the
   manifest, so a four-match answer lights four pins. */

const STATE_OF = {
  transit: 'in transit',
  delivered: 'delivered',
  breach: 'above its temperature limit',
  geofence: 'outside its geofence',
  stale: 'gone quiet',
};

/* One line per asset, in the voice the question asked in. */
const lineFor = (a, mode) => {
  if (mode === 'battery') return `${a.id} · ${a.battery}%. ${a.place}.`;
  if (mode === 'temp') return `${a.id} · ${a.tempText}. ${a.place}.`;
  if (mode === 'ping') return `${a.id} · pinged ${a.pingText}. ${a.place}.`;
  if (mode === 'eta') return `${a.id} · ${a.status}. ${a.place}.`;
  return `${a.id} · ${a.place}. ${a.status}.`;
};

/* Lists stay readable: five rows, then a count. */
function listLines(head, list, mode) {
  const lines = [head];
  list.slice(0, 5).forEach((a) => lines.push(lineFor(a, mode)));
  if (list.length > 5) lines.push(`…and ${list.length - 5} more.`);
  return lines;
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/* Things a visitor reasonably asks that this demo genuinely cannot do. Each
   gets an honest answer plus the nearest thing it CAN do — a guardrail that
   only says "I can't" is a dead end. */
const GUARDRAILS = [
  {
    test: /(price|pricing|cost of|how much|quote|discount|invoice|buy|purchase|order some|subscribe)/,
    lines: [
      'I only read the demo fleet, so I cannot quote pricing here.',
      'Labels are $10 each with tracking included. The free-labels link under this demo puts a real order in front of a human.',
    ],
  },
  {
    test: /(human|agent|sales|rep|call me|phone me|email me|speak to|talk to someone|support)/,
    lines: [
      'I am a demo bot on a sample dataset, so I cannot pass you to anyone.',
      'The "Book a 20-min demo" link below reaches the actual team.',
    ],
  },
  {
    test: /(reroute|re-route|stop the|cancel|dispatch|call the driver|send someone|turn off|shut down|alert|notify|escalate)/,
    lines: [
      'This demo is read-only: it reports state, it does not act on it.',
      'In the product these conditions raise alerts and webhooks. Ask me what is wrong and I will tell you what the labels are reporting.',
    ],
  },
  {
    test: /(yesterday|last week|last month|history|historical|over time|trend|chart|graph|report for|since monday)/,
    lines: [
      'The demo holds live state only, so I have no history to look back through.',
      'The real platform keeps an audit-ready trail per label. Right now I can tell you where anything is, its temperature, battery and last ping.',
    ],
  },
  {
    test: /(will it|predict|forecast|going to arrive|expect|likely|risk of|chance)/,
    lines: [
      'I do not forecast. I only report what the labels have actually sent.',
      'I can give you the current ETA, or tell you what is already late or out of range.',
    ],
  },
  {
    test: /(add|create|register|activate|onboard|delete|remove|rename)\s+(a |an |the )?(label|tag|asset|shipment)/,
    lines: [
      'I cannot change the fleet from here. This is a fixed demo dataset of eight labels.',
      'Activating a real label takes one tap with a phone. Ask me about any of the eight and I will show you what it reports.',
    ],
  },
  {
    test: /(weather|traffic|fuel|driver|invoice|customs|tariff|insurance)/,
    lines: [
      'That is outside what a XenTag label reports. A label sends location, temperature, shock and battery.',
      'Ask me about any of those and I will read you the live value.',
    ],
  },
];

function resolve(raw, fleet) {
  const q = raw.toLowerCase().trim().replace(/[?!.,]+$/g, '');
  if (!q) return null;

  const byState = (st) => fleet.filter((f) => f.state === st);
  const none = (lines) => ({ assets: [], lines });
  const some = (assets, lines) => ({ assets, lines });

  /* ── conversational ──────────────────────────────────────────────────── */
  if (/^(hi|hey|hello|yo|sup|good (morning|afternoon|evening))\b/.test(q)) {
    return none([
      `Hello. ${fleet.length} labels are reporting on the demo network.`,
      'Ask about a serial, a condition, a commodity or a region, or say "what can I ask".',
    ]);
  }
  if (/^(thanks|thank you|ta|cheers|nice|cool|great|ok|okay)\b/.test(q)) {
    return none(['Any time. Ask me anything else about the eight demo labels.']);
  }
  if (/(what can|help|how do i|which questions|example|command|options|can you do)/.test(q)) {
    return none([
      'Ask by serial, like "where is XT-48192", or by anything the labels report.',
      'Conditions: in transit, delivered, out of temperature range, left its yard, gone quiet, running late.',
      'Values: temperature, battery, last ping, ETA. Also by cargo ("the vaccines") or region ("anything in Europe").',
    ]);
  }

  /* ── what is being asked ABOUT ───────────────────────────────────────── */
  const wantsTemp = /(temp|cold|warm|breach|degree|°|c\b|range|reefer|frozen|chill|hot)/.test(q);
  const wantsBattery = /(batter(y|ies)|charge|charging|power|juice|%)/.test(q);
  const wantsPing = /(ping|pinged|report(ed|ing)?|heard|signal|update|last seen|when did|how long ago)/.test(q);
  const wantsEta = /(eta|arriv|when will|due|land|get there|how long until)/.test(q);
  const wantsWhere = /(where|location|position|located|which city|what city|whereabouts)/.test(q);
  const mode = wantsBattery ? 'battery' : wantsTemp ? 'temp' : wantsPing ? 'ping' : wantsEta ? 'eta' : 'where';

  /* An action verb outranks a serial: "reroute XT-48192" is a request to DO
     something, and answering it with a location would dodge the question. */
  const action = GUARDRAILS[2];
  if (action.test.test(q)) return none(action.lines);

  /* ── a named asset always answers about itself ───────────────────────── */
  const byId = fleet.find((f) => q.includes(f.id.toLowerCase()) || f.keys.some((k) => q.includes(k)));
  if (byId) {
    if (wantsBattery) return some([byId], [`${byId.id} is at ${byId.battery}% battery.`, `${byId.place}. Pinged ${byId.pingText}.`]);
    if (wantsTemp) {
      return some([byId], byId.tempC != null
        ? [`${byId.id} is reading ${byId.tempText}.`, `${byId.place}. Pinged ${byId.pingText}.`]
        : [`${byId.id} carries no temperature range. It reports ambient only.`, `${byId.place}. Pinged ${byId.pingText}.`]);
    }
    if (wantsPing) return some([byId], [`${byId.id} last pinged ${byId.pingText}.`, `${byId.place}. ${byId.status}.`]);
    if (wantsEta) return some([byId], [`${byId.id} · ${byId.status}.`, `${byId.place}. Pinged ${byId.pingText}.`]);
    if (byId.state === 'stale') return some([byId], [`${byId.id} has gone quiet at ${byId.place}.`, `Last ping ${byId.pingText}. ${byId.status}.`]);
    if (byId.state === 'delivered') return some([byId], [`${byId.id} arrived at ${byId.place}.`, `${byId.status}. Chain of custody logged.`]);
    return some([byId], [`${byId.id} is at ${byId.place}.`, `Pinged ${byId.pingText}. ${byId.tempText}. ${byId.status}.`]);
  }

  /* ── by commodity ────────────────────────────────────────────────────── */
  const cargoHit = fleet.filter((f) => {
    const c = f.cargo.toLowerCase();
    return q.includes(c) || c.split(' ').some((w) => w.length > 4 && q.includes(w));
  });
  if (cargoHit.length) {
    const label = cargoHit.length === 1 ? cargoHit[0].cargo : `${cargoHit.length} matching labels`;
    return some(cargoHit, listLines(`The ${label}:`, cargoHit, mode));
  }

  /* ── by region ───────────────────────────────────────────────────────── */
  const REGION = [
    { test: /(north america|usa|u\.s|\bus\b|america|states|canada|mexico)/, name: 'North America' },
    { test: /(europe|eu\b|netherlands|rotterdam|dutch)/, name: 'Europe' },
    { test: /(asia|singapore|apac|far east)/, name: 'Asia' },
    { test: /(middle east|gulf|dubai|uae|emirates)/, name: 'Middle East' },
  ].find((r) => r.test.test(q));
  if (REGION) {
    const hit = fleet.filter((f) => f.region === REGION.name);
    return hit.length
      ? some(hit, listLines(`${plural(hit.length, 'label', 'labels')} in ${REGION.name}:`, hit, mode))
      : none([`Nothing in ${REGION.name} on the demo network right now.`]);
  }

  /* ── by condition ────────────────────────────────────────────────────── */
  const COND = [
    { test: /(in transit|transit|moving|on the road|en route|driving|shipping|underway)/, st: 'transit' },
    { test: /(deliver|arrived|complete|done|dropped|landed)/, st: 'delivered' },
    { test: /(out of (temp|range)|breach|too warm|too hot|overheat|above|temperature (range|limit)|spoil)/, st: 'breach' },
    { test: /(geofence|zone|yard|left its|unauthor|stolen|theft|moved off)/, st: 'geofence' },
    { test: /(quiet|silent|no signal|stale|lost|missing|dark|offline|not reporting)/, st: 'stale' },
  ].find((c) => c.test.test(q));
  if (COND) {
    const hit = byState(COND.st);
    if (!hit.length) return none([`Nothing is ${STATE_OF[COND.st]} right now.`, 'Ask for a summary and I will run through everything.']);
    return some(hit, listLines(
      `${plural(hit.length, 'label is', 'labels are')} ${STATE_OF[COND.st]}.`,
      hit,
      COND.st === 'breach' ? 'temp' : COND.st === 'stale' ? 'ping' : mode
    ));
  }

  /* ── anything needing attention ──────────────────────────────────────── */
  if (/(late|delay|overdue|behind|slip|at risk|wrong|problem|issue|attention|bad|worry|alert)/.test(q)) {
    const risk = [...byState('breach'), ...byState('geofence'), ...byState('stale')];
    if (!risk.length) return none(['Nothing needs attention. Every label is inside its limits.']);
    return some(risk, listLines(`${plural(risk.length, 'shipment needs', 'shipments need')} a look.`, risk, 'where'));
  }

  /* ── superlatives ────────────────────────────────────────────────────── */
  if (wantsBattery) {
    const low = fleet.reduce((x, y) => (x.battery <= y.battery ? x : y));
    if (/(low|weak|worst|least|dying|need charg)/.test(q)) {
      return some([low], [`${low.id} is the lowest at ${low.battery}% battery.`, `${low.place}. Everything else is above ${Math.min(...fleet.filter((f) => f.id !== low.id).map((f) => f.battery))}%.`]);
    }
    const sorted = [...fleet].sort((x, y) => x.battery - y.battery);
    return some(sorted, listLines('Battery across the fleet, lowest first:', sorted, 'battery'));
  }
  if (wantsTemp) {
    const withTemp = fleet.filter((f) => f.tempC != null).sort((x, y) => y.tempC - x.tempC);
    if (!withTemp.length) return none(['None of the demo labels are carrying a temperature range right now.']);
    return some(withTemp, listLines('Temperatures, warmest first:', withTemp, 'temp'));
  }
  if (wantsPing) {
    const sorted = [...fleet].sort((x, y) => x.lastPingAt - y.lastPingAt);
    return some(sorted, listLines('Last ping, oldest first:', sorted, 'ping'));
  }
  if (wantsEta) {
    const moving = byState('transit');
    return some(moving, listLines(`${plural(moving.length, 'label is', 'labels are')} still moving.`, moving, 'eta'));
  }

  /* ── a bare "where" with no subject lists the fleet, before aggregates
        claim it — "where is everything" wants positions, not a tally ─────── */
  if (wantsWhere) {
    return some(fleet, listLines('Everything on the demo network:', fleet, 'where'));
  }

  /* ── aggregates ──────────────────────────────────────────────────────── */
  if (/(how many|count|total|summar|overview|status|everything|rundown|report|all good|anything wrong|list|show me all|what do you have)/.test(q)) {
    const parts = [];
    ['transit', 'delivered', 'breach', 'geofence', 'stale'].forEach((st) => {
      const n = byState(st).length;
      if (n) parts.push(`${n} ${STATE_OF[st]}`);
    });
    return none([`${fleet.length} labels reporting on the demo network.`, `${parts.join(', ')}.`]);
  }

  /* ── guardrails: real questions this demo cannot answer ──────────────── */
  const blocked = GUARDRAILS.find((g) => g.test.test(q));
  if (blocked) return none(blocked.lines);

  /* ── genuinely not understood ────────────────────────────────────────── */
  return none([
    'I did not catch that one.',
    `I can answer on ${fleet.length} demo labels: where each is, its temperature, battery, last ping and ETA, or by condition, cargo or region.`,
    'Try "anything in transit", "what is out of range", or a serial like XT-48192.',
  ]);
}

const goToBook = (intent) => () => window.dispatchEvent(new CustomEvent('xt-intent', { detail: intent }));

function Ticks() {
  return (
    <svg className="wa-tick" viewBox="0 0 18 11" fill="none" aria-hidden="true">
      <path d="M1 6.2 3.6 8.9 9.1 2.3" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.6 6.2 10.2 8.9 16.8 1.7" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AskDemo() {
  const { fleet, now, justPinged } = useFleetSim();
  const [messages, setMessages] = useState([{ from: 'bot', lines: [GREETING], at: '' }]);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState('');
  const [focusIds, setFocusIds] = useState([]);
  const [used, setUsed] = useState([]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(null);

  // the reply resolves when the typing pause ends, against the fleet as it
  // is at that moment — not as it was when the question was sent
  const fleetRef = useRef(fleet);
  fleetRef.current = fleet;

  // stamp the greeting on the client so the thread reads as "now"
  useEffect(() => {
    setMessages((m) => (m[0].at ? m : [{ ...m[0], at: clock() }]));
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const ask = (text) => {
    const t = text.trim();
    if (!t || typing) return;
    setValue('');
    setMessages((m) => [...m, { from: 'me', lines: [t], at: clock() }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      const answer = resolve(t, fleetRef.current);
      setTyping(false);
      setFocusIds(answer.assets.map((a) => a.id));
      setMessages((m) => [...m, { from: 'bot', lines: answer.lines, at: clock() }]);
    }, REPLY_MS);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ask(value);
  };

  const pick = (text) => {
    setUsed((u) => (u.includes(text) ? u : [...u, text]));
    ask(text);
  };

  const restart = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setValue('');
    setUsed([]);
    setFocusIds([]);
    setMessages([{ from: 'bot', lines: [GREETING], at: clock() }]);
    inputRef.current?.focus();
  };

  const focused = fleet.filter((f) => focusIds.includes(f.id));
  const focus = focused.length === 1 ? focused[0] : null;
  const pool = SUGGESTIONS.filter((s) => !used.includes(s));
  const chips = (pool.length ? pool : SUGGESTIONS).slice(0, 2);
  const ready = !!value.trim() && !typing;

  return (
    <section id="ask" className="ask-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#14110D' }}>
          If your team can send a text, they can track a shipment
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: '#3B352D' }}>
          No app to install, no dashboard to learn. Ask on WhatsApp and the answer comes back with the location, the temperature and the last ping. Type a question below, or tap a shipment to ask about it.
        </p>
      </div>

      <div className="ask-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 336px', gap: 'clamp(24px,4vw,56px)' }}>
        {/* LEFT — the demo fleet as a manifest, in the same idiom as the
            integrations table. The coverage render sits above it as a real,
            unannotated strip; the answered row lights up, and every row is
            itself a question you can ask. */}
        <div className="ask-map-card">
          <div className="ask-map-head">
            <span>XenTag demo network</span>
            <span className="ask-map-count font-machine">{fleet.length} labels reporting</span>
          </div>
          <FleetMap fleet={fleet} focusIds={focusIds} onPick={(id) => ask(`Where is ${id}`)} />

          {/* The link, stated. When the thread answers about an asset this bar
              names it and prints its live readings, so the panel and the phone
              are visibly reporting the same thing at the same moment. */}
          {focus ? (
            <div className="ask-focus" aria-live="polite">
              <span className="ask-focus-lead font-machine">Thread is showing</span>
              <span className="ask-focus-id font-machine">{focus.id}</span>
              <span className={`ask-chip is-${focus.state}`}>{STATE_LABEL[focus.state]}</span>
              <span className="ask-focus-read font-machine">{focus.tempText}</span>
              <span className="ask-focus-sep" aria-hidden="true" />
              <span className="ask-focus-read font-machine">Battery {focus.battery}%</span>
              <span className="ask-focus-sep" aria-hidden="true" />
              <span className="ask-focus-read font-machine">Pinged {focus.pingText}</span>
            </div>
          ) : focused.length > 1 ? (
            <div className="ask-focus" aria-live="polite">
              <span className="ask-focus-lead font-machine">Thread is showing</span>
              <span className="ask-focus-id font-machine">{focused.length} labels</span>
              <span className="ask-focus-read font-machine">{focused.map((f) => f.id).join(' · ')}</span>
            </div>
          ) : (
            <div className="ask-focus is-idle">
              <span className="ask-focus-lead font-machine">Ask about a label and it lights up here and on the map</span>
            </div>
          )}
          <ul className="ask-manifest">
            {fleet.map((a) => {
              const on = focusIds.includes(a.id);
              const pinged = justPinged.has(a.id);
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    className={`ask-row${on ? ' is-on' : ''}${pinged ? ' did-ping' : ''}`}
                    style={{ '--tone': PIN_TONE[a.state] }}
                    onClick={() => ask(`Where is ${a.id}`)}
                    aria-label={`Ask the demo network where ${a.id} is`}
                  >
                    <span className="ask-row-id font-machine">{a.id}</span>
                    <span className="ask-row-kind">{a.kind}</span>
                    <span className={`ask-chip is-${a.state}`}>{STATE_LABEL[a.state]}</span>
                    <span className="ask-row-place">{a.place}</span>
                    <span className="ask-row-ping font-machine">{a.pingText}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="ask-map-foot">Demo dataset · readings are illustrative</div>
        </div>

        {/* RIGHT — the thread */}
        <div className="ask-phone-col">
          <div className="wa-phone">
            <div className="wa-screen">
              <div className="wa-status" aria-hidden="true">
                <span className="font-machine">{fmtClock(now)}</span>
                <span className="wa-island" />
                <svg width="34" height="11" viewBox="0 0 34 11" fill="none">
                  <g fill="rgba(255,255,255,0.92)">
                    <rect x="0" y="7" width="2.4" height="4" rx="0.8" />
                    <rect x="3.6" y="5" width="2.4" height="6" rx="0.8" />
                    <rect x="7.2" y="3" width="2.4" height="8" rx="0.8" />
                    <rect x="10.8" y="1" width="2.4" height="10" rx="0.8" />
                  </g>
                  <path d="M16.4 4.1a5.6 5.6 0 0 1 6.4 0l-.9 1.1a4.2 4.2 0 0 0-4.6 0z" fill="rgba(255,255,255,0.92)" />
                  <path d="M18 6.2a2.8 2.8 0 0 1 3.2 0l-1.6 2z" fill="rgba(255,255,255,0.92)" />
                  <rect x="25" y="2.2" width="12" height="6.6" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" />
                  <rect x="26.3" y="3.5" width="7.6" height="4" rx="1" fill="rgba(255,255,255,0.92)" />
                </svg>
              </div>

              <div className="wa-top">
                <span className="wa-ava" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 12c5 0 9 2.2 9 5v1H3v-1c0-2.8 4-5 9-5z" />
                  </svg>
                </span>
                <span className="wa-id">
                  <strong>XenTag</strong>
                  <em>{typing ? 'typing…' : focus ? `showing ${focus.id}` : focused.length > 1 ? `showing ${focused.length} labels` : 'online'}</em>
                </span>
              </div>

              <div className="wa-body" ref={bodyRef} aria-live="polite" aria-label="Conversation with the XenTag demo network">
                <ul className="wa-msgs">
                  {messages.map((m, i) => (
                    <li key={i} className={`wa-msg ${m.from}`}>
                      <div className="wa-bubble">
                        {m.lines.map((line, j) => (
                          <span key={j}>{line}</span>
                        ))}
                        <em>
                          {m.at}
                          {m.from === 'me' && <Ticks />}
                        </em>
                      </div>
                    </li>
                  ))}
                  {typing && (
                    <li className="wa-msg bot">
                      <div className="wa-bubble wa-typing" aria-label="XenTag is typing">
                        <i /><i /><i />
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="wa-quick" role="group" aria-label="Suggested questions">
                <span className="wa-quick-label">Try asking</span>
                {chips.map((c) => (
                  <button key={c} type="button" className="wa-chip" onClick={() => pick(c)} disabled={typing}>
                    {c}
                  </button>
                ))}
              </div>

              <form className="ask-foot" onSubmit={onSubmit} autoComplete="off">
                <label className="sr-only" htmlFor="askInput">Your question for the XenTag demo network</label>
                <input
                  className="ask-input"
                  id="askInput"
                  name="q"
                  type="text"
                  ref={inputRef}
                  maxLength={200}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setValue('')}
                  placeholder={'Try "where is XT-48192"'}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  enterKeyHint="send"
                />
                <button className="ask-send" type="submit" disabled={!ready} aria-label={ready ? 'Send' : 'Type a question, then send'}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.1 15.6 12 3.4 13.9z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          {/* the slot is always reserved so the handset's height never jumps
              when the first message lands */}
          <button
            type="button"
            className="ask-restart"
            onClick={restart}
            style={{ visibility: messages.length > 1 ? 'visible' : 'hidden' }}
            aria-hidden={messages.length <= 1}
            tabIndex={messages.length > 1 ? 0 : -1}
          >
            Start the conversation over
          </button>
        </div>
      </div>

      <div className="ask-cta">
        <p className="ask-cta-copy">
          <strong>Point this at your own shipments.</strong>
          <span>Ten labels, free, shipping this week. Then ask them anything from the thread your team already uses.</span>
        </p>
        <div className="ask-cta-acts">
          <a className="ask-cta-go" href="#book" onClick={goToBook('labels')}>Get 10 free labels</a>
          <a className="ask-cta-alt" href="#book" onClick={goToBook('demo')}>Book a 20-min demo</a>
        </div>
      </div>
    </section>
  );
}
