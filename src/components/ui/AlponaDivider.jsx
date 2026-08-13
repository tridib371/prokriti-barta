import React from 'react';
import { motion } from 'framer-motion';
import { pathDraw } from '../../lib/motionVariants';

export default function AlponaDivider({ className = '', height = 36 }) {
  return (
    <div className={`w-full flex items-center justify-center my-6 overflow-hidden select-none text-primary/30 ${className}`}>
      <motion.svg
        width="100%"
        height={height}
        viewBox="0 0 1200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-6xl opacity-80"
      >
        {/* Horizontal hairline */}
        <line x1="0" y1="20" x2="480" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="720" y1="20" x2="1200" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

        {/* Central Bengali Alpona Swirl & Petal Motif */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Central Lotus Bud */}
          <motion.path
            variants={pathDraw}
            d="M600 8 C592 14, 592 26, 600 32 C608 26, 608 14, 600 8 Z"
          />
          {/* Inner Petal Flanks */}
          <motion.path
            variants={pathDraw}
            d="M600 20 C585 10, 570 20, 580 30 C590 35, 598 25, 600 20 Z"
          />
          <motion.path
            variants={pathDraw}
            d="M600 20 C615 10, 630 20, 620 30 C610 35, 602 25, 600 20 Z"
          />
          {/* Outer Alpona Swirls */}
          <motion.path
            variants={pathDraw}
            d="M570 20 C550 5, 530 25, 510 20 C495 16, 485 24, 480 20"
          />
          <motion.path
            variants={pathDraw}
            d="M630 20 C650 5, 670 25, 690 20 C705 16, 715 24, 720 20"
          />
          {/* Rice Grain Dots */}
          <circle cx="540" cy="14" r="2" fill="currentColor" stroke="none" />
          <circle cx="660" cy="14" r="2" fill="currentColor" stroke="none" />
          <circle cx="500" cy="24" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="700" cy="24" r="1.5" fill="currentColor" stroke="none" />
        </g>
      </motion.svg>
    </div>
  );
}
