import { motion } from 'framer-motion';
import TextType from './TextType';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-20 text-center relative overflow-hidden">
      {/* Subtle overlay to improve text readability over the bg image */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 px-6">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-indigo-300 tracking-[0.3em] text-sm uppercase font-semibold"
        >
          CSE Department Presents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-orbitron mt-6 text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)] tracking-tighter"
        >
          BITWIXT 12.O
        </motion.h1>

        {/* INTEGRATED TEXTTYPE COMPONENT */}
        <div className="mt-6 h-10 text-xl sm:text-2xl text-cyan-300 font-mono italic">
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
          className="mt-8 text-lg text-gray-300 font-medium tracking-wide"
        >
          Freshers Party • <span className="text-white">Batch 2025–2029</span>
        </motion.p>

      </div>
    </section>
  );
}