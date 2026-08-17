import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useHover } from '../hooks/useHover';
import AutoPlayVideo from './AutoPlayVideo.jsx';
import { AuthBrandStepIcon, AuthCustomerStepIcon, XenAuthMark } from './Icons.jsx';
import { CASE_ARTICLES } from '../data/caseArticles.js';

const CASE_STUDIES = [
  {
    id: 'dyson-lss',
    slug: 'dyson-x-lss',
    name: 'Dyson × LSS',
    client: 'Dyson × London Sneaker School',
    industry: 'Consumer electronics × streetwear',
    challenge: 'Reach a younger, creative audience through street culture with customized sneakers that had to be provably one-of-one, not just another product drop.',
    solution: 'XenTag NFC embedded in every custom pair. A phone tap verifies authenticity, claims digital ownership, and unlocks exclusive content tied to the collaboration.',
    outcomes: ['Influencers, media and celebrities praised the tap-to-claim ownership experience', 'Each pair read as unique and interactive, deepening the brand connection', 'The collaboration stood out in a crowded streetwear space'],
  },
  {
    id: 'johnnys-kicks',
    slug: 'johnnys-kicks-x-jae-tips',
    name: 'Johnny’s Kicks × Jae Tips',
    client: 'Johnny’s Kicks × Jae Tips · SneakerCon NYC ’24',
    industry: 'Sneakers & collectibles',
    challenge: 'Counterfeit risk on a hyped limited drop, plus a bigger problem: creators earn nothing after the first sale of their own designs.',
    solution: 'NFC in every pair enabling tap verification, exclusive content, and secondary-market trading with smart contracts that route royalties to the creators on every resale.',
    outcomes: ['Creators kept full control of verifiable, scarce designs', 'Royalties flowed on every secondary-market trade, not just the initial sale', 'Set a new standard for trust in limited-edition trading'],
  },
  {
    id: 'cultish',
    slug: 'cultish',
    name: 'Cultish',
    client: 'Cultish',
    industry: 'Marketplace for independent brands',
    challenge: 'A provenance-first marketplace connecting producers, products and owners through digital identity needed every listed item to carry a trustworthy identity of its own.',
    solution: 'Custom XenTag NFC tags embedded across their SKUs. Two-way NFC communication, an advantage over passive RFID, powers both inventory tracking and per-item digital identity.',
    outcomes: ['Every product on the marketplace carries a verifiable digital identity', 'Provenance is checkable by any buyer with a phone tap', 'Inventory visibility from the same tags that authenticate'],
  },
  {
    id: 'truwood',
    slug: 'truwood',
    name: 'TruWood',
    client: 'TruWood',
    industry: 'Sustainable accessories',
    challenge: 'Wooden watches with a promise attached: ten trees planted per watch sold. Ownership and authenticity had to be verifiable so the giving pledge stayed provable.',
    solution: 'Cryptographically secured NFC tags embedded before manufacturing, written to at each supply-chain step. Owners verify authenticity and care details in a tap, with three layers of security beyond what QR codes or barcodes offer.',
    outcomes: ['Ten trees planted for every watch, backed by a verifiable product record', 'Tamper-resistant authentication that can’t be replicated like a printed code', 'Genuine owner feedback tied to verified products'],
  },
  {
    id: 'marcozo',
    slug: 'marcozo',
    name: 'Marcozo',
    client: 'Marcozo',
    industry: 'Luxury jewelry',
    challenge: 'Counterfeits threaten luxury trust: a market worth roughly $600B a year, up 10,000% in two decades, touching more than 80% of consumers.',
    solution: 'Scannable XenTag certificates attached to each custom piece, authenticating the manufacturing process and playing a personal video message from the designer to the client.',
    outcomes: ['Reached new consumers with a digitized product experience', 'One-of-a-kind unboxing with a personal designer message per piece', 'Authentication woven into the brand story, not bolted on'],
  },
];

function BookPilotLink({ closePanel, extraStyle }) {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      onClick={closePanel}
      href="#book"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '15px 28px',
        borderRadius: 12,
        fontSize: 15.5,
        fontWeight: 700,
        color: '#fff',
        background: hovered ? '#D2470A' : '#C2410C',
        boxShadow: '0 2px 10px -2px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform .18s,background .18s',
        ...extraStyle,
      }}
      {...hoverProps}
    >
      Book a pilot <span style={{ fontSize: 16 }}>&#8594;</span>
    </a>
  );
}

