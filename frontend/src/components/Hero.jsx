import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import TextType from './TextType';

export default function Hero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center pt-20 pb-20 text-center relative overflow-hidden spotlight-container"
    >
      {/* Spotlight Shadow/Light layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0" />

      <div className="relative z-10 px-6">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-indigo-300 tracking-[0.4em] text-sm uppercase font-bold"
        >
          CSE Department Presents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-orbitron mt-6 text-6xl sm:text-9xl font-black text-white tracking-widest relative"
        >
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500 drop-shadow-[0_0_50px_rgba(99,102,241,0.4)]">
            BITWIXT 12.0
          </span>
        </motion.h1>

        {/* INTEGRATED TEXTTYPE COMPONENT */}
        <div className="mt-8 h-10 text-xl sm:text-2xl text-cyan-300 font-mono italic opacity-90">
          <TextType 
            text={[
              "Welcome to the beginning.",
              "Code the night.",
              "Break the routine.",
              "Happy coding, Freshers!"
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-lg text-gray-400 font-medium tracking-[0.2em] uppercase"
        >
          Freshers Party • <span className="text-white">Batch 2025–2029</span>
        </motion.p>

      </div>
    </section>
  );
}