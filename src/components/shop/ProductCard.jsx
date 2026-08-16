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
  const { t, n, lang } = useLanguage();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const isNewProduct = product.isNew || product.tags?.includes('New');
  const isBestsellerProduct = product.isBestseller || product.tags?.includes('Bestseller');

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

        {/* Image Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1 pointer-events-auto items-start">
            {discountPercent > 0 && (
              <Badge variant="discount">-{discountPercent}% {t('badge.off')}</Badge>
            )}
            {isNewProduct && (
              <Badge variant="new">{t('badge.new')}</Badge>
            )}
            {isBestsellerProduct && !isNewProduct && (
              <Badge variant="bestseller">{t('badge.bestseller')}</Badge>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-xs pointer-events-auto ${
              isLiked
                ? 'bg-accent-2 text-surface'
                : 'bg-surface/80 text-ink hover:bg-surface hover:text-accent-2'
            }`}
            title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} className={isLiked ? 'fill-surface' : ''} />
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
          <p className="text-xs text-muted font-bn-sans line-clamp-2 mt-1 leading-relaxed">
            {lang === 'bn' ? (product.bnShortDesc || product.shortDesc) : product.shortDesc}
          </p>

          <div className="mt-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={13} />
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-sm sm:text-base text-primary">৳{n(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[11px] text-muted line-through font-sans">৳{n(product.originalPrice)}</span>
              )}
            </div>
            <span className="text-[10px] text-muted block">{n(product.weight)}</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-lg bg-primary text-white hover:bg-accent hover:text-ink text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-xs shrink-0 cursor-pointer"
            title={t('btn.addToCart')}
          >
            <ShoppingBag size={13} />
            <span>{t('btn.addToCart')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
