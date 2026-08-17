import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Award, HeartHandshake, Box, ArrowUpRight } from 'lucide-react';
import AlponaDivider from '../ui/AlponaDivider';
import { useLanguage } from '../../context/LanguageContext';

export default function BenefitsSection() {
  const { t, lang } = useLanguage();

  const benefits = [
    {
      icon: Leaf,
      title: t('benefits.b1.title'),
      description: t('benefits.b1.desc'),
      tagBn: 'প্রাকৃতিক বিশুদ্ধতা',
      tagEn: '100% Organic',
      path: '/shop',
      accent: 'from-emerald-500/10 to-primary/10'
    },
    {
      icon: HeartHandshake,
      title: t('benefits.b2.title'),
      description: t('benefits.b2.desc'),
      tagBn: 'ন্যায্য মূল্য ও কৃষক সম্মান',
      tagEn: 'Direct Fair Trade',
      path: '/about',
      accent: 'from-amber-500/10 to-accent/10'
    },
    {
      icon: Award,
      title: t('benefits.b3.title'),
      description: t('benefits.b3.desc'),
      tagBn: 'সনাতন বিলোনা ও ঘানি',
      tagEn: 'Vedic Heritage',
      path: '/about',
      accent: 'from-orange-500/10 to-accent-2/10'
    },
    {
      icon: Box,
      title: t('benefits.b4.title'),
      description: t('benefits.b4.desc'),
      tagBn: 'ইকো-ফ্রেন্ডলি কাঁচের জার',
      tagEn: 'Eco Packaging',
      path: '/delivery',
      accent: 'from-teal-500/10 to-primary/10'
    }
  ];

  return (
    <section className="py-14 bg-surface border-t border-line relative overflow-hidden">
      {/* Ambient Decorative Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <AlponaDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider">
            {t('benefits.tag')}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary mt-2">
            {t('benefits.title')}
          </h2>
          <p className="text-muted text-xs sm:text-sm font-bn-sans mt-2 leading-relaxed">
            {t('benefits.sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22, delay: idx * 0.08 }}
              >
                <Link
                  to={item.path}
                  className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] hover:border-accent rounded-3xl p-6 flex flex-col justify-between h-full shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-pointer block"
                >
                  {/* Full Card Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#224b37] to-[#11281c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,152,20,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-accent flex items-center justify-center shadow-md shadow-primary/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon size={26} />
                      </div>
                      <span className="font-display font-extrabold text-2xl text-primary/20 group-hover:text-accent/50 transition-colors duration-300">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-lg text-primary group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/90 font-bn-sans leading-relaxed mt-2 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-primary/10 group-hover:border-white/20 flex items-center justify-between relative z-10 transition-colors duration-300">
                    <span className="text-[11px] font-bold text-primary/80 group-hover:text-accent font-bn-sans transition-colors duration-300">
                      {lang === 'bn' ? item.tagBn : item.tagEn}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
