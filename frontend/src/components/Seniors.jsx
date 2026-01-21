import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Quote } from 'lucide-react';
import './Seniors.css';
import { convertDriveLink, parseCSV } from '../utils/googleDrive';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQn2YIA0glrxL8RuapMSz6LuiybAzqNA3QQjUWuxxigkLi09MGOb1bdt8Y46yhy4e6XoKoyyaperqc7/pub?gid=91126344&single=true&output=csv";

const CREW_MEMBERS = [
  "Piyush Singh", "Nemish Nagaria", "Priyanshu Aishwar", 
  "Aditi agrawal", "Rashi Rajoriya", "Shruti Tiwari", 
  "Sahil Jain", "TANISH SHIVHARE"
];

export default function Seniors() {
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSenior, setSelectedSenior] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const cacheBucket = Math.floor(Date.now() / (30 * 60 * 1000));
      const urlWithCacheBuster = `${CSV_URL}&t=${cacheBucket}`;

      fetch(urlWithCacheBuster)
        .then(res => res.text())
        .then(text => {
          const rows = parseCSV(text);
          const data = rows.slice(1).map(row => ({
            timestamp: row[0],
            name: row[1],
            image: convertDriveLink(row[2]),
            description: row[3]
          })).filter(s => s.name);
          setSeniors(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching seniors data:", err);
          setLoading(false);
        });
    };

    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[98%] mx-auto px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
          KNOW YOUR SENIORS
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The brilliant minds that have shaped the legacy of BITWIXT12.0. Learning, growing, and leading together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {seniors.map((senior, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedSenior(senior)}
            className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden relative bg-white/5">
              <img 
                src={senior.image} 
                alt={senior.name}
                className="w-full h-full object-cover object-[50%_20%] group-hover:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
                onError={(e) => {
                   if (!e.target.dataset.triedThumbnail) {
                     e.target.dataset.triedThumbnail = "true";
                     const id = senior.image.match(/id=([^&]+)/)?.[1];
                     if (id) {
                       e.target.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
                       return;
                     }
                   }
                   e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(senior.name)}&background=4f46e5&color=fff&size=512`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* "Read Full Story" Badge */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
                <span className="bg-indigo-500/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest py-1 px-3 rounded-full border border-white/20">
                   FULL STORY
                </span>
              </div>
            </div>

            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {senior.name}
              </h3>
              <div className="w-12 h-1 bg-indigo-500/50 mb-4 rounded-full group-hover:w-full transition-all duration-500"></div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 italic">
                "{senior.description}"
              </p>
            </div>

            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedSenior && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSenior(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
            />
            
            <motion.div
              layoutId={`senior-${selectedSenior.name}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Image Section */}
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedSenior.image} 
                  alt={selectedSenior.name}
                  className="w-full h-full object-cover object-[50%_20%]"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedSenior.name)}&background=4f46e5&color=fff&size=512`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black opacity-60"></div>
              </div>

              {/* Info Section */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-start overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedSenior(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-50"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2 text-indigo-400 mb-4">
                   <User className="w-5 h-5" />
                   <span className="uppercase tracking-[0.3em] text-xs font-bold">SENIOR PROFILE</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white mb-6 leading-tight">
                  {selectedSenior.name}
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-8 rounded-full"></div>

                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 w-12 h-12 text-indigo-500/20 rotate-180" />
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic relative z-10">
                    "{selectedSenior.description}"
                  </p>
                </div>

                <div className="mt-auto pt-10 flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 py-2 px-4 rounded-lg border border-white/10">
                      <Calendar className="w-4 h-4" />
                      <span>BATCH 2024–2028</span>
                   </div>
                   {CREW_MEMBERS.includes(selectedSenior.name) && (
                     <div className="flex items-center gap-2 text-gray-400 text-sm bg-indigo-500/10 py-2 px-4 rounded-lg border border-indigo-500/20">
                        <span className="text-indigo-400 font-bold tracking-widest uppercase">BITWIX CREW</span>
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
