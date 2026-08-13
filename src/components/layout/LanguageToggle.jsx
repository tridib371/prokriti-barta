import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      title={lang === 'bn' ? 'Switch to English' : 'বাংলায় যান'}
      className="relative h-7 w-[64px] rounded-full border border-white/30 bg-black/20 backdrop-blur-xs flex items-center px-0.5 transition-all hover:border-accent focus:outline-none cursor-pointer"
      aria-label="Toggle language"
    >
      {/* sliding pill */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute h-5 w-7 rounded-full bg-accent shadow-xs"
        style={{ left: lang === 'bn' ? 2 : 34 }}
      />

      {/* labels */}
      <span
        className={`relative z-10 w-7 text-center text-[10px] font-bold transition-colors duration-200 select-none ${
          lang === 'bn' ? 'text-white' : 'text-white/70'
        }`}
      >
        বাং
      </span>
      <span
        className={`relative z-10 w-7 text-center text-[10px] font-bold transition-colors duration-200 select-none ${
          lang === 'en' ? 'text-white' : 'text-white/70'
        }`}
      >
        EN
      </span>
    </button>
  );
}
