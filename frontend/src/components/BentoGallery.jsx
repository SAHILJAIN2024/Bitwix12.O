import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { X, ArrowLeft, Maximize2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BentoGallery.css';
import { convertDriveLink, parseCSV } from '../utils/googleDrive';

const GALLERY_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQn2YIA0glrxL8RuapMSz6LuiybAzqNA3QQjUWuxxigkLi09MGOb1bdt8Y46yhy4e6XoKoyyaperqc7/pub?gid=2047514801&single=true&output=csv";

const MOCK_ARCHIVE = [
  { id: 'm1', src: '/images/slide1.jpeg', title: 'The Grand Opening', category: 'FLASHBACK', size: '2x2', description: 'The moment it all began.' },
  { id: 'm2', src: '/images/slide2.jpeg', title: 'Neon Rhythms', category: 'DANCE', size: '1x1', description: 'Vibrant colors and synchronised moves.' },
  { id: 'm3', src: '/images/slide3.jpeg', title: 'Static Pulse', category: 'CREW', size: '1x1', description: 'Behind the scenes with the BITWIX Crew.' },
  { id: 'm4', src: '/images/slide4.jpeg', title: 'Shadow play', category: 'PORTRAIT', size: '2x1', description: 'Capturing the individual spirit.' },
  { id: 'm5', src: '/images/slide5.jpeg', title: 'Vortex', category: 'EVENT', size: '1x1', description: 'A wide-angle perspective of the crowd.' },
  { id: 'm6', src: '/images/slide6.jpeg', title: 'Chrome Night', category: 'DECOR', size: '1x2', description: 'Minimalist metallic aesthetics.' },
  { id: 'm7', src: '/images/slide7.jpeg', title: 'Midnight Chaos', category: 'FLASHBACK', size: '2x2', description: 'The peak of the night.' },
  { id: 'm8', src: '/images/slide15.jpeg', title: 'Silken Edge', category: 'STUDIO', size: '1x1', description: 'High-contrast studio studies.' },
];

function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function BentoGallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [archiveImages, setArchiveImages] = useState(MOCK_ARCHIVE);
  const [loading, setLoading] = useState(true);
  
  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Kinetic Tilt Values
  const rotateX = useTransform(cursorYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [5, -5]);
  const rotateY = useTransform(cursorXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-5, 5]);

  useEffect(() => {
    const fetchImages = () => {
      const cacheBucket = Math.floor(Date.now() / (30 * 60 * 1000));
      const urlWithCacheBuster = `${GALLERY_CSV_URL}&t=${cacheBucket}`;

      fetch(urlWithCacheBuster)
        .then(res => res.text())
        .then(text => {
          // Basic check if it's a CSV or some error page
          if (!text.includes(',') || text.includes('<!DOCTYPE html>')) {
            throw new Error("Invalid CSV data");
          }

          const rows = parseCSV(text);
          // Header: Timestamp, Image, Title, Category, Description, Size
          const data = rows.slice(1).map((row, idx) => ({
            id: idx,
            src: convertDriveLink(row[1]),
            title: row[2] || 'Archive Visual',
            category: row[3] || 'EVENT',
            description: row[4] || 'Exploring the threshold of visual perception.',
            size: row[5] || '1x1'
          })).filter(img => img.src);
          
          if (data.length > 0) {
            setArchiveImages(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.warn("External gallery data not available, using fallbacks:", err);
          setLoading(false);
        });
    };

    fetchImages();
    // Refresh every 5 minutes
    const interval = setInterval(fetchImages, 5 * 60 * 1000);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bento-gallery-page min-h-screen bg-[#020202] text-white selection:bg-[#10b981]/30">
      {/* CUSTOM CURSOR */}
      <motion.div 
        className="custom-cursor hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Magnetic>
            <button 
              onClick={() => navigate('/')}
              className="p-3 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-[#10b981]/20 hover:border-[#10b981]/40 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-white group-hover:text-[#10b981]" />
            </button>
          </Magnetic>
          <span className="font-orbitron font-black tracking-tighter text-2xl uppercase">Gallery</span>
        </div>
        
        <div className="hidden md:flex gap-8 pointer-events-auto font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          <span> TANISHX CREATIONS </span>
          <span>© / 2026</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            style={{ 
              rotateX,
              rotateY,
              perspective: 1000
            }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-20 select-none"
            >
              Visual <br />
              <span className="text-[#10b981]">Archive</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="px-8 pb-40">
        <div className="max-w-[1400px] mx-auto bento-grid">
          {archiveImages.map((item, idx) => (
            <motion.div
              layoutId={`image-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 100,
                delay: idx * 0.05 
              }}
              onClick={() => setSelectedImage(item)}
              className={`bento-item rounded-[30px] overflow-hidden relative group cursor-pointer ${item.size === '2x2' ? 'col-span-2 row-span-2' : item.size === '2x1' ? 'col-span-2' : item.size === '1x2' ? 'row-span-2' : ''}`}
            >
              <img 
                src={item.src} 
                alt={item.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-100"
              />
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-8 left-8 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#10b981] mb-2">{item.category}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter line-tight">{item.title}</h3>
                </div>
                <div className="absolute top-8 right-8 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl"
            />
            
            <motion.div 
              layoutId={`image-${selectedImage.id}`}
              className="relative w-full max-w-6xl aspect-square md:aspect-[16/9] bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              {/* IMAGE SIDE */}
              <div className="md:w-3/4 relative h-1/2 md:h-full bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-8 right-8 z-20">
                  <Magnetic>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="p-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-[#10b981]/20 transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* DETAILS SIDE */}
              <div className="md:w-1/4 p-8 md:p-12 flex flex-col bg-[#0a0a0a] border-l border-white/5 overflow-y-auto custom-scrollbar">
                <span className="font-mono text-[10px] tracking-[0.4em] text-[#10b981] mb-6 uppercase">Perspective / {selectedImage.category}</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">{selectedImage.title}</h2>
                
                <div className="h-[1px] w-full bg-white/10 mb-8 shrink-0" />
                
                <p className="text-gray-400 text-sm leading-relaxed mb-12 italic">
                  "{selectedImage.description}"
                </p>

                <div className="mt-auto space-y-4">
                  <Magnetic>
                    <button className="w-full py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#10b981] transition-colors flex items-center justify-center gap-4 group">
                      <span>View High Res</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
