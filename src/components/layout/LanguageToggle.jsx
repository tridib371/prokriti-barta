import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
      className="group relative inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 focus:outline-none cursor-pointer shadow-xs"
      aria-label="Toggle language"
    >
      <Globe size={13} className="text-accent group-hover:rotate-45 transition-transform duration-300 shrink-0" />
      
      <div className="relative flex items-center text-[11px] font-bold tracking-wide select-none">
        {/* Bangla Option */}
        <span
          className={`relative z-10 px-2 py-0.5 rounded-full transition-colors duration-200 ${
            lang === 'bn' ? 'text-white font-bn-sans' : 'text-surface/70 hover:text-surface'
          }`}
        >
          {lang === 'bn' && (
            <motion.span
              layoutId="langBadge"
              className="absolute inset-0 bg-accent rounded-full shadow-2xs -z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          বাংলা
        </span>

        {/* English Option */}
        <span
          className={`relative z-10 px-2 py-0.5 rounded-full transition-colors duration-200 ${
            lang === 'en' ? 'text-white' : 'text-surface/70 hover:text-surface'
          }`}
        >
          {lang === 'en' && (
            <motion.span
              layoutId="langBadge"
              className="absolute inset-0 bg-accent rounded-full shadow-2xs -z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          ENG
        </span>
      </div>
    </button>
  );
}
