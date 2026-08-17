// Small shared inline icon components used across sections.

export function CheckIcon({ color = '#C2410C', size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12">
      <path d="M2 6.4 4.6 9 10 3" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ filled = true, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F5A623' : '#E3DCCF'}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
  );
}

export function TrustIcon({ icon, color }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (icon) {
    case 'globe':
      return (
        <svg {...common}>
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'network':
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" />
        </svg>
      );
    case 'bars':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <rect x="3" y="13" width="3.4" height="8" rx="1" fill={color} opacity="0.5" />
          <rect x="9" y="9" width="3.4" height="12" rx="1" fill={color} opacity="0.75" />
          <rect x="15" y="4" width="3.4" height="17" rx="1" fill={color} />
        </svg>
      );
    case 'battery':
      return (
        <svg {...common}>
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <path d="M21 10v4" />
          <rect x="4.5" y="9.5" width="7" height="5" rx="0.6" fill={color} stroke="none" />
        </svg>
      );
    case 'shock':
      return (
        <svg {...common}>
          <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      );
    default:
      return null;
  }
}

export function CustomerLogoIcon({ icon }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: '#5C636B', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (icon) {
    case 'coldchain':
      return <svg {...common}><path d="M12 2v20M4 7l16 10M20 7L4 17" /></svg>;
    case 'building':
      return <svg {...common}><path d="M3 18h18M6 18a6 6 0 0 1 12 0M12 5v5" /></svg>;
    case 'factory':
      return <svg {...common}><path d="M3 20h18V9l-6 4V9l-6 4V4H3z" /></svg>;
    case 'truck':
      return (
        <svg {...common}>
          <path d="M1 16V6h12v10M13 9h4l3 3v4h-7" />
          <circle cx="5" cy="17" r="1.6" />
          <circle cx="17" cy="17" r="1.6" />
        </svg>
      );
    case 'leaf':
      return <svg {...common}><path d="M12 3c5 3 7 8 4 13-3-2-6-2-8 0-2-6 0-11 4-13z" /></svg>;
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function IndustryIcon({ paths, cap, color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth="1.6" strokeLinecap={cap === 'round' ? 'round' : undefined} strokeLinejoin={cap === 'round' ? 'round' : undefined} />
      ))}
    </svg>
  );
}

/** Industrial product marks — thick stencil, not thin generic UI icons. */
export function XenTagMark({ size = 22, color = '#FF8A2B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* shipping-label plate */}
      <rect x="5" y="4" width="16" height="20" rx="2.5" stroke={color} strokeWidth="2.2" />
      <path d="M21 4v6h6" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M21 10l6-6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* live pin */}
      <circle cx="13" cy="13" r="2.4" fill={color} />
      <path d="M13 16.2c0 0 4.8 4.2 4.8 6.8A4.8 4.8 0 0 1 8.2 23c0-2.6 4.8-6.8 4.8-6.8z" fill={color} />
      {/* LTE arcs */}
      <path d="M24.5 16.5a5.5 5.5 0 0 1 0 7.8M27.2 14.2a9 9 0 0 1 0 12.4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function XenAuthMark({ size = 22, color = '#2DD4BF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 3.5L27 8v7.2c0 6.4-4.2 10.6-11 13.3C9.2 25.8 5 21.6 5 15.2V8L16 3.5z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* NFC tap arcs */}
      <path d="M12.2 13.2a5.2 5.2 0 0 1 7.6 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 10.6a8.2 8.2 0 0 1 12 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="17.2" r="1.8" fill={color} />
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
        <rect x="10" y="18" width="48" height="54" rx="6" stroke={dim} strokeWidth="2" />
        <rect x="18" y="28" width="32" height="34" rx="3" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="2" />
        <circle cx="34" cy="45" r="7" stroke={c} strokeWidth="2.2" />
        <circle cx="34" cy="45" r="2.5" fill={c} />
        <path d="M64 30h14M71 23v14" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="14" y="16" width="60" height="44" rx="5" stroke={c} strokeWidth="2.2" />
        <path d="M14 28h60" stroke={dim} strokeWidth="2" />
        <rect x="22" y="36" width="20" height="14" rx="2" fill={c} fillOpacity="0.35" />
        <rect x="46" y="36" width="20" height="6" rx="1.5" fill={ink} fillOpacity="0.35" />
        <rect x="46" y="46" width="14" height="4" rx="1" fill={ink} fillOpacity="0.22" />
        <rect x="28" y="66" width="32" height="6" rx="3" fill={dim} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="12" y="14" width="64" height="48" rx="5" stroke={dim} strokeWidth="2" />
      <path d="M22 48V36l8 6 8-10 10 16" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="70" r="3" fill={c} />
      <circle cx="44" cy="70" r="3" fill={c} fillOpacity="0.55" />
      <circle cx="60" cy="70" r="3" fill={c} fillOpacity="0.3" />
    </svg>
  );
}

export function AuthCustomerStepIcon({ step, size = 88 }) {
  const c = '#FF8A2B';
  const ink = 'rgba(255,255,255,0.92)';
  const dim = 'rgba(255,255,255,0.28)';
  if (step === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="28" y="10" width="32" height="54" rx="6" stroke={ink} strokeWidth="2.2" />
        <rect x="34" y="18" width="20" height="34" rx="2" fill={dim} />
        <circle cx="44" cy="58" r="2.5" fill={c} />
        <path d="M18 42a14 14 0 0 1 12-8M14 42a20 20 0 0 1 16-12" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
        <rect x="16" y="68" width="22" height="10" rx="2" stroke={c} strokeWidth="2" />
        <circle cx="27" cy="73" r="2" fill={c} />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
        <rect x="22" y="8" width="44" height="64" rx="8" stroke={ink} strokeWidth="2.2" />
        <rect x="30" y="20" width="28" height="36" rx="3" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
        <path d="M36 34h16M36 42h12" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="64" r="2.5" fill={c} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="22" y="8" width="44" height="64" rx="8" stroke={dim} strokeWidth="2" />
      <circle cx="44" cy="40" r="14" stroke={c} strokeWidth="2.4" />
      <path d="M38 40.5l4.2 4.2L51 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
