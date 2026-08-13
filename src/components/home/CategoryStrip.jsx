import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, Flame, Wheat, Sparkles, Coffee, Nut } from 'lucide-react';
import categories from '../../data/categories.json';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  Droplet,
  Flame,
  Wheat,
  Sparkles,
  Coffee,
  Nut
};

export default function CategoryStrip() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-10 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">{t('catstrip.tag')}</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-1">
              {t('catstrip.title')}
            </h2>
          </div>
          <Link to="/shop" className="text-xs font-semibold text-accent hover:underline hidden sm:block">
            {t('btn.viewAllCat')}
          </Link>
        </div>

        {/* Scroll Snap Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="snap-start shrink-0 w-44 sm:w-52"
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block bg-surface border border-line rounded-2xl overflow-hidden p-3 hover:border-accent hover:shadow-md transition-all relative"
                >
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-bg">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 p-1.5 bg-surface/90 backdrop-blur-md rounded-lg text-accent shadow-xs">
                      <IconComponent size={18} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-sm text-primary group-hover:text-accent transition-colors line-clamp-1">
                    {lang === 'bn' ? cat.bnName : cat.name}
                  </h3>
                  <p className="text-[11px] text-muted font-sans mt-0.5">{cat.itemCount} {t('catstrip.items')}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
