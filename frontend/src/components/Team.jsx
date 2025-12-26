import React from 'react';
import './TeamCards.css'; 

const teams = [
  {
    title: "Contact and Management",
    members: [
      { name: "Piyush Singh", role: "Help Desk Support", badge: "Admin", img: "/team/1.jpeg" },
      { name: "Nemish Nagaria", role: "Logistics Head", badge: "Logistics", img: "/team/2.jpeg" },
    ],
  },
  {
    title: "Marketing Team",
    members: [
      { name: "Priyanshu Aishwar", role: "Insta Manager", badge: "Social", img: "/team/3.jpeg" },
      { name: "Aditi Agrawal", role: "Promotions", badge: "Marketing", img: "/team/1.jpeg" },
    ],
  },
  {
    title: "Anchoring Team",
    members: [
      { name: "Ashu", role: "Anchor", badge: "Stage", img: "/team/2.jpeg" },
      { name: "Shruti Tiwari", role: "Anchor", badge: "Stage", img: "/team/3.jpeg" },
    ],
  },
  {
    title: "Website Team",
    members: [
      { name: "Sahil Jain", role: "Developer", badge: "Tech", img: "/team/1.jpeg" },
      { name: "Tanishq Shivhare", role: "Developer", badge: "Tech", img: "/team/2.jpeg" },
    ],
  },
];

export default function Team() {
  return (
    /* Changed bg-[#050505] to bg-transparent to show Particles */
    <section id="team" className="py-24 bg-transparent min-h-screen relative z-10">
      <div className="max-w-[98%] mx-auto px-4 md:px-12">
        
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold font-orbitron text-white tracking-widest">THE CREW</h2>
          <p className="mt-4 text-gray-400 uppercase tracking-[0.3em] text-xs">
            Architects of <span className="text-indigo-400">BITWIX12.O</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {teams.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-10 text-indigo-400 border-l-4 border-indigo-500 pl-4 font-orbitron uppercase tracking-wider">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-8 justify-start">
                {group.members.map((member) => (
                  <div key={member.name} className="card">
                    <div className="content">
                      
                      {/* BACK SIDE (Hover) */}
                      <div className="back">
                        <div className="back-content">
                          <img 
                            src={member.img} 
                            alt="" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 mb-2" 
                          />
                          <strong className="text-center px-2 text-sm">{member.name}</strong>
                          <span className="text-[10px] text-orange-400 font-mono">BITWIX CREW</span>
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
                          <small className="badge">{member.badge}</small>
                          <div className="description">
                            <div className="title">
                              <p className="text-white"><strong>{member.name}</strong></p>
                              <svg height="12px" width="12px" viewBox="0 0 256 256"><path fill="#ff9966" d="M25,27l-9,-6.75l-9,6.75v-23h18z" /></svg>
                            </div>
                            <p className="card-footer">{member.role}</p>
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
    </section>
  );
}