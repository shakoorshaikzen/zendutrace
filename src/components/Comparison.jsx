import { useEffect, useRef, useState } from 'react';
import { comparisonBasis, comparisonRows, comparisonVerdict } from '../data.jsx';
import { XenTagMark } from './Icons.jsx';

/* The $10 label, line by line.

   The three published loss figures that used to open this section now live in
   Stakes (#stakes), high on the page where the problem belongs; what is left
   here is the ledger they justify. The heading is plain ink: the ember budget
   phrase went with the figures, and this section argues in numbers instead.

   The table follows the two references the owner named. anime.js's docs tables
   and Watermelon UI's data tables refuse the same garnish: no zebra, no
   vertical rules, no per-row icons, no colour inside the grid, no row hover on
   reference text, and a cell holds one token that never wraps. What is left is
   a ruled list: criterion, value, value.

   Emphasis is one channel and it is not text: a continuous paper column behind
   the XenTag values, hairline-edged so it reads as mounted rather than
   misaligned, capped by the one header cell that carries the product mark.
   Ember stays out of the grid exactly as Watermelon keeps its brand green out
   of table cells.

   The entrance is this section's one authored motion moment, in the anime.js
   grammar the comparison has always used: rows fade up 8px behind a 25ms
   stagger, the paper column settles first, and the verdict's $10 counts up
   once with fixed-width digits. Plays once, from an IntersectionObserver,
   never under prefers-reduced-motion. */

const EASE_OUT_QUINT = 'cubic-bezier(.22,1,.36,1)';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useOnceInView(onEnter) {
  const ref = useRef(null);
  const fired = useRef(false);
  const cb = useRef(onEnter);
  cb.current = onEnter;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined' || reduceMotion()) {
      fired.current = true;
      cb.current(false);
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || fired.current) return;
        fired.current = true;
        obs.disconnect();
        cb.current(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* linear count-up with fixed formatting, so tabular digits never reflow */
function CountUp({ target, animate, duration = 900 }) {
  const [n, setN] = useState(animate ? 0 : target);
  useEffect(() => {
    if (animate === false) {
      setN(target);
      return undefined;
    }
    if (!animate) return undefined;
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      setN(Math.round(k * target));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, duration]);
  return <>${n}</>;
}

function Row({ row, verdict, play }) {
  return (
    <div className={`cmp-row${verdict ? ' cmp-verdict' : ''}`} role="row">
      <div className="cmp-c cmp-crit" role="rowheader">{row.feature}</div>
      <div className="cmp-c cmp-us" role="cell">
        <span className="cmp-us-v">
          {verdict ? <CountUp target={10} animate={play} /> : row.us}
        </span>
        {row.usSuffix ? <span className="cmp-sfx">{row.usSuffix}</span> : null}
      </div>
      <div className="cmp-c cmp-them" role="cell">{row.them}</div>
    </div>
  );
}

export default function Comparison() {
  const [play, setPlay] = useState(null);
  const tableRef = useOnceInView((animated) => setPlay(animated));

  useEffect(() => {
    if (play !== true) return;
    const root = tableRef.current;
    if (!root || typeof root.animate !== 'function') return;
    const paper = root.querySelector('.cmp-paper');
    if (paper) {
      paper.animate(
        [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 450, easing: EASE_OUT_QUINT, fill: 'backwards' }
      );
    }
    root.querySelectorAll('.cmp-row').forEach((el, i) => {
      el.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 400, delay: 80 + i * 25, easing: EASE_OUT_QUINT, fill: 'backwards' }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <section id="compare" className="comparison-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, color: '#14110D' }}>The $10 label, line by line</h2>
        <p style={{ marginTop: 16, color: '#3B352D' }}>
          Against the hardwired GPS tracker it replaces: cost, battery, setup, and where the signal shows up.
        </p>
      </div>

      <div className="cmp-wrap" data-xt-skip="">
        <div ref={tableRef} className="cmp-table" role="table" aria-label="XenTag compared with a hardwired GPS tracker, line by line">
          {/* the one emphasis channel: paper behind the XenTag column */}
          <div className="cmp-paper" aria-hidden="true" />

          <div className="cmp-row cmp-head" role="row">
            <div className="cmp-c cmp-crit" role="columnheader" aria-label="Criterion" />
            <div className="cmp-c cmp-us" role="columnheader">
              <span className="cmp-head-name">
                <XenTagMark size={20} color="#14110D" accent="#BC3E10" />
                XenTag
              </span>
              <span className="cmp-head-sub">$10 smart label</span>
            </div>
            <div className="cmp-c cmp-them" role="columnheader">
              <span className="cmp-head-name cmp-head-name-them">Hardwired GPS tracker</span>
              <span className="cmp-head-sub">$30+ per unit</span>
            </div>
          </div>

          {comparisonRows.map((row) => (
            <Row key={row.feature} row={row} />
          ))}
          <Row row={comparisonVerdict} verdict play={play} />
        </div>
      </div>

      <div className="cmp-after">
        <p className="cmp-basis">{comparisonBasis}</p>
        <a href="#book" className="cmp-cta">
          Start with free labels
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
