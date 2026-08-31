import { useReducedMotion } from 'framer-motion';
import AutoPlayVideo from './AutoPlayVideo.jsx';

export default function VideoSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="video" className="video-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: '#14110D' }}>
          Watch a label go to work
        </h2>
        <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: '#3B352D' }}>
          From peel-and-stick to a live signal on the map, the complete lifecycle runs 30 seconds.
        </p>
      </div>
      <div
        className="film-frame"
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#151210',
          border: '1px solid rgba(18,17,16,0.08)',
          boxShadow: '0 1px 3px rgba(18,17,16,0.05),0 14px 32px -18px rgba(18,17,16,0.2)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <AutoPlayVideo
            src="/assets/xentag-film.mp4"
            poster="/assets/xentag-film-poster.webp"
            reduceMotion={!!reduceMotion}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            controls
            aria-label="XenTag product film"
          />
        </div>
      </div>
    </section>
  );
}
