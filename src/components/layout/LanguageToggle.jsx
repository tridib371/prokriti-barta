import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-1 p-0.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md shadow-xs select-none"
      role="group"
      aria-label="Language Selector"
    >
      <div className="pl-2 pr-1 text-accent flex items-center justify-center">
        <Globe size={13} className="shrink-0" />
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => setLang('bn')}
          className={`relative px-3 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer ${
            lang === 'bn' ? 'text-white' : 'text-surface/80 hover:text-white'
          }`}
        >
          {lang === 'bn' && (
            <motion.span
              layoutId="activeLangPill"
              className="absolute inset-0 bg-accent rounded-full shadow-2xs z-0"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10 font-bn-sans tracking-wide">বাংলা</span>
        </button>

        <button
          type="button"
          onClick={() => setLang('en')}
          className={`relative px-3 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer ${
            lang === 'en' ? 'text-white' : 'text-surface/80 hover:text-white'
          }`}
        >
          {lang === 'en' && (
            <motion.span
              layoutId="activeLangPill"
              className="absolute inset-0 bg-accent rounded-full shadow-2xs z-0"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10 font-sans tracking-wide">ENG</span>
        </button>
      </div>
    </div>
  );
}
