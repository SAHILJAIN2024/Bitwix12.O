import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TeamCards.css'; 

const teams = [
  {
    title: "Finance and Management",
    members: [
      { name: "Piyush Singh", role: "Help Desk Support", badge: "Admin", img: "/team/fm1.jpg" },
      { name: "Nemish Nagaria", role: "Logistics Head", badge: "Logistics", img: "/team/fm1.JPG" },
    ],
  },
  {
    title: "Marketing Team",
    members: [
      { name: "Priyanshu Aishwar", role: "Insta Manager", badge: "Social", img: "/team/mt1.jpeg" },
      { name: "Aditi Agrawal", role: "Promotions", badge: "Marketing", img: "/team/mt2.jpg" },
    ],
  },
  {
    title: "Anchoring Team",
    members: [
      { name: "Rashi", role: "Anchor", badge: "Stage", img: "/team/at.jpg" },
      { name: "Shruti Tiwari", role: "Anchor", badge: "Stage", img: "/team/at2.png" },
    ],
  },
  {
    title: "Developers",
    members: [
      { name: "Sahil Jain", role: "Developer", badge: "Tech", img: "/team/1.jpeg" },
      { name: "Tanish Shivhare", role: "Developer", badge: "Tech", img: "/team/dev1.png" },
    ],
  },
];

export default function Team() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (name) => {
    setActiveCard(activeCard === name ? null : name);
  };

  return (
    /* Changed bg-[#050505] to bg-transparent to show Particles */
    <motion.section 
      id="team" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="py-24 bg-transparent min-h-screen relative z-10"
    >
      <div className="max-w-[98%] mx-auto px-4 md:px-12">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white tracking-widest">THE CREW</h2>
          <p className="mt-4 text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs">
            Architects of <span className="text-indigo-400">BITWIXT12.0</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {teams.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold mb-10 text-indigo-400 border-l-4 border-indigo-500 pl-4 font-orbitron uppercase tracking-wider">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {group.members.map((member) => (
                  <div 
                    key={member.name} 
                    className={`card glass-card ${activeCard === member.name ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(member.name)}
                  >
                    <div className="content">
                      
                      {/* BACK SIDE (Hover/Active) */}
                      <div className="back">
                        <div className="back-content">
                          <img 
                            src={member.img} 
                            alt="" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 mb-2" 
                          />
                          <strong className="text-center px-2 text-base">{member.name}</strong>
                          <span className="text-[10px] text-orange-400 font-mono text-center">BITWIX CREW <br/><span className="text-[8px] opacity-60"></span></span>
                        </div>
                      </div>

                      {/* FRONT SIDE (Default) */}
                      <div className="front">
                        <div className="img">
                          {/* Image background with low opacity to keep blur circles visible */}
                          <img src={member.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
                          <div className="circle" />
                          <div className="circle" id="right" />
                          <div className="circle" id="bottom" />
                        </div>
                        <div className="front-content">
                          <small className="badge text-[10px] md:text-xs">{member.badge}</small>
                          <div className="description">
                            <div className="title">
                              <p className="text-white text-base md:text-lg"><strong>{member.name}</strong></p>
                              <svg height="12px" width="12px" viewBox="0 0 256 256"><path fill="#ff9966" d="M25,27l-9,-6.75l-9,6.75v-23h18z" /></svg>
                            </div>
                            <p className="card-footer text-[10px] md:text-sm">{member.role}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}