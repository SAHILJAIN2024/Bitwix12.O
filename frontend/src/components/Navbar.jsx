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
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      {/* 1. We remove the max-width and use w-full to utilize every pixel */}
      <div className="w-full px-10 py-4 flex items-center relative pointer-events-auto">
        
        {/* 2. LOGO: Pushed to far left using margin-right: auto */}
        <div className="mr-auto">
          <span 
            onClick={() => scrollTo('hero')}
            className="cursor-pointer text-2xl font-bold tracking-[0.25em] text-indigo-400 font-orbitron hover:text-indigo-300 transition-all drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]"
          >
            BITWIX12.O
          </span>
        </div>

        {/* 3. BUTTONS: Pushed to far right using flex-end alignment */}
        <div className="flex justify-end items-center bg-transparent overflow-visible min-h-[80px]">
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