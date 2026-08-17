import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Truck, Plus, Minus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { drawerSlide } from '../../lib/motionVariants';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import productsData from '../../data/products.json';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    addToCart,
    subtotal,
    freeShippingThreshold,
    isFreeShipping,
  } = useCart();
  const { t, n, lang } = useLanguage();

  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Popular quick-add picks
  const quickPicks = productsData
    .filter(p => !cart.some(c => c.product.id === p.id))
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface text-ink shadow-2xl z-50 flex flex-col border-l border-line overflow-hidden"
          >
            {/* Ambient Background Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
                x: [0, 15, 0],
                y: [0, -15, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.18, 0.1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            />

            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-line bg-surface/90 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary text-white rounded-2xl shadow-xs">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-primary leading-tight">
                    {t('cartdrawer.title')}
                  </h2>
                  <span className="text-[11px] text-muted font-bn-sans">
                    {n(cart.reduce((a, b) => a + b.quantity, 0))} {t('cart.items')} {lang === 'bn' ? 'সংযুক্ত' : 'added'}
                  </span>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-2xl text-muted hover:text-ink hover:bg-bg transition-colors cursor-pointer border border-line/60"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Dynamic Progress Tracker */}
            <div className="bg-bg/90 px-4 sm:px-5 py-3 border-b border-line z-10">
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink mb-1.5 font-bn-sans">
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-md ${isFreeShipping ? 'bg-primary text-white' : 'bg-accent/15 text-accent'}`}>
                    <Truck size={14} />
                  </div>
                  {isFreeShipping ? (
                    <span className="text-primary font-bold">{t('cartdrawer.freeReached')}</span>
                  ) : (
                    <span>
                      {t('cartdrawer.freeRemaining')}{' '}
                      <strong className="text-accent font-bold">৳{n(amountToFreeShipping)}</strong>{' '}
                      {t('cartdrawer.freeMore')}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono font-bold text-primary">{n(Math.round(progressPercent))}%</span>
              </div>
              <div className="w-full bg-line/80 h-2 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full transition-all duration-300 ${isFreeShipping ? 'bg-primary' : 'bg-accent'}`}
                />
              </div>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 z-10">
              {cart.length === 0 ? (
                /* Enhanced Gorgeous Empty State */
                <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center">
                  
                  {/* Floating Glowing Animated Icon */}
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner border border-primary/20">
                      <ShoppingBag size={36} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                      0
                    </div>
                  </motion.div>

                  <div className="space-y-1.5 max-w-xs">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full inline-block border border-primary/20">
                      {lang === 'bn' ? 'কার্ট সম্পূর্ণ খালি' : 'Cart is Empty'}
                    </span>
                    <h3 className="font-display font-bold text-xl text-primary">{t('cartdrawer.empty.title')}</h3>
                    <p className="text-xs text-muted font-bn-sans leading-relaxed">
                      {t('cartdrawer.empty.sub')}
                    </p>
                  </div>

                  <Button
                    variant="accent"
                    onClick={() => { closeCart(); navigate('/shop'); }}
                    className="rounded-full px-8 py-2.5 font-bold shadow-md hover:scale-105 active:scale-95 transition-all gap-2"
                  >
                    <span>{t('cartdrawer.empty.btn')}</span>
                    <ArrowRight size={15} />
                  </Button>

                  {/* Quick Add Suggestions inside Empty Drawer */}
                  <div className="w-full text-left pt-4 border-t border-line/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary font-bn-sans">
                        {lang === 'bn' ? 'জনপ্রিয় অর্গানিক পণ্য' : 'Popular Organic Picks'}
                      </span>
                      <span className="text-[10px] text-muted font-bn-sans">{lang === 'bn' ? '১-ক্লিক যোগ করুন' : '1-click add'}</span>
                    </div>

                    <div className="space-y-2">
                      {quickPicks.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-2.5 bg-bg/70 border border-line/70 rounded-2xl hover:border-primary/40 transition-colors gap-3"
                        >
                          <img
                            src={(product.images && product.images[0]) || product.image || '/PB.jpg'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-xl bg-surface border border-line shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-primary line-clamp-1">
                              {lang === 'bn' ? (product.bnName || product.name) : product.name}
                            </h4>
                            <span className="text-xs font-bold text-accent">৳{n(product.price)}</span>
                          </div>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-accent hover:text-ink transition-all shrink-0 cursor-pointer shadow-2xs"
                          >
                            + {lang === 'bn' ? 'যোগ' : 'Add'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Strip */}
                  <div className="w-full pt-3 border-t border-line/60 grid grid-cols-2 gap-2 text-[11px] text-muted font-bn-sans text-left">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-accent shrink-0" />
                      <span>{lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি' : '100% Cash on Delivery'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-accent shrink-0" />
                      <span>{lang === 'bn' ? '১০০% পরীক্ষিত খাঁটি পণ্য' : '100% Tested Pure'}</span>
                    </div>
                  </div>

                </div>
              ) : (
                /* Filled Cart Items List */
                <>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {cart.map(({ product, quantity }) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-3 bg-bg/60 border border-line/80 p-3 rounded-2xl transition-all hover:border-primary/40 items-center shadow-2xs"
                        >
                          <img
                            src={(product.images && product.images[0]) || product.image || '/PB.jpg'}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-xl bg-surface border border-line shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <Link
                                to={`/product/${product.slug}`}
                                onClick={closeCart}
                                className="font-bold text-xs sm:text-sm text-primary hover:text-accent line-clamp-1 transition-colors block"
                              >
                                {lang === 'bn' ? (product.bnName || product.name) : product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-bold text-accent text-xs">৳{n(product.price)}</span>
                                <span className="text-[10px] text-muted bg-surface px-1.5 py-0.5 rounded border border-line/60">
                                  {n(product.weight)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-line/40">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-line rounded-xl bg-surface p-0.5 shadow-2xs">
                                <button
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-bg rounded-lg transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="w-6 text-center text-xs font-bold font-mono">{n(quantity)}</span>
                                <button
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-bg rounded-lg transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>

                              <span className="text-xs font-bold font-mono text-primary">
                                ৳{n(product.price * quantity)}
                              </span>

                              {/* Remove */}
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-muted hover:text-accent-2 transition-colors p-1 rounded-lg hover:bg-bg cursor-pointer"
                                title={lang === 'bn' ? 'মুছুন' : 'Remove item'}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Add more to reach free delivery quick suggestion */}
                  {!isFreeShipping && quickPicks.length > 0 && (
                    <div className="pt-2">
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-primary font-bn-sans">
                            {lang === 'bn' ? 'ফ্রি ডেলিভারি পেতে যোগ করুন:' : 'Add to get Free Delivery:'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-surface p-2 rounded-xl border border-line/60 gap-2">
                          <img
                            src={(quickPicks[0].images && quickPicks[0].images[0]) || quickPicks[0].image || '/PB.jpg'}
                            alt={quickPicks[0].name}
                            className="w-9 h-9 object-cover rounded-lg bg-bg shrink-0"
                          />
                          <div className="min-w-0 flex-1 text-left">
                            <p className="text-[11px] font-bold text-primary line-clamp-1">
                              {lang === 'bn' ? (quickPicks[0].bnName || quickPicks[0].name) : quickPicks[0].name}
                            </p>
                            <span className="text-[10px] text-accent font-bold">৳{n(quickPicks[0].price)}</span>
                          </div>
                          <button
                            onClick={() => addToCart(quickPicks[0], 1)}
                            className="px-2.5 py-1 bg-primary text-white rounded-lg text-[11px] font-bold hover:bg-accent hover:text-ink transition-colors shrink-0 cursor-pointer"
                          >
                            + {lang === 'bn' ? 'যোগ' : 'Add'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Summary & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-line bg-surface/95 backdrop-blur-md space-y-3.5 shadow-2xl z-10">
                <div className="space-y-1.5 text-xs font-bn-sans">
                  <div className="flex justify-between items-center text-muted">
                    <span>{t('cartdrawer.subtotal')}</span>
                    <span className="font-mono font-bold text-ink">৳{n(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted">
                    <span>{t('cart.summary.delivery')}</span>
                    <span className="font-bold font-mono">
                      {isFreeShipping ? (
                        <span className="text-primary font-bold px-2 py-0.5 bg-primary/10 rounded-md">
                          {t('cart.summary.free')}
                        </span>
                      ) : (
                        `৳${n(100)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-line text-sm font-bold text-primary">
                    <span>{t('cart.summary.total')}</span>
                    <span className="font-display text-xl text-accent">
                      ৳{n(isFreeShipping ? subtotal : subtotal + 100)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    variant="secondary"
                    onClick={() => { closeCart(); navigate('/cart'); }}
                    className="rounded-xl py-2.5 text-xs font-bold border-line hover:border-primary"
                  >
                    {t('cartdrawer.cartpage')}
                  </Button>
                  <Button
                    variant="accent"
                    onClick={handleCheckout}
                    className="rounded-xl py-2.5 text-xs font-bold gap-1.5 shadow-md hover:scale-102 active:scale-98"
                  >
                    <span>{t('btn.checkout')}</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-muted font-bn-sans pt-1">
                  <ShieldCheck size={13} className="text-accent shrink-0" />
                  <span>{lang === 'bn' ? '১০০% ক্যাশ অন ডেলিভারি প্রযোজ্য' : '100% Cash on Delivery Available'}</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
