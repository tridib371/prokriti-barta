import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../shop/ProductCard';
import products from '../../data/products.json';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function FeaturedGrid() {
  const { t, n, lang } = useLanguage();
  const featuredProduct = products.find(p => p.id === 'honey-sundarban-500') || products[0];
  const bentoSmallProducts = products.filter(p => p.id !== featuredProduct.id).slice(0, 6);

  return (
    <section className="py-12 bg-bg border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider mb-1">
              <Sparkles size={14} /> {t('featured.tag')}
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
              {t('featured.title')}
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm" className="gap-1">
              {t('btn.viewAll')} <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Main Large Bento Item (Spans 6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-surface border border-line rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm group"
          >
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-bold text-xs">
                {t('featured.todayBadge')}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {lang === 'bn' ? featuredProduct.bnName : featuredProduct.name}
              </h3>
              <p className="text-muted text-sm font-bn-sans leading-relaxed">
                {featuredProduct.shortDesc}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="font-display font-bold text-2xl text-accent">
                  ৳{n(featuredProduct.price)}
                </span>
                {featuredProduct.originalPrice && (
                  <span className="text-sm text-muted line-through">৳{n(featuredProduct.originalPrice)}</span>
                )}
              </div>
              <Link to={`/product/${featuredProduct.slug}`} className="inline-block pt-2">
                <Button variant="accent" size="md">
                  {t('btn.details')} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="mt-6 relative aspect-16/9 rounded-2xl overflow-hidden bg-bg">
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Bento Grid Cards (Spans 6 cols total: 2x3 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bentoSmallProducts.slice(0, 4).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Grid Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {bentoSmallProducts.slice(4, 6).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* Banner Bento Filler Box */}
          <div className="sm:col-span-2 bg-primary text-surface rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2 z-10">
              <span className="text-xs text-accent font-bold uppercase tracking-wider">{t('featured.farmerTag')}</span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-surface">
                {t('featured.farmerTitle')}
              </h3>
              <p className="text-xs text-surface/80 font-bn-sans">
                {t('featured.farmerSub')}
              </p>
            </div>
            <div className="pt-4 z-10">
              <Link to="/about">
                <Button variant="accent" size="sm">
                  {t('btn.farmersStory')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
