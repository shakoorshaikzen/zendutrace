import { useEffect, useMemo, useRef, useState } from 'react';

/* Fleet simulation for the Ask-on-WhatsApp demo.
   Everything the manifest and the bot show is derived from one clock:

     · each asset holds a real epoch `lastPingAt`, so "40 seconds ago" is
       computed, never stored — it ages on its own and survives a
       backgrounded tab (timestamps, not counters)
     · transit assets ping on a scripted cadence and advance along real
       waypoint legs; ETA is decremented by actual elapsed time
     · absolute times ("Delivered 11:12") are now-minus-offset, so they can
       never sit in the future of the visitor's clock
     · telemetry drifts through deterministic scripted sequences —
       no Math.random, so two sessions read the same and an answer given
       twice stays consistent with itself

   The bot answers from this same state through these same formatters, so
   the thread and the manifest can never disagree. */

const TICK_MS = 5000;

const MIN = 60000;

/* ── formatters ──────────────────────────────────────────────────────────── */

/* Status in words. Colour alone is not a status — it fails for the ~8% of men
   with a colour-vision deficiency and it fails in a screenshot. */
export const STATE_LABEL = {
  transit: 'In transit',
  delivered: 'Delivered',
  breach: 'Temp breach',
  geofence: 'Left geofence',
  stale: 'No signal',
};

export const fmtClock = (t) => {
  const d = new Date(t);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export const fmtAgo = (ms) => {
  const s = Math.max(5, Math.round(ms / 5000) * 5);
  if (ms < 60 * 1000) return `${s} seconds ago`;
  const m = Math.round(ms / MIN);
  if (m < 90) return `${m} minute${m === 1 ? '' : 's'} ago`;
  const h = Math.round(ms / (60 * MIN));
  return `${h} hour${h === 1 ? '' : 's'} ago`;
};

export const fmtEta = (min, from) => {
  if (min <= 1) return 'Arriving now';
  if (min < 60) return `ETA ${Math.round(min)} min`;
  if (min < 20 * 60) {
    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);
    return m ? `ETA ${h} h ${String(m).padStart(2, '0')} min` : `ETA ${h} h`;
  }
  const days = min / (24 * 60);
  if (days < 1.5) return `ETA tomorrow ${fmtClock((from ?? Date.now()) + min * MIN)}`;
  return `ETA ${Math.round(days)} days`;
};

const fmtTemp = (c) => `${c < 0 ? '−' : '+'}${Math.abs(c).toFixed(1)} °C`;

/* ── the scripted fleet ──────────────────────────────────────────────────── */

/* Deterministic drift: the value walks the `deltas` ring once per ping.
   Kept small and mean-reverting so a five-minute visit reads as a sensor,
   not a dice roll. */
const drift = (base, deltas, pings) => {
  let v = base;
  for (let i = 0; i < pings; i++) v += deltas[i % deltas.length];
  return v;
};

/* Route legs are real and in order; `legMin` is a truck-speed estimate for
   that stretch, so place changes stay consistent with the falling ETA. */
