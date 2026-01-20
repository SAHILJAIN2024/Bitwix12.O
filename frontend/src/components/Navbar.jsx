import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GooeyNav from './GooeyNav';

export default function Navbar({ scrollTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine active index based on route
  const getActiveIndex = () => {
    if (location.pathname === '/seniors') return 3;
    return 0; 
  };

  const handleNavClick = (id, path) => {
    setIsMobileMenuOpen(false); // Close mobile menu on click
    
    // Add a tiny delay to let the menu begin closing before scrolling
    setTimeout(() => {
      if (path === '/seniors') {
        if (location.pathname !== '/seniors') {
          navigate('/seniors');
        }
      } else if (isHome) {
        if (id === 'hero' && window.scrollY < 100) return;
        scrollTo(id);
      } else {
        navigate('/');
        const scrollWhenReady = () => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            setTimeout(() => {
              const secondAttempt = document.getElementById(id);
              if (secondAttempt) secondAttempt.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        };
        setTimeout(scrollWhenReady, 100);
      }
    }, 10);
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
      <div className="w-full px-6 md:px-10 py-4 flex items-center relative pointer-events-auto">
        <div className="mr-auto">
          <span 
            onClick={() => handleNavClick('hero', '/')}
            className="cursor-pointer text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.25em] text-indigo-400 font-orbitron hover:text-indigo-300 transition-all drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]"
          >
            BITWIXT12.0
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex justify-end items-center bg-transparent overflow-visible min-h-[80px]">
          <GooeyNav 
            items={navItems} 
            particleCount={15}
            particleDistances={[80, 10]}
            initialActiveIndex={getActiveIndex()}
            key={location.pathname}
          />
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-indigo-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 pointer-events-auto overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="text-left text-lg font-orbitron tracking-widest text-white hover:text-indigo-400 transition-colors py-2 border-b border-white/5 last:border-0"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}