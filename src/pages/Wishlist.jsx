import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2, ShoppingCart, ChevronRight, PackageCheck } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import AlponaDivider from '../components/ui/AlponaDivider';
import productsData from '../data/products.json';

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t, n, lang } = useLanguage();
  const [filterInStock, setFilterInStock] = useState(false);

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      if (item.inStock !== false) {
        addToCart(item, 1);
      }
    });
    clearWishlist();
  };

  const filteredItems = filterInStock 
    ? wishlist.filter(item => item.inStock !== false) 
    : wishlist;

  const totalValue = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);
  const featuredBestsellers = productsData.filter(p => p.isFeatured || p.tags?.includes('Bestseller')).slice(0, 4);

  // 1. Gorgeous Empty Wishlist View
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-12 px-4 relative overflow-hidden">
        
        {/* Ambient Animated Glow Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.25, 0.12],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-8 font-bn-sans">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">{t('wishlist.title')}</span>
          </div>

          {/* Empty Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-line rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl relative z-10 space-y-6"
          >
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto shadow-inner border border-accent/20">
                <Heart size={36} className="animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-primary text-white rounded-full shadow-md">
                <ShoppingBag size={14} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1.5 bg-accent/15 text-accent font-bold text-xs rounded-full inline-block border border-accent/20">
                {lang === 'bn' ? 'সংগ্রহ তালিকা খালি' : 'Wishlist is Empty'}
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {t('wishlist.empty')}
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto font-bn-sans leading-relaxed">
                {lang === 'bn' 
                  ? 'আপনার পছন্দের খাঁটি মধু, গাওয়া ঘি, তেল ও সুপারফুড সামগ্রী সংরক্ষণ করতে যে কোনো পণ্যের হার্ট আইকনে ক্লিক করুন।' 
                  : 'Explore our catalog and click the heart icon on any product to save your organic favorites here for later.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/shop">
                <Button variant="accent" size="md" className="rounded-full px-8 py-3 font-bold shadow-md hover:scale-105 transition-all gap-2">
                  <span>{t('btn.goToShop')}</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="secondary" size="md" className="rounded-full px-6 py-3 font-bold text-accent-2 border-line hover:border-accent-2 transition-all">
                  {lang === 'bn' ? 'চলতি অফারসমূহ দেখুন' : 'View Special Offers'}
                </Button>
              </Link>
            </div>

            {/* 3 Trust Badges */}
            <div className="pt-6 border-t border-line/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-bn-sans text-xs text-muted">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-accent shrink-0" />
                <span>{lang === 'bn' ? '১০০% ল্যাব-টেস্টেড খাঁটি' : '100% Lab Tested Pure'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-accent shrink-0" />
                <span>{lang === 'bn' ? '৳১০০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free Delivery on ৳1000+'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw size={18} className="text-accent shrink-0" />
                <span>{lang === 'bn' ? 'শতভাগ রিপ্লেসমেন্ট গ্যারান্টি' : 'Zero-Risk Replacement'}</span>
              </div>
            </div>
          </motion.div>

          <AlponaDivider className="my-16" />

          {/* Recommended Products Carousel/Grid */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  {lang === 'bn' ? 'জনপ্রিয় অর্গানিক সমাহার' : 'Popular Organic Essentials'}
                </span>
                <h2 className="font-display font-bold text-2xl text-primary mt-0.5">
                  {lang === 'bn' ? 'আপনার পছন্দের জন্য সেরা পরামর্শ' : 'Recommended For You'}
                </h2>
              </div>
              <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1">
                {t('btn.viewAll')} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. Active Wishlist View with Full Features
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12 relative overflow-hidden"
    >
      {/* Ambient Animated Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted mb-6 font-bn-sans">
          <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-accent transition-colors">{t('nav.shop')}</Link>
          <ChevronRight size={14} />
          <span className="text-primary font-bold">{t('wishlist.title')}</span>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 bg-accent/15 text-accent font-bold text-xs rounded-full border border-accent/25 flex items-center gap-1.5 leading-none">
                <Heart size={13} className="fill-accent text-accent" />
                <span>{lang === 'bn' ? 'সংরক্ষিত অর্গানিক কালেকশন' : 'Saved Organic Favorites'}</span>
              </span>
              <span className="text-xs bg-bg text-muted px-2.5 py-1 rounded-full border border-line font-mono font-bold">
                {n(wishlist.length)} {t('cart.items')}
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-tight">
              {t('wishlist.title')}
            </h1>

            <p className="text-xs sm:text-sm text-muted font-bn-sans max-w-xl leading-relaxed">
              {lang === 'bn' 
                ? 'আপনার সংরক্ষিত পণ্যসমূহ এক ক্লিকেই কার্টে যুক্ত করে দ্রুততম সময়ে ডেলিভারি নিশ্চিত করতে পারেন।' 
                : 'Manage your personal wish list and easily move all items to your cart with one tap.'}
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="bg-bg/80 border border-line rounded-2xl px-4 py-2.5 flex flex-col justify-center">
              <span className="text-[11px] text-muted font-bn-sans">{lang === 'bn' ? 'মোট আনুমানিক মূল্য' : 'Total Est. Value'}</span>
              <span className="font-display font-bold text-lg text-accent">৳{n(totalValue)}</span>
            </div>

            <Button
              variant="accent"
              size="md"
              onClick={handleMoveAllToCart}
              className="rounded-xl px-5 py-3 font-bold shadow-md hover:scale-105 active:scale-95 transition-all gap-2 shrink-0 cursor-pointer"
            >
              <ShoppingCart size={16} />
              <span>{lang === 'bn' ? 'সব কার্টে যোগ করুন' : 'Move All to Cart'}</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={clearWishlist}
              className="rounded-xl px-4 py-3 font-bold text-muted hover:text-accent-2 border-line hover:border-line transition-colors shrink-0 cursor-pointer"
              title={lang === 'bn' ? 'সম্পূর্ণ তালিকা মুছুন' : 'Clear entire list'}
            >
              <Trash2 size={16} />
              <span className="sm:hidden">{lang === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-line/40">
          <div className="flex items-center gap-2 text-xs font-bn-sans">
            <button
              onClick={() => setFilterInStock(false)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                !filterInStock 
                  ? 'bg-primary text-white shadow-xs' 
                  : 'bg-surface text-muted border border-line hover:text-ink'
              }`}
            >
              {lang === 'bn' ? 'সকল সংরক্ষিত পণ্য' : 'All Items'} ({n(wishlist.length)})
            </button>
            <button
              onClick={() => setFilterInStock(true)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                filterInStock 
                  ? 'bg-primary text-white shadow-xs' 
                  : 'bg-surface text-muted border border-line hover:text-ink'
              }`}
            >
              {lang === 'bn' ? 'শুধু ইন-স্টক' : 'In Stock Only'} ({n(wishlist.filter(i => i.inStock !== false).length)})
            </button>
          </div>

          <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1">
            {lang === 'bn' ? '+ আরো পণ্য খুঁজুন' : '+ Add More Items'}
          </Link>
        </div>

        {/* Wishlist Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        <AlponaDivider className="my-16" />

        {/* Trust & Guarantee Strip */}
        <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-ink">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{lang === 'bn' ? 'শতভাগ খাঁটি ও পরীক্ষিত' : '100% Tested Pure'}</h4>
              <p className="text-xs text-muted mt-0.5">{lang === 'bn' ? 'রাসায়নিক ও প্রিজারভেটিভ মুক্ত' : 'Chemical & Preservative Free'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{lang === 'bn' ? 'দ্রুততম ক্যাশ অন ডেলিভারি' : 'Fast Cash on Delivery'}</h4>
              <p className="text-xs text-muted mt-0.5">{lang === 'bn' ? 'ঢাকা ২৪-৩৬ ঘণ্টা, সারা দেশে ২-৩ দিন' : '24-36h Dhaka, 2-3 days Nationwide'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent shrink-0">
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{lang === 'bn' ? 'জিরো-রিস্ক রিপ্লেসমেন্ট' : 'Zero-Risk Replacement'}</h4>
              <p className="text-xs text-muted mt-0.5">{lang === 'bn' ? 'পণ্য দেখে মূল্য পরিশোধের সুযোগ' : 'Inspect parcel before paying'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/15 text-accent shrink-0">
              <PackageCheck size={22} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">{lang === 'bn' ? 'ফ্রি ডেলিভারি অফার' : 'Free Shipping Offer'}</h4>
              <p className="text-xs text-muted mt-0.5">{lang === 'bn' ? '৳১০০০+ অর্ডারে সারা দেশে ফ্রি' : 'Free on orders over ৳1000'}</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
