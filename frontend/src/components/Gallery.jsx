import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DomeGallery from './DomeGallery';
import SplitText from './SplitText'; 
import { convertDriveLink, parseCSV } from '../utils/googleDrive';

const GALLERY_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQn2YIA0glrxL8RuapMSz6LuiybAzqNA3QQjUWuxxigkLi09MGOb1bdt8Y46yhy4e6XoKoyyaperqc7/pub?gid=2047514801&single=true&output=csv";

const MOCK_IMAGES = [
  '/images/slide1.jpeg', '/images/slide2.jpeg', '/images/slide3.jpeg', '/images/slide4.jpeg',
  '/images/slide5.jpeg', '/images/slide6.jpeg', '/images/slide7.jpeg', '/images/slide8.jpeg',
  '/images/slide9.jpeg', '/images/slide10.jpeg', '/images/slide11.jpeg', '/images/slide12.jpeg'
];

export default function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = () => {
      const cacheBucket = Math.floor(Date.now() / (30 * 60 * 1000));
      const urlWithCacheBuster = `${GALLERY_CSV_URL}&t=${cacheBucket}`;

      fetch(urlWithCacheBuster)
        .then(res => res.text())
        .then(text => {
          const rows = parseCSV(text);
          const data = rows.slice(1).map(row => convertDriveLink(row[1])).filter(src => src);
          if (data.length > 0) {
            setImages(data);
          } else if (images.length === 0) {
            setImages(MOCK_IMAGES);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching gallery images:", err);
          if (images.length === 0) setImages(MOCK_IMAGES);
          setLoading(false);
        });
    };

    fetchImages();
    // Refresh every 5 minutes
    const interval = setInterval(fetchImages, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [images.length]);

  const domeItems = images.map((img) => ({
    image: img,
    src: img,
    alt: 'Archive Visual',
  }));

  return (
    <section
      id="gallery"
      className="relative w-full bg-[#050505] flex flex-col items-center"
    >
      {/* 1. ANIMATED HEADING SECTION */}
      <div className="w-full pt-20 pb-10 md:pt-32 md:pb-20 text-center z-30">
        {/* Use SplitText to animate the "GALLERY" heading */}
        <SplitText
          text="GALLERY"
          className="font-orbitron text-5xl md:text-7xl font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500/50 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={() => {
            console.log('All letters of "GALLERY" have animated!');
          }}
        />
        {/* Optional: Add a divider */}
        <div className="mt-4 h-[1px] w-48 mx-auto bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />
      </div>

      {/* 2. DOME GALLERY SECTION */}
      <div className="relative w-full min-h-[50vh] h-[60vh] md:h-screen overflow-hidden">
        {/* Cinematic Fades */}
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

        <div className="w-full h-full relative z-10">
          {domeItems.length > 0 ? (
          <DomeGallery
  images={domeItems}
  fit={4.5}
  minRadius={500}
  fitBasis="height"
  grayscale={false}
  openedImageWidth="auto"
  openedImageHeight="85vh"  // Reduced from 95vh to 85vh
  imageBorderRadius="8px"
  openedImageBorderRadius="0px"
  dragSensitivity={1.2}
  enlargeTransitionMs={600}
/>
          ) : (
            <div className="flex items-center justify-center h-full text-indigo-500 font-orbitron animate-pulse">
              UPLOADING ASSETS...
            </div>
          )}
        </div>

        {/* 3. EXPLORE MORE CALL-TO-ACTION */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center z-30 px-6">
          <button 
            onClick={() => navigate('/gallery-archive')}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500 overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center gap-4">
              <span className="font-orbitron text-xs md:text-sm font-bold tracking-[0.3em] text-white uppercase">
                Explore Full Archive
              </span>
              <div className="w-8 h-[1px] bg-indigo-400 group-hover:w-12 transition-all duration-500" />
              <svg 
                className="w-4 h-4 text-indigo-400 group-hover:translate-x-2 transition-transform duration-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}