// Shared inline icon components used across sections.
//
// One optical stroke for the whole UI set: every glyph renders at ~1.75px
// regardless of its box (declared width = 1.75 x canvas / rendered size —
// Lucide's absoluteStrokeWidth rule). Round caps, round joins, monochrome
// currentColor unless a color prop narrows it. Dieline illustrations keep
// their own 1.1–1.6px drawing weights; they are drawings, not UI glyphs.

export function CheckIcon({ color = '#BC3E10', size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 6.4 4.6 9 10 3" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightSmall({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Product marks ────────────────────────────────────────────────────────
   A product mark here is a scale-reduced PORTRAIT OF THE OBJECT — the same
   label, the same tag — never a metaphor or a category symbol. Five rules, and
   both marks obey all five, which is what makes them read as a set:

   1. ONE ENVELOPE, TURNED 90°. Both bodies are the same rounded rectangle at
      rx 2.5. Identical corner geometry does most of the family work. XenTag is
      landscape because a label lies flat on a carton; XenAuth is portrait
      because a tag is held upright to be tapped.
   2. TWO WEIGHTS. Contour 1.75, interior detail 1.15 — a 1.52:1 ratio. This is
      what turns "a rounded rect with lines in it" into "a label with something
      printed on it"; uniform weight gives the eye no reading order.
   3. ONE ACCENT, ONE PLACE. Exactly one accent per mark, and only on the
      signal element (its arc plus the filled dot). Nothing else takes a hue.
   4. ONE ARC, and it is a true quarter-arc centred on the mark's own dot —
      never a free-floating arc centred on nothing.
   5. CONTACT. XenTag's dot sits ON the label's right edge and the arc leaves
      it; XenAuth's arc arrives from outside and terminates ON the tag's left
      edge. That inversion is the near-field story told geometrically.

   Optical centring is checked: both marks' drawn extremes midpoint on (12,12).
   `dark` drops the strokes to 1.60/1.05 — a light-on-dark stroke reads ~1.25x
   heavier than the same stroke dark-on-light.
   Below 24px the detail band would fuse into a grey smear, so the compact
   variant thins it; never render either mark below 20px. */

export function XenTagMark({ size = 22, color = '#F66923', accent, dark = false }) {
  const signal = accent || color;
  const contour = dark ? 1.6 : 1.75;
  const detail = dark ? 1.05 : 1.15;
  const compact = size < 24;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* the label, landscape */}
      <rect x="2.2" y="7" width="14.5" height="12" rx="2.5" stroke={color} strokeWidth={contour} strokeLinejoin="round" />
      {/* what identifies it as a label rather than a rectangle: the print.
          Tick pitch stays >= 2.4u or the band greys out at small sizes. */}
      <path
        d={compact ? 'M6.4 11.5v3.3M9.9 11.5v3.3' : 'M5.8 11.5v3.3M8.6 11.5v3.3M11.4 11.5v3.3'}
        stroke={color}
        strokeWidth={detail}
        strokeLinecap="round"
      />
      <path d="M5.6 16.9H13" stroke={color} strokeWidth={detail} strokeLinecap="round" />
      {/* the signal leaves the label's own edge */}
      <path d="M21.8 10.1A5.1 5.1 0 0 0 16.7 5" stroke={signal} strokeWidth={contour} strokeLinecap="round" />
      <circle cx="16.7" cy="10.1" r="1.45" fill={signal} />
    </svg>
  );
}

export function XenAuthMark({ size = 22, color = '#2DD4BF', accent, dark = false }) {
  const signal = accent || color;
  const contour = dark ? 1.6 : 1.75;
  const detail = dark ? 1.05 : 1.15;
  const compact = size < 24;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* the tag, portrait — the same envelope turned 90° */}
      <rect x="7" y="2.2" width="14.4" height="19.6" rx="2.5" stroke={color} strokeWidth={contour} strokeLinejoin="round" />
      {/* the printed passport data. Deliberately not a barcode — the barcode
          belongs to XenTag. Same 2.8u pitch, as a quiet family echo. */}
      <path
        d={compact ? 'M10.6 6H18' : 'M10.6 6H18M10.6 8.8H15.4'}
        stroke={color}
        strokeWidth={detail}
        strokeLinecap="round"
      />
      {/* the signal arrives from outside and stops at the object's surface */}
      <path d="M2.4 12A4.6 4.6 0 0 1 7 7.4" stroke={signal} strokeWidth={contour} strokeLinecap="round" />
      <circle cx="11" cy="12" r="1.45" fill={signal} />
    </svg>
  );
}

/** XenAuth journey step glyphs — geometric evidence-sheet, no stock PNGs. */
export function AuthBrandStepIcon({ step, size = 88 }) {
  const c = '#2DD4BF';
  const ink = 'rgba(255,255,255,0.92)';
  const dim = 'rgba(255,255,255,0.28)';
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="10" y="18" width="48" height="54" rx="6" stroke={dim} strokeWidth="2.2" />
        <rect x="18" y="28" width="32" height="34" rx="3" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="2.2" />
        <circle cx="34" cy="45" r="7" stroke={c} strokeWidth="2.2" />
        <circle cx="34" cy="45" r="2.5" fill={c} />
        <path d="M64 30h14M71 23v14" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="14" y="16" width="60" height="44" rx="5" stroke={c} strokeWidth="2.2" />
        <path d="M14 28h60" stroke={dim} strokeWidth="2.2" />
        <rect x="22" y="36" width="20" height="14" rx="2" fill={c} fillOpacity="0.35" />
        <rect x="46" y="36" width="20" height="6" rx="1.5" fill={ink} fillOpacity="0.35" />
        <rect x="46" y="46" width="14" height="4" rx="1" fill={ink} fillOpacity="0.22" />
        <rect x="28" y="66" width="32" height="6" rx="3" fill={dim} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="12" y="14" width="64" height="48" rx="5" stroke={dim} strokeWidth="2.2" />
      <path d="M22 48V36l8 6 8-10 10 16" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="70" r="3" fill={c} />
      <circle cx="44" cy="70" r="3" fill={c} fillOpacity="0.55" />
      <circle cx="60" cy="70" r="3" fill={c} fillOpacity="0.3" />
    </svg>
  );
}

export function AuthCustomerStepIcon({ step, size = 88 }) {
  const c = '#F66923';
  const ink = 'rgba(255,255,255,0.92)';
  const dim = 'rgba(255,255,255,0.28)';
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="28" y="10" width="32" height="54" rx="6" stroke={ink} strokeWidth="2.2" />
        <rect x="34" y="18" width="20" height="34" rx="2" fill={dim} />
        <circle cx="44" cy="58" r="2.5" fill={c} />
        <path d="M18 42a14 14 0 0 1 12-8M14 42a20 20 0 0 1 16-12" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
        <rect x="16" y="68" width="22" height="10" rx="2" stroke={c} strokeWidth="2.2" />
        <circle cx="27" cy="73" r="2" fill={c} />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="22" y="8" width="44" height="64" rx="8" stroke={ink} strokeWidth="2.2" />
        <rect x="30" y="20" width="28" height="36" rx="3" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2.2" />
        <path d="M36 34h16M36 42h12" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="44" cy="64" r="2.5" fill={c} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="22" y="8" width="44" height="64" rx="8" stroke={dim} strokeWidth="2.2" />
      <circle cx="44" cy="40" r="14" stroke={c} strokeWidth="2.2" />
      <path d="M38 40.5l4.2 4.2L51 36" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
