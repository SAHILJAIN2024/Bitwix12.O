import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
const videoSrc = '/images/video1.mp4';

export default function VideoSection() {
   const videoSectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(videoSectionRef, { margin: '-150px' });
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    try {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play might be blocked or codec might fail
          });
        }
      } else {
        videoRef.current.pause();
      }
    } catch (e) {
      console.warn("Video interaction failed:", e);
    }
  }, [isInView]);

  return (
    <motion.section 
      id="video" 
      ref={videoSectionRef} 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="py-24 px-0 md:px-6"
    >
      <div className="max-w-full md:max-w-[95%] mx-auto px-6 md:px-0 text-center mb-14">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          Experience the Vibe
        </h2>
        <p className="mt-4 text-gray-400">
          A glimpse into the energy, chaos & celebration of BITWIXT12.0
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-full md:max-w-[95%] mx-auto rounded-none md:rounded-[2rem] overflow-hidden bg-black/40 backdrop-blur-xl ring-0 md:ring-1 ring-white/10 shadow-[0_0_80px_rgba(99,102,241,0.2)] relative group"
      >
        <div className="relative bg-[#050505] w-full h-auto aspect-video">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            className="w-full h-full block relative z-10 brightness-[1.15] contrast-[1.05]"
            onError={(e) => {
              // If video fails, show a clean message or placeholder
              e.target.style.display = 'none';
            }}
          >
          </video>

          {/* AUDIO TOGGLE BUTTON */}
          <div className="absolute top-6 right-6 z-30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors group shadow-lg"
              title={isMuted ? "Unmute" : "Mute"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMuted ? "muted" : "unmuted"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
          
          {/* Subtle Fallback Background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-indigo-950/40 to-black">
             <div className="w-16 h-16 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-400 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
             </div>
             <p className="text-gray-500 text-xs tracking-[0.2em] uppercase font-orbitron">Cinematic Experience</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}