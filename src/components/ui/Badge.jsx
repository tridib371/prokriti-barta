import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Badge({ children, variant = 'accent', className = '' }) {
  const { n } = useLanguage();
  const variants = {
    accent: "bg-accent text-white border border-white/20 shadow-xs font-bold",
    discount: "bg-emerald-600 dark:bg-emerald-500 text-white border border-emerald-400/30 shadow-xs font-extrabold",
    new: "bg-accent text-white border border-white/20 shadow-xs font-bold",
    bestseller: "bg-primary text-white border border-white/20 shadow-xs font-bold",
    primary: "bg-primary text-white border border-white/20 shadow-md font-bold",
    neutral: "bg-primary/90 text-white border border-white/20 shadow-xs font-bold"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] leading-tight select-none backdrop-blur-xs ${variants[variant] || variants.accent} ${className}`}>
      {typeof children === 'string' || typeof children === 'number' ? n(children) : children}
    </span>
  );
}
