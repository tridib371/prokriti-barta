import React from 'react';
import { motion } from 'framer-motion';

export default function AlponaLoader({ text = "প্রসেসিং করা হচ্ছে...", size = "md" }) {
  const dimensions = size === "sm" ? 40 : size === "lg" ? 80 : 60;

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <motion.svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="text-accent"
      >
        {/* Outer Alpona Ring */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />

        {/* Pulsing Petals */}
        <motion.path
          d="M50 10 C35 30, 35 70, 50 90 C65 70, 65 30, 50 10 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M10 50 C30 35, 70 35, 90 50 C70 65, 30 65, 10 50 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          animate={{ scale: [1.05, 0.95, 1.05] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        
        {/* Center Seed Dot */}
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </motion.svg>
      {text && (
        <p className="text-sm font-medium text-muted tracking-wide font-bn-sans animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
