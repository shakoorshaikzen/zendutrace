/* From roll to real-time: the three-step activation run, then the two radios
   that keep the label heard. Both bands are drawn in the site's isometric
   hairline dieline language — ink wireframes with one ember accent each and a
   machine chip carrying the value the step proves. */

export default function HowItWorks() {
  return (
    <section id="how" className="process-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#14110D' }}>
          From roll to <span style={{ whiteSpace: 'nowrap' }}>real-time</span> in under a minute
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: '#3B352D' }}>
          Tap to activate, stick it on the asset, and watch it report. No installers, no base stations, no line of sight.
        </p>
      </div>

      {/* Three-step run: one evidence sheet, hairline-separated */}
      <div className="how-run" style={{ background: '#FFFFFF', borderTop: '1px solid rgba(18,17,16,0.1)', borderBottom: '1px solid rgba(18,17,16,0.1)' }}>
        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
          {/* 01 Activate */}
          <div className="process-step" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div className="process-step-visual" style={{ position: 'relative', height: 194, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13.5, letterSpacing: '0.04em', color: '#8E2D10' }}>01</span>
              <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
                {/* ground plane */}
                <path d="M120 70 L196 114 L120 158 L44 114 Z" stroke="rgba(18,17,16,0.14)" strokeWidth="1" />
                {/* label plate on the plane */}
                <g stroke="rgba(18,17,16,0.42)" strokeWidth="1.1">
                  <path d="M100 92 L145 118 L117 134 L72 108 Z" fill="#FFFFFF" />
                  <path d="M72 108 L72 111 L117 137 L117 134" />
                  <path d="M117 137 L145 121 L145 118" />
                </g>
                {/* barcode ticks along the plate */}
                <g stroke="rgba(18,17,16,0.42)" strokeWidth="1.1">
                  <path d="M104 98 l-11 6.4M109 101 l-11 6.4M114 104 l-7 4M119 107 l-11 6.4M124 110 l-7 4" />
                </g>
                {/* iso QR corner */}
                <path d="M130 113 l6 3.5 l-6 3.5 l-6 -3.5 Z" stroke="rgba(18,17,16,0.42)" strokeWidth="1.1" />
                {/* phone slab above */}
                <g stroke="rgba(18,17,16,0.42)" strokeWidth="1.1">
                  <path d="M122 18 L149 33.5 L108 57 L81 41.5 Z" />
                  <path d="M81 41.5 L81 46 L108 61.5 L108 57" />
                  <path d="M108 61.5 L149 38 L149 33.5" />
                  <path d="M126 22.5 L142 31.7 L112 49 L96 39.8 Z" opacity="0.5" />
                </g>
                {/* NFC handshake — the ember moment */}
                <g stroke="#BC3E10" strokeWidth="1.6" strokeLinecap="round" fill="none">
                  <path d="M104 70 a9 9 0 0 1 9 5.2" style={{ animation: 'nfcwave 1.6s ease-in-out infinite' }} />
                  <path d="M100 78 a15 15 0 0 1 15 8.6" style={{ animation: 'nfcwave 1.6s ease-in-out infinite', animationDelay: '.3s' }} />
                </g>
                <circle cx="110" cy="88" r="2.2" fill="#BC3E10" />
                {/* machine chip */}
                <g transform="translate(156,58)">
                  <rect x="0" y="0" width="62" height="20" rx="4" fill="#FFFFFF" stroke="rgba(18,17,16,0.2)" />
                  <circle cx="11" cy="10" r="3" fill="#1E8A5B" />
                  <text x="19" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#14110D" style={{ color: '#14110D', backgroundColor: '#FFFFFF' }}>PAIRED</text>
                </g>
              </svg>
            </div>
            <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: '#14110D' }}>Activate</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, color: '#3B352D' }}>Tap with your phone and it auto-pairs to the live dashboard.</p>
            </div>
          </div>

          {/* 02 Attach */}
          <div className="process-step" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div className="process-step-visual" style={{ position: 'relative', height: 194, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13.5, letterSpacing: '0.04em', color: '#8E2D10' }}>02</span>
              <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
                {/* carton wireframe */}
                <g stroke="rgba(18,17,16,0.42)" strokeWidth="1.1">
                  <path d="M120 22 L172 52 L120 82 L68 52 Z" />
                  <path d="M68 52 L68 98 L120 128 L120 82" />
                  <path d="M120 128 L172 98 L172 52" />
                  {/* top flap seam + tape */}
                  <path d="M94 37 L146 67" opacity="0.55" />
                  <path d="M120 82 L120 128" opacity="0.55" />
                </g>
                {/* corrugation hints */}
                <path d="M76 62 L112 83 M76 74 L112 95" stroke="rgba(18,17,16,0.16)" strokeWidth="1" />
                {/* label on the right face — the ember moment */}
                <g stroke="#BC3E10" strokeWidth="1.6">
                  <path d="M132 92 L160 76 L160 96 L132 112 Z" fill="rgba(255,255,255,0.85)" />
                </g>
                <g stroke="#BC3E10" strokeWidth="1.2">
                  <path d="M137 95.5 l0 9M141 93.2 l0 9M145 90.9 l0 9M149 88.6 l0 9M153 86.3 l0 9" />
                </g>
                {/* peel motion path */}
                <path d="M170 40 Q186 46 178 64" stroke="rgba(188,62,16,0.45)" strokeWidth="1.3" strokeDasharray="3 4" fill="none" />
                {/* spec chip */}
                <g transform="translate(30,110)">
                  <rect x="0" y="0" width="58" height="20" rx="4" fill="#FFFFFF" stroke="rgba(18,17,16,0.2)" />
                  <text x="9" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#14110D" style={{ color: '#14110D', backgroundColor: '#FFFFFF' }}>0.3 mm</text>
                </g>
              </svg>
            </div>
            <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: '#14110D' }}>Attach</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, color: '#3B352D' }}>Peel &amp; stick to any high-value package, pallet or case.</p>
            </div>
          </div>

          {/* 03 Track */}
          <div className="process-step" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
            <div className="process-step-visual" style={{ position: 'relative', height: 194, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13.5, letterSpacing: '0.04em', color: '#8E2D10' }}>03</span>
              <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
                {/* map plane */}
                <path d="M120 18 L208 68 L120 118 L32 68 Z" stroke="rgba(18,17,16,0.42)" strokeWidth="1.1" />
                <g stroke="rgba(18,17,16,0.14)" strokeWidth="1">
                  <path d="M91 34.5 L179 84.5M62 51 L150 101M149 34.5 L61 84.5M178 51 L90 101" />
                </g>
                {/* two iso block buildings */}
                <g stroke="rgba(18,17,16,0.3)" strokeWidth="1">
                  <path d="M78 56 L96 66 L78 76 L60 66 Z M60 66 L60 74 L78 84 L78 76 M78 84 L96 74 L96 66" />
                  <path d="M156 74 L170 82 L156 90 L142 82 Z M142 82 L142 88 L156 96 L156 90 M156 96 L170 88 L170 82" />
                </g>
                {/* route */}
                <path d="M66 88 Q100 62 126 76 T182 60" fill="none" stroke="#BC3E10" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 7" style={{ animation: 'zdash 1s linear infinite' }} />
                <circle cx="66" cy="88" r="4" fill="#BC3E10" />
                <circle cx="182" cy="60" r="7" fill="none" stroke="#BC3E10" strokeWidth="1.6" />
                <circle cx="182" cy="60" r="3.4" fill="#BC3E10" />
                {/* machine chip */}
                <g transform="translate(42,106)">
                  <rect x="0" y="0" width="60" height="20" rx="4" fill="#1B1714" />
                  <circle cx="11" cy="10" r="3" fill="#5CB3F8" />
                  <text x="19" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#fff" style={{ color: '#fff', backgroundColor: '#1B1714' }}>&#8722;2&#176;C</text>
                </g>
              </svg>
            </div>
            <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: '#14110D' }}>Track</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, color: '#3B352D' }}>Live location, temperature &amp; alerts on your map.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two radios, condensed: the number leads, the radio names itself,
          then one line of consequence. */}
      <div className="how-conn" style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="connectivity-card connectivity-card--light" style={{ borderRadius: 8, padding: 28, background: 'var(--cloud)', border: '1px solid rgba(188,62,16,0.18)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="118" height="118" viewBox="0 0 120 120" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="#fff" stroke="rgba(188,62,16,0.14)" />
            <g stroke="rgba(188,62,16,0.3)" strokeWidth="1.4">
              <path d="M60 60 26 40M60 60 92 34M60 60 30 86M60 60 96 78M60 60 60 22M60 60 60 98" />
            </g>
            <g fill="#BC3E10">
              <circle cx="26" cy="40" r="4" />
              <circle cx="92" cy="34" r="4" />
              <circle cx="30" cy="86" r="4" />
              <circle cx="96" cy="78" r="4" />
              <circle cx="60" cy="22" r="4" />
              <circle cx="60" cy="98" r="4" />
            </g>
            {/* hub drawn in the dieline voice: white plate, ember-stroked rune */}
            <circle cx="60" cy="60" r="13" fill="#FFFFFF" stroke="#BC3E10" strokeWidth="1.4" />
            <path d="M56 56l8 8-4 4V52l4 4-8 8" stroke="#BC3E10" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,3vw,38px)', fontStretch: '86%', lineHeight: 0.92, letterSpacing: 'var(--ls-figure)', color: '#14110D' }}>100M+</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: '#8E2D10' }}>nodes</span>
            </div>
            <h4 style={{ marginTop: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: '#14110D' }}>Bluetooth</h4>
            <p style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.5, color: '#3B352D' }}>Crowdsourced network. No base stations, no setup.</p>
          </div>
        </div>
        <div className="connectivity-card connectivity-card--dark" style={{ borderRadius: 8, padding: 28, background: '#1D1814', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="118" height="118" viewBox="0 0 120 120" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <ellipse cx="60" cy="60" rx="52" ry="20" stroke="rgba(249,118,47,0.35)" strokeWidth="1.3" fill="none" />
            <ellipse cx="60" cy="60" rx="20" ry="52" stroke="rgba(249,118,47,0.35)" strokeWidth="1.3" fill="none" />
            <circle cx="60" cy="60" r="52" stroke="rgba(249,118,47,0.2)" strokeWidth="1.3" fill="none" />
            <path d="M60 8v104M8 60h104" stroke="rgba(249,118,47,0.14)" strokeWidth="1.1" />
            <g fill="#F9762F">
              <circle cx="44" cy="46" r="3.5" />
              <circle cx="80" cy="54" r="3.5" />
              <circle cx="66" cy="82" r="3.5" />
            </g>
            <g stroke="#F9762F" strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M84 36a10 10 0 0 1 0 14M90 30a18 18 0 0 1 0 26" />
            </g>
          </svg>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,3vw,38px)', fontStretch: '86%', lineHeight: 0.92, letterSpacing: 'var(--ls-figure)', color: '#fff' }}>29</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: '#F8B181' }}>countries</span>
            </div>
            <h4 style={{ marginTop: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: '#fff' }}>Cellular</h4>
            <p style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>Global LTE-M, origin to final mile.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
