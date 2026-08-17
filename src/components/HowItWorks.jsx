export default function HowItWorks() {
  return (
    <section id="how" className="process-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 32px 80px' }}>
      <div className="section-heading" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 52px' }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 'clamp(32px,4.2vw,52px)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#0F1114' }}>
          From roll to <span style={{ whiteSpace: 'nowrap' }}>real-time</span> <span style={{ color: '#C2410C' }}>in under a minute</span>
        </h2>
      </div>
      <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {/* 01 Activate */}
        <div className="process-step" style={{ borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(13,16,20,0.08)', boxShadow: '0 1px 2px rgba(13,16,20,0.03),0 22px 54px -34px rgba(13,16,20,0.24)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="process-step-visual" style={{ position: 'relative', height: 180, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#9A3412' }}>01</span>
            <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
              {/* ground plane */}
              <path d="M120 70 L196 114 L120 158 L44 114 Z" stroke="rgba(15,17,20,0.14)" strokeWidth="1" />
              {/* label plate on the plane */}
              <g stroke="rgba(15,17,20,0.42)" strokeWidth="1.1">
                <path d="M100 92 L145 118 L117 134 L72 108 Z" fill="#FFFFFF" />
                <path d="M72 108 L72 111 L117 137 L117 134" />
                <path d="M117 137 L145 121 L145 118" />
              </g>
              {/* barcode ticks along the plate */}
              <g stroke="rgba(15,17,20,0.42)" strokeWidth="1.1">
                <path d="M104 98 l-11 6.4M109 101 l-11 6.4M114 104 l-7 4M119 107 l-11 6.4M124 110 l-7 4" />
              </g>
              {/* iso QR corner */}
              <path d="M130 113 l6 3.5 l-6 3.5 l-6 -3.5 Z" stroke="rgba(15,17,20,0.42)" strokeWidth="1.1" />
              {/* phone slab above */}
              <g stroke="rgba(15,17,20,0.42)" strokeWidth="1.1">
                <path d="M122 18 L149 33.5 L108 57 L81 41.5 Z" />
                <path d="M81 41.5 L81 46 L108 61.5 L108 57" />
                <path d="M108 61.5 L149 38 L149 33.5" />
                <path d="M126 22.5 L142 31.7 L112 49 L96 39.8 Z" opacity="0.5" />
              </g>
              {/* NFC handshake */}
              <g stroke="#C2410C" strokeWidth="1.6" strokeLinecap="round" fill="none">
                <path d="M104 70 a9 9 0 0 1 9 5.2" style={{ animation: 'nfcwave 1.6s ease-in-out infinite' }} />
                <path d="M100 78 a15 15 0 0 1 15 8.6" style={{ animation: 'nfcwave 1.6s ease-in-out infinite', animationDelay: '.3s' }} />
              </g>
              <circle cx="110" cy="88" r="2.2" fill="#C2410C" />
              {/* machine chip */}
              <g transform="translate(156,58)">
                <rect x="0" y="0" width="62" height="20" rx="4" fill="#FFFFFF" stroke="rgba(15,17,20,0.2)" />
                <circle cx="11" cy="10" r="3" fill="#1E8A5B" />
                <text x="19" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#0F1114">PAIRED</text>
              </g>
            </svg>
          </div>
          <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: '#0F1114' }}>Activate</h3>
            <p style={{ marginTop: 7, fontSize: 14.5, lineHeight: 1.55, color: '#4B5259' }}>Tap with your phone and it auto-pairs to the live dashboard.</p>
          </div>
        </div>
        {/* 02 Attach */}
        <div className="process-step" style={{ borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(13,16,20,0.08)', boxShadow: '0 1px 2px rgba(13,16,20,0.03),0 22px 54px -34px rgba(13,16,20,0.24)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="process-step-visual" style={{ position: 'relative', height: 180, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#9A3412' }}>02</span>
            <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
              {/* carton wireframe */}
              <g stroke="rgba(15,17,20,0.42)" strokeWidth="1.1">
                <path d="M120 22 L172 52 L120 82 L68 52 Z" />
                <path d="M68 52 L68 98 L120 128 L120 82" />
                <path d="M120 128 L172 98 L172 52" />
                {/* top flap seam + tape */}
                <path d="M94 37 L146 67" opacity="0.55" />
                <path d="M120 82 L120 128" opacity="0.55" />
              </g>
              {/* corrugation hints */}
              <path d="M76 62 L112 83 M76 74 L112 95" stroke="rgba(15,17,20,0.16)" strokeWidth="1" />
              {/* label on the right face — the ember moment */}
              <g stroke="#C2410C" strokeWidth="1.6">
                <path d="M132 92 L160 76 L160 96 L132 112 Z" fill="rgba(255,255,255,0.85)" />
              </g>
              <g stroke="#C2410C" strokeWidth="1.2">
                <path d="M137 95.5 l0 9M141 93.2 l0 9M145 90.9 l0 9M149 88.6 l0 9M153 86.3 l0 9" />
              </g>
              {/* peel motion path */}
              <path d="M170 40 Q186 46 178 64" stroke="rgba(194,65,12,0.45)" strokeWidth="1.3" strokeDasharray="3 4" fill="none" />
              {/* spec chip */}
              <g transform="translate(30,110)">
                <rect x="0" y="0" width="58" height="20" rx="4" fill="#FFFFFF" stroke="rgba(15,17,20,0.2)" />
                <text x="9" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#0F1114">0.3 mm</text>
              </g>
            </svg>
          </div>
          <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: '#0F1114' }}>Attach</h3>
            <p style={{ marginTop: 7, fontSize: 14.5, lineHeight: 1.55, color: '#4B5259' }}>Peel &amp; stick to any high-value package, pallet or case.</p>
          </div>
        </div>
        {/* 03 Track */}
        <div className="process-step" style={{ borderRadius: 20, background: '#FFFFFF', border: '1px solid rgba(13,16,20,0.08)', boxShadow: '0 1px 2px rgba(13,16,20,0.03),0 22px 54px -34px rgba(13,16,20,0.24)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="process-step-visual" style={{ position: 'relative', height: 180, background: 'var(--cloud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, left: 18, fontFamily: "var(--font-machine)", fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#9A3412' }}>03</span>
            <svg width="240" height="150" viewBox="0 0 240 150" fill="none" aria-hidden="true">
              {/* map plane */}
              <path d="M120 18 L208 68 L120 118 L32 68 Z" stroke="rgba(15,17,20,0.42)" strokeWidth="1.1" />
              <g stroke="rgba(15,17,20,0.14)" strokeWidth="1">
                <path d="M91 34.5 L179 84.5M62 51 L150 101M149 34.5 L61 84.5M178 51 L90 101" />
              </g>
              {/* two iso block buildings */}
              <g stroke="rgba(15,17,20,0.3)" strokeWidth="1">
                <path d="M78 56 L96 66 L78 76 L60 66 Z M60 66 L60 74 L78 84 L78 76 M78 84 L96 74 L96 66" />
                <path d="M156 74 L170 82 L156 90 L142 82 Z M142 82 L142 88 L156 96 L156 90 M156 96 L170 88 L170 82" />
              </g>
              {/* route */}
              <path d="M66 88 Q100 62 126 76 T182 60" fill="none" stroke="#C2410C" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 7" style={{ animation: 'zdash 1s linear infinite' }} />
              <circle cx="66" cy="88" r="4" fill="#C2410C" />
              <circle cx="182" cy="60" r="7" fill="none" stroke="#C2410C" strokeWidth="1.6" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'pulsering 2s ease-out infinite' }} />
              <circle cx="182" cy="60" r="3.4" fill="#C2410C" />
              {/* machine chip */}
              <g transform="translate(42,106)">
                <rect x="0" y="0" width="60" height="20" rx="4" fill="#14161C" />
                <circle cx="11" cy="10" r="3" fill="#5CB3F8" />
                <text x="19" y="13.5" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#fff">&#8722;2&#176;C</text>
              </g>
            </svg>
          </div>
          <div className="process-step-copy" style={{ padding: '24px 26px 28px' }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: '#0F1114' }}>Track</h3>
            <p style={{ marginTop: 7, fontSize: 14.5, lineHeight: 1.55, color: '#4B5259' }}>Live location, temperature &amp; alerts on your map.</p>
          </div>
        </div>
      </div>

      {/* connectivity choice */}
      <div className="how-conn" style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="connectivity-card connectivity-card--light" style={{ borderRadius: 20, padding: 28, background: '#F1F3F5', border: '1px solid rgba(194,65,12,0.18)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="118" height="118" viewBox="0 0 120 120" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="60" cy="60" r="52" fill="#fff" stroke="rgba(194,65,12,0.14)" />
            <g stroke="rgba(194,65,12,0.3)" strokeWidth="1.4">
              <path d="M60 60 26 40M60 60 92 34M60 60 30 86M60 60 96 78M60 60 60 22M60 60 60 98" />
            </g>
            <g fill="#C2410C">
              <circle cx="26" cy="40" r="4" />
              <circle cx="92" cy="34" r="4" />
              <circle cx="30" cy="86" r="4" />
              <circle cx="96" cy="78" r="4" />
              <circle cx="60" cy="22" r="4" />
              <circle cx="60" cy="98" r="4" />
            </g>
            <circle cx="60" cy="60" r="12" fill="#C2410C" />
            <path d="M56 54l8 6-4 3 4 3-8 6V54zM60 54v6l4 3M60 72v-6l4-3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em', color: '#0F1114' }}>100M+</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#9A3412' }}>nodes</span>
            </div>
            <h4 style={{ marginTop: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: '#0F1114' }}>Bluetooth</h4>
            <p style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.5, color: '#4B5259' }}>Crowdsourced network. No base stations, no setup.</p>
          </div>
        </div>
        <div className="connectivity-card connectivity-card--dark" style={{ borderRadius: 20, padding: 28, background: 'linear-gradient(135deg,#14161C,#08090B)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="118" height="118" viewBox="0 0 120 120" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="60" cy="60" r="52" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <ellipse cx="60" cy="60" rx="52" ry="20" stroke="rgba(255,122,46,0.35)" strokeWidth="1.3" fill="none" />
            <ellipse cx="60" cy="60" rx="20" ry="52" stroke="rgba(255,122,46,0.35)" strokeWidth="1.3" fill="none" />
            <circle cx="60" cy="60" r="52" stroke="rgba(255,122,46,0.2)" strokeWidth="1.3" fill="none" />
            <path d="M60 8v104M8 60h104" stroke="rgba(255,122,46,0.14)" strokeWidth="1.1" />
            <g fill="#FF7A2E">
              <circle cx="44" cy="46" r="3.5" />
              <circle cx="80" cy="54" r="3.5" />
              <circle cx="66" cy="82" r="3.5" />
            </g>
            <g stroke="#FF7A2E" strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M84 36a10 10 0 0 1 0 14M90 30a18 18 0 0 1 0 26" />
            </g>
          </svg>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="font-display" style={{ fontWeight: 800, fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em', color: '#fff' }}>29</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FFB37E' }}>countries</span>
            </div>
            <h4 style={{ marginTop: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: '#fff' }}>Cellular</h4>
            <p style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>Global LTE-M, origin to final mile.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
