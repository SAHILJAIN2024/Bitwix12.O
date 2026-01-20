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

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - left);
    mouseY.set(e.touches[0].clientY - top);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="min-h-screen flex items-center justify-center pt-24 pb-20 text-center relative overflow-hidden spotlight-container"
    >
      {/* Spotlight Shadow/Light layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0" />

      <div className="relative z-10 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-indigo-300 tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm uppercase font-bold"
          >
            CSE Department Presents
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="font-orbitron mt-6 text-4xl sm:text-6xl md:text-9xl font-black text-white tracking-widest relative"
          >
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500 drop-shadow-[0_0_50px_rgba(99,102,241,0.4)]">
              BITWIXT12.0
            </span>
          </motion.h1>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="mt-8 h-10 text-lg md:text-2xl text-cyan-300 font-mono italic opacity-90"
          >
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
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } }
            }}
            className="mt-12 text-sm md:text-lg text-gray-400 font-medium tracking-[0.2em] uppercase"
          >
            Freshers Party • <span className="text-white">Batch 2025–2029</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}