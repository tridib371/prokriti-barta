import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Truck } from 'lucide-react';
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
  const { t, lang } = useLanguage();

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
                <ShoppingBag className="text-accent" size={22} />
                <h2 className="font-display font-bold text-lg text-primary">{t('cartdrawer.title')}</h2>
                <span className="text-xs bg-accent/20 text-ink px-2 py-0.5 rounded-full font-medium">
                  {cart.reduce((a, b) => a + b.quantity, 0)} {t('cart.items')}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-muted hover:text-ink hover:bg-bg transition-colors"
                aria-label="Close cart drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-bg/80 px-5 py-3 border-b border-line">
              <div className="flex items-center gap-2 text-xs font-medium text-ink mb-1.5">
                <Truck size={15} className="text-accent" />
                {isFreeShipping ? (
                  <span className="text-primary font-semibold">{t('cartdrawer.freeReached')}</span>
                ) : (
                  <span>
                    {t('cartdrawer.freeRemaining')} <strong className="text-accent-2">৳{amountToFreeShipping}</strong> {t('cartdrawer.freeMore')}
                  </span>
                )}
              </div>
              <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-3">
                  <div className="p-4 bg-bg rounded-full text-muted">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{t('cartdrawer.empty.title')}</h3>
                  <p className="text-xs text-muted max-w-xs">
                    {t('cartdrawer.empty.sub')}
                  </p>
                  <Button variant="accent" onClick={() => { closeCart(); navigate('/shop'); }}>
                    {t('cartdrawer.empty.btn')}
                  </Button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 bg-bg/50 border border-line/60 p-3 rounded-2xl transition-all hover:border-line"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-18 h-18 object-cover rounded-xl bg-surface"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="font-medium text-sm text-primary hover:text-accent line-clamp-1 transition-colors"
                        >
                          {lang === 'bn' ? (product.bnName || product.name) : product.name}
                        </Link>
                        <p className="text-xs text-muted font-bn-sans">
                          {lang === 'bn' ? product.name : product.bnName}
                        </p>
                        <div className="mt-1 font-semibold text-accent text-sm">
                          ৳{product.price}{' '}
                          <span className="text-[11px] font-normal text-muted">x {quantity} = ৳{product.price * quantity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-line/40">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-line rounded-lg bg-surface">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-xs text-muted hover:text-ink"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-xs text-muted hover:text-ink"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-muted hover:text-accent-2 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & CTA */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-line bg-surface space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">{t('cartdrawer.subtotal')}</span>
                  <span className="font-display font-bold text-lg text-primary">৳{subtotal}</span>
                </div>
                <p className="text-[11px] text-muted">
                  {t('cartdrawer.notice')}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button variant="secondary" onClick={() => { closeCart(); navigate('/cart'); }}>
                    {t('cartdrawer.cartpage')}
                  </Button>
                  <Button variant="accent" onClick={handleCheckout} className="gap-1.5">
                    {t('btn.checkout')} <ArrowRight size={16} />
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
