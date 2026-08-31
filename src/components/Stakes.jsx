import { lossRegister } from '../data.jsx';

/* What loss costs, against what XenTag costs.

   The stakes were split out of Comparison so the problem lands on the fold's
   heels while the ledger that answers it sits further down, after the product
   tour has earned the right to price itself. The figures are unchanged: three
   published numbers as bare type on the page's own bone ground, each bounded
   by a left hairline rather than a card (neither Samsara nor Motive gives
   statistics a standalone surface anywhere), each with a dated, clickable
   source. The source link is the reason the figure is believable, and it is
   the one thing in this pattern no competitor does.

   The lede no longer promises the table in the next breath, because the table
   is now six sections away. It points forward instead of pretending to
   introduce. Shares .cmp-stats with the comparison rather than duplicating it. */

const STATS = [
  lossRegister.theft.rows[0], // $725M    cargo stolen, US and Canada, 2025
  lossRegister.theft.rows[1], // $273,990 average loss per theft
  lossRegister.cold.rows[0], //  526M t   food lost for want of refrigeration
];

export default function Stakes() {
  return (
    <section id="stakes" className="stakes-section section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      <div className="section-heading">
        <h2 style={{ margin: 0, color: '#14110D' }}>
          What loss costs, against <span className="h2-ember">what XenTag costs</span>
        </h2>
        <p style={{ marginTop: 16, color: '#3B352D' }}>
          Three published figures from the freight record. The $10 label is measured against them further down.
        </p>
      </div>

      {/* The stakes, as bare type on the page's own ground. Each figure is
          bounded by a left hairline rather than a card. */}
      <ul className="cmp-stats">
        {STATS.map((s) => (
          <li key={s.stat}>
            <span className="cmp-stat-fig">{s.stat}</span>
            <span className="cmp-stat-label">{s.label}</span>
            <a className="cmp-stat-src" href={s.url} target="_blank" rel="noopener noreferrer">
              {s.source}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
