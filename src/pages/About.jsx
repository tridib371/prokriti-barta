import React from 'react';
import { Leaf, Users } from 'lucide-react';
import AlponaDivider from '../components/ui/AlponaDivider';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{t('about.title')}</span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-primary leading-tight">
            {t('about.sub')}
          </h1>
          <p className="text-muted text-sm sm:text-base font-bn-sans max-w-2xl mx-auto leading-relaxed">
            {t('footer.brand.desc')}
          </p>
        </div>

        <AlponaDivider />

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm leading-relaxed text-ink font-bn-sans">
            <h2 className="font-display font-bold text-2xl text-primary">{t('about.storyTitle')}</h2>
            <p>
              {t('about.storyText')}
            </p>
          </div>
          <div className="aspect-4/3 rounded-3xl overflow-hidden border border-line shadow-md">
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
              alt="Organic Honey Harvest"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-surface border border-line p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 bg-accent/15 text-accent rounded-xl flex items-center justify-center font-bold">
              <Leaf size={22} />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">{t('benefits.b1.title')}</h3>
            <p className="text-xs text-muted font-bn-sans">{t('benefits.b1.desc')}</p>
          </div>

          <div className="bg-surface border border-line p-6 rounded-2xl space-y-2">
            <div className="w-10 h-10 bg-accent/15 text-accent rounded-xl flex items-center justify-center font-bold">
              <Users size={22} />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">{t('benefits.b2.title')}</h3>
            <p className="text-xs text-muted font-bn-sans">{t('benefits.b2.desc')}</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
