import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Seniors from './components/Seniors'
import Footer from './components/Footer'
import Particles from './components/Particles'

const images = [
  '/images/slide1.jpeg', '/images/slide2.jpeg', '/images/slide3.jpeg', '/images/slide4.jpeg',
  '/images/slide5.jpeg', '/images/slide6.jpeg', '/images/slide7.jpeg', '/images/slide8.jpeg',
  '/images/slide9.jpeg', '/images/slide10.jpeg', '/images/slide11.jpeg', '/images/slide12.jpeg'
]

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
    <main className="relative z-10">
      <section id="hero">
        <Hero />
      </section>

      {/* --- VIDEO SECTION TRANSITION --- */}
      <section id="video" className="relative">
        <VideoSection />
        
        {/* LAYER 1: The Deep Base (Solid transition) */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
        
        {/* LAYER 2: The Soft Blend (Extends further up) */}
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none" />
      </section>
      
      {/* --- GALLERY SECTION (The Dark Core) --- */}
      <section id="gallery" className="bg-[#050505] relative">
        <Gallery images={images} />
        
        {/* LAYER 1: Exit Fade (Deep Base) */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-[#050505] to-transparent z-20 translate-y-full pointer-events-none" />
        
        {/* LAYER 2: Exit Blend (Deep cinematic reach) */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent z-10 translate-y-full pointer-events-none" />
      </section>
      
      {/* --- TEAM SECTION --- */}
      <section id="team" className="relative pt-[550px]">
        <Team />
      </section>
    </main>
  );
}

function App() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

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

        <Navbar scrollTo={scrollTo} />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/seniors" element={
            <div className="relative z-10 pt-20">
              <Seniors />
            </div>
          } />
        </Routes>

        <Footer />

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