export const FLEET_SCRIPT = [
  {
    id: 'XT-48192',
    region: 'North America',
    coord: [-85.18, 42.32], // route origin; the projector moves it leg by leg
    kind: 'Pallet · vaccines',
    state: 'transit',
    pingEveryMs: 5 * MIN,
    firstPingAgoMs: 40 * 1000,
    /* each leg carries the coordinate of its own waypoint, so the pin can
       interpolate along the active leg and the map always agrees with the
       place string beside it */
    route: [
      { place: 'I-94 W near Battle Creek, MI', legMin: 22, coord: [-85.18, 42.32] },
      { place: 'I-94 W near Kalamazoo, MI', legMin: 16, coord: [-85.59, 42.29] },
      { place: 'I-94 W near Paw Paw, MI', legMin: 40, coord: [-85.89, 42.22] },
      { place: 'I-94 W near Benton Harbor, MI', legMin: 35, coord: [-86.45, 42.12] },
      { place: 'I-94 W near Michigan City, IN', legMin: 30, coord: [-86.9, 41.71] },
      { place: 'I-94 W near Gary, IN', legMin: 37, coord: [-87.35, 41.6] },
      { place: 'I-90/94 entering Chicago, IL', legMin: 20, coord: [-87.62, 41.88] },
    ],
    etaMin: 200,
    temp: { base: 4.2, deltas: [0.1, -0.1, 0, 0.2, -0.2, 0.1, -0.1], range: '2 to 8 °C', inRange: true },
    battery: 91,
    keys: ['48192', 'vaccine', 'pharma'],
  },
  {
    id: 'XT-48207',
    region: 'North America',
    coord: [-118.2, 33.75],
    kind: 'Case · semiconductors',
    state: 'delivered',
    pingEveryMs: 60 * MIN,
    firstPingAgoMs: 6 * MIN,
    place: 'Port of Long Beach · Pier E (LBCT)',
    deliveredAgoMin: 47,
    temp: null,
    battery: 88,
    keys: ['48207', 'semiconductor', 'chip', 'electronics', 'long beach', 'pier e'],
  },
  {
    id: 'XT-48219',
    region: 'North America',
    coord: [-98.2, 26.2],
    kind: 'Pallet · produce',
    state: 'breach',
    pingEveryMs: 3 * MIN,
    firstPingAgoMs: 2 * MIN,
    place: 'Pharr, TX · reefer trailer 4412',
    etaMin: 65,
    temp: { base: 6.4, deltas: [0.2, 0.1, -0.1, 0.1, -0.2, -0.1, 0], limit: 4, inRange: false },
    battery: 84,
    keys: ['48219', 'produce', 'reefer', 'pharr'],
  },
  {
    id: 'XT-48231',
    region: 'North America',
    coord: [-73.8, 40.6],
    kind: 'Crate · fine art',
    state: 'transit',
    pingEveryMs: 30 * MIN,
    firstPingAgoMs: 6 * MIN,
    place: 'JFK cargo · Building 151 (WFS)',
    etaMin: 16 * 60 + 25,
    temp: { base: 19.1, deltas: [0.1, -0.1, 0, -0.1, 0.1], range: '15 to 25 °C', inRange: true },
    battery: 73,
    keys: ['48231', 'fine art', 'jfk'],
  },
  {
    id: 'XT-48244',
    region: 'North America',
    coord: [-84.4, 33.75],
    kind: 'Pallet · spirits',
    state: 'geofence',
    pingEveryMs: 2 * MIN,
    firstPingAgoMs: 55 * 1000,
    /* distance from the yard grows as it drives — one deterministic step
       per ping, roughly city speed */
    geofence: { city: 'Atlanta, GA', startMi: 1.5, miPerPing: 0.9, capMi: 9.8, exitedAgoMin: 8, bearingDeg: 38 },
    temp: null,
    battery: 96,
    keys: ['48244', 'spirits', 'atlanta'],
  },
  {
    id: 'XT-48258',
    region: 'Europe',
    coord: [4.5, 51.9],
    kind: 'Case · medical devices',
    state: 'transit',
    pingEveryMs: 60 * MIN,
    firstPingAgoMs: 3 * MIN,
    place: 'Rotterdam · Maasvlakte II (RWG)',
    etaMin: 2 * 24 * 60,
    temp: { base: 8.0, deltas: [-0.1, 0.1, 0, 0.1, -0.1, -0.1, 0.1], range: '2 to 25 °C', inRange: true },
    battery: 62,
    keys: ['48258', 'rotterdam', 'medical device'],
  },
  {
    id: 'XT-48263',
    region: 'Asia',
    coord: [103.8, 1.35],
    kind: 'Pallet · lithium cells',
    state: 'transit',
    pingEveryMs: 2 * 60 * MIN,
    firstPingAgoMs: 9 * MIN,
    place: 'Singapore · Pasir Panjang (PSA)',
    etaMin: 6 * 24 * 60,
    temp: { base: 24.6, deltas: [0.1, 0.2, -0.1, -0.2, 0.1, -0.1], range: 'below 30 °C', inRange: true },
    battery: 41,
    keys: ['48263', 'singapore', 'lithium', 'pasir panjang'],
  },
  {
    id: 'XT-48276',
    region: 'Middle East',
    coord: [55.2, 24.9],
    kind: 'Case · aero spares',
    state: 'stale',
    pingEveryMs: Infinity,
    firstPingAgoMs: 4 * 60 * MIN,
    place: 'Dubai South (DWC) · Aviation District',
    temp: null,
    battery: 19,
    keys: ['48276', 'dubai', 'aero spare'],
  },
];

/* ── the projector: script + clock → what everything displays ────────────── */

