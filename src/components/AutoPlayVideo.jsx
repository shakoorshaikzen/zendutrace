import { useEffect, useRef } from 'react';

/**
 * Muted looping video that autoplays when in view.
 * Browsers require muted for autoplay; optional controls let users unmute.
 */
export default function AutoPlayVideo({
  src,
  poster,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  controls = false,
  loop = true,
  onReady,
  preload = 'auto',
  reduceMotion = false,
  pauseWhenHidden = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduceMotion) {
      el.pause();
      el.removeAttribute('autoplay');
      return undefined;
    }

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    tryPlay();

    const onCanPlay = () => {
      tryPlay();
      onReady?.();
    };
    el.addEventListener('canplay', onCanPlay);

    let observer;
    if (pauseWhenHidden && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) tryPlay();
            else el.pause();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
    }

    return () => {
      el.removeEventListener('canplay', onCanPlay);
      observer?.disconnect();
    };
  }, [src, onReady, reduceMotion, pauseWhenHidden]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay={!reduceMotion}
      muted
      loop={loop}
      playsInline
      controls={controls}
      preload={reduceMotion ? 'metadata' : preload}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={style}
    />
  );
}
