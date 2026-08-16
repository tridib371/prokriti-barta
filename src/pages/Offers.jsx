import React from 'react';
import { Tag, Clock } from 'lucide-react';
import CountdownTimer from '../components/ui/CountdownTimer';
import ProductCard from '../components/shop/ProductCard';
import productsData from '../data/products.json';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Offers() {
  const { t, lang } = useLanguage();
  const discountedProducts = productsData.filter((p) => p.originalPrice);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Deal Header Banner */}
        <div className="bg-primary text-surface rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent font-bold text-xs rounded-full">
              <Tag size={14} /> {t('offers.title')}
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-surface">
              {lang === 'bn' ? 'সীমিত সময়ের খাদ্য উৎসব!' : 'Limited-Time Organic Deals!'}
            </h1>
            <p className="text-xs sm:text-sm text-surface/80 max-w-md font-bn-sans">
              {t('offers.sub')}
            </p>
          </div>

          <div className="z-10 bg-surface/10 backdrop-blur-md p-4 rounded-2xl border border-surface/20 flex flex-col items-center gap-2">
            <span className="text-xs text-accent font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock size={14} /> {lang === 'bn' ? 'অফার শেষ হতে বাকি:' : 'Offer Ends In:'}
            </span>
            <CountdownTimer />
          </div>
        </div>

        {/* Discounted Product Grid */}
        <div>
          <h2 className="font-display font-bold text-2xl text-primary mb-6">
            {lang === 'bn' ? 'অফারের বিশেষ পণ্যসমূহ' : 'Special Offer Items'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