export function project(script, mountedAt, now) {
  const elapsed = now - mountedAt;

  return script.map((a) => {
    /* pings: the first happened firstPingAgoMs before mount; later ones land
       on the cadence. pingCount is how many cadence pings have fired. */
    const sinceFirst = elapsed + a.firstPingAgoMs;
    const pings = a.pingEveryMs === Infinity ? 0 : Math.floor(sinceFirst / a.pingEveryMs);
    const lastPingAt =
      a.pingEveryMs === Infinity
        ? mountedAt - a.firstPingAgoMs
        : mountedAt - a.firstPingAgoMs + pings * a.pingEveryMs;

    /* place AND position: transit assets walk their route by elapsed leg
       time, and the pin interpolates along the active leg so the map never
       disagrees with the place string beside it */
    let place = a.place;
    let coord = a.coord;
    if (a.route) {
      let minLeft = elapsed / MIN;
      let i = 0;
      while (i < a.route.length - 1 && minLeft >= a.route[i].legMin) {
        minLeft -= a.route[i].legMin;
        i++;
      }
      place = a.route[i].place;
      const from = a.route[i].coord;
      const to = a.route[Math.min(i + 1, a.route.length - 1)].coord;
      const f = i < a.route.length - 1 ? Math.min(1, minLeft / a.route[i].legMin) : 0;
      coord = [from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f];
    }
    if (a.geofence) {
      const mi = Math.min(a.geofence.capMi, a.geofence.startMi + pings * a.geofence.miPerPing);
      place = `${a.geofence.city} · ${mi.toFixed(1)} mi from its yard`;
      /* the pin leaves the yard on a fixed bearing, one deterministic step
         per ping — the same miles the place string reports */
      const rad = (a.geofence.bearingDeg * Math.PI) / 180;
      const dMi = mi - a.geofence.startMi;
      coord = [
        a.coord[0] + (dMi * Math.sin(rad)) / (69 * Math.cos((a.coord[1] * Math.PI) / 180)),
        a.coord[1] + (dMi * Math.cos(rad)) / 69,
      ];
    }

    /* the third line: ETA, delivery, exit, or silence — always time-true */
    let status;
    if (a.state === 'delivered') {
      status = `Delivered ${fmtClock(mountedAt - a.deliveredAgoMin * MIN)}`;
    } else if (a.state === 'stale') {
      status = 'Last known position held';
    } else if (a.state === 'geofence') {
      status = `Geofence exit ${fmtClock(mountedAt - a.geofence.exitedAgoMin * MIN)}`;
    } else {
      status = fmtEta(a.etaMin - elapsed / MIN, now);
    }

    /* temperature: deterministic sensor walk, one step per ping */
    let tempC = null;
    let tempText = 'Ambient';
    if (a.temp) {
      tempC = drift(a.temp.base, a.temp.deltas, pings);
      tempText = a.temp.inRange
        ? `${fmtTemp(tempC)}, in range`
        : `${fmtTemp(tempC)}, above the +${a.temp.limit} °C limit`;
    }

    return {
      id: a.id,
      coord,
      region: a.region,
      kind: a.kind,
      /* "Pallet · vaccines" → "vaccines": the commodity is a first-class field
         so questions like "where are the vaccines" resolve on data rather than
         on a substring match against a formatted label. */
      cargo: a.kind.split('·').pop().trim(),
      state: a.state,
      keys: a.keys,
      battery: a.battery,
      place,
      status,
      tempC,
      tempText,
      lastPingAt,
      pingText: fmtAgo(now - lastPingAt),
      pings,
    };
  });
}

/* ── the hook ────────────────────────────────────────────────────────────── */

export function useFleetSim() {
  // mount time anchors every offset; state is just the advancing clock
  const mountedAt = useMemo(() => Date.now(), []);
  const [now, setNow] = useState(mountedAt);
  const prevPings = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(t);
  }, []);

  const fleet = useMemo(() => project(FLEET_SCRIPT, mountedAt, now), [mountedAt, now]);

  // which rows pinged since the previous tick — drives the manifest flash
  const justPinged = useMemo(() => {
    const prev = prevPings.current;
    const fresh = new Set();
    if (prev) {
      for (const a of fleet) if (prev[a.id] != null && a.pings > prev[a.id]) fresh.add(a.id);
    }
    prevPings.current = Object.fromEntries(fleet.map((a) => [a.id, a.pings]));
    return fresh;
  }, [fleet]);

  return { fleet, now, mountedAt, justPinged };
}
