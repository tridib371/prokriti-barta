import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      title={lang === 'bn' ? 'Switch to English' : 'বাংলায় যান'}
      className="relative h-8 w-[68px] rounded-full border border-line bg-bg flex items-center px-1 transition-colors hover:border-accent focus:outline-none"
      aria-label="Toggle language"
    >
      {/* sliding pill */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute h-6 w-7 rounded-full bg-primary shadow-xs"
        style={{ left: lang === 'bn' ? 2 : 38 }}
      />

      {/* labels */}
      <span
        className={`relative z-10 w-7 text-center text-[11px] font-bold transition-colors duration-200 select-none ${
          lang === 'bn' ? 'text-surface' : 'text-muted'
        }`}
      >
        বাং
      </span>
      <span
        className={`relative z-10 w-7 text-center text-[11px] font-bold transition-colors duration-200 select-none ${
          lang === 'en' ? 'text-surface' : 'text-muted'
        }`}
      >
        EN
      </span>
    </button>
  );
}
