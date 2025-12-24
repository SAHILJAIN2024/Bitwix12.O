import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="pt-52 pb-36 text-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10">
        <p className="text-indigo-300 tracking-widest text-sm uppercase">
          CSE Department Presents
        </p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-orbitron mt-6 text-7xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.6)] tracking-widest"
        >
          BITWIX12.O
        </motion.h1>

        <p className="mt-6 text-2xl text-indigo-300 font-semibold">
          Freshers Party • Batch 2025–2029
        </p>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Code the night. Break the routine. Welcome to the beginning.
        </p>
      </div>
    </section>
  );
}