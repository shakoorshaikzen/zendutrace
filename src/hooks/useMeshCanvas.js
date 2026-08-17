import { useEffect } from 'react';

// Ports mesh(): plain 2D canvas draw loop for the hero background.
// Soft moving radial-gradient blobs + faint grid lines + vignette.
export function useMeshCanvas(canvasRef, active = true, animate = true) {
  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let t = 0;
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.18, y: 0.72, r: 0.55, c: 'rgba(255,107,0,0.22)', sp: 0.0007, ox: 0.12, oy: 0.08 },
      { x: 0.82, y: 0.2, r: 0.5, c: 'rgba(0,196,255,0.13)', sp: 0.0009, ox: 0.1, oy: 0.12 },
      { x: 0.5, y: 0.9, r: 0.42, c: 'rgba(255,138,43,0.14)', sp: 0.0006, ox: 0.15, oy: 0.05 },
      { x: 0.92, y: 0.72, r: 0.36, c: 'rgba(0,229,160,0.10)', sp: 0.001, ox: 0.08, oy: 0.1 },
      { x: 0.35, y: 0.14, r: 0.4, c: 'rgba(255,107,0,0.09)', sp: 0.0008, ox: 0.09, oy: 0.13 },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      t += 1;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0A0E1A';
      ctx.fillRect(0, 0, w, h);
      blobs.forEach((b) => {
        const bx = (b.x + Math.sin(t * b.sp * 1000 + b.oy * 10) * b.ox) * w;
        const by = (b.y + Math.cos(t * b.sp * 1000 + b.ox * 10) * b.oy) * h;
        const rad = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, rad);
        g.addColorStop(0, b.c);
        g.addColorStop(1, 'rgba(10,14,26,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, rad, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      const vig = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h / 2, Math.max(w, h) * 0.85);
      vig.addColorStop(0, 'rgba(10,14,26,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.62)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      if (animate) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, animate]);
}
