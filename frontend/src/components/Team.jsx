import React from 'react';
import './TeamCards.css'; 

const teams = [
  {
    title: "Contact and Management",
    members: [
      { name: "Piyush Singh", role: "Help Desk Support", badge: "Admin" },
      { name: "Nemish Nagaria", role: "Logistics Head", badge: "Logistics" },
    ],
  },
  {
    title: "Marketing Team",
    members: [
      { name: "Priyanshu Aishwar", role: "Insta Manager", badge: "Social" },
      { name: "Aditi Agrawal", role: "Promotions", badge: "Marketing" },
    ],
  },
  {
    title: "Anchoring Team",
    members: [
      { name: "Ashu", role: "Anchor", badge: "Stage" },
      { name: "Shruti Tiwari", role: "Anchor", badge: "Stage" },
    ],
  },
  {
    title: "Activity Team",
    members: [
      { name: "Rashi Rajoriya", role: "Coordinator", badge: "Events" },
      { name: "Piyush Gautam", role: "Logistics Head", badge: "Logistics" }
    ],
  },
  {
    title: "Registration Team",
    members: [
      { name: "Vansh Pratap Singh", role: "Head", badge: "Ops" },
      { name: "Kanika Jain", role: "Head", badge: "Ops" },
    ],
  },
  {
    title: "Website Team",
    members: [
      { name: "Sahil Jain", role: "Developer", badge: "Tech" },
      { name: "Tanishq Shivhare", role: "Developer", badge: "Tech" },
    ],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-[#050505] min-h-screen">
      <div className="max-w-[98%] mx-auto px-4 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold font-orbitron text-white tracking-widest">THE CREW</h2>
          <p className="mt-4 text-gray-400 uppercase tracking-[0.3em] text-xs">
            Architects of <span className="text-indigo-400">BITWIX12.O</span>
          </p>
        </div>

        {/* Outer Grid: This puts TWO different domains side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {teams.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-10 text-indigo-400 border-l-4 border-indigo-500 pl-4 font-orbitron uppercase tracking-wider">
                {group.title}
              </h3>

              {/* Inner Grid: The cards inside each domain */}
              <div className="flex flex-wrap gap-8 justify-start">
                {group.members.map((member) => (
                  <div key={member.name} className="card">
                    <div className="content">
                      
                      {/* BACK SIDE (Hover) */}
                      <div className="back">
                        <div className="back-content">
                          <svg stroke="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="40px" width="40px" fill="#ffffff">
                            <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z M 16.46875 9.09375L0.0625 48.625C-0.09375 48.996094 -0.00390625 49.433594 0.28125 49.71875C0.472656 49.910156 0.738281 50 1 50C1.128906 50 1.253906 49.988281 1.375 49.9375L40.90625 33.59375C40.523438 32.242188 40.222656 31.449219 40.21875 31.4375C39.351563 29.089844 36.816406 23.128906 31.875 18.1875C27.035156 13.34375 21.167969 10.804688 18.875 9.9375C18.84375 9.925781 17.8125 9.5 16.46875 9.09375 Z" />
                          </svg>
                          <strong className="text-center px-2 text-sm">{member.name}</strong>
                          <span className="text-[10px] text-orange-400 font-mono">BITWIX CREW</span>
                        </div>
                      </div>

                      {/* FRONT SIDE (Default) */}
                      <div className="front">
                        <div className="img">
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