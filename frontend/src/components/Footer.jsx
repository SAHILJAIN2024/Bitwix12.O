import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-black/60 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 items-center">
        <div>
          <h3 className="font-orbitron text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            BITWIX12.O
          </h3>
          <p className="mt-3 text-gray-400 text-sm">
            Freshers Party · CSE Department <br /> Batch 2025–2029
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="https://instagram.com/bitwix12.0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 justify-center px-6 py-3 rounded-full bg-pink-600/20 text-pink-400 ring-1 ring-pink-400/30 hover:bg-pink-600/40 hover:text-white transition shadow-lg"
          >
            <FaInstagram className="text-xl" />
            Follow on Instagram
          </a>

          <a
            href="https://forms.gle/your-registration-link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-indigo-600/30 text-white font-semibold ring-1 ring-indigo-400/40 hover:bg-indigo-600/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition text-center"
          >
            Register Now
          </a>
        </div>

        <div className="text-center md:text-right text-gray-400 text-sm">
          <p>© 2026 Computer Science & Engineering</p>
          <p className="mt-1">Designed & Organized by CSE Students</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </footer>
  );
}