import React from 'react';
import GooeyNav from './GooeyNav';

export default function Navbar({ scrollTo }) {
  const navItems = [
    { label: "Home", onClick: () => scrollTo('hero'), href: "#" },
    { label: "Teaser", onClick: () => scrollTo('video'), href: "#" },
    { label: "Gallery", onClick: () => scrollTo('gallery'), href: "#" },
    { label: "Team", onClick: () => scrollTo('team'), href: "#" },
  ];

  return (
    /* IMPORTANT: Added pointer-events-none to the nav container 
       and pointer-events-auto to the children. This ensures the 
       invisible parts of the navbar don't block you from clicking 
       the Hero section or Video.
    */
    <nav className="fixed top-0 w-full z-[100] pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center pointer-events-auto">
        <span 
          onClick={() => scrollTo('hero')}
          className="cursor-pointer text-xl font-bold tracking-widest text-indigo-400 font-orbitron"
        >
          BITWIX12.O
        </span>

        <div className="min-h-[100px] flex items-center bg-transparent overflow-visible">
          <GooeyNav 
            items={navItems} 
            particleCount={15}
            particleDistances={[80, 10]}
          />
        </div>
      </div>
    </nav>
  );
}