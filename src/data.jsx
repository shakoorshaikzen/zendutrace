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
/* Tab glyphs are Lucide geometry (ISC), not hand-approximated paths: the
   previous set drew a house for freight and a lidded bin for warehousing.
   1.9 declared on the 24 grid renders ~1.75px at the 22px tab size — the one
   optical stroke every UI glyph shares (see Icons.jsx); the isometric dieline
   illustrations keep their own varied weights, being drawings.
   pathLength={1} normalizes every segment so the active tab can draw its
   glyph on with a single dashoffset run (Industries.jsx). */
function indSvg(paths, circles = []) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" className="ind-glyph">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {circles.map(([cx, cy, r], i) => (
        <circle key={`c${i}`} cx={cx} cy={cy} r={r} pathLength={1} stroke="currentColor" strokeWidth={1.9} />
      ))}
    </svg>
  );
}

export function industryData() {
  return [
    { name: 'Cold Chain', slotId: 'ind-coldchain', color: '#0284C7', chipBg: 'rgba(2,132,199,0.12)', photo: '/images/industries/cold-chain.webp', tint: 'rgba(2,132,199,0.34)', iconEl: indSvg(['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z']), long: 'Vaccines, food and biologics ride inside a 1–2°C window. XenTag logs temperature end to end and fires a breach alert before a single pallet spoils.' },
    { name: 'Logistics & Freight', slotId: 'ind-logistics', color: '#BC3E10', chipBg: 'rgba(188,62,16,0.12)', photo: '/images/industries/logistics-freight.webp', tint: 'rgba(188,62,16,0.32)', iconEl: indSvg(['M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9', 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14'], [[17, 18, 2], [7, 18, 2]]), long: 'Every pallet, parcel and container reports its own arrivals, departures and dwell time, giving you piece-level visibility from origin to the final mile.' },
    { name: 'Warehousing', slotId: 'ind-warehousing', color: '#0D9488', chipBg: 'rgba(13,148,136,0.12)', photo: '/images/industries/warehousing.webp', tint: 'rgba(13,148,136,0.3)', iconEl: indSvg(['M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11', 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z', 'M6 13h12', 'M6 17h12']), long: 'Bluetooth positioning counts and locates stock automatically indoors, so cycle counts and misplaced-asset hunts stop consuming the shift.' },
    { name: 'Aerospace & Airport Ops', slotId: 'ind-aerospace', color: '#0284C7', chipBg: 'rgba(2,132,199,0.12)', photo: '/images/industries/aerospace.webp', tint: 'rgba(2,132,199,0.34)', iconEl: indSvg(['M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z']), long: 'Ground equipment, ULDs and high-value cargo stay visible airside, with no line of sight and no manual scans required.' },
    { name: 'Manufacturing', slotId: 'ind-manufacturing', color: '#BC3E10', chipBg: 'rgba(188,62,16,0.12)', photo: '/images/industries/manufacturing.webp', tint: 'rgba(188,62,16,0.3)', iconEl: indSvg(['M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z', 'M8 16h.01', 'M12 16h.01', 'M16 16h.01']), long: 'Follow work-in-progress and returnable containers through every station, and stop them walking out the gate.' },
    { name: 'Healthcare & Pharma', slotId: 'ind-healthcare', color: '#0D9488', chipBg: 'rgba(13,148,136,0.12)', photo: '/images/industries/healthcare-pharma.webp', tint: 'rgba(13,148,136,0.3)', iconEl: indSvg(['m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z', 'm8.5 8.5 7 7']), long: 'Track equipment, specimens and pharma inventory with an audit-ready chain of custody and EU DPP-ready records.' },
  ];
}

// ---- trustData() ----
/* Spec ledger under the hero: five label facts as value + caption pairs.
   The value carries the display voice; the caption explains it underneath. */
function trustTxt(caption, value) {
  return (
    <>
      <span style={{ display: 'block' }}>{caption}</span>
      <strong>{value}</strong>
    </>
  );
}

export function trustData() {
  return [
    { textEl: trustTxt('device network', '100M+ nodes') },
    { textEl: trustTxt('cellular coverage', '29 countries') },
    { textEl: trustTxt('battery life', '1 year') },
    { textEl: trustTxt('alerts built in', 'Temp + shock') },
    { textEl: trustTxt('no base stations', 'No install') },
  ];
}

/* ---- The loss register ----------------------------------------------------

   Ten figures, two families, every one traced back to the document that
   actually published it. This set replaces an earlier twelve, of which only
   five survived verification: the old "3,625 cargo theft incidents" counted
   supply-chain crime *events* (2,243 were confirmed thefts) and its publisher
   has since restated the baseline and reported the trend flat, not up 27%;
   "$35B / IQVIA / ISPE" attributed to a body that has published nothing of the
   kind; "up to 50% of vaccines wasted" is a 2002 WHO planning assumption for
   20-dose lyophilized vials, and WHO's own guidance says open-vial wastage,
   not temperature, is the primary cause.

   Because the section prints its sources as a structural column rather than as
   fine print, every `url` here must resolve to the document being cited. Do not
   add a row without one. Precision is deliberate — $273,990 rather than $274K —
   because exact figures read as reporting and round ones read as describing. */
export const lossRegister = {
  theft: {
    family: 'Cargo theft',
    note: 'Five figures, four of them from the primary counting body for North America.',
    rows: [
      { stat: '$725M', label: 'Cargo stolen across the US and Canada, 2025', conversion: '72.5 million labels at $10 each', source: 'Verisk CargoNet, Jan 2026', url: 'https://www.cargonet.com/news-and-events/cargonet-in-the-media/2025-theft-trends/', tier: 'headline' },
      { stat: '$273,990', label: 'Average loss per cargo theft, US and Canada 2025', conversion: 'One loss buys 27,399 labels', source: 'Verisk CargoNet, Jan 2026', url: 'https://www.cargonet.com/news-and-events/cargonet-in-the-media/2025-theft-trends/', tier: 'major' },
      { stat: '$531M+', label: 'Trucks, trailers and cargo stolen in Canada, 2019–23', conversion: '$239M+ of it was never recovered', source: 'Équité Association, 2024', url: 'https://www.equiteassociation.com/press-releases/equite-association-releases-its-inaugural-cargo-and-heavy-equipment-theft-trend-report', tier: 'major' },
      { stat: '2,646', label: 'Confirmed cargo thefts in 2025, up 18%', conversion: 'About seven a day, US and Canada', source: 'Verisk CargoNet, Jan 2026', url: 'https://www.cargonet.com/news-and-events/cargonet-in-the-media/2025-theft-trends/', tier: 'minor' },
      { stat: '58%', label: 'Share of US cargo theft in California and Texas', conversion: 'California 38%, Texas 20%, full-year 2025', source: 'Overhaul, via FreightWaves', url: 'https://www.freightwaves.com/news/california-texas-account-for-58-of-us-cargo-theft-in-2025', tier: 'minor' },
    ],
  },
  cold: {
    family: 'Cold chain',
    note: 'Five figures spanning food and pharma, each with its year printed, because the vintage is load-bearing.',
    rows: [
      { stat: '526M tonnes', label: 'Food lost for want of refrigeration, 2017', conversion: '12% of all food produced that year', source: 'UNEP and FAO, 2022', url: 'https://www.fao.org/newsroom/detail/amid-food-and-climate-crises-investing-in-sustainable-food-cold-chains-crucial/en', tier: 'headline' },
      { stat: '68.3%', label: 'Of parcel transit time outside temperature range', conversion: '36 logged parcels; USP room temp, not 2–8°C', source: 'J Am Pharm Assoc, 2023', url: 'https://pubmed.ncbi.nlm.nih.gov/36858884/', tier: 'major' },
      { stat: '$8B', label: 'Pharma cold-chain loss to last-mile failures', conversion: 'Apportioned from a $35B annual estimate', source: 'Mordor Intelligence, 2025', url: 'https://www.mordorintelligence.com/signal/insights/pharma-cold-chain-summer-risks', tier: 'major' },
      { stat: '33%', label: 'Vaccine storage below range, wealthy countries', conversion: '37.1% in lower-income countries', source: 'Hanson et al., Vaccine 2017', url: 'https://www.sciencedirect.com/science/article/pii/S0264410X16309471', tier: 'minor' },
      { stat: '25.4%', label: 'Fruit and veg lost before it reaches retail', conversion: 'Up from 23.2% in 2015; post-harvest to retail', source: 'FAO Food Loss Index, 2023', url: 'https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/1231-global-food-losses/en/', tier: 'minor' },
    ],
  },
  /* The closing measure. Drawn to true scale, so the terminal must be exactly
     the maximum shown or the geometry lies. */
  anchor: {
    label: 'One XenTag label',
    labelValue: 10,
    printedLabel: '$10',
    terminal: 273990,
    printedTerminal: '$273,990',
    terminalLabel: 'Average loss, one cargo theft',
    source: 'Verisk CargoNet, Jan 2026',
    url: 'https://www.cargonet.com/news-and-events/cargonet-in-the-media/2025-theft-trends/',
    ratio: 'A label costs 0.0036% of the average theft. One loss buys 27,399 of them.',
  },
};

// ---- inline arrays from renderVals() ----
export const integrations = [
  { name: "Geotab", cat: "Telematics", blurb: "Push label positions straight into your existing fleet map.", path: null , group: "record" },
  { name: "Power BI", cat: "Analytics", blurb: "Model dwell time, spoilage and loss in your own reports.", path: "M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z" , group: "analytics" },
  { name: "Salesforce", cat: "CRM", blurb: "Attach live shipment state to the account record.", path: "M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" , group: "record" },
  { name: "SAP", cat: "ERP", blurb: "Reconcile goods movements against what actually arrived.", path: "M0 6.064v11.872h12.13L24 6.064zm3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 8.437h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z" , group: "record" },
  { name: "NetSuite", cat: "ERP", blurb: "Post receipts the moment a label reports delivered.", path: "M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z" , group: "record" },
  { name: "Slack", cat: "Alerting", blurb: "Route temperature breaches to the channel on shift.", path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" , group: "alerting" },
  { name: "Zapier", cat: "Automation", blurb: "Wire label events to 6,000+ apps without code.", path: "M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm10.61 8.761h.03a.577.577 0 0 1 .23.038.585.585 0 0 1 .201.124.63.63 0 0 1 .162.431.612.612 0 0 1-.162.435.58.58 0 0 1-.201.128.58.58 0 0 1-.23.042.529.529 0 0 1-.235-.042.585.585 0 0 1-.332-.328.559.559 0 0 1-.038-.235.613.613 0 0 1 .17-.431.59.59 0 0 1 .405-.162Zm2.853 1.572c.03.004.061.004.095.004.325-.011.646.064.937.219.238.144.431.355.552.609.128.279.189.582.185.888v.193a2 2 0 0 1 0 .219h-2.498c.003.227.075.45.204.642a.78.78 0 0 0 .646.265.714.714 0 0 0 .484-.136.642.642 0 0 0 .23-.318l.915.257a1.398 1.398 0 0 1-.28.537c-.14.159-.321.284-.521.355a2.234 2.234 0 0 1-.836.136 1.923 1.923 0 0 1-1.001-.245 1.618 1.618 0 0 1-.665-.703 2.221 2.221 0 0 1-.227-1.036 1.95 1.95 0 0 1 .48-1.398 1.9 1.9 0 0 1 1.3-.488Zm-9.607.023c.162.004.325.026.48.079.207.065.4.174.563.314.26.302.393.692.366 1.088v2.276H8.53l-.109-.711h-.065c-.064.163-.155.31-.272.439a1.122 1.122 0 0 1-.374.264 1.023 1.023 0 0 1-.453.083 1.334 1.334 0 0 1-.866-.264.965.965 0 0 1-.329-.801.993.993 0 0 1 .076-.431 1.02 1.02 0 0 1 .242-.363 1.478 1.478 0 0 1 1.043-.303h.952v-.181a.696.696 0 0 0-.136-.454.553.553 0 0 0-.438-.154.695.695 0 0 0-.378.086.48.48 0 0 0-.193.254l-.99-.144a1.26 1.26 0 0 1 .257-.563c.14-.174.321-.302.533-.378.261-.091.54-.136.82-.129.053-.003.106-.007.163-.007Zm4.384.007c.174 0 .347.038.506.114.182.083.34.211.458.374.257.423.377.911.351 1.406a2.53 2.53 0 0 1-.355 1.448 1.148 1.148 0 0 1-1.009.517c-.204 0-.401-.045-.582-.136a1.052 1.052 0 0 1-.48-.457 1.298 1.298 0 0 1-.114-.234h-.045l.004 1.784h-1.059v-4.713h.904l.117.805h.057c.068-.208.177-.401.328-.56a1.129 1.129 0 0 1 .843-.344h.076v-.004Zm7.559.084h.903l.113.805h.053a1.37 1.37 0 0 1 .235-.484.813.813 0 0 1 .313-.242.82.82 0 0 1 .39-.076h.234v1.051h-.401a.662.662 0 0 0-.313.008.623.623 0 0 0-.272.155.663.663 0 0 0-.174.26.683.683 0 0 0-.027.314v1.875h-1.054v-3.666Zm-17.515.003h3.262v.896L3.73 13.104l.034.113h1.973l.042.9H2.4v-.9l1.931-1.754-.045-.117H2.441v-.896Zm11.815 0h1.055v3.659h-1.055V10.45Zm3.443.684.019.016a.69.69 0 0 0-.351.045.756.756 0 0 0-.287.204c-.11.155-.174.336-.189.522h1.545c-.034-.526-.257-.787-.74-.787h.003Zm-5.718.163c-.026 0-.057 0-.083.004a.78.78 0 0 0-.31.053.746.746 0 0 0-.257.189 1.016 1.016 0 0 0-.204.695v.064c-.015.257.057.507.204.711a.634.634 0 0 0 .253.196.638.638 0 0 0 .314.061.644.644 0 0 0 .578-.265c.14-.223.204-.48.189-.74a1.216 1.216 0 0 0-.181-.711.677.677 0 0 0-.503-.257Zm-4.509 1.266a.464.464 0 0 0-.268.102.373.373 0 0 0-.114.276c0 .053.008.106.027.155a.375.375 0 0 0 .087.132.576.576 0 0 0 .397.11v.004a.863.863 0 0 0 .563-.182.573.573 0 0 0 .211-.457v-.14h-.903Z" , group: "alerting" },
  { name: "Google Sheets", cat: "Export", blurb: "Stream the raw event log into a sheet your team owns.", path: "M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z" , group: "analytics" },
];

/* The comparison ledger.

   Two rules govern this data, both taken from the references the owner named:
   anime.js's documentation tables and Watermelon UI's data tables. Both refuse
   the same things — no zebra, no vertical rules, no per-row icons, no colour
   inside the grid — and both cap a cell at one short token that never wraps.

   So: no glyphs, no magnitude bars, no win-dots, no group bands. A criterion,
   a value, a value. Emphasis is carried entirely by the paper column behind
   the XenTag column, which is the only thing on this surface that is not text.

   One row is one the incumbent wins, and it is printed like every other. */
export const comparisonRows = [
  { feature: 'Cost per asset', us: '$10', usSuffix: '/label', them: '$30+' },
  { feature: 'Reuse across assets', us: 'Single-use', them: 'Redeployed' },
  { feature: 'Setup', us: 'Peel and stick', them: 'Technician fit' },
  { feature: 'Battery life', us: '12 months', usSuffix: 'at 60-min ping', them: '3–6 months' },
  { feature: 'Temperature', us: 'Built in', them: 'Add-on SKU' },
  { feature: 'Radios', us: 'BLE + LTE-M', them: 'Cellular only' },
  { feature: 'Your fleet dashboard', us: 'Native', them: 'Separate portal' },
];

export const comparisonVerdict = {
  feature: 'Total 3-year cost of ownership',
  us: '$10',
  usSuffix: '/label, all-in',
  them: '≈5× higher',
};

export const comparisonBasis =
  'Published vendor datasheets and list pricing, 500-unit order, 3-year 100-asset deployment.';

export const proof = [
  { tag: 'Pilot', tagColor: '#0284C7', title: '2 school-bus pilots live', desc: 'BLE boarding-detection pilots running today, with the service-confirmation UI already designed.' },
  { tag: 'Coverage', tagColor: '#1E8A5B', title: '100M+ BLE nodes, 29 countries', desc: 'The XenTag network gives crowdsourced coverage that already exists, with no new hardware to deploy.' },
  { tag: 'Hardware', tagColor: '#BC3E10', title: 'Reads on GoFleet AT+ gateways', desc: 'The AT+ BLE gateway picks up XenTag label signals with no firmware changes, leaving room to move fast.' },
  { tag: 'In testing', tagColor: '#B7791F', title: 'QR activate → map in 5 min', desc: 'Basic API test: a label activates from a QR scan and appears on the live map within five minutes, with final confirmation in progress.' },
  { tag: 'Live client', tagColor: '#1E8A5B', title: 'Texas Instruments in production', desc: 'An existing indoor asset-tracking client, proving the indoor and asset use case in production.' },
  { tag: 'Economics', tagColor: '#8E2D10', title: 'Native temp logging at $6/label', desc: 'XenTag includes temperature logging at $6/label, so the economics work at an $8–10 list price.' },
];

export const pricing = [
  { name: 'Starter', pre: '', price: '$10', unit: '/ label', track: '+ $3/mo Track fee per asset', note: 'billed monthly · cancel anytime', pad: '34px 30px', scale: '1', featsLabel: 'Includes', desc: 'For a first pilot on a single route or site.', bg: 'transparent', border: 'rgba(18,17,16,0.1)', shadow: '0 1px 2px rgba(18,17,16,0.03),0 18px 44px -34px rgba(18,17,16,0.2)', feats: ['Up to 50 labels', 'Live location + temperature', 'Live map access', 'Email alerts'], cta: 'Start a pilot', ctaBg: '#F0ECE1', ctaColor: '#121110', ctaBorder: 'rgba(18,17,16,0.12)', ctaShadow: 'none' },
  { name: 'Fleet Pro', pre: 'from', price: '$8', unit: '/ label', track: '+ $2/mo Track fee per asset', note: 'volume tiers · billed monthly', pad: '38px 32px', scale: '1.03', featsLabel: 'Everything in Starter, plus', desc: 'For operations rolling out across the fleet.', bg: '#FDF4ED', border: 'rgba(188,62,16,0.45)', shadow: '0 2px 6px rgba(18,17,16,0.05),0 48px 96px -44px rgba(18,17,16,0.45)', isPopular: true, feats: ['Unlimited labels', 'Shock + geofence alerts', 'Shared fleet + asset views', 'API & webhooks', 'Priority support'], cta: 'Get 10 free labels', ctaBg: '#BC3E10', ctaColor: '#fff', ctaBorder: '#BC3E10', ctaShadow: '0 2px 8px -2px rgba(18,17,16,0.3)' },
  { name: 'Enterprise', pre: '', price: 'Custom', unit: '', track: 'Volume label + Track pricing', note: 'annual agreement', pad: '34px 30px', scale: '1', featsLabel: 'Everything in Fleet Pro, plus', desc: 'For multi-site, compliance-driven deployments.', bg: 'transparent', border: 'rgba(18,17,16,0.1)', shadow: '0 1px 2px rgba(18,17,16,0.03),0 18px 44px -34px rgba(18,17,16,0.2)', feats: ['Volume pricing', 'XenAuth authentication + EU DPP', 'SSO & audit logs', 'SLA & dedicated CSM', 'Custom integrations'], cta: 'Talk to sales', ctaBg: '#F0ECE1', ctaColor: '#121110', ctaBorder: 'rgba(18,17,16,0.12)', ctaShadow: 'none' },
];

export const pricingTrust = ['Peel and stick, no installers', 'Recyclable labels', 'No long-term contract', 'Tracking live the same week'];
