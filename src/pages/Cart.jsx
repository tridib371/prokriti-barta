import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Truck, ArrowLeft, LogIn } from 'lucide-react';
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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAuthBanner, setShowAuthBanner] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthBanner(true);
      // Auto-hide after 4 seconds
      setTimeout(() => setShowAuthBanner(false), 4000);
    } else {
      navigate('/checkout');
    }
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-16 flex flex-col items-center justify-center text-center px-4">
        <div className="p-5 bg-surface rounded-full text-muted border border-line mb-4">
          <ShoppingBag size={48} />
        </div>
        <h1 className="font-display font-bold text-2xl text-primary">{t('cart.empty.title')}</h1>
        <p className="text-xs text-muted max-w-sm font-bn-sans mt-2 mb-6">
          {t('cart.empty.subtitle')}
        </p>
        <Link to="/shop">
          <Button variant="accent" size="lg">
            {t('btn.goToShop')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent mb-4">
          <ArrowLeft size={15} /> {t('btn.continueShopping')}
        </Link>

        <h1 className="font-display font-bold text-3xl text-primary mb-6">
          {t('cart.title')} ({cart.reduce((a, b) => a + b.quantity, 0)} {t('cart.items')})
        </h1>

        {/* Free Shipping Alert Banner */}
        <div className="bg-surface border border-line rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent/15 text-accent rounded-xl">
              <Truck size={22} />
            </div>
            <div className="text-xs font-bn-sans">
              {isFreeShipping ? (
                <p className="text-primary font-bold">{t('cart.freeShipping.reached')}</p>
              ) : (
                <p className="text-ink">
                  {t('cart.freeShipping.remaining')} <strong className="text-accent-2">৳{amountToFreeShipping}</strong> {t('cart.freeShipping.remainingMore')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Table List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface border border-line rounded-3xl p-4 sm:p-6 divide-y divide-line">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-2xl bg-bg border border-line"
                    />
                    <div>
                      <Link to={`/product/${product.slug}`} className="font-display font-bold text-base text-primary hover:text-accent">
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted font-bn-sans">{product.bnName}</p>
                      <p className="text-xs text-accent font-semibold mt-1">৳{product.price} / {product.weight}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-line rounded-xl bg-bg">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-3 py-1 text-sm font-bold text-muted hover:text-ink"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold font-mono">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-3 py-1 text-sm font-bold text-muted hover:text-ink"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-bold text-base text-primary block">
                        ৳{product.price * quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted hover:text-accent-2 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs text-accent-2 font-semibold hover:underline"
              >
                {t('btn.clearCart')}
              </button>
            </div>
          </div>

          {/* Order Summary Side Card */}
          <div className="lg:col-span-4">
            <div className="bg-surface border border-line rounded-3xl p-6 space-y-4 sticky top-24">
              <h2 className="font-display font-bold text-lg text-primary pb-3 border-b border-line">
                {t('cart.summary.title')}
              </h2>

              <div className="space-y-2.5 text-xs text-ink">
                <div className="flex justify-between">
                  <span className="text-muted">{t('cart.summary.subtotal')}</span>
                  <span className="font-bold font-mono">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{t('cart.summary.delivery')}</span>
                  <span className="font-bold font-mono">{deliveryCharge === 0 ? t('cart.summary.free') : `৳${deliveryCharge}`}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-line flex justify-between items-center">
                <span className="font-bold text-sm text-primary">{t('cart.summary.total')}</span>
                <span className="font-display font-bold text-2xl text-accent">৳{total}</span>
              </div>
              {/* Auth required banner */}
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
                      </Link>。
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="accent"
                size="lg"
                onClick={handleCheckout}
                className="w-full shadow-md gap-2"
              >
                {t('btn.checkout')} <ArrowRight size={18} />
              </Button>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
