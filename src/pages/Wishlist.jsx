import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowUpRight, ShieldCheck, Truck, RefreshCw, CheckCircle2, ShoppingCart, ChevronRight, PackageCheck } from 'lucide-react';
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

  const guarantees = [
    {
      icon: ShieldCheck,
      titleBn: 'শতভাগ খাঁটি ও পরীক্ষিত',
      titleEn: '100% Tested Pure',
      descBn: 'রাসায়নিক, কীটনাশক ও ক্ষতিকারক প্রিজারভেটিভ মুক্ত প্রাকৃতিক বিশুদ্ধতা।',
      descEn: 'Untouched by artificial colors, additives or synthetic preservatives.',
      tagBn: '১০০% খাঁটি পণ্য',
      tagEn: '100% Organic Pure',
      path: '/shop'
    },
    {
      icon: Truck,
      titleBn: 'দ্রুততম ক্যাশ অন ডেলিভারি',
      titleEn: 'Fast Cash on Delivery',
      descBn: 'ঢাকা সিটিতে ২৪-৩৬ ঘণ্টা এবং সারা দেশে ২-৩ দিনে নিরাপদ হোম ডেলিভারি।',
      descEn: 'Direct doorstep home delivery across Dhaka and all 64 districts.',
      tagBn: 'সরাসরি হোম ডেলিভারি',
      tagEn: 'Fast Doorstep COD',
      path: '/delivery'
    },
    {
      icon: RefreshCw,
      titleBn: 'জিরো-রিস্ক রিপ্লেসমেন্ট',
      titleEn: 'Zero-Risk Replacement',
      descBn: 'ডেলিভারিতে ক্ষতি হলে বা পছন্দ না হলে ১০০% ফ্রি রিপ্লেসমেন্ট নিশ্চয়তা।',
      descEn: 'Inspect parcel at doorstep with 100% free damage replacement.',
      tagBn: 'সহজ রিটার্ন পলিসি',
      tagEn: '100% Risk Free',
      path: '/delivery'
    },
    {
      icon: PackageCheck,
      titleBn: 'ফ্রি ডেলিভারি অফার',
      titleEn: 'Free Shipping Offer',
      descBn: '১০০০ টাকা বা তার বেশি মূল্যের অর্ডারে সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি।',
      descEn: 'Free shipping anywhere in Bangladesh on all orders over ৳1000.',
      tagBn: '৳১০০০+ এ ফ্রি শিপিং',
      tagEn: 'Free Over ৳1000',
      path: '/offers'
    }
  ];

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

          {/* Empty Hero Card Styled with Green Border */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl relative z-10 space-y-6 transition-colors"
          >
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-primary text-accent rounded-full flex items-center justify-center mx-auto shadow-md border-2 border-accent/40">
                <Heart size={36} className="animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-2 bg-accent text-white rounded-full shadow-md">
                <ShoppingBag size={14} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1.5 bg-accent/20 text-accent font-bold text-xs rounded-full border border-accent/30 inline-block font-bn-sans">
                {lang === 'bn' ? 'সংগ্রহ তালিকা খালি' : 'Wishlist is Empty'}
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {t('wishlist.empty')}
              </h1>
              <p className="text-xs sm:text-sm text-ink/75 max-w-md mx-auto font-bn-sans leading-relaxed">
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
                <Button variant="secondary" size="md" className="rounded-full px-6 py-3 font-bold text-primary border-primary/30 hover:border-primary hover:bg-primary/10 transition-all">
                  {lang === 'bn' ? 'চলতি অফারসমূহ দেখুন' : 'View Special Offers'}
                </Button>
              </Link>
            </div>

            {/* 3 Trust Badges */}
            <div className="pt-6 border-t border-primary/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-bn-sans text-xs text-ink/75">
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
                <span className="text-xs font-bold text-accent uppercase tracking-wider font-bn-sans">
                  {lang === 'bn' ? 'জনপ্রিয় অর্গানিক সমাহার' : 'Popular Organic Essentials'}
                </span>
                <h2 className="font-display font-bold text-2xl text-primary mt-0.5">
                  {lang === 'bn' ? 'আপনার পছন্দের জন্য সেরা পরামর্শ' : 'Recommended For You'}
                </h2>
              </div>
              <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1 font-bn-sans">
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

  // 2. Active Wishlist View with Green Border Palette
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8 sm:py-12 relative overflow-hidden select-none"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted font-bn-sans">
          <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-accent transition-colors">{t('nav.shop')}</Link>
          <ChevronRight size={14} />
          <span className="text-primary font-bold">{t('wishlist.title')}</span>
        </div>

        {/* Hero Header Banner Styled with Green-Bordered Organic Cream */}
        <div className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 bg-accent/15 text-accent font-bold text-xs rounded-full border border-accent/25 flex items-center gap-1.5 leading-none font-bn-sans">
                <Heart size={13} className="fill-accent text-accent" />
                <span>{lang === 'bn' ? 'সংরক্ষিত অর্গানিক কালেকশন' : 'Saved Organic Favorites'}</span>
              </span>
              <span className="text-xs bg-white/85 text-primary px-2.5 py-1 rounded-full border border-primary/20 font-mono font-bold">
                {n(wishlist.length)} {t('cart.items')}
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-tight">
              {t('wishlist.title')}
            </h1>

            <p className="text-xs sm:text-sm text-ink/75 font-bn-sans max-w-xl leading-relaxed">
              {lang === 'bn' 
                ? 'আপনার সংরক্ষিত পণ্যসমূহ এক ক্লিকেই কার্টে যুক্ত করে দ্রুততম সময়ে ডেলিভারি নিশ্চিত করতে পারেন।' 
                : 'Manage your personal wish list and easily move all items to your cart with one tap.'}
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="bg-white/90 border border-primary/25 rounded-2xl px-4 py-2.5 flex flex-col justify-center shadow-2xs">
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
              className="rounded-xl px-4 py-3 font-bold text-muted hover:text-accent-2 border border-primary/25 bg-white/80 hover:bg-white transition-colors shrink-0 cursor-pointer"
              title={lang === 'bn' ? 'সম্পূর্ণ তালিকা মুছুন' : 'Clear entire list'}
            >
              <Trash2 size={16} />
              <span className="sm:hidden">{lang === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-line">
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

          <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1 font-bn-sans">
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

        {/* 4 Trust & Guarantee Cards with Signature Green Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
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
                  className="group relative bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-primary/50 hover:border-primary rounded-3xl p-6 flex flex-col justify-between h-full shadow-[0_4px_18px_-4px_rgba(27,59,43,0.08)] hover:shadow-[0_20px_40px_-8px_rgba(27,59,43,0.45)] transition-all duration-500 overflow-hidden cursor-pointer block"
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
                        {lang === 'bn' ? item.titleBn : item.titleEn}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-ink/75 group-hover:text-white/90 font-bn-sans leading-relaxed mt-2 transition-colors duration-300">
                        {lang === 'bn' ? item.descBn : item.descEn}
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
    </motion.div>
  );
}
