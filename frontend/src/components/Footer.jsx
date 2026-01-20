import { FaInstagram } from 'react-icons/fa';
import SplitText from "./SplitText";

export default function Footer() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <footer className="relative mt-24 bg-black/60 backdrop-blur-xl border-t border-white/10 overflow-hidden">
      {/* Change: max-w-[98%] pushes content to the edges.
         Change: w-full ensures it takes up the whole horizontal space.
      */}
      <div className="w-full max-w-[98%] mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 items-center">
        
        {/* LEFT MOST: Brand Title */}
        <div className="flex flex-col items-start justify-self-start">
          <SplitText
            text="BITWIXT12.0"
            className="font-orbitron text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="mt-3 text-gray-400 text-sm">
            Freshers Party · CSE Department <br /> 
            Batch 2025–2029
          </p>
        </div>

        {/* CENTER: Social/Action Tiles */}
        <div className="flex flex-row items-center gap-6 justify-center">
          {/* Instagram Tile */}
          <a 
            href="https://www.instagram.com/bitwixt12.0/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex flex-col items-center justify-center w-[85px] h-[85px] rounded-xl border-2 border-white/10 bg-white/5 hover:border-[#cc39a4] hover:bg-[#cc39a4]/10 hover:shadow-[0_0_20px_rgba(204,57,164,0.3)] transition-all duration-300"
          >
            <svg className="w-7 h-7 fill-gray-400 group-hover:fill-[#cc39a4] transition-colors" viewBox="0 0 256 256">
              <g transform="scale(8,8)">
                <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" />
              </g>
            </svg>
            <span className="text-[10px] mt-1 font-bold text-gray-400 group-hover:text-[#cc39a4] uppercase tracking-tighter transition-colors">Instagram</span>
          </a>

         
        </div>

        {/* RIGHT MOST: Credits */}
        <div className="flex flex-col items-end justify-self-end text-right text-gray-400 text-sm">
          <p>© 2025 Computer Science & Engineering</p>
          <p className="mt-1">Designed & Organized by CSE Students</p>
        </div>
      </div>
      
      {/* Decorative Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
    </footer>
  );
}