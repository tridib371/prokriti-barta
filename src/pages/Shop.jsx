import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, n, lang } = useLanguage();

  const categoryParam = searchParams.get('category') || '';
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const tabParam = searchParams.get('tab') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [activeTab, setActiveTab] = useState(tabParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [priceRange, setPriceRange] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL search params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(queryParam);
    setSortBy(sortParam);
    setActiveTab(tabParam);
  }, [categoryParam, queryParam, sortParam, tabParam]);

  // Update URL params
  const updateUrlParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    updateUrlParams('category', catSlug);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    updateUrlParams('tab', tabKey);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    updateUrlParams('sort', value);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateUrlParams('q', val);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setActiveTab('all');
    setSortBy('featured');
    setPriceRange(1500);
    setMinRating(0);
    setSearchParams({});
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Tab filter (New, Discount, Bestseller)
        if (activeTab === 'new' && !p.isNew && !p.tags?.includes('New')) return false;
        if (activeTab === 'discount' && (!p.originalPrice || p.originalPrice <= p.price)) return false;
        if (activeTab === 'bestseller' && !p.isFeatured && !p.tags?.includes('Bestseller')) return false;

        // Category filter
        if (selectedCategory && p.category !== selectedCategory) {
          const matchedCat = categoriesData.find(c => c.slug === selectedCategory);
          if (!matchedCat || p.category !== matchedCat.id) return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q) || (p.bnName && p.bnName.toLowerCase().includes(q));
          const matchDesc = p.shortDesc && p.shortDesc.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        // Price range
        if (p.price > priceRange) return false;
        // Min rating
        if (minRating > 0 && p.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'discount') {
          const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return discB - discA;
        }
        return 0; // featured default
      });
  }, [selectedCategory, activeTab, searchQuery, priceRange, minRating, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            {t('shop.title')}
          </h1>
          <p className="text-xs sm:text-sm text-muted font-bn-sans mt-1">
            {t('shop.sub')}
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-surface border border-line rounded-2xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder={t('nav.search.mobile')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-bg text-ink text-sm px-4 py-2 pl-9 rounded-xl border border-line focus:border-accent outline-none"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-muted" />
              {searchQuery && (
                <button onClick={() => handleSearchChange('')} className="absolute right-3 top-2.5 text-xs text-muted hover:text-ink cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-bg border border-line rounded-xl text-xs font-semibold text-ink flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal size={15} /> {t('shop.filter.title')}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={15} className="text-muted hidden sm:inline" />
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-bg text-ink text-xs font-semibold px-3 py-2 rounded-xl border border-line focus:border-accent outline-none cursor-pointer"
                >
                  <option value="featured">{t('shop.sort.default')}</option>
                  <option value="newest">{lang === 'bn' ? 'নতুন পণ্য আগে' : 'Newest Arrivals'}</option>
                  <option value="discount">{lang === 'bn' ? 'সর্বোচ্চ ছাড়' : 'Highest Discount'}</option>
                  <option value="price-low">{t('shop.sort.priceLow')}</option>
                  <option value="price-high">{t('shop.sort.priceHigh')}</option>
                  <option value="rating">{t('shop.sort.rating')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid & Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters Bar */}
            {(selectedCategory || searchQuery || activeTab !== 'all' || minRating > 0 || priceRange < 1500) && (
              <div className="flex flex-wrap items-center gap-2 mb-4 bg-surface p-3 rounded-xl border border-line text-xs">
                <span className="text-muted font-bold">{lang === 'bn' ? 'এক্টিভ ফিল্টার:' : 'Active Filters:'}</span>
                {activeTab !== 'all' && (
                  <span className="bg-accent/20 text-accent font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    {activeTab === 'new' && (lang === 'bn' ? 'নতুন পণ্য' : 'New Arrivals')}
                    {activeTab === 'discount' && (lang === 'bn' ? 'বিশেষ ছাড়' : 'Discount Deals')}
                    {activeTab === 'bestseller' && (lang === 'bn' ? 'জনপ্রিয়' : 'Bestsellers')}
                    <X size={12} className="cursor-pointer" onClick={() => handleTabChange('all')} />
                  </span>
                )}
                {selectedCategory && (
                  <span className="bg-accent/20 text-accent font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    {selectedCategory}
                    <X size={12} className="cursor-pointer" onClick={() => handleCategoryChange('')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    "{searchQuery}"
                    <X size={12} className="cursor-pointer" onClick={() => handleSearchChange('')} />
                  </span>
                )}
                {minRating > 0 && (
                  <span className="bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    {n(minRating)}+ <Star size={10} className="fill-current inline" />
                    <X size={12} className="cursor-pointer" onClick={() => setMinRating(0)} />
                  </span>
                )}
                {priceRange < 1500 && (
                  <span className="bg-line text-ink font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    ≤ ৳{n(priceRange)}
                    <X size={12} className="cursor-pointer" onClick={() => setPriceRange(1500)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-accent-2 font-bold hover:underline ml-auto"
                >
                  {t('shop.resetFilter')}
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="text-xs text-muted mb-4 font-sans font-medium">
              <strong className="text-primary">{n(filteredProducts.length)}</strong> {t('shop.results')}
            </p>

            {/* Products Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-surface border border-line rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mx-auto text-muted">
                  <Search size={32} />
                </div>
                <h3 className="font-display font-bold text-xl text-primary">{t('shop.empty')}</h3>
                <p className="text-xs text-muted max-w-sm mx-auto font-bn-sans">
                  {t('shop.emptySub')}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-accent text-ink font-bold text-xs rounded-xl shadow-xs"
                >
                  {t('shop.resetFilter')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-ink/50 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
            <div className="relative w-4/5 max-w-sm bg-surface h-full p-5 overflow-y-auto z-50">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-line">
                <h3 className="font-bold text-base text-primary">{t('shop.filter.title')}</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-muted">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={(cat) => { handleCategoryChange(cat); setMobileFilterOpen(false); }}
                activeTab={activeTab}
                setActiveTab={(tab) => { handleTabChange(tab); setMobileFilterOpen(false); }}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
