// Shared data arrays / builders ported verbatim from the source .dc.html template.
// All copy text, numbers and colors are preserved exactly as authored.

function demoIcon(children) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

export const DEMO = [
  {
    icon: demoIcon(<><path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5z" /><path d="M4 7l8 4.5L20 7" /><path d="M12 11.5V21.5" /></>),
    title: 'Unbox the Label',
    desc: 'Peel XenTag™ from the roll',
  },
  {
    icon: demoIcon(<><path d="M20.6 13.3 11.3 4H5a1 1 0 0 0-1 1v6.3l9.3 9.3a2 2 0 0 0 2.8 0l4.5-4.5a2 2 0 0 0 0-2.8z" /><circle cx="8.2" cy="8.2" r="1.1" fill="currentColor" stroke="none" /></>),
    title: 'Stick & Activate',
    desc: 'Apply to package. Auto-pairs via BLE',
  },
  {
    icon: demoIcon(<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z" />),
    title: 'Live Monitoring',
    desc: '-2°C · In-transit · Alert at +4°C',
  },
  {
    icon: demoIcon(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.6" /></>),
    title: 'Real-time Location',
    desc: 'Cellular ping every 60s · ETA 3h 20m',
  },
  {
    icon: demoIcon(<><circle cx="12" cy="12" r="9" /><path d="M8.4 12.4l2.4 2.4 4.8-5.2" /></>),
    title: 'Delivery Confirmed',
    desc: 'Chain of custody locked & logged',
  },
];

// ---- industryData() ----
function indSvg(paths) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function industryData() {
  return [
    { name: 'Cold Chain', slotId: 'ind-coldchain', color: '#0284C7', chipBg: 'rgba(2,132,199,0.12)', photo: '/images/industries/cold-chain.webp', tint: 'rgba(2,132,199,0.34)', iconEl: indSvg(['M12 2v20M4 7l16 10M20 7L4 17']), long: 'Vaccines, food and biologics ride inside a 1–2°C window. XenTag logs temperature end to end and fires a breach alert before a single pallet spoils.' },
    { name: 'Logistics & Freight', slotId: 'ind-logistics', color: '#C2410C', chipBg: 'rgba(194,65,12,0.12)', photo: '/images/industries/logistics-freight.webp', tint: 'rgba(194,65,12,0.32)', iconEl: indSvg(['M3 21h18M6 21V9l6-4 6 4v12']), long: 'Every pallet, parcel and container reports its own arrivals, departures and dwell time, giving you piece-level visibility from origin to the final mile.' },
    { name: 'Warehousing', slotId: 'ind-warehousing', color: '#0D9488', chipBg: 'rgba(13,148,136,0.12)', photo: '/images/industries/warehousing.webp', tint: 'rgba(13,148,136,0.3)', iconEl: indSvg(['M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13']), long: 'Bluetooth positioning counts and locates stock automatically indoors, so cycle counts and misplaced-asset hunts stop consuming the shift.' },
    { name: 'Aerospace & Airport Ops', slotId: 'ind-aerospace', color: '#0284C7', chipBg: 'rgba(2,132,199,0.12)', photo: '/images/industries/aerospace.webp', tint: 'rgba(2,132,199,0.34)', iconEl: indSvg(['M2 16l20-7-7 13-3-5-5-1z']), long: 'Ground equipment, ULDs and high-value cargo stay visible airside, with no line of sight and no manual scans required.' },
    { name: 'Manufacturing', slotId: 'ind-manufacturing', color: '#C2410C', chipBg: 'rgba(194,65,12,0.12)', photo: '/images/industries/manufacturing.webp', tint: 'rgba(194,65,12,0.3)', iconEl: indSvg(['M3 20h18V9l-6 4V9l-6 4V4H3v16z']), long: 'Follow work-in-progress and returnable containers through every station, and stop them walking out the gate.' },
    { name: 'Healthcare & Pharma', slotId: 'ind-healthcare', color: '#0D9488', chipBg: 'rgba(13,148,136,0.12)', photo: '/images/industries/healthcare-pharma.webp', tint: 'rgba(13,148,136,0.3)', iconEl: indSvg(['M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z', 'M12 9v6M9 12h6']), long: 'Track equipment, specimens and pharma inventory with an audit-ready chain of custody and EU DPP-ready records.' },
  ];
}

// ---- trustData() ----
function trustSvg(color, kids) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {kids}
    </svg>
  );
}
function trustBars(color) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <rect x={3} y={13} width={3.4} height={8} rx={1} fill={color} opacity={0.5} />
      <rect x={9} y={9} width={3.4} height={12} rx={1} fill={color} opacity={0.75} />
      <rect x={15} y={4} width={3.4} height={17} rx={1} fill={color} />
    </svg>
  );
}
function trustTxt(pre, strong) {
  return (
    <>
      {pre}
      <strong style={{ color: '#0F1114', fontWeight: 600 }}>{strong}</strong>
    </>
  );
}

