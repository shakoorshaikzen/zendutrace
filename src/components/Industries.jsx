import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { industryData } from '../data.jsx';

const inds = industryData();
const tabBase = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  textAlign: 'left',
  padding: '17px 20px',
  borderRadius: 0,
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  transition: 'color .2s',
  background: 'none',
  border: 0,
};

const STAGE_EASE = [0.22, 1, 0.36, 1];

export default function Industries({ activeInd, setActiveInd }) {
  const aInd = inds[activeInd] || inds[0];
  const reduceMotion = useReducedMotion();
  const tabsRef = useRef(null);
  const mounted = useRef(false);

  /* The picked tab's glyph draws itself on — one dashoffset run over the
     pathLength-normalized Lucide segments (the 21st.dev "Lucide Icon Drawer"
     pattern, one-shot instead of looped, via the Web Animations API the page
     already uses). Skipped on mount and under prefers-reduced-motion. */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (reduceMotion) return;
    const glyph = tabsRef.current?.querySelector(`[data-ind-tab="${activeInd}"] .ind-glyph`);
    if (!glyph || typeof glyph.animate !== 'function') return;
    const runs = [];
    glyph.querySelectorAll('path, circle').forEach((el) => {
      el.style.strokeDasharray = '1 1';
      const run = el.animate(
        [
          { strokeDashoffset: 1, opacity: 0 },
          { opacity: 1, offset: 0.14 },
          { strokeDashoffset: 0 },
        ],
        { duration: 620, easing: 'cubic-bezier(0.455,0.03,0.515,0.955)', fill: 'forwards' },
      );
      run.onfinish = () => {
        el.style.strokeDasharray = '';
        run.cancel();
      };
      runs.push([el, run]);
    });
    return () =>
      runs.forEach(([el, run]) => {
        run.cancel();
        el.style.strokeDasharray = '';
      });
  }, [activeInd, reduceMotion]);

  return (
    <section id="industries" className="industries-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#14110D' }}>
          One label, every operation
        </h2>
        <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: '#3B352D', maxWidth: '42rem' }}>
          Pick an operation to see exactly how a single XenTag label works in the field.
        </p>
      </div>
      <div className="ind-explorer" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 24, alignItems: 'stretch' }}>
        <div ref={tabsRef} className="industry-tabs" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {inds.map((t, i) => {
            const active = i === activeInd;
            return (
              <button key={t.name} onClick={() => setActiveInd(i)} className="industry-tab" aria-pressed={active} data-ind-tab={i} style={tabBase}>
                {/* One indicator travels between tabs, so the selection reads as
                    a move rather than two independent state flips. */}
                {active ? (
                  <motion.span
                    aria-hidden
                    layoutId={reduceMotion ? undefined : 'ind-active'}
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 40 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 8,
                      background: 'rgba(188,62,16,0.07)',
                      border: '1px solid rgba(188,62,16,0.28)',
                    }}
                  />
                ) : null}
                <span
                  aria-hidden
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: active ? '#8E2D10' : '#6B6156',
                    transition: 'color .2s',
                  }}
                >
                  {t.iconEl}
                </span>
                <span style={{ position: 'relative', fontFamily: 'var(--font-body)', fontWeight: active ? 700 : 600, fontSize: 16, color: active ? '#8E2D10' : '#14110D' }}>{t.name}</span>
              </button>
            );
          })}
        </div>
        <div
          className="industry-stage"
          style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(18,17,16,0.07)',
            minHeight: 440,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: '#151210',
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* Photographs cross-dissolve: the outgoing frame holds while the
                incoming one settles, instead of the stage flashing to empty. */}
            <AnimatePresence initial={false}>
              <motion.img
                key={aInd.photo}
                src={aInd.photo}
                alt={`XenTag smart label in ${aInd.name.toLowerCase()} operations`}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { opacity: { duration: 0.42, ease: STAGE_EASE }, scale: { duration: 0.9, ease: STAGE_EASE } }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AnimatePresence>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(21,17,13,0.12),rgba(21,17,13,0.88))' }} />
          </div>
          <div style={{ position: 'relative', padding: 40 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={aInd.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.26, ease: STAGE_EASE }}
              >
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff' }}>
                  {aInd.name}
                </h3>
                <p style={{ marginTop: 12, fontSize: 'clamp(16px,1.15vw,19px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: '34rem' }}>{aInd.long}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
