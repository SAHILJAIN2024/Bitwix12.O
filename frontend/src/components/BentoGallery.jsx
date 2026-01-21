import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { X, ArrowLeft, Maximize2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BentoGallery.css';
import { convertDriveLink, parseCSV, getThumbnail } from '../utils/googleDrive';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzA4egakDsYtzuVC4HOjXUAgYCH3dy9Z1Vn-4OGaHXd9dSDlSKbAk4WHUjCXyMFSrIVmA/exec";

const MOCK_ARCHIVE = [
  { id: '11SRJhB3C2gxvQ0bTaSQ3VG0Ifo8n8Cbk', src: convertDriveLink('https://drive.google.com/uc?id=11SRJhB3C2gxvQ0bTaSQ3VG0Ifo8n8Cbk'), thumbnail: getThumbnail('https://drive.google.com/uc?id=11SRJhB3C2gxvQ0bTaSQ3VG0Ifo8n8Cbk'), size: '2x2', type: 'image' },
  { id: '13DvddZh4tFJQlwTamQ1tJB4hgZKzK8e9', src: convertDriveLink('https://drive.google.com/uc?id=13DvddZh4tFJQlwTamQ1tJB4hgZKzK8e9'), thumbnail: getThumbnail('https://drive.google.com/uc?id=13DvddZh4tFJQlwTamQ1tJB4hgZKzK8e9'), size: '1x1', type: 'image' },
  { id: '1bQuzxOv-aYMIoLhwxO6lINkhh-WvpiHL', src: convertDriveLink('https://drive.google.com/uc?id=1bQuzxOv-aYMIoLhwxO6lINkhh-WvpiHL'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1bQuzxOv-aYMIoLhwxO6lINkhh-WvpiHL'), size: '1x1', type: 'image' },
  { id: '1dpjdyWv5UBExLSxWdgRImMcgwBvKTyAq', src: convertDriveLink('https://drive.google.com/uc?id=1dpjdyWv5UBExLSxWdgRImMcgwBvKTyAq'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1dpjdyWv5UBExLSxWdgRImMcgwBvKTyAq'), size: '2x1', type: 'image' },
  { id: '1eoFhoLRpv3vdqnw1S0ZX4MnOff7FQa9u', src: convertDriveLink('https://drive.google.com/uc?id=1eoFhoLRpv3vdqnw1S0ZX4MnOff7FQa9u'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1eoFhoLRpv3vdqnw1S0ZX4MnOff7FQa9u'), size: '1x1', type: 'image' },
  { id: '1FFTzsAEuwquWbloFKb4kIoRtmfRveoju', src: convertDriveLink('https://drive.google.com/uc?id=1FFTzsAEuwquWbloFKb4kIoRtmfRveoju'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1FFTzsAEuwquWbloFKb4kIoRtmfRveoju'), size: '1x2', type: 'image' },
  { id: '1ha1ASOIccMw5aZD1S5OvLhluM0SJMAY-', src: convertDriveLink('https://drive.google.com/uc?id=1ha1ASOIccMw5aZD1S5OvLhluM0SJMAY-'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1ha1ASOIccMw5aZD1S5OvLhluM0SJMAY-'), size: '2x2', type: 'image' },
  { id: '1k7vjHZJdzTywAhO02RIpm-28_IJ-IFss', src: convertDriveLink('https://drive.google.com/uc?id=1k7vjHZJdzTywAhO02RIpm-28_IJ-IFss'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1k7vjHZJdzTywAhO02RIpm-28_IJ-IFss'), size: '1x1', type: 'image' },
  { id: '1KN_VI20BTye9vBl5xS47h8zyoOoGZkUE', src: convertDriveLink('https://drive.google.com/uc?id=1KN_VI20BTye9vBl5xS47h8zyoOoGZkUE'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1KN_VI20BTye9vBl5xS47h8zyoOoGZkUE'), size: '1x1', type: 'image' },
  { id: '1lORDsfdONw_13lfYojknLZb4FskNjZjW', src: convertDriveLink('https://drive.google.com/uc?id=1lORDsfdONw_13lfYojknLZb4FskNjZjW'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1lORDsfdONw_13lfYojknLZb4FskNjZjW'), size: '2x1', type: 'image' },
  { id: '1N_Hi29Iu0W5WVlyHTjoWol-iR2fkuQKb', src: convertDriveLink('https://drive.google.com/uc?id=1N_Hi29Iu0W5WVlyHTjoWol-iR2fkuQKb'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1N_Hi29Iu0W5WVlyHTjoWol-iR2fkuQKb'), size: '1x1', type: 'image' },
  { id: '1o81jh8eeXeMUTkjrKnLkN1ifE5jO7y2U', src: convertDriveLink('https://drive.google.com/uc?id=1o81jh8eeXeMUTkjrKnLkN1ifE5jO7y2U'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1o81jh8eeXeMUTkjrKnLkN1ifE5jO7y2U'), size: '2x2', type: 'image' },
  { id: '1PCj-y1ZNUlD5YBqKVY4goaLN16xWio-_', src: convertDriveLink('https://drive.google.com/uc?id=1PCj-y1ZNUlD5YBqKVY4goaLN16xWio-_'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1PCj-y1ZNUlD5YBqKVY4goaLN16xWio-_'), size: '1x1', type: 'image' },
  { id: '1s2tLN6b9cfZVZTxwwYwbMBVNTAAsw8Hz', src: convertDriveLink('https://drive.google.com/uc?id=1s2tLN6b9cfZVZTxwwYwbMBVNTAAsw8Hz'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1s2tLN6b9cfZVZTxwwYwbMBVNTAAsw8Hz'), size: '1x1', type: 'image' },
  { id: '1sIebDgwlE7OaQHFYS0npgbYkUf9URp8k', src: convertDriveLink('https://drive.google.com/uc?id=1sIebDgwlE7OaQHFYS0npgbYkUf9URp8k'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1sIebDgwlE7OaQHFYS0npgbYkUf9URp8k'), size: '2x1', type: 'image' },
  { id: '1V3tS_Mw9-_ex8bOu1G4a3Cv5WstJAUim', src: convertDriveLink('https://drive.google.com/uc?id=1V3tS_Mw9-_ex8bOu1G4a3Cv5WstJAUim'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1V3tS_Mw9-_ex8bOu1G4a3Cv5WstJAUim'), size: '1x2', type: 'image' },
  { id: '1V5XVAmmFgf9LsiFTmS4lFcbSHznQdQ_n', src: convertDriveLink('https://drive.google.com/uc?id=1V5XVAmmFgf9LsiFTmS4lFcbSHznQdQ_n'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1V5XVAmmFgf9LsiFTmS4lFcbSHznQdQ_n'), size: '1x1', type: 'image' },
  { id: '1v-mGYwyu1ebJb0wpRwaImZCZ_P3h7LXd', src: convertDriveLink('https://drive.google.com/uc?id=1v-mGYwyu1ebJb0wpRwaImZCZ_P3h7LXd'), thumbnail: getThumbnail('https://drive.google.com/uc?id=1v-mGYwyu1ebJb0wpRwaImZCZ_P3h7LXd'), size: '2x2', type: 'image' },
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
  const [isTouch, setIsTouch] = useState(false);
  
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
    // Detect touch device
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const fetchImages = () => {
      fetch(APPS_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const sizes = ['1x1', '2x2', '1x1', '2x1', '1x1', '1x2'];
            const mappedData = data.map((img, idx) => ({
              ...img,
              thumbnail: getThumbnail(img.src), // Reliable grid preview
              src: convertDriveLink(img.src, img.type), // Used for detail view
              size: sizes[idx % sizes.length]
            }));
            setArchiveImages(mappedData);
          } else {
            console.warn("No data returned from script, using fallbacks");
            setArchiveImages(MOCK_ARCHIVE);
          }
          setLoading(false);
        })
        .catch(err => {
          console.warn("External gallery data not available, using fallbacks:", err);
          setArchiveImages(MOCK_ARCHIVE);
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
      {/* CUSTOM CURSOR - Only on Desktop */}
      {!isTouch && (
        <motion.div 
          className="custom-cursor hidden md:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        />
      )}

      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Magnetic>
            <button 
              onClick={() => navigate('/')}
              className="p-3 pr-6 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-[#10b981]/20 hover:border-[#10b981]/40 transition-all group active:scale-90 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#10b981]/20 transition-colors">
                <ArrowLeft className="w-4 h-4 text-white group-hover:text-[#10b981]" />
              </div>
              <span className="font-orbitron font-bold text-[10px] tracking-[0.2em] text-white">Back</span>
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
              className={`bento-item rounded-[30px] overflow-hidden relative group cursor-pointer bg-white/5 ${item.size === '2x2' ? 'col-span-2 row-span-2' : item.size === '2x1' ? 'col-span-2' : item.size === '1x2' ? 'row-span-2' : ''}`}
            >
              {/* ALWAYS render thumbnail in the grid for both images and videos */}
              <img 
                src={item.thumbnail} 
                alt="Archive Visual"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-100"
              />
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transform scale-50 group-hover:scale-100 transition-all duration-500">
                  <Maximize2 className="w-6 h-6 text-white" />
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
              className="absolute inset-0 bg-[#020202]/98 backdrop-blur-3xl"
            />
            
            <motion.div 
              layoutId={`image-${selectedImage.id}`}
              className="relative w-full max-w-7xl h-full flex items-center justify-center z-10"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative w-full h-[80vh] flex items-center justify-center p-4 md:p-8">
                {selectedImage.type === 'video' ? (
                  <iframe 
                    src={selectedImage.src.replace('uc?id=', 'file/d/').replace('&export=download', '') + '/preview'}
                    className="w-full h-full max-w-5xl border-0 shadow-2xl rounded-lg bg-black"
                    allow="autoplay"
                    title="Video Preview"
                  />
                ) : (
                  <motion.img 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={selectedImage.src} 
                    alt="Archive Visual"
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                  />
                )}
                
                <div className="absolute top-0 right-0 md:top-8 md:right-8 z-20">
                  <Magnetic>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="p-5 md:p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all active:scale-90"
                    >
                      <X className="w-8 h-8 md:w-6 md:h-6" />
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
