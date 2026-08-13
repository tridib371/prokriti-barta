import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t, n, lang } = useLanguage();

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => addToCart(item, 1));
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-16 flex flex-col items-center justify-center text-center px-4">
        <div className="p-5 bg-surface rounded-full text-muted border border-line mb-4">
          <Heart size={48} />
        </div>
        <h1 className="font-display font-bold text-2xl text-primary">{t('wishlist.empty')}</h1>
        <p className="text-xs text-muted max-w-sm font-bn-sans mt-2 mb-6">
          {lang === 'bn' ? 'আপনার পছন্দের জৈব প্রোডাক্টসমূহ সংরক্ষণ করতে হার্ট আইকনে ক্লিক করুন।' : 'Click the heart icon on products to save your favorites.'}
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-primary">
              {t('wishlist.title')} ({n(wishlist.length)} {t('cart.items')})
            </h1>
            <p className="text-xs text-muted font-bn-sans mt-1">
              {lang === 'bn' ? 'আপনার পছন্দের জৈব সামগ্রীসমূহ এখান থেকে সরাসরি কার্টে যুক্ত করতে পারেন।' : 'Easily move your saved organic favorites straight to cart.'}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="accent" size="md" onClick={handleMoveAllToCart}>
              <ShoppingBag size={16} /> {lang === 'bn' ? 'সব কার্টে যোগ করুন' : 'Move All to Cart'}
            </Button>
            <Button variant="secondary" size="md" onClick={clearWishlist}>
              {lang === 'bn' ? 'সব মুছুন' : 'Clear All'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
