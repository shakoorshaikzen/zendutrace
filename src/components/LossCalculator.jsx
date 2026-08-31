import { useState } from 'react';

const PRESETS = [
  { id: 'cold', name: 'Cold chain', value: 28000, rate: 2.5 },
  { id: 'parcel', name: 'Parcel & LTL', value: 4500, rate: 1.4 },
  { id: 'equipment', name: 'High-value equipment', value: 60000, rate: 0.8 },
  { id: 'pharma', name: 'Pharma', value: 95000, rate: 1.2 },
];

const LABEL_PRICE = 10;
const SHIPMENT_MIN = 1;
const SHIPMENT_MAX = 100000;
const VALUE_MAX = 10000000;

const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const plain = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function toNum(raw) {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n) {
  if (!Number.isFinite(n) || n <= 0) return '$0';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e5) return `$${plain.format(Math.round(n / 1e3))}K`;
  return usdWhole.format(Math.round(n));
}

const fieldStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6,
  color: '#FFFFFF',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  padding: '10px 12px',
  minHeight: 44,
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  fontFamily: 'var(--font-body)',
  fontSize: 13,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.78)',
};

function StepButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: 44,
        height: 44,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        color: '#FFFFFF',
        fontFamily: 'var(--font-body)',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 1,
        cursor: 'pointer',
        transition: 'background .15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.11)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      }}
    >
      {children}
    </button>
  );
}

export default function LossCalculator() {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [shipments, setShipments] = useState('200');
  const [value, setValue] = useState(String(PRESETS[0].value));
  const [rate, setRate] = useState(String(PRESETS[0].rate));

  const shipmentsN = clamp(Math.round(toNum(shipments)), 0, SHIPMENT_MAX);
  const valueN = clamp(toNum(value), 0, VALUE_MAX);
  const rateN = clamp(toNum(rate), 0, 100);

  const annualShipments = shipmentsN * 12;
  const exposure = annualShipments * valueN * (rateN / 100);
  const labelSpend = annualShipments * LABEL_PRICE;
  const breakEven = exposure > 0 ? Math.min(100, (labelSpend / exposure) * 100) : null;

  function step(delta) {
    setShipments(String(clamp(shipmentsN + delta, SHIPMENT_MIN, SHIPMENT_MAX)));
  }

  function pickPreset(id) {
    setPresetId(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p) {
      setValue(String(p.value));
      setRate(String(p.rate));
    }
  }

  return (
    <div
      className="loss-calc"
      style={{
        marginTop: 40,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 8,
        padding: 28,
      }}
    >
      <div
        className="loss-calc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.08fr) minmax(0,0.92fr)',
          gap: 'clamp(24px,3vw,40px)',
          alignItems: 'start',
        }}
      >
        {/* Inputs */}
        <div>
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(22px,2.2vw,30px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Run your own number
          </h3>
          <p
            style={{
              margin: '8px 0 22px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Industry averages, editable. Nothing leaves your browser.
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label htmlFor="lc-shipments" style={labelStyle}>
                Shipments per month
              </label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', maxWidth: 320 }}>
                <StepButton label="Decrease shipments per month" onClick={() => step(-25)}>
                  &minus;
                </StepButton>
                <input
                  id="lc-shipments"
                  type="number"
                  inputMode="numeric"
                  min={SHIPMENT_MIN}
                  max={SHIPMENT_MAX}
                  step={25}
                  value={shipments}
                  onChange={(e) => setShipments(e.target.value)}
                  onBlur={() =>
                    setShipments(String(clamp(shipmentsN || SHIPMENT_MIN, SHIPMENT_MIN, SHIPMENT_MAX)))
                  }
                  style={{ ...fieldStyle, textAlign: 'center', fontFamily: 'var(--font-machine)', fontVariantNumeric: 'tabular-nums' }}
                />
                <StepButton label="Increase shipments per month" onClick={() => step(25)}>
                  +
                </StepButton>
              </div>
            </div>

            <div>
              <label htmlFor="lc-industry" style={labelStyle}>
                Industry
              </label>
              <select
                id="lc-industry"
                value={presetId}
                onChange={(e) => pickPreset(e.target.value)}
                style={{ ...fieldStyle, maxWidth: 320, cursor: 'pointer' }}
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id} style={{ color: '#121110', background: '#FFFFFF' }}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12, maxWidth: 460 }}>
              <div>
                <label htmlFor="lc-value" style={labelStyle}>
                  Average value per shipment ($)
                </label>
                <input
                  id="lc-value"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={VALUE_MAX}
                  step={500}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => setValue(String(valueN))}
                  style={{ ...fieldStyle, fontFamily: 'var(--font-machine)', fontVariantNumeric: 'tabular-nums' }}
                />
              </div>
              <div>
                <label htmlFor="lc-rate" style={labelStyle}>
                  Annual loss / spoilage rate (%)
                </label>
                <input
                  id="lc-rate"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  onBlur={() => setRate(String(rateN))}
                  style={{ ...fieldStyle, fontFamily: 'var(--font-machine)', fontVariantNumeric: 'tabular-nums' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          aria-live="polite"
          style={{
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: 'clamp(20px,2vw,24px)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            Annual exposure
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: 'var(--font-machine)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 700,
              fontSize: 'clamp(28px,3.2vw,40px)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#F9762F',
            }}
          >
            {formatMoney(exposure)}
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.09)', margin: '20px 0' }} />

          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            Labeling every shipment
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: 'var(--font-machine)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 700,
              fontSize: 'clamp(22px,2.2vw,30px)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#FFFFFF',
            }}
          >
            {formatMoney(labelSpend)}
          </div>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            per year at ${LABEL_PRICE} per label
          </div>

          <p
            style={{
              margin: '20px 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            {breakEven === null
              ? 'Add your shipment volume and values to see the break-even point.'
              : `Labels pay for themselves if they prevent ${breakEven.toFixed(1)}% of that loss.`}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: '24px 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '68ch',
        }}
      >
        Estimates from editable industry averages. Sources for the stats above: Verisk CargoNet, IQVIA, Burns &amp; Wilcox.
      </p>
    </div>
  );
}
