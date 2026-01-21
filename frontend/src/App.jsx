import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Seniors from './components/Seniors'
import BentoGallery from './components/BentoGallery'
import Footer from './components/Footer'
import Particles from './components/Particles'


// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LandingPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <section id="hero">
        <Hero />
      </section>

      {/* --- VIDEO SECTION TRANSITION --- */}
      <section id="video" className="relative">
        <VideoSection />
        
        {/* LAYER 1: The Deep Base (Solid transition) */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-96 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        
        {/* LAYER 2: The Soft Blend (Extends further up) */}
        <div className="absolute bottom-0 left-0 w-full h-48 md:h-[500px] bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none" />
      </section>
      
      {/* --- GALLERY SECTION (The Dark Core) --- */}
      <motion.section 
        id="gallery" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#050505] relative"
      >
        <Gallery />
        
        {/* LAYER 1: Exit Fade (Deep Base) */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-96 bg-gradient-to-b from-[#050505] to-transparent z-20 translate-y-full pointer-events-none" />
        
        {/* LAYER 2: Exit Blend (Deep cinematic reach) */}
        <div className="absolute bottom-0 left-0 w-full h-48 md:h-[600px] bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent z-10 translate-y-full pointer-events-none" />
      </motion.section>
      
      {/* --- TEAM SECTION --- */}
      <section id="team" className="relative pt-[200px] md:pt-[550px]">
        <Team />
      </section>
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const showNavbar = location.pathname !== '/gallery-archive';

  return (
    <>
      {showNavbar && <Navbar scrollTo={scrollTo} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/seniors" element={
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 pt-20"
            >
              <Seniors />
            </motion.div>
          } />
          <Route path="/gallery-archive" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BentoGallery />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
      {showNavbar && <Footer />}
    </>
  );
}

function App() {
  // GLOBAL SMOOTH SCROLL (LENIS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen overflow-x-hidden text-white selection:bg-indigo-500/30 bg-[#050505]">
        
        {/* --- PARTICLES BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={['#ffffff', '#818cf8', '#ffffff']}
            particleCount={400}
            particleSpread={15}
            speed={0.2}
            particleBaseSize={150}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <AnimatedRoutes />

        {/* SVG FILTER for Gooey Navigation */}
        <div style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </Router>
  )
}

export default App;