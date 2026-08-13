import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import RatingStars from '../ui/RatingStars';
import Badge from '../ui/Badge';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, lang } = useLanguage();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-surface border border-line rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-bg/50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <Badge variant="discount">-{discountPercent}% {t('badge.off')}</Badge>
          )}
          {product.isNew && <Badge variant="accent">{t('badge.new')}</Badge>}
          {product.tags?.includes('Bestseller') && (
            <Badge variant="primary">{t('badge.bestseller')}</Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
              isLiked
                ? 'bg-accent-2 text-surface'
                : 'bg-surface/80 text-ink hover:bg-surface hover:text-accent-2'
            }`}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} className={isLiked ? 'fill-surface' : ''} />
          </button>
        </div>

        {/* Quick Add to Cart Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-accent text-ink hover:bg-accent/90 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <ShoppingBag size={15} /> {t('btn.addToCart')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider font-sans">
            {product.category}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="block font-display font-semibold text-sm sm:text-base text-primary hover:text-accent transition-colors line-clamp-1 mt-0.5"
          >
            {lang === 'bn' ? (product.bnName || product.name) : product.name}
          </Link>
          <p className="text-xs text-muted font-bn-sans line-clamp-1 mt-0.5">
            {lang === 'bn' ? product.name : product.bnName}
          </p>

          <div className="mt-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={13} />
          </div>
        </div>

        {/* Price & Weight Footer */}
        <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-base sm:text-lg text-primary">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted line-through font-sans">৳{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-muted">{product.weight}</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden p-2 rounded-xl bg-primary text-surface hover:bg-primary/90 transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
