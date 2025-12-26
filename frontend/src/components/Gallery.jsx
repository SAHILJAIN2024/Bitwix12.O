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
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Cinematic Deep Fades */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

      {/* --- NEW HEADING SECTION --- */}
      <div className="absolute top-12 left-0 w-full z-30 pointer-events-none text-center">
        <h1 className="font-orbitron text-5xl md:text-6xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500/50 opacity-80 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          GALLERY
        </h1>
        <div className="mt-2 h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      </div>

      <div className="w-full h-full relative z-10">
        {domeItems.length > 0 ? (
          <DomeGallery 
            images={domeItems} 
            /* --- MASSIVE IMAGE SETTINGS --- */
            fit={4.5}              
            minRadius={500}        
            fitBasis="height"      
            grayscale={false}      
            
            /* --- FULL SCREEN EXPANDED VIEW --- */
            openedImageWidth="auto"      
            openedImageHeight="95vh"     
            imageBorderRadius="8px"      
            openedImageBorderRadius="0px" 
            
            /* --- INTERACTION --- */
            dragSensitivity={1.2}        
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