import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Footer from './components/Footer'

const images = [
  '/slide1.jpeg', '/slide2.jpeg', '/slide3.jpeg', '/slide4.jpeg',
  '/slide5.jpeg', '/slide6.jpeg', '/slide7.jpeg', '/slide8.jpeg','/slide9.jpeg',
  '/slide10.jpeg', '/slide11.jpeg', '/slide12.jpeg'
]

function App() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center bg-fixed min-h-screen overflow-x-hidden text-white selection:bg-indigo-500/30">
      <Navbar scrollTo={scrollTo} />
      
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
        {/* pt-[500px] ensures the deep fade has space to play out before text starts */}
        <section id="team" className="relative pt-[550px]">
          <Team />
        </section>
      </main>

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
  )
}

export default App