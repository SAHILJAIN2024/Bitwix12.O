import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VideoSection() {
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(videoSectionRef, { margin: '-150px' });

  useEffect(() => {
    if (!videoRef.current) return;
    isInView ? videoRef.current.play() : videoRef.current.pause();
  }, [isInView]);

  return (
    <section id="video" ref={videoSectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          Experience the Vibe
        </h2>
        <p className="mt-4 text-gray-400">
          A glimpse into the energy, chaos & celebration of BITWIX12.O
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_0_60px_rgba(99,102,241,0.25)]"
      >
        <div className="aspect-video">
          <video
            ref={videoRef}
            src="/Finalrecording.mp4"
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}