export function trustData() {
  return [
    { iconEl: trustSvg('#0284C7', <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx={12} cy={12} r={3} /></>), textEl: trustTxt('Global visibility, ', 'activation to delivery') },
    { iconEl: trustSvg('#C2410C', <><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" /></>), textEl: trustTxt('Powered by a ', '100M+ device network') },
    { iconEl: trustBars('#0D9488'), textEl: trustTxt('Cellular tracking in ', '29 countries') },
    { iconEl: trustSvg('#0284C7', <><rect x={2} y={7} width={16} height={10} rx={2} /><path d="M21 10v4" /><rect x={4.5} y={9.5} width={7} height={5} rx={0.6} fill="#0284C7" stroke="none" /></>), textEl: trustTxt('', '1-year battery life') },
    { iconEl: trustSvg('#C2410C', <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z" />), textEl: trustTxt('', 'Temperature + shock alerts') },
    { iconEl: trustSvg('#0D9488', <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />), textEl: trustTxt('No base stations, ', 'no install') },
  ];
}

// ---- incidentsData() ----
export function incidentsData() {
  return [
    { stat: '3,625', label: 'cargo theft incidents in 2024', desc: 'North American cargo theft hit a record high, up 27% year over year.', source: 'Verisk CargoNet, 2025', color: '#FF7A2E' },
    { stat: '$202K', label: 'average value per theft', desc: 'The average loss per cargo theft in 2024, rising to ~$274K in 2025.', source: 'Verisk CargoNet', color: '#FF7A2E' },
    { stat: '$725M', label: 'stolen cargo, 2025', desc: 'Estimated total US & Canada cargo theft losses, a 60% jump in one year.', source: 'Verisk CargoNet, 2026', color: '#EA580C' },
    { stat: '$531M+', label: 'stolen in Canada since 2019', desc: 'Cargo and equipment losses concentrated around Mississauga, Brampton, Toronto & Montreal.', source: 'Burns & Wilcox', color: '#C2410C' },
    { stat: '+78%', label: 'theft spike, Dallas County', desc: 'The hardest-hit US county in 2024; California and Texas drove the surge.', source: 'Verisk CargoNet', color: '#EA580C' },
    { stat: '$35B', label: 'lost to cold-chain failures / yr', desc: 'Pharma product lost every year to temperature excursions in transit and storage.', source: 'IQVIA / ISPE', color: '#FFB37E' },
    { stat: 'up to 50%', label: 'of vaccines wasted globally', desc: 'Discarded each year, largely due to inadequate temperature control and logistics.', source: 'World Health Organization', color: '#FFB37E' },
    { stat: '~25%', label: 'of vaccines arrive degraded', desc: 'Degraded by the time they reach their destination because of temperature excursions.', source: 'WHO, via FreightWaves', color: '#FF7A2E' },
    { stat: '1–2°C', label: 'excursion ruins biologics', desc: 'A deviation of just 1–2°C can make vaccines, insulin and biologics ineffective.', source: 'Cold-chain industry data', color: '#EA580C' },
    { stat: '~$8B', label: 'from last-mile failures', desc: 'A large, often-preventable share of cold-chain loss happens on the final leg.', source: 'Mordor Intelligence', color: '#C2410C' },
    { stat: 'majority', label: 'of losses are human error', desc: 'Most temperature losses stem from missing visibility rather than equipment failure.', source: 'ISPE', color: '#FF7A2E' },
    { stat: 'hours', label: 'not days, to react', desc: 'Cell & gene therapies ship at ‒60 to ‒150°C with delivery windows measured in hours.', source: 'Air Cargo Week', color: '#FFB37E' },
  ];
}

// ---- inline arrays from renderVals() ----
export const integrations = [
  { name: 'Geotab', cat: 'Telematics', mono: 'GT', color: '#FFFFFF', chip: '#0A3D62' },
  { name: 'Power BI', cat: 'Analytics', mono: 'BI', color: '#FFFFFF', chip: '#8A5A00' },
  { name: 'Salesforce', cat: 'CRM', mono: 'SF', color: '#FFFFFF', chip: '#0176D3' },
  { name: 'SAP', cat: 'ERP', mono: 'SAP', color: '#FFFFFF', chip: '#0A6ED1' },
  { name: 'NetSuite', cat: 'ERP', mono: 'NS', color: '#FFFFFF', chip: '#165C38' },
  { name: 'Slack', cat: 'Alerting', mono: 'SL', color: '#FFFFFF', chip: '#611F69' },
  { name: 'Zapier', cat: 'Automation', mono: 'ZP', color: '#FFFFFF', chip: '#C2410C' },
  { name: 'Google Sheets', cat: 'Export', mono: 'GS', color: '#FFFFFF', chip: '#0B6B3A' },
];

export const comparison = [
  { feature: 'Cost per asset', us: '$10', them: '$30+', bg: '#FFFFFF' },
  { feature: 'Battery life', us: '1 year', them: '3–6 months', bg: 'rgba(243,245,247,0.5)' },
  { feature: 'Setup', us: 'Peel & stick', them: 'Hardwired install', bg: '#FFFFFF' },
  { feature: 'Temperature sensing', us: 'Built-in', them: 'Paid add-on', bg: 'rgba(243,245,247,0.5)' },
  { feature: 'BLE + Cellular', us: 'Both', them: 'Cellular only', bg: '#FFFFFF' },
  { feature: 'Lives in your fleet dashboard', us: 'Native', them: 'Separate portal', bg: 'rgba(243,245,247,0.5)' },
];

export const proof = [
  { tag: 'Pilot', tagColor: '#0284C7', title: '2 school-bus pilots live', desc: 'BLE boarding-detection pilots running today, with the service-confirmation UI already designed.' },
  { tag: 'Coverage', tagColor: '#1E8A5B', title: '100M+ BLE nodes, 29 countries', desc: 'The XenTag network gives crowdsourced coverage that already exists, with no new hardware to deploy.' },
  { tag: 'Hardware', tagColor: '#C2410C', title: 'Reads on GoFleet AT+ gateways', desc: 'The AT+ BLE gateway picks up XenTag label signals with no firmware changes, leaving room to move fast.' },
  { tag: 'In testing', tagColor: '#B7791F', title: 'QR activate → map in 5 min', desc: 'Basic API test: a label activates from a QR scan and appears on the live map within five minutes, with final confirmation in progress.' },
  { tag: 'Live client', tagColor: '#1E8A5B', title: 'Texas Instruments in production', desc: 'An existing indoor asset-tracking client, proving the indoor and asset use case in production.' },
  { tag: 'Economics', tagColor: '#9A3412', title: 'Native temp logging at $6/label', desc: 'XenTag includes temperature logging at $6/label, so the economics work at an $8–10 list price.' },
];

export const pricing = [
  { name: 'Starter', pre: '', price: '$10', unit: '/ label', track: '+ $3/mo Track fee per asset', note: 'billed monthly · cancel anytime', pad: '34px 30px', scale: '1', featsLabel: 'Includes', desc: 'For a first pilot on a single route or site.', bg: '#FFFFFF', border: 'rgba(13,16,20,0.1)', shadow: '0 1px 2px rgba(13,16,20,0.03),0 18px 44px -34px rgba(13,16,20,0.2)', feats: ['Up to 50 labels', 'Live location + temperature', 'Live map access', 'Email alerts'], cta: 'Start a pilot', ctaBg: '#F1F3F5', ctaColor: '#0F1114', ctaBorder: 'rgba(13,16,20,0.12)', ctaShadow: 'none' },
  { name: 'Fleet Pro', pre: 'from', price: '$8', unit: '/ label', track: '+ $2/mo Track fee per asset', note: 'volume tiers · billed monthly', pad: '38px 32px', scale: '1.03', featsLabel: 'Everything in Starter, plus', desc: 'For operations rolling out across the fleet.', bg: '#FDF4ED', border: 'rgba(194,65,12,0.45)', shadow: '0 2px 6px rgba(13,16,20,0.05),0 48px 96px -44px rgba(13,16,20,0.45)', isPopular: true, feats: ['Unlimited labels', 'Shock + geofence alerts', 'Shared fleet + asset views', 'API & webhooks', 'Priority support'], cta: 'Get 10 free labels', ctaBg: '#C2410C', ctaColor: '#fff', ctaBorder: '#C2410C', ctaShadow: '0 2px 8px -2px rgba(13,16,20,0.3)' },
  { name: 'Enterprise', pre: '', price: 'Custom', unit: '', track: 'Volume label + Track pricing', note: 'annual agreement', pad: '34px 30px', scale: '1', featsLabel: 'Everything in Fleet Pro, plus', desc: 'For multi-site, compliance-driven deployments.', bg: '#FFFFFF', border: 'rgba(13,16,20,0.1)', shadow: '0 1px 2px rgba(13,16,20,0.03),0 18px 44px -34px rgba(13,16,20,0.2)', feats: ['Volume pricing', 'XenAuth authentication + EU DPP', 'SSO & audit logs', 'SLA & dedicated CSM', 'Custom integrations'], cta: 'Talk to sales', ctaBg: '#F1F3F5', ctaColor: '#0F1114', ctaBorder: 'rgba(13,16,20,0.12)', ctaShadow: 'none' },
];

export const pricingTrust = ['Peel and stick, no installers', 'Recyclable labels', 'No long-term contract', 'Tracking live the same week'];
