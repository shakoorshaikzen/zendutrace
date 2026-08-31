import { useEffect } from 'react';

// Adds a progressive-enhancement entrance animation without ever hiding content.
// If JavaScript, IntersectionObserver, or animations are unavailable, the page
// remains fully readable in its default rendered state.
//
// Grid children stagger in left-to-right; solitary blocks rise in as one. Every
// element stays visible at rest; the animation only plays forward from a
// softened state once, on first intersection. It is deliberately short and
// shallow: repeated across every section a longer entrance reads as the page
// animating itself, and it would compete with the walkthrough, which is the
// page's one authored motion moment.
export function useRevealOnScroll(deps = []) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const animations = new Set();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          obs.unobserve(el);

          if (typeof el.animate !== 'function') return;
          const stagger = Number(el.dataset.xtReveal || 0);
          const animation = el.animate(
            [
              { opacity: stagger > 0 ? 0.3 : 0.4, transform: 'translateY(10px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 520,
              delay: Math.min((stagger - 1) * 60, 300),
              easing: 'cubic-bezier(.16,1,.3,1)',
              fill: 'backwards',
            }
          );
          animations.add(animation);
          animation.addEventListener('finish', () => animations.delete(animation), { once: true });
          animation.addEventListener('cancel', () => animations.delete(animation), { once: true });
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );

    const foldGuard = window.innerHeight * 0.92;
    const blocks = Array.from(document.querySelectorAll('section, footer'));
    blocks.forEach((sec) => {
      if (sec.id === 'top') return;
      const kids = Array.from(sec.children).filter((k) => k.nodeType === 1 && k.tagName !== 'CANVAS');
      kids.forEach((child) => {
        // blocks that own their entrance (data-xt-skip) opt out of the global one
        if (child.dataset.xtSkip !== undefined) return;
        if (child.getBoundingClientRect().top < foldGuard) return;
        const cs = getComputedStyle(child);
        const gridKids = cs.display === 'grid' ? Array.from(child.children).filter((k) => k.nodeType === 1) : [];
        if (gridKids.length > 1) {
          gridKids.forEach((gk, i) => {
            gk.dataset.xtReveal = String(i + 1);
            obs.observe(gk);
          });
        } else {
          obs.observe(child);
        }
      });
    });

    return () => {
      obs.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
