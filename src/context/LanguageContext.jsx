/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function convertDigits(val, lang) {
  if (val === null || val === undefined) return '';
  if (typeof val !== 'string' && typeof val !== 'number') return val;
  const str = String(val);
  if (lang === 'bn') {
    return str.replace(/\d/g, (digit) => banglaDigits[digit]);
  }
  return str;
}

export function LanguageProvider({ children }) {
  // Default: Bangla
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('pb-lang');
      return (saved === 'bn' || saved === 'en') ? saved : 'bn';
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

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'bn' || newLang === 'en') {
      setLang(newLang);
      try { localStorage.setItem('pb-lang', newLang); } catch {}
    }
  }, []);

  /** Translate a key. Auto-converts embedded digits if lang === 'bn'. */
  const t = useCallback((key) => {
    if (typeof key !== 'string') return key;
    const entry = translations[key];
    if (!entry) return convertDigits(key, lang);
    const text = entry[lang] ?? entry['bn'] ?? key;
    return convertDigits(text, lang);
  }, [lang]);

  /** Format number or convert digits to Bangla if lang === 'bn'. */
  const n = useCallback((num) => {
    return convertDigits(num, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang: setLanguage, t, n }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
