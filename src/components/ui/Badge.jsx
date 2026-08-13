import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Badge({ children, variant = 'accent', className = '' }) {
  const { n } = useLanguage();
  const variants = {
    accent: "bg-accent/15 text-accent border border-accent/20",
    discount: "bg-accent-2/15 text-accent-2 border border-accent-2/30 font-semibold",
    primary: "bg-primary/10 text-primary border border-primary/20",
    neutral: "bg-surface text-muted border border-line"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {typeof children === 'string' || typeof children === 'number' ? n(children) : children}
    </span>
  );
}
