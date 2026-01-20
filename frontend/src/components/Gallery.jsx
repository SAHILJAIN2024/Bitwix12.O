import React from 'react';
import DomeGallery from './DomeGallery';
import SplitText from './SplitText'; // Adjust path if needed

export default function Gallery({ images }) {
  const validImages = images?.filter(img => img && img.trim() !== '') || [];
  const domeItems = validImages.map((img) => ({
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
      </div>
    </section>
  );
}