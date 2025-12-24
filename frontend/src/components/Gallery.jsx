import React from 'react';
import DomeGallery from './DomeGallery';

export default function Gallery({ images }) {
  const validImages = images?.filter(img => img && img.trim() !== "") || [];
  const domeItems = validImages.map((img) => ({
    image: img,
    src: img,
    alt: "Archive Visual"
  }));

  return (
    <section 
      id="gallery" 
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic Deep Fades */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

      <div className="w-full h-full relative z-10">
        {domeItems.length > 0 ? (
          <DomeGallery 
            images={domeItems} 
            /* --- MASSIVE IMAGE SETTINGS --- */
            fit={4.5}              // This makes the images much larger
            minRadius={500}        // Pushes the sphere back so large images don't overlap too much
            fitBasis="height"      // Ensures the height is the master dimension for aspect ratio
            grayscale={false}      
            
            /* --- FULL SCREEN EXPANDED VIEW --- */
            openedImageWidth="auto"      
            openedImageHeight="95vh"     // Fills almost the entire screen when clicked
            imageBorderRadius="8px"      // Slightly more rounded for a premium feel
            openedImageBorderRadius="0px" 
            
            /* --- INTERACTION --- */
            dragSensitivity={1.2}        // Slower movement feels "heavier" and more premium
            enlargeTransitionMs={600}    
          />
        ) : (
          <div className="flex items-center justify-center h-full text-indigo-500 font-orbitron animate-pulse">
            UPLOADING ASSETS...
          </div>
        )}
      </div>
    </section>
  );
}