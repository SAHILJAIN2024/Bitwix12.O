import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';

export default function Navbar({ scrollTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Determine active index based on route
  const getActiveIndex = () => {
    if (location.pathname === '/seniors') return 3;
    // On home page, we don't have a simple way to know the scroll position here, 
    // but we can default to 0. Scroll-based active state would require an IntersectionObserver.
    return 0; 
  };

  const handleNavClick = (id, path) => {
    if (path === '/seniors') {
      if (location.pathname !== '/seniors') {
        navigate('/seniors');
      }
    } else if (isHome) {
      if (id === 'hero' && window.scrollY < 100) return; // Already at top
      scrollTo(id);
    } else {
      // If we are not on home, go home first
      navigate('/');
      // Use a more robust check for the element
      const scrollWhenReady = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If not found yet (Vite/React delay), try once more
          setTimeout(() => {
            const secondAttempt = document.getElementById(id);
            if (secondAttempt) secondAttempt.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      };
      // Give it a tick to let the LandingPage render
      setTimeout(scrollWhenReady, 50);
    }
  };

  const navItems = [
    { label: "Home", onClick: () => handleNavClick('hero', '/'), href: "#" },
    { label: "Teaser", onClick: () => handleNavClick('video', '/'), href: "#" },
    { label: "Gallery", onClick: () => handleNavClick('gallery', '/'), href: "#" },
    { label: "Seniors", onClick: () => handleNavClick('seniors', '/seniors'), href: "#" },
    { label: "Team", onClick: () => handleNavClick('team', '/'), href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="w-full px-10 py-4 flex items-center relative pointer-events-auto">
        <div className="mr-auto">
          <span 
            onClick={() => handleNavClick('hero', '/')}
            className="cursor-pointer text-2xl font-bold tracking-[0.25em] text-indigo-400 font-orbitron hover:text-indigo-300 transition-all drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]"
          >
            BITWIXT12.0
          </span>
        </div>

        <div className="flex justify-end items-center bg-transparent overflow-visible min-h-[80px]">
          <GooeyNav 
            items={navItems} 
            particleCount={15}
            particleDistances={[80, 10]}
            initialActiveIndex={getActiveIndex()}
            key={location.pathname} // Force remount to sync active index on page change
          />
        </div>
      </div>
    </nav>
  );
}