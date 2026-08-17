import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import TrustBar from './components/TrustBar.jsx';
import RiskSection from './components/RiskSection.jsx';
import Products from './components/Products.jsx';
import ProductsBanner from './components/ProductsBanner.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import VideoSection from './components/VideoSection.jsx';
import Industries from './components/Industries.jsx';
import Platform from './components/Platform.jsx';
import Integrations from './components/Integrations.jsx';
import DemoSection from './components/DemoSection.jsx';
import Comparison from './components/Comparison.jsx';
import Clients from './components/Clients.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';
import TraceModal from './components/TraceModal.jsx';
import XenAuthModal from './components/XenAuthModal.jsx';
import { trustData, incidentsData } from './data.jsx';
import { useRevealOnScroll } from './hooks/useRevealOnScroll.js';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';

const TRUST_LOOP = [...trustData(), ...trustData()];
const INCIDENTS = incidentsData();

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
  const openDemo = () => {
    closePanels();
    // wait for the modal scroll-lock to release before scrolling the page
    setTimeout(() => {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Nav scrolled={scrolled} openTrace={openTrace} openXenAuth={openXenAuth} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <TrustBar trustLoop={TRUST_LOOP} />
        <ProductsBanner openTrace={openTrace} openXenAuth={openXenAuth} />
        <Products openTrace={openTrace} openXenAuth={openXenAuth} />
        <RiskSection incidents={INCIDENTS} />
        <VideoSection />
        <HowItWorks />
        <Industries activeInd={activeInd} setActiveInd={setActiveInd} />
        <Platform />
        <Integrations />
        <DemoSection />
        <Comparison />
        <Clients />
        <CtaBanner openDemo={openDemo} />
      </main>
      <Footer />
      <TraceModal open={traceOpen} closePanel={closePanels} openDemo={openDemo} />
      <XenAuthModal open={xenAuthOpen} closePanel={closePanels} />
    </>
  );
}
