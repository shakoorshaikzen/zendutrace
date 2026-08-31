/* The objection station, immediately before the close.

   Native <details>/<summary>, so it opens with a click, with Enter, with Space
   and with JavaScript switched off entirely. No card chrome, no chevron icon
   set, no animation to fight the global reveal: hairline rows, a mono [+]/[−]
   that belongs to this page's machine register, and the first row open so the
   pattern is legible without a click.

   Two rules govern the answers. They are written in the voice of a buyer who
   already runs trackers and is looking for the catch, so the questions name the
   catch. And no answer prints a figure that is not provable on this page or
   linked to a resolving source. The coverage question in particular is the one
   place a network-scale number would traditionally go, and it does not get one:
   the Aug 2026 audit could not pin a public source to any node count or country
   count, so the mechanism answers instead. The price answer restates $10, so
   the number survives a reader who skims the page from the bottom. */

const FAQ = [
  {
    q: 'What happens where there is no gateway?',
    a: 'The label falls back to cellular and reports on its own over LTE-M. Bluetooth is the cheap path when a fleet vehicle or a fixed gateway passes it; cellular covers everything else. Both write under the same serial, so the trail has no hole where the gateways stopped.',
  },
  {
    q: 'Does it feed the telematics platform we already run?',
    a: 'Yes. Label positions and condition events land in the fleet map your team already opens each morning, rather than in a second portal nobody logs into. The same events are available over REST, webhooks and OAuth 2.0 if you would rather pull them into your own systems.',
  },
  {
    q: 'How long does the battery really last?',
    a: 'About a year at a 60-minute reporting interval, which is the assumption behind the $10 line. Report more often and it is shorter, and sustained cold shortens it further, so a reefer lane sits nearer the low end than a dry van does. The label reports its own battery level, so you are not guessing.',
  },
  {
    q: 'What does the $10 include?',
    a: 'The label, both radios, temperature and shock logging, and tracking on the live map. Starter pricing is $10 a label plus a $3 monthly track fee per asset; volume pricing starts at $8. There is no installer to book and no gateway to buy.',
  },
  {
    q: 'How is this different from a consumer tracker?',
    a: 'A consumer tracker gives you a dot on a map and needs a stranger to walk past it. This is a shipping label with two radios, a temperature and shock log kept on the label itself, and an event record you can hand to a claims adjuster.',
  },
  {
    q: 'Is the tap verification spoofable?',
    a: 'The XenAuth chip answers with a cryptographic response rather than a printed number, so photographing or reprinting the artwork does not reproduce it. A tap either verifies or it does not. There is no third state a reader can be talked into.',
  },
  {
    q: 'What does DPP-ready mean?',
    a: 'It means the record is structured for a EU Digital Product Passport and reachable from the item itself. NFC carries the tap; a GS1 Digital Link QR carries the compliant pointer. We say ready rather than compliant because the delegated act for your product category sets the final requirements.',
  },
  {
    q: 'How accurate is the temperature log?',
    a: 'The label samples on its own schedule and keeps every reading, so what you get is a series rather than one measurement taken at the door. Alerts fire on the threshold you set, which is what makes a breach something you learn in transit.',
  },
  {
    q: 'What happens when the battery dies?',
    a: 'The label stops reporting and the record ends where the battery ended, with the last position and reading held. It is a single-use label, so at end of life you peel it off and recycle it rather than charging it and putting it back into service.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section-shell" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
      {/* Left-aligned through .section-heading, like every other section h2 on
          the page: this section arrived from a pass that centred it, and a
          centred heading is the one thing here that broke the broadsheet's
          left-aligned measure. */}
      <div className="section-heading">
        <h2 style={{ margin: 0, color: '#14110D' }}>
          The questions that come up before the first pallet
        </h2>
        <p style={{ marginTop: 16, color: '#3B352D' }}>
          The catch a team already running trackers goes looking for, answered before the ask.
        </p>
      </div>
      <div className="faq-list">
        {FAQ.map((item, i) => (
          <details className="faq-row" key={item.q} open={i === 0}>
            {/* the sign is drawn in CSS off [open], so it stays truthful with
                JavaScript off and never needs a state hook to follow the row */}
            <summary className="faq-q">
              {item.q}
              <span className="faq-sign" aria-hidden="true" />
            </summary>
            <p className="faq-a">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="faq-foot">
        Something not answered here? <a href="mailto:sales@zenduit.com">Email sales@zenduit.com</a> and a person replies.
      </p>
    </section>
  );
}
