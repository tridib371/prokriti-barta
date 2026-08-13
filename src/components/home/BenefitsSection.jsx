import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, HeartHandshake, Box } from 'lucide-react';
import AlponaDivider from '../ui/AlponaDivider';
import { useLanguage } from '../../context/LanguageContext';

export default function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Leaf,
      title: t('benefits.b1.title'),
      description: t('benefits.b1.desc')
    },
    {
      icon: HeartHandshake,
      title: t('benefits.b2.title'),
      description: t('benefits.b2.desc')
    },
    {
      icon: Award,
      title: t('benefits.b3.title'),
      description: t('benefits.b3.desc')
    },
    {
      icon: Box,
      title: t('benefits.b4.title'),
      description: t('benefits.b4.desc')
    }
  ];

  return (
    <section className="py-12 bg-surface border-t border-line">
      <AlponaDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">{t('benefits.tag')}</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary mt-1">
            {t('benefits.title')}
          </h2>
          <p className="text-muted text-xs sm:text-sm font-bn-sans mt-2">
            {t('benefits.sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-bg/60 border border-line rounded-2xl p-6 flex flex-col justify-between hover:border-accent transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shadow-xs">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-bn-sans">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
