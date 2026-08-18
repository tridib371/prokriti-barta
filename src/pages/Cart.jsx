import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Truck, ArrowLeft, LogIn, ShieldCheck, RefreshCw, CheckCircle2, Tag, ChevronRight, ShoppingCart, Plus, Minus, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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

  // 1. Compact Empty Cart View (Fits within 1 Screen)
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] bg-bg flex items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-accent rounded-3xl p-6 sm:p-10 text-center max-w-lg w-full shadow-2xl relative z-10 space-y-5"
        >
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-primary text-accent rounded-2xl flex items-center justify-center mx-auto shadow-md border border-accent/30">
              <ShoppingBag size={28} />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-accent text-white rounded-full shadow-xs">
              <Plus size={12} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="px-3 py-1 bg-accent/15 text-accent font-bold text-xs rounded-full inline-block border border-accent/25">
              {lang === 'bn' ? 'শপিং ব্যাগ খালি' : 'Your Cart is Empty'}
            </span>
            <h1 className="font-display font-bold text-2xl text-primary">
              {t('cart.empty')}
            </h1>
            <p className="text-xs text-ink/75 max-w-sm mx-auto font-bn-sans leading-relaxed">
              {lang === 'bn' 
                ? 'আপনার পছন্দের খাঁটি অর্গানিক পণ্য বাছাই করতে আমাদের শপে ঘুরে আসুন।' 
                : 'Explore our farm-fresh raw honey, Vedic ghee, cold-pressed oils, and spices.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/shop" className="w-full sm:w-auto">
              <Button variant="accent" size="md" className="w-full sm:w-auto rounded-full px-7 py-2.5 font-bold shadow-md hover:scale-105 active:scale-95 transition-all gap-2">
                <span>{t('btn.goToShop')}</span>
                <ArrowRight size={15} />
              </Button>
            </Link>
            <Link to="/offers" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full sm:w-auto rounded-full px-5 py-2.5 font-bold text-primary border-primary/20 hover:border-accent transition-all">
                {lang === 'bn' ? 'অফারসমূহ' : 'Special Offers'}
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-primary/10 flex items-center justify-center gap-4 text-xs text-ink/75 font-bn-sans">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-accent" /> {lang === 'bn' ? '১০০% খাঁটি' : '100% Pure'}</span>
            <span className="flex items-center gap-1"><Truck size={14} className="text-accent" /> {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Compact, Single-Page View for Active Cart
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[85vh] bg-bg py-5 sm:py-7 relative overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        
        {/* Compact Header Bar */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-line/60">
          <div className="flex items-center gap-2 text-xs font-bn-sans">
            <Link to="/" className="text-muted hover:text-accent transition-colors">{t('nav.home')}</Link>
            <ChevronRight size={12} className="text-muted/60" />
            <Link to="/shop" className="text-muted hover:text-accent transition-colors">{t('nav.shop')}</Link>
            <ChevronRight size={12} className="text-muted/60" />
            <span className="text-primary font-bold">{t('cart.title')} ({n(cart.reduce((a, b) => a + b.quantity, 0))})</span>
          </div>

          <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs text-accent font-bold hover:underline">
            <ArrowLeft size={13} /> {t('btn.continueShopping')}
          </Link>
        </div>

        {/* Compact Integrated Free Shipping Bar */}
        <div className="bg-gradient-to-r from-surface via-surface to-bg border border-line rounded-2xl p-3 sm:px-4 sm:py-2.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className={`p-1.5 rounded-xl shrink-0 ${isFreeShipping ? 'bg-emerald-600 text-white' : 'bg-accent/15 text-accent'}`}>
              <Truck size={16} />
            </div>
            <div className="text-xs font-bn-sans">
              {isFreeShipping ? (
                <span className="font-bold text-emerald-600">
                  {t('cart.freeShipping.reached')}
                </span>
              ) : (
                <span className="text-ink">
                  {t('cart.freeShipping.remaining')}{' '}
                  <strong className="text-accent font-bold">৳{n(amountToFreeShipping)}</strong>{' '}
                  {t('cart.freeShipping.remainingMore')}
                </span>
              )}
            </div>
          </div>

          <div className="w-full sm:w-48 flex items-center gap-2 shrink-0">
            <div className="flex-1 bg-bg h-2 rounded-full overflow-hidden border border-line">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  isFreeShipping
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-accent to-[#E89814]'
                }`}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-muted w-8 text-right">
              {n(Math.round(progressPercent))}%
            </span>
          </div>
        </div>

        {/* Main Grid: Items List & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-line gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingCart size={16} className="text-accent shrink-0" />
                <h2 className="font-display font-bold text-sm sm:text-base text-primary truncate">{t('cart.title')}</h2>
                <span className="text-[11px] sm:text-xs bg-bg text-muted px-2 py-0.5 rounded-full border border-line font-mono font-bold shrink-0">
                  {n(cart.reduce((a, b) => a + b.quantity, 0))} {t('cart.items')}
                </span>
              </div>
              <button
                onClick={clearCart}
                className="text-xs text-muted hover:text-accent-2 font-medium flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 size={13} />
                <span>{t('btn.clearCart')}</span>
              </button>
            </div>

            {/* Items Container - Flows naturally with the page to avoid duplicate scrollbars */}
            <div className="divide-y divide-line/60">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                  
                  {/* Product Thumbnail & Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={(product.images && product.images[0]) || product.image || '/PB.jpg'}
                      alt={product.name}
                      className="w-14 h-14 sm:w-15 sm:h-15 object-cover rounded-xl bg-bg border border-line shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product.slug}`} className="font-display font-bold text-xs sm:text-sm text-primary hover:text-accent transition-colors line-clamp-1 block">
                        {lang === 'bn' ? (product.bnName || product.name) : product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-accent">৳{n(product.price)}</span>
                        {product.weight && (
                          <span className="text-[10px] text-muted bg-bg px-1.5 py-0.5 rounded border border-line font-mono">
                            {n(product.weight)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile-Friendly Stepper, Subtotal & Remove Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 pl-17 sm:pl-0">
                    {/* Stepper */}
                    <div className="flex items-center border border-line rounded-xl bg-bg p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono text-ink">
                        {n(quantity)}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[50px] sm:min-w-[60px]">
                      <span className="font-display font-bold text-xs sm:text-sm text-primary block">
                        ৳{n(product.price * quantity)}
                      </span>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted hover:text-accent-2 transition-colors p-1.5 rounded-lg hover:bg-accent-2/10 cursor-pointer"
                      title={lang === 'bn' ? 'মুছুন' : 'Remove'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Quick Micro Delivery Assurance */}
            <div className="pt-2 border-t border-line/40 flex items-center justify-between text-[11px] text-muted font-bn-sans">
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-accent" /> {lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি' : '100% Cash On Delivery'}</span>
              <span className="flex items-center gap-1.5"><RefreshCw size={13} className="text-accent" /> {lang === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট' : '7-Day Replacement'}</span>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FBF8F1] via-[#F6F1E5] to-[#EFE8D8] border-2 border-[#E5DCB8] rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
            <h2 className="font-display font-bold text-base text-primary pb-2 border-b border-primary/10 flex items-center justify-between">
              <span>{t('cart.summary.title')}</span>
              <span className="text-xs font-normal text-muted font-mono">{n(cart.length)} {t('cart.items')}</span>
            </h2>

            <div className="space-y-2 text-xs font-bn-sans text-ink">
              <div className="flex justify-between items-center">
                <span className="text-ink/75">{t('cart.summary.subtotal')}</span>
                <span className="font-bold font-mono text-sm">৳{n(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink/75">{t('cart.summary.delivery')}</span>
                <span className="font-bold font-mono">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-700 font-bold px-2 py-0.5 bg-emerald-100 rounded-md">
                      {t('cart.summary.free')}
                    </span>
                  ) : (
                    `৳${n(deliveryCharge)}`
                  )}
                </span>
              </div>
              {couponApplied && (
                <div className="flex justify-between items-center text-emerald-700 font-bold">
                  <span>{lang === 'bn' ? 'ভাউচার ডিসকাউন্ট (১০%)' : 'Coupon Discount (10%)'}</span>
                  <span className="font-mono">-৳{n(Math.round(subtotal * 0.1))}</span>
                </div>
              )}
            </div>

            {/* Promo Voucher Form */}
            <div className="pt-2 border-t border-primary/10">
              {couponApplied ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-300 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-800 font-mono">
                      {couponCode.toUpperCase()} ({lang === 'bn' ? '১০% ছাড়' : '10% OFF'})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Remove'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={lang === 'bn' ? 'কুপন কোড (PROKRITI10)' : 'Coupon (PROKRITI10)'}
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponError) setCouponError('');
                      }}
                      className="w-full bg-white text-ink text-xs px-3 py-2 pl-7 rounded-xl border border-[#E5DCB8] focus:border-accent outline-none font-mono uppercase"
                    />
                    <Tag size={12} className="absolute left-2.5 top-2.5 text-muted" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-primary text-accent rounded-xl text-xs font-bold hover:bg-accent hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-bold mt-1">{couponError}</p>
              )}
            </div>

            {/* Total Row */}
            <div className="pt-2 border-t border-primary/10 flex justify-between items-baseline">
              <span className="font-bold text-sm text-primary">{t('cart.summary.total')}</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-accent">
                ৳{n(couponApplied ? Math.round(total - (subtotal * 0.1)) : total)}
              </span>
            </div>

            {/* Auth Prompt Banner */}
            <AnimatePresence>
              {showAuthBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2 bg-accent/15 border border-accent/30 rounded-xl p-2.5 text-xs font-bn-sans"
                >
                  <LogIn size={14} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-ink">
                    {t('cart.auth.prompt')}{' '}
                    <Link to="/login" state={{ from: '/checkout' }} className="font-bold text-accent underline">
                      {t('cart.auth.login')}
                    </Link>{' '}
                    {t('cart.auth.or')}{' '}
                    <Link to="/register" state={{ from: '/checkout' }} className="font-bold text-accent underline">
                      {t('cart.auth.register')}
                    </Link>।
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkout Action Button */}
            <Button
              variant="accent"
              size="md"
              onClick={handleCheckout}
              className="w-full rounded-full py-3 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all gap-2 justify-center cursor-pointer"
            >
              <span>{t('btn.checkout')}</span>
              <ArrowRight size={16} />
            </Button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
