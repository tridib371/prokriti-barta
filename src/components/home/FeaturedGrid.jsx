import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../shop/ProductCard';
import products from '../../data/products.json';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function FeaturedGrid() {
  const { t, n, lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter products for the featured section
  const featuredProducts = products.filter(p => p.isFeatured || p.isBestseller || p.rating >= 4.7);

  const filterTabs = [
    { id: 'all', labelBn: 'সকল সমাহার', labelEn: 'All Essentials' },
    { id: 'honey', labelBn: 'খাঁটি মধু', labelEn: 'Raw Honey' },
    { id: 'ghee-oils', labelBn: 'ঘি ও তেল', labelEn: 'Ghee & Oils' },
    { id: 'spices', labelBn: 'খাঁটি মশলা', labelEn: 'Spices' },
  ];

  const displayedProducts = (
    selectedFilter === 'all'
      ? featuredProducts
      : featuredProducts.filter(p => p.category === selectedFilter)
  ).slice(0, 8);

  return (
    <section className="py-10 sm:py-14 bg-bg border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider mb-1">
              <Leaf size={14} className="text-accent" />
              <span>{t('featured.tag')}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
              {t('featured.title')}
            </h2>
          </div>

          {/* Filter Pills & View All */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-surface border border-line rounded-2xl shadow-2xs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bn-sans transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-muted hover:text-primary hover:bg-bg'
                  }`}
                >
                  {lang === 'bn' ? tab.labelBn : tab.labelEn}
                </button>
              ))}
            </div>

            <Link to="/shop" className="hidden sm:inline-block ml-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-1 text-xs font-bold">
                <span>{t('btn.viewAll')}</span>
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Perfectly Proportioned 4-Column Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {displayedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop">
            <Button variant="outline" size="md" className="w-full rounded-2xl gap-1 text-xs font-bold py-2.5">
              <span>{t('btn.viewAll')}</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
