import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import Stakes from './components/Stakes.jsx';
import Products from './components/Products.jsx';
import ProductsBanner from './components/ProductsBanner.jsx';
import AskDemo from './components/AskDemo.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Industries from './components/Industries.jsx';
// Platform.jsx is unmounted for now at the owner's request; the file stays on disk.
import Comparison from './components/Comparison.jsx';
import Integrations from './components/Integrations.jsx';
import VideoSection from './components/VideoSection.jsx';
import Clients from './components/Clients.jsx';
import Faq from './components/Faq.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import TraceModal from './components/TraceModal.jsx';
import XenAuthModal from './components/XenAuthModal.jsx';
import { trustData } from './data.jsx';
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';

const TRUST_LOOP = [...trustData(), ...trustData()];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeInd, setActiveInd] = useState(0);
  const [traceOpen, setTraceOpen] = useState(false);
  const [xenAuthOpen, setXenAuthOpen] = useState(false);

  useRevealOnScroll();
  useSmoothScroll(traceOpen || xenAuthOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anyModalOpen = traceOpen || xenAuthOpen;
  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setTraceOpen(false);
        setXenAuthOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [anyModalOpen]);

  const openTrace = () => {
    setXenAuthOpen(false);
    setTraceOpen(true);
  };
  const openXenAuth = () => {
    setTraceOpen(false);
    setXenAuthOpen(true);
  };
  const closePanels = () => {
    setTraceOpen(false);
    setXenAuthOpen(false);
  };
  // "Watch the lifecycle" lands on the film; the interactive walkthrough it
  // used to point at is retired.
  const openDemo = () => {
    closePanels();
    // wait for the modal scroll-lock to release before scrolling the page
    setTimeout(() => {
      document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Nav scrolled={scrolled} openTrace={openTrace} openXenAuth={openXenAuth} />
      {/* Section order follows the category convention (Samsara, Motive):
          hero, a proof strip on the fold's heels, then PROBLEM before product.
          The argument runs stakes -> products -> demo -> how -> proof -> price
          -> objections -> ask: the visitor sees what loss costs, learns what
          the two labels are, tries the thing working, and only then is asked to
          read a price ledger. Nav link order mirrors this sequence. */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TrustBar trustLoop={TRUST_LOOP} />
        {/* the problem, first: three published loss figures, no price yet */}
        <Stakes />
        <Products openTrace={openTrace} openXenAuth={openXenAuth} />
        {/* the product working, before a single spec is asked of the reader */}
        <AskDemo />
        <Industries activeInd={activeInd} setActiveInd={setActiveInd} />
        <HowItWorks />
        <VideoSection />
        <Integrations />
        {/* the ledger the stakes were pointing at: the $10 label line by line */}
        <Comparison />
        <ProductsBanner openTrace={openTrace} openXenAuth={openXenAuth} />
        {/* proof, then the objections, then the ask. The FAQ is the one piece
            kept from the flagship pass: it clears the catch a buyer who already
            runs trackers is looking for, which is work no other section does,
            and it earns its keep immediately before the close. */}
        <Clients />
        <Faq />
        <CtaBanner openDemo={openDemo} />
      </main>
      <Footer />
      <TraceModal open={traceOpen} closePanel={closePanels} openDemo={openDemo} />
      <XenAuthModal open={xenAuthOpen} closePanel={closePanels} />
    </>
  );
}
