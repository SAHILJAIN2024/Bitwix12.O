import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Seniors.css';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQn2YIA0glrxL8RuapMSz6LuiybAzqNA3QQjUWuxxigkLi09MGOb1bdt8Y46yhy4e6XoKoyyaperqc7/pub?gid=91126344&single=true&output=csv";

const convertDriveLink = (url) => {
  if (!url) return "";
  const id = url.match(/id=([^&]+)/)?.[1] || url.match(/\/d\/([^/]+)/)?.[1];
  // Using wsrv.nl (WordPress Image Service) as a proxy to bypass Google's direct link restrictions
  // This is a highly reliable way to serve Drive images on a public website.
  return id ? `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&output=webp&q=80` : url;
};

// Simple CSV parser that handles quoted strings with newlines
const parseCSV = (text) => {
  const rows = [];
  let currentRow = [];
  let currentToken = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentToken += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentToken += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentToken.trim());
        currentToken = "";
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentToken.trim());
        rows.push(currentRow);
        currentRow = [];
        currentToken = "";
        if (char === '\r') i++;
      } else {
        currentToken += char;
      }
    }
  }
  if (currentToken || currentRow.length > 0) {
    currentRow.push(currentToken.trim());
    rows.push(currentRow);
  }
  return rows;
};

export default function Seniors() {
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Implement 30-minute bucketed cache-busting
    // This ensures the data is refreshed at least every 30 minutes
    const cacheBucket = Math.floor(Date.now() / (30 * 60 * 1000));
    const urlWithCacheBuster = `${CSV_URL}&t=${cacheBucket}`;

    fetch(urlWithCacheBuster)
      .then(res => res.text())
      .then(text => {
        const rows = parseCSV(text);
        // Skip header
        const data = rows.slice(1).map(row => ({
          timestamp: row[0],
          name: row[1],
          image: convertDriveLink(row[2]),
          description: row[3]
        })).filter(s => s.name); // Filter empty rows
        setSeniors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching seniors data:", err);
        setLoading(false);
      });
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
          MEET SENIORS
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The brilliant minds that have shaped the legacy of BITWIXT12.0. Learning, growing, and leading together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {seniors.map((senior, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500"
          >
            {/* Image Container with Auto-Fix (Object Cover & Top-Center for faces) */}
            <div className="aspect-[3/4] overflow-hidden relative bg-white/5">
              <img 
                src={senior.image} 
                alt={senior.name}
                className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-1000 ease-out"
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
              {/* Subtle Overlay for better text contrast/premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="p-6 relative">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {senior.name}
              </h3>
              <div className="w-12 h-1 bg-indigo-500/50 mb-4 rounded-full group-hover:w-full transition-all duration-500"></div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500 italic">
                "{senior.description}"
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
