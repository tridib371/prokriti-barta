import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Default: Bangla
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('pb-lang') || 'bn';
    } catch {
      return 'bn';
    }
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'bn' ? 'en' : 'bn';
      try { localStorage.setItem('pb-lang', next); } catch {}
      return next;
    });
  }, []);

  /** Translate a key. Falls back to the key itself if missing. */
  const t = useCallback((key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry['bn'] ?? key;
  }, [lang]);

  /** Format number / convert digits to Bangla if lang === 'bn' */
  const n = useCallback((num) => {
    if (num === null || num === undefined) return '';
    if (lang === 'bn') {
      const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).replace(/\d/g, (digit) => banglaDigits[digit]);
    }
    return String(num);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, n }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
