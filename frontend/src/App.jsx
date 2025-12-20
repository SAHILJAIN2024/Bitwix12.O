'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'


export default function Example() {
  /* ---------------- VIDEO SCROLL PLAY ---------------- */
  const videoSectionRef = useRef(null)
  const videoRef = useRef(null)

  const isInView = useInView(videoSectionRef, {
    margin: '-150px',
    once: false,
  })

  useEffect(() => {
    if (!videoRef.current) return
    isInView ? videoRef.current.play() : videoRef.current.pause()
  }, [isInView])

  /* ---------------- MARQUEE CONTROL ---------------- */
  const marqueeControls = useAnimation()

  useEffect(() => {
    marqueeControls.start({
      x: ['0%', '-50%'],
      transition: {
        repeat: Infinity,
        duration: 30,
        ease: 'linear',
      },
    })
  }, [marqueeControls])

  const images = [
    '/slide1.jpeg',
    '/slide2.jpeg',
    '/slide3.jpeg',
    '/slide4.jpeg',
    '/slide5.jpeg',
    '/slide6.jpeg',
    '/slide7.jpeg',
    '/slide8.jpeg',
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center overflow-x-hidden text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="
        fixed top-0 w-full z-50
        bg-black/40 backdrop-blur-xl
        border-b border-white/10
      ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span
            onClick={() => scrollTo('hero')}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            className="cursor-pointer text-xl font-bold tracking-widest text-indigo-400"
          >
            BITWIX12.O
          </span>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <button onClick={() => scrollTo('hero')} className="hover:text-white">Home</button>
            <button onClick={() => scrollTo('video')} className="hover:text-white">Teaser</button>
            <button onClick={() => scrollTo('gallery')} className="hover:text-white">Gallery</button>
            <button onClick={() => scrollTo('team')} className="hover:text-white">Team</button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="hero" className="pt-52 pb-36 text-center relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="relative z-10">
          <p className="text-indigo-300 tracking-widest text-sm">
            CSE DEPARTMENT PRESENTS
          </p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            className="
              mt-6 text-7xl sm:text-8xl font-extrabold
              text-transparent bg-clip-text
              bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500
              drop-shadow-[0_0_30px_rgba(99,102,241,0.6)]
              tracking-widest
            "
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

      {/* ================= 🎥 VIDEO SECTION ================= */}
      <section id="video" ref={videoSectionRef} className="py-28 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="
            text-4xl font-bold
            text-transparent bg-clip-text
            bg-gradient-to-r from-indigo-400 to-cyan-400
          ">
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
          className="
            max-w-6xl mx-auto
            rounded-3xl overflow-hidden
            bg-black/40 backdrop-blur-xl
            ring-1 ring-white/10
            shadow-[0_0_60px_rgba(99,102,241,0.25)]
          "
        >
          <div className="aspect-video">
            <video
              ref={videoRef}
              src="/Finalrecording.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= 🖼 GALLERY ================= */}
      <section id="gallery" className="py-28 overflow-hidden relative">
        <motion.div
          className="flex gap-10 w-max px-10"
          animate={marqueeControls}
          onHoverStart={() => marqueeControls.stop()}
          onHoverEnd={() =>
            marqueeControls.start({
              x: ['0%', '-50%'],
              transition: { repeat: Infinity, duration: 30, ease: 'linear' },
            })
          }
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="
                h-56 w-96 flex-shrink-0 rounded-3xl overflow-hidden
                bg-white/10 backdrop-blur-lg
                ring-1 ring-white/10
                shadow-xl
              "
            >
              <img src={img} className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-gray-400 text-sm">
          Moments • Music • Memories — Hover to pause
        </p>
      </section>

      {/* ================= TEAM ================= */}
      <section id="team" className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
          <div>
            <h2 className="text-4xl font-bold">Organizing Team</h2>
            <p className="mt-4 text-gray-400">
              The force behind BITWIX12.O
            </p>
          </div>

          <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
            {people.map((p) => (
              <motion.li
                key={p.name}
                whileHover={{ scale: 1.07 }}
                className="flex items-center gap-6"
              >
                <img
                  src={p.imageUrl}
                  className="h-16 w-16 rounded-full ring-2 ring-indigo-400/40"
                />
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-indigo-400 text-sm">{p.role}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      {/* ================= FOOTER ================= */}
<footer className="
  relative mt-24
  bg-black/60 backdrop-blur-xl
  border-t border-white/10
">
  <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 items-center">

    {/* Branding */}
    <div>
      <h3
        style={{ fontFamily: 'Orbitron, sans-serif' }}
        className="
          text-2xl font-bold tracking-widest
          text-transparent bg-clip-text
          bg-gradient-to-r from-cyan-400 to-indigo-400
        "
      >
        BITWIX12.O
      </h3>
      <p className="mt-3 text-gray-400 text-sm">
        Freshers Party · CSE Department <br />
        Batch 2025–2029
      </p>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-5 justify-center">
      {/* Instagram */}
      <a
        href="https://instagram.com/bitwix12.0"
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-3 justify-center
          px-6 py-3 rounded-full
          bg-pink-600/20 text-pink-400
          ring-1 ring-pink-400/30
          hover:bg-pink-600/40 hover:text-white
          transition shadow-lg
        "
      >
        <FaInstagram className="text-xl" />
        Follow on Instagram
      </a>

      {/* Register */}
      <a
        href="https://forms.gle/your-registration-link"
        target="_blank"
        className="
          px-8 py-3 rounded-full
          bg-indigo-600/30 text-white font-semibold
          ring-1 ring-indigo-400/40
          hover:bg-indigo-600/60
          hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]
          transition
        "
      >
        Register Now
      </a>
    </div>

    {/* Credits */}
    <div className="text-center md:text-right text-gray-400 text-sm">
      <p>© 2026 Computer Science & Engineering</p>
      <p className="mt-1">Designed & Organized by CSE Students</p>
    </div>

  </div>

  {/* Bottom Glow Line */}
  <div className="
    absolute bottom-0 left-0 w-full h-[2px]
    bg-gradient-to-r from-transparent via-indigo-500 to-transparent
  " />
</footer>

    </div>
  )
}

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Event Lead',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256',
  },
  {
    name: 'Michael Foster',
    role: 'Technical Coordinator',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=256&h=256',
  },
]
