import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-md shadow-xs select-none"
      role="group"
      aria-label="Language Selector"
    >
      <Globe size={13} className="text-accent shrink-0 ml-1.5" />

      <div className="relative flex items-center bg-black/20 p-0.5 rounded-full border border-white/10 overflow-hidden">
        {/* Hardware-accelerated sliding orange pill with zero flicker */}
        <div
          className={`absolute top-0.5 bottom-0.5 left-0.5 w-[50px] bg-accent rounded-full shadow-xs transition-transform duration-200 ease-out pointer-events-none ${
            lang === 'bn' ? 'translate-x-0' : 'translate-x-[50px]'
          }`}
        />

        <button
          type="button"
          onClick={() => setLang('bn')}
          className={`relative z-10 w-[50px] py-1 text-xs font-bold text-center rounded-full transition-colors duration-150 cursor-pointer font-bn-sans ${
            lang === 'bn' ? 'text-white font-bold' : 'text-surface/80 hover:text-white'
          }`}
          aria-pressed={lang === 'bn'}
        >
          বাংলা
        </button>

        <button
          type="button"
          onClick={() => setLang('en')}
          className={`relative z-10 w-[50px] py-1 text-xs font-bold text-center rounded-full transition-colors duration-150 cursor-pointer font-sans ${
            lang === 'en' ? 'text-white font-bold' : 'text-surface/80 hover:text-white'
          }`}
          aria-pressed={lang === 'en'}
        >
          ENG
        </button>
      </div>
    </div>
  );
}
