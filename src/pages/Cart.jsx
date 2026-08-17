import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Truck, ArrowLeft, LogIn, ShieldCheck, RefreshCw, CheckCircle2, Tag, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import AlponaDivider from '../components/ui/AlponaDivider';
import ProductCard from '../components/shop/ProductCard';
import productsData from '../data/products.json';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
    subtotal,
    deliveryCharge,
    total,
    isFreeShipping,
    freeShippingThreshold
  } = useCart();

  const { isAuthenticated } = useAuth();
  const { t, n, lang } = useLanguage();
  const navigate = useNavigate();
  const [showAuthBanner, setShowAuthBanner] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthBanner(true);
      setTimeout(() => setShowAuthBanner(false), 4000);
    } else {
      navigate('/checkout');
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) return;

    // Recognize PROKRITI10, PRPKRITI10, ORGANIC, PB10, etc.
    if (['PROKRITI10', 'PRPKRITI10', 'PROKRITI', 'ORGANIC', 'ORGANIC10', 'PB10', 'SAVE10'].includes(cleanCode)) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError(lang === 'bn' ? 'ভাউচার কোডটি সঠিক নয়' : 'Invalid promo code');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Recommendations to help reach free shipping
  const recommendations = productsData
    .filter(p => !cart.some(c => c.product.id === p.id))
    .slice(0, 4);

  // 1. Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-12 px-4 relative overflow-hidden">
        {/* Ambient Glow */}
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

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-muted mb-8 font-bn-sans">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">{t('cart.title')}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-line rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl relative z-10 space-y-6"
          >
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner border border-primary/20">
                <ShoppingBag size={36} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1.5 bg-primary/10 text-primary font-bold text-xs rounded-full inline-block border border-primary/20">
                {lang === 'bn' ? 'আপনার কার্ট খালি' : 'Cart is Empty'}
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {t('cart.empty.title')}
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto font-bn-sans leading-relaxed">
                {t('cart.empty.subtitle')}
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
                <span>{lang === 'bn' ? '১০০% পরীক্ষিত খাঁটি' : '100% Lab Tested Pure'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-accent shrink-0" />
                <span>{lang === 'bn' ? '৳১০০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free Delivery on ৳1000+'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw size={18} className="text-accent shrink-0" />
                <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on Delivery'}</span>
              </div>
            </div>
          </motion.div>

          <AlponaDivider className="my-16" />

          {/* Recommendations Grid */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  {lang === 'bn' ? 'জনপ্রিয় অর্গানিক পণ্য' : 'Popular Organic Essentials'}
                </span>
                <h2 className="font-display font-bold text-2xl text-primary mt-0.5">
                  {lang === 'bn' ? 'আপনার জন্য সেরা পরামর্শ' : 'Recommended For You'}
                </h2>
              </div>
              <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1">
                {t('btn.viewAll')} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Cart View with Rich Layout
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
          opacity: [0.12, 0.25, 0.12],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-muted font-bn-sans">
            <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-accent transition-colors">{t('nav.shop')}</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">{t('cart.title')}</span>
          </div>

          <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs text-accent font-bold hover:underline">
            <ArrowLeft size={14} /> {t('btn.continueShopping')}
          </Link>
        </div>

        {/* 3-Step Checkout Progress Bar */}
        <div className="bg-surface border border-line rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bn-sans">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs">
                1
              </div>
              <span className="font-bold text-primary">{lang === 'bn' ? '১. কার্ট ও পণ্য নির্বাচন' : '1. Cart Review'}</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-bg text-muted border border-line flex items-center justify-center font-bold text-xs mb-1.5">
                2
              </div>
              <span className="text-muted">{lang === 'bn' ? '২. ডেলিভারি ঠিকানা' : '2. Shipping Address'}</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <div className="w-8 h-8 rounded-full bg-bg text-muted border border-line flex items-center justify-center font-bold text-xs mb-1.5">
                3
              </div>
              <span className="text-muted">{lang === 'bn' ? '৩. অর্ডার নিশ্চিতকরণ' : '3. Confirmation'}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Interactive Banner */}
        <div className="bg-surface border border-line rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${isFreeShipping ? 'bg-primary text-white' : 'bg-accent/15 text-accent'}`}>
                <Truck size={20} />
              </div>
              <div>
                {isFreeShipping ? (
                  <p className="text-xs sm:text-sm font-bold text-primary font-bn-sans">
                    {t('cart.freeShipping.reached')}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-ink font-bn-sans">
                    {t('cart.freeShipping.remaining')}{' '}
                    <strong className="text-accent font-bold">৳{n(amountToFreeShipping)}</strong>{' '}
                    {t('cart.freeShipping.remainingMore')}
                  </p>
                )}
                <p className="text-[11px] text-muted font-bn-sans">
                  {lang === 'bn' ? 'দেশজুড়ে হোম ডেলিভারিতে ১০০% ক্যাশ অন ডেলিভারি' : 'Nationwide Free Home Delivery & Cash on Delivery'}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-accent hidden sm:inline">
              {n(Math.round(progressPercent))}%
            </span>
          </div>

          <div className="w-full bg-bg h-2.5 rounded-full overflow-hidden border border-line/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full ${isFreeShipping ? 'bg-primary' : 'bg-accent'}`}
            />
          </div>
        </div>

        {/* Main Grid: Items List & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Table List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-lg text-primary">{t('cart.title')}</h2>
                  <span className="text-xs bg-bg text-muted px-2.5 py-0.5 rounded-full border border-line font-mono font-bold">
                    {n(cart.reduce((a, b) => a + b.quantity, 0))} {t('cart.items')}
                  </span>
                </div>
                <button
                  onClick={clearCart}
                  className="text-xs text-muted hover:text-accent-2 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>{t('btn.clearCart')}</span>
                </button>
              </div>

              <div className="divide-y divide-line/60">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <img
                        src={(product.images && product.images[0]) || product.image || '/PB.jpg'}
                        alt={product.name}
                        className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-2xl bg-bg border border-line shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${product.slug}`} className="font-display font-bold text-sm sm:text-base text-primary hover:text-accent transition-colors line-clamp-1">
                          {lang === 'bn' ? (product.bnName || product.name) : product.name}
                        </Link>
                        <p className="text-xs text-muted font-bn-sans line-clamp-1 mt-0.5">
                          {lang === 'bn' ? product.name : product.bnName}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs font-bold text-accent">৳{n(product.price)}</span>
                          <span className="text-[11px] text-muted bg-bg px-2 py-0.5 rounded-md border border-line/60 font-mono">
                            {n(product.weight)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-line/40">
                      {/* Modern Quantity Selector */}
                      <div className="flex items-center border border-line rounded-xl bg-bg p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-ink">
                          {n(quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="font-display font-bold text-base text-primary block">
                          ৳{n(product.price * quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-muted hover:text-accent-2 transition-colors p-1.5 rounded-lg hover:bg-bg cursor-pointer"
                        title={lang === 'bn' ? 'পণ্য সরান' : 'Remove item'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Delivery Notice */}
            <div className="bg-surface/60 border border-line rounded-2xl p-4 flex items-center gap-3 text-xs text-muted font-bn-sans">
              <Truck size={18} className="text-accent shrink-0" />
              <span>
                {lang === 'bn' 
                  ? 'ঢাকার ভেতরে ২৪-৩৬ ঘণ্টার মধ্যে এবং সারা দেশে ২-৩ দিনে পৌঁছে যাবে আপনার পার্সেল।' 
                  : 'Fast delivery across Bangladesh: 24-36h inside Dhaka and 2-3 business days nationwide.'}
              </span>
            </div>
          </div>

          {/* Order Summary Sticky Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-surface border border-line rounded-3xl p-6 shadow-xl space-y-5">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line flex items-center justify-between">
                <span>{t('cart.summary.title')}</span>
                <span className="text-xs font-normal text-muted font-mono">{n(cart.length)} {t('cart.items')}</span>
              </h2>

              <div className="space-y-3 text-xs font-bn-sans text-ink">
                <div className="flex justify-between items-center">
                  <span className="text-muted">{t('cart.summary.subtotal')}</span>
                  <span className="font-bold font-mono text-sm">৳{n(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">{t('cart.summary.delivery')}</span>
                  <span className="font-bold font-mono">
                    {deliveryCharge === 0 ? (
                      <span className="text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-md">
                        {t('cart.summary.free')}
                      </span>
                    ) : (
                      `৳${n(deliveryCharge)}`
                    )}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between items-center text-primary font-bold">
                    <span>{lang === 'bn' ? 'ভাউচার ডিসকাউন্ট (PROKRITI10)' : 'Coupon Discount'}</span>
                    <span className="font-mono">-৳{n(Math.round(subtotal * 0.1))}</span>
                  </div>
                )}
              </div>

              {/* Promo Coupon Form */}
              <div className="pt-2 border-t border-line/60">
                {couponApplied ? (
                  <div className="flex items-center justify-between p-2.5 bg-primary/10 border border-primary/20 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-primary font-mono">{couponCode.toUpperCase()}</p>
                        <p className="text-[10px] text-muted font-bn-sans">
                          {lang === 'bn' ? '১০% বিশেষ ছাড় সক্রিয়' : '10% discount applied'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-accent-2 font-bold hover:underline cursor-pointer"
                    >
                      {lang === 'bn' ? 'বাতিল' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder={lang === 'bn' ? 'কুপন কোড (যেমন: PROKRITI10)' : 'Promo code (PROKRITI10)'}
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            if (couponError) setCouponError('');
                          }}
                          className="w-full bg-bg text-ink text-xs px-3 py-2 pl-8 rounded-xl border border-line focus:border-accent outline-none font-mono"
                        />
                        <Tag size={14} className="absolute left-2.5 top-2.5 text-muted" />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-accent hover:text-ink transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-accent-2 font-bold mt-1">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-line flex justify-between items-baseline">
                <span className="font-bold text-sm text-primary">{t('cart.summary.total')}</span>
                <span className="font-display font-bold text-2xl text-accent">
                  ৳{n(couponApplied ? Math.round(total - (subtotal * 0.1)) : total)}
                </span>
              </div>

              {/* Auth Prompt Banner */}
              <AnimatePresence>
                {showAuthBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-2 bg-accent-2/10 border border-accent-2/30 rounded-2xl p-3 text-xs"
                  >
                    <LogIn size={15} className="text-accent-2 mt-0.5 shrink-0" />
                    <span className="font-bn-sans text-ink">
                      {t('cart.auth.prompt')}{' '}
                      <Link to="/login" state={{ from: '/checkout' }} className="font-bold text-accent-2 underline underline-offset-2">
                        {t('cart.auth.login')}
                      </Link>{' '}
                      {t('cart.auth.or')}{' '}
                      <Link to="/register" state={{ from: '/checkout' }} className="font-bold text-accent underline underline-offset-2">
                        {t('cart.auth.register')}
                      </Link>।
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checkout Button */}
              <div className="pt-3 flex justify-center">
                <Button
                  variant="accent"
                  size="md"
                  onClick={handleCheckout}
                  className="px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all gap-2 min-w-[200px] mx-auto cursor-pointer"
                >
                  <span>{t('btn.checkout')}</span>
                  <ArrowRight size={16} />
                </Button>
              </div>

              {/* Security & COD Assurance */}
              <div className="pt-3 border-t border-line/60 space-y-2 text-[11px] text-muted font-bn-sans">
                <p className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-accent shrink-0" />
                  <span>{lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি (COD) প্রযোজ্য' : '100% Cash on Delivery available'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <RefreshCw size={14} className="text-accent shrink-0" />
                  <span>{lang === 'bn' ? 'পার্সেল দেখে মূল্য পরিশোধের সম্পূর্ণ সুযোগ' : 'Inspect parcel before paying'}</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        <AlponaDivider className="my-16" />

        {/* You May Also Like / Add to Reach Free Shipping */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                {lang === 'bn' ? 'অর্গানিক কালেকশন' : 'Recommended Pure Items'}
              </span>
              <h3 className="font-display font-bold text-2xl text-primary mt-0.5">
                {lang === 'bn' ? 'কার্টে যুক্ত করতে পারেন আরো কিছু পছন্দের পণ্য' : 'Frequently Added Essentials'}
              </h3>
            </div>
            <Link to="/shop" className="text-xs font-bold text-accent hover:underline hidden sm:inline-flex items-center gap-1">
              {t('btn.viewAll')} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
