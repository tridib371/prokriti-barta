import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, Flame, Wheat, Leaf, Coffee, Nut } from 'lucide-react';
import categories from '../../data/categories.json';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  Droplet,
  Flame,
  Wheat,
  Leaf,
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

        {/* 6-Column Responsive Grid Layout (No Cropping) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Leaf;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block bg-surface border border-line rounded-2xl overflow-hidden p-2.5 sm:p-3 hover:border-accent/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-2.5 bg-bg">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/PB.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 p-1.5 bg-surface/90 backdrop-blur-md rounded-lg text-accent shadow-xs group-hover:bg-accent group-hover:text-white transition-colors">
                        <IconComponent size={16} />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-xs sm:text-sm text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                      {lang === 'bn' ? cat.bnName : cat.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-muted font-bn-sans mt-2 pt-2 border-t border-line/40 flex items-center justify-between">
                    <span>{cat.itemCount} {t('catstrip.items')}</span>
                    <span className="text-accent font-bold text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
