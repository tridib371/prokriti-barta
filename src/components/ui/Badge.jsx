import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Badge({ children, variant = 'accent', className = '' }) {
  const { n } = useLanguage();
  const variants = {
    accent: "bg-primary text-white border border-white/20 shadow-md font-bold",
    discount: "bg-primary text-white border border-white/20 shadow-md font-extrabold",
    primary: "bg-primary text-white border border-white/20 shadow-md font-bold",
    neutral: "bg-primary/90 text-white border border-white/20 shadow-xs font-bold"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] leading-tight select-none backdrop-blur-xs ${variants[variant]} ${className}`}>
      {typeof children === 'string' || typeof children === 'number' ? n(children) : children}
    </span>
  );
}
