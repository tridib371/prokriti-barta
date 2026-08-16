import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Truck, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { drawerSlide } from '../../lib/motionVariants';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
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
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface text-ink shadow-2xl z-50 flex flex-col border-l border-line"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-primary leading-tight">{t('cartdrawer.title')}</h2>
                  <span className="text-[11px] text-muted font-bn-sans">
                    {n(cart.reduce((a, b) => a + b.quantity, 0))} {t('cart.items')}
                  </span>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-muted hover:text-ink hover:bg-bg transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-bg/80 px-5 py-3 border-b border-line">
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink mb-1.5 font-bn-sans">
                <div className="flex items-center gap-1.5">
                  <Truck size={15} className="text-accent" />
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
                <span className="text-[10px] font-mono text-muted">{n(Math.round(progressPercent))}%</span>
              </div>
              <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out rounded-full ${isFreeShipping ? 'bg-primary' : 'bg-accent'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3">
                  <div className="p-4 bg-bg rounded-full text-muted border border-line">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary">{t('cartdrawer.empty.title')}</h3>
                  <p className="text-xs text-muted max-w-xs font-bn-sans">
                    {t('cartdrawer.empty.sub')}
                  </p>
                  <Button variant="accent" onClick={() => { closeCart(); navigate('/shop'); }} className="rounded-full px-6 py-2.5">
                    {t('cartdrawer.empty.btn')}
                  </Button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 bg-bg/50 border border-line/60 p-3 rounded-2xl transition-all hover:border-line items-center"
                  >
                    <img
                      src={(product.images && product.images[0]) || product.image || '/PB.jpg'}
                      alt={product.name}
                      className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-xl bg-surface border border-line shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="font-medium text-sm text-primary hover:text-accent line-clamp-1 transition-colors block"
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

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/40">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-line rounded-lg bg-surface p-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-bg rounded transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono">{n(quantity)}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-muted hover:text-ink hover:bg-bg rounded transition-colors cursor-pointer"
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
                          className="text-muted hover:text-accent-2 transition-colors p-1 rounded hover:bg-bg cursor-pointer"
                          title={lang === 'bn' ? 'মুছুন' : 'Remove item'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & CTA */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-line bg-surface space-y-3 shadow-lg">
                <div className="flex justify-between items-center text-xs font-bn-sans">
                  <span className="text-muted">{t('cartdrawer.subtotal')}</span>
                  <span className="font-display font-bold text-lg text-primary">৳{n(subtotal)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted font-bn-sans">
                  <ShieldCheck size={13} className="text-accent shrink-0" />
                  <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে ১০০% নিরাপদ পেমেন্ট' : '100% Secure Cash on Delivery'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    variant="secondary"
                    onClick={() => { closeCart(); navigate('/cart'); }}
                    className="rounded-xl py-2.5 text-xs font-bold"
                  >
                    {t('cartdrawer.cartpage')}
                  </Button>
                  <Button
                    variant="accent"
                    onClick={handleCheckout}
                    className="rounded-xl py-2.5 text-xs font-bold gap-1.5 shadow-md"
                  >
                    <span>{t('btn.checkout')}</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
