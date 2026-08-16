import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
      className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 focus:outline-none cursor-pointer shadow-xs select-none overflow-hidden"
      aria-label="Toggle language"
    >
      <Globe size={13} className="text-accent group-hover:rotate-45 transition-transform duration-300 shrink-0 relative z-10" />

      <div className="relative flex items-center text-[11px] font-bold">
        {/* Animated Active Pill Indicator */}
        <motion.span
          initial={false}
          animate={{
            x: lang === 'bn' ? 0 : 38,
            width: lang === 'bn' ? 38 : 34
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className="absolute inset-y-0 left-0 bg-accent rounded-full shadow-2xs"
        />

        {/* Labels */}
        <span
          className={`relative z-10 px-2 py-0.5 text-center transition-colors duration-200 ${
            lang === 'bn' ? 'text-white font-bn-sans' : 'text-surface/80 hover:text-white'
          }`}
        >
          বাংলা
        </span>
        <span
          className={`relative z-10 px-1.5 py-0.5 text-center transition-colors duration-200 ${
            lang === 'en' ? 'text-white' : 'text-surface/80 hover:text-white'
          }`}
        >
          ENG
        </span>
      </div>
    </button>
  );
}