function ExploreXenAuthLink() {
  const [hovered, hoverProps] = useHover();
  return (
    <a
      href="#xa-cases"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('xa-cases')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '15px 26px',
        borderRadius: 12,
        fontSize: 15.5,
        fontWeight: 600,
        color: '#fff',
        background: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'background .18s',
      }}
      {...hoverProps}
    >
      See it in the field
    </a>
  );
}

function CasePill({ active, onClick, children }) {
  const [hovered, hoverProps] = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '9px 16px',
        borderRadius: 999,
        background: active ? 'rgba(45,212,191,0.16)' : hovered ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.06)',
        border: active ? '1px solid rgba(45,212,191,0.5)' : '1px solid rgba(255,255,255,0.14)',
        fontSize: 13.5,
        fontWeight: active ? 700 : 400,
        color: active ? '#2DD4BF' : '#fff',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background .16s,border-color .16s,color .16s',
      }}
      {...hoverProps}
    >
      {children}
    </button>
  );
}

function CaseStudyPanel({ cs, onReadMore }) {
  return (
    <div style={{ marginTop: 22, borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', padding: 'clamp(24px,3vw,36px)', textAlign: 'left', animation: 'zpop .35s cubic-bezier(.22,1,.36,1)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: '#fff' }}>{cs.client}</h4>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#2DD4BF' }}>{cs.industry}</span>
      </div>
      <div className="xa-case-grid" style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(18px,3vw,34px)' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>The challenge</div>
          <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.75)' }}>{cs.challenge}</p>
          <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>The XenAuth solution</div>
          <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.62, color: 'rgba(255,255,255,0.75)' }}>{cs.solution}</p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>What it delivered</div>
          <ul style={{ listStyle: 'none', marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cs.outcomes.map((o) => (
              <li key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' }}>
                <svg width="13" height="13" viewBox="0 0 12 12" style={{ flexShrink: 0, marginTop: 4 }} aria-hidden="true">
                  <path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {o}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onReadMore}
            style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 999, border: '1px solid rgba(45,212,191,0.45)', background: 'rgba(45,212,191,0.12)', color: '#2DD4BF', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .18s' }}
          >
            Read the full case study
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function CaseArticle({ slug, onClose }) {
  const art = CASE_ARTICLES[slug];

  useEffect(() => {
    // Capture phase so Escape closes only this reader, not the modal beneath it.
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  if (!art) return null;
  // Portal to <body>: the modal's backdrop-filter creates a containing block
  // that would otherwise trap this fixed overlay inside its scroll space.
  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${art.title} case study`}
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 130,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'rgba(6,9,16,0.78)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        padding: 'clamp(14px,3vw,44px) clamp(10px,2vw,24px)',
        animation: 'zfade .25s ease',
      }}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 760,
          margin: '0 auto',
          borderRadius: 22,
          background: '#0F1114',
          border: '1px solid rgba(255,255,255,0.12)',
          overflow: 'hidden',
          animation: 'zpop .35s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(10,11,14,0.7)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        {art.hero && (
          <img src={art.hero} alt="" width="1200" height="630" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 380, objectFit: 'cover' }} />
        )}
        <div style={{ padding: 'clamp(28px,4vw,48px)' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2DD4BF' }}>XenAuth case study</span>
          <h2 style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.2vw,40px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff' }}>
            {art.title}
          </h2>
          {art.subtitle && (
            <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.55, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{art.subtitle}</p>
          )}
          <div style={{ marginTop: 10 }}>
            {art.blocks.map((bl, i) => {
              if (bl.t === 'img') {
                return <img key={i} src={bl.src} alt={bl.alt} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, margin: '22px 0 4px', border: '1px solid rgba(255,255,255,0.1)' }} />;
              }
              if (bl.t === 'h3' || bl.t === 'h4') {
                return <h3 key={i} style={{ margin: '26px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, color: '#fff' }}>{bl.text}</h3>;
              }
              if (bl.t === 'li') {
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, margin: '10px 0 0', fontSize: 15, lineHeight: 1.66, color: 'rgba(255,255,255,0.78)' }}>
                    <svg width="13" height="13" viewBox="0 0 12 12" style={{ flexShrink: 0, marginTop: 6 }} aria-hidden="true">
                      <path d="M2 6.4 4.6 9 10 3" fill="none" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{bl.text}</span>
                  </div>
                );
              }
              return <p key={i} style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)' }}>{bl.text}</p>;
            })}
          </div>
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Want this for your product line?</span>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Back to XenAuth
            </button>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}

function CaseStudies() {
  const [activeCase, setActiveCase] = useState(CASE_STUDIES[0].id);
  const [articleOpen, setArticleOpen] = useState(false);
  const cs = CASE_STUDIES.find((c) => c.id === activeCase);
  return (
    <div id="xa-cases" style={{ marginTop: 64, scrollMarginTop: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginRight: 6 }}>Case studies</span>
        {CASE_STUDIES.map((c) => (
          <CasePill key={c.id} active={c.id === activeCase} onClick={() => setActiveCase(c.id)}>
            {c.name}
          </CasePill>
        ))}
      </div>
      {cs && <CaseStudyPanel key={cs.id} cs={cs} onReadMore={() => setArticleOpen(true)} />}
      {articleOpen && cs && <CaseArticle slug={cs.slug} onClose={() => setArticleOpen(false)} />}
    </div>
  );
}

const verticalTiles = [
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2025/12/cosmetics-vertical.jpg', alt: 'Cosmetics', name: 'Cosmetics' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2025/12/pharma-vertical.jpg', alt: 'Pharma', name: 'Pharma' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2022/11/luxury.jpg', alt: 'Luxury', name: 'Luxury' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2022/11/wine-spirits.jpg', alt: 'Wine & Spirits', name: 'Wine & Spirits' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2022/11/lifestyle.jpg', alt: 'Lifestyle', name: 'Lifestyle' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2024/05/stadium-tall-1.png', alt: 'Stadiums', name: 'Stadiums' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2024/05/merch-traders-tall.png', alt: 'Merch Trader Tribes', name: 'Merch Traders' },
  { img: 'https://xentag.b-cdn.net/wp-content/uploads/2024/05/channel-partner-tall.png', alt: 'Channel Partners', name: 'Channel Partners' },
];

const brandSteps = [
  { step: 1, title: 'Embed secure NFC labels', desc: 'Assign a cryptographically unique digital identity to every SKU at the packaging line, well before the counterfeit window.' },
  { step: 2, title: 'Build the moment of proof', desc: 'Pages, microsites and authentication flows with the XenAuth site builder. Own the tap, own the story.' },
  { step: 3, title: 'See demand in real time', desc: 'Authentication, consumption and demand by product and batch. Evidence, not survey guesswork.' },
];

const customerSteps = [
  { step: 1, title: 'Tap with any phone', desc: 'Activate the NFC chip with the smartphone already in their pocket. No app store detour.' },
  { step: 2, title: 'Get the product story instantly', desc: 'Full detail, origin and provenance in one open, then keep scrolling the journey you designed.' },
  { step: 3, title: 'Verify, claim, protect', desc: 'Authenticate resale and returns, validate warranties, and lock ownership to the rightful buyer.' },
];

function JourneyStep({ step, title, desc, accent, Icon }) {
  return (
    <div
      className="xt-journey-step"
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 'clamp(16px,2vw,22px)',
        alignItems: 'center',
        padding: 'clamp(22px,2.4vw,28px) 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <span
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: 'clamp(36px,4vw,44px)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: accent,
          minWidth: '1.4ch',
        }}
      >
        {String(step).padStart(2, '0')}
      </span>
      <div style={{ minWidth: 0 }}>
        <h5
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(17px,1.7vw,22px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          {title}
        </h5>
        <p style={{ margin: '10px 0 0', fontSize: 'clamp(14.5px,1.15vw,16px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.68)', maxWidth: '36ch' }}>
          {desc}
        </p>
      </div>
      <div
        className="xt-journey-icon"
        style={{
          flexShrink: 0,
          width: 'clamp(72px,9vw,96px)',
          height: 'clamp(72px,9vw,96px)',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon step={step} size={64} />
      </div>
    </div>
  );
}

export default function XenAuthModal({ open, closePanel }) {
  if (!open) return null;
  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={closePanel}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      aria-label="XenAuth overview"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'rgba(6,6,8,0.68)',
        backdropFilter: 'blur(22px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
        padding: 'clamp(14px,3vw,44px) clamp(10px,2vw,24px)',
        animation: 'zfade .3s ease',
      }}
    >
      <div
        onClick={stop}
        style={{
          position: 'relative',
          maxWidth: 1180,
          margin: '0 auto',
          borderRadius: 26,
          background: '#0E0E10',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 60px 170px -50px rgba(0,0,0,0.95)',
          animation: 'zpop .4s cubic-bezier(.16,.7,.3,1)',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={closePanel}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            zIndex: 20,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.16)',
            cursor: 'pointer',
            background: 'rgba(20,20,22,0.85)',
            color: '#fff',
            fontSize: 15,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &#10005;
        </button>
        <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto', padding: 'clamp(38px,4vw,60px) clamp(22px,4vw,52px) clamp(40px,5vw,60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 26 }}>
            <span style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(13,148,136,0.22)', border: '1px solid rgba(45,212,191,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XenAuthMark size={26} color="#2DD4BF" />
            </span>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>
              XenAuth &middot; Authentication
            </span>
          </div>

          {/* hero */}
          <div className="xt-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,4vw,56px)', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px,5.2vw,68px)', lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0 }}>
                Verify <span style={{ color: '#2DD4BF' }}>+</span> Protect <span style={{ color: '#2DD4BF' }}>+</span> Trust
              </h2>
              <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.62, color: 'rgba(255,255,255,0.72)', maxWidth: '33rem' }}>
                Cryptographic NFC tags turn ordinary packaging into unforgeable, item-level proof that authenticates every product, detects counterfeits and stops return fraud at every touchpoint. No app required.
              </p>
              <div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookPilotLink closePanel={closePanel} />
                <ExploreXenAuthLink />
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
              <AutoPlayVideo
                src="https://xentag.b-cdn.net/wp-content/uploads/2026/04/Xentag-Banner_transition_corner_v13.mp4"
                controls
                style={{ display: 'block', width: '100%', height: 'auto', minHeight: 220 }}
                aria-label="XenAuth product demonstration"
              />
            </div>
          </div>

          {/* stats */}
          <div className="xt-stats" style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            <div style={{ borderRadius: 14, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(30px,2.6vw,40px)', color: '#FF8A2B', lineHeight: 1 }}>$76.5B</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>The 2025 return-fraud mark across retail, 9% of $850B in total returns.</p>
            </div>
            <div style={{ borderRadius: 14, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(30px,2.6vw,40px)', color: '#FFFFFF', lineHeight: 1 }}>2B</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>NFC-enabled smartphones worldwide. Works with the phone in your pocket, no app.</p>
            </div>
            <div style={{ borderRadius: 14, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(30px,2.6vw,40px)', color: '#FFFFFF', lineHeight: 1 }}>64%</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Rise in counterfeits at returns. Authentication at intake detects manipulation.</p>
            </div>
            <div style={{ borderRadius: 14, padding: 26, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(30px,2.6vw,40px)', color: '#FFFFFF', lineHeight: 1 }}>2030</div>
              <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>EU Digital Product Passport deadline for traceability, repair and recycling.</p>
            </div>
          </div>

          {/* passive to active */}
          <div className="xt-flow" style={{ marginTop: 88, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,4vw,56px)', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px,3vw,40px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff' }}>
                From passive packaging to active authentication
              </h3>
              <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.64, color: 'rgba(255,255,255,0.68)', maxWidth: '30rem' }}>
                Every XenAuth chip carries a unique, cryptographically-secure digital identity. Brands get a live view of authentication, consumption and demand, broken out by product and batch.
              </p>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0A0A0C' }}>
              <img src="https://xentag.b-cdn.net/wp-content/uploads/2022/11/xentag-ultimate-platform-v3-1024x736.jpg" alt="XenAuth authentication platform" width="1024" height="736" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
          </div>

          {/* for brand / for customer — evidence-sheet journey */}
          <div style={{ marginTop: 96 }}>
            <div style={{ maxWidth: '40rem', marginBottom: 40 }}>
              <h3
                className="font-display"
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 'clamp(28px,3.2vw,40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: '#fff',
                }}
              >
                One chip. Two journeys.
              </h3>
              <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.68)' }}>
                Brands install proof into packaging. Customers unlock it with a tap. One label serving both ends of the trust loop.
              </p>
            </div>

            <div className="xt-flow" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,5vw,64px)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '2px solid #2DD4BF' }}>
                  <h4
                    className="font-display"
                    style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(22px,2.2vw,28px)', letterSpacing: '-0.02em', color: '#fff' }}
                  >
                    For the brand
                  </h4>
                  <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, letterSpacing: '0.06em', color: '#2DD4BF' }}>OPERATIONS</span>
                </div>
                <div>
                  {brandSteps.map((s) => (
                    <JourneyStep key={s.step} {...s} accent="#2DD4BF" Icon={AuthBrandStepIcon} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, paddingBottom: 14, borderBottom: '2px solid #FF8A2B' }}>
                  <h4
                    className="font-display"
                    style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(22px,2.2vw,28px)', letterSpacing: '-0.02em', color: '#fff' }}
                  >
                    For the customer
                  </h4>
                  <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, letterSpacing: '0.06em', color: '#FF8A2B' }}>FIELD</span>
                </div>
                <div>
                  {customerSteps.map((s) => (
                    <JourneyStep key={s.step} {...s} accent="#FF8A2B" Icon={AuthCustomerStepIcon} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* demo videos */}
          <div className="xt-demos" style={{ marginTop: 88, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
              <AutoPlayVideo
                src="https://xentag.b-cdn.net/wp-content/uploads/2022/11/ASSET2-online-video-cutter.com-1.webm"
                controls
                style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 10', objectFit: 'cover' }}
                aria-label="Tap to reveal product authentication"
              />
              <div style={{ padding: '22px 24px' }}>
                <div className="font-display" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#fff' }}>Tap to reveal</div>
                <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Product info, authentication and origin in one tap, no app required.</p>
              </div>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
              <AutoPlayVideo
                src="https://xentag.b-cdn.net/wp-content/uploads/2022/11/ASSET1_cropped.mp4"
                controls
                style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 10', objectFit: 'cover' }}
                aria-label="Verify authenticity anywhere"
              />
              <div style={{ padding: '22px 24px' }}>
                <div className="font-display" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#fff' }}>Verify anywhere</div>
                <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>Resale, recycling and warranty checks without manual inspection.</p>
              </div>
            </div>
          </div>

          {/* industry use cases */}
          <div style={{ marginTop: 88 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px,2.6vw,32px)', letterSpacing: '-0.02em', color: '#fff', textAlign: 'center' }}>
              Industry use cases
            </h3>
            <p style={{ marginTop: 12, textAlign: 'center', fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>XenAuth serves these verticals today, and the list keeps growing.</p>
            <div className="xt-verticals" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {verticalTiles.map((v) => (
                <div key={v.name} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={v.img} alt={v.alt} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,11,14,0.75),transparent 55%)' }} />
                  <span style={{ position: 'absolute', left: 16, bottom: 14, fontWeight: 700, fontSize: 16, color: '#fff' }}>{v.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* case studies, read in place */}
          <CaseStudies />

          {/* CTA */}
          <div style={{ marginTop: 72, borderRadius: 20, padding: 'clamp(40px,5vw,64px)', textAlign: 'center', background: 'linear-gradient(135deg,#15161A,#0A0A0C)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(13,148,136,0.22)', border: '1px solid rgba(45,212,191,0.35)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XenAuthMark size={30} color="#2DD4BF" />
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(26px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff', maxWidth: '22ch', margin: '0 auto' }}>
              Verify authenticity. Detect fraud. Protect your brand.
            </h3>
            <BookPilotLink closePanel={closePanel} extraStyle={{ marginTop: 28 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
