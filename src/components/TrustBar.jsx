export default function TrustBar({ trustLoop }) {
  // the page passes a doubled array for the old marquee loop; this strip shows each item once
  const items = trustLoop.slice(0, Math.ceil(trustLoop.length / 2));

  return (
    <section style={{ borderBottom: '1px solid rgba(20,17,13,0.1)', background: 'var(--bone)' }}>
      <ul
        aria-label="What every XenTag label includes"
        className="trust-strip"
        style={{
          listStyle: 'none',
          margin: '0 auto',
          maxWidth: 1320,
          padding: '34px clamp(22px,4vw,44px) 36px',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        {items.map((t, i) => (
          // Caption reads as a machine field label under the display-voice
          // value — small caps-tracked mono, the spec-sheet register.
          <li
            key={i}
            className="trust-item"
            style={{ fontFamily: 'var(--font-machine)', fontSize: 10.5, fontWeight: 500, lineHeight: 1.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6156' }}
          >
            {t.textEl}
          </li>
        ))}
      </ul>
    </section>
  );
}
