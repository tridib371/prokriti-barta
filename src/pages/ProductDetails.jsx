import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import RatingStars from '../components/ui/RatingStars';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, n, lang } = useLanguage();

  const product = productsData.find((p) => p.slug === slug) || productsData[0];
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> {lang === 'bn' ? 'শপ লিস্টে ফিরে যান' : 'Back to Shop'}
        </Link>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg border border-line">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <div className="absolute top-3 left-3">
                  <Badge variant="discount">-{discountPercent}% {t('badge.off')}</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === idx ? 'border-accent scale-95' : 'border-line opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="uppercase font-mono">{product.category}</Badge>
                {product.inStock ? (
                  <span className="text-xs text-primary font-bold flex items-center gap-1">
                    <CheckCircle size={14} className="text-accent" /> {t('pd.inStock')}
                  </span>
                ) : (
                  <span className="text-xs text-accent-2 font-bold">{t('pd.outOfStock')}</span>
                )}
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {lang === 'bn' ? (product.bnName || product.name) : product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={18} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-bn-sans font-bold text-3xl text-accent">৳{n(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted line-through font-bn-sans">৳{n(product.originalPrice)}</span>
                )}
                <span className="text-xs text-muted font-bn-sans">/ {n(product.weight)}</span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-ink leading-relaxed font-bn-sans bg-bg/60 p-4 rounded-2xl border border-line">
                {lang === 'bn' ? (product.bnShortDesc || product.shortDesc) : product.shortDesc}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-muted uppercase">{t('pd.quantity')}</span>
                <div className="flex items-center border border-line rounded-xl bg-bg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-ink hover:text-accent"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold font-mono">{n(quantity)}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-ink hover:text-accent"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 max-w-xs shadow-md"
                >
                  <ShoppingBag size={16} /> {t('btn.addToCart')}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleBuyNow}
                  className="flex-1 max-w-xs"
                >
                  {t('btn.buyNow')}
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isLiked
                      ? 'bg-accent-2/15 border-accent-2 text-accent-2'
                      : 'border-line text-muted hover:text-accent-2 hover:bg-bg'
                  }`}
                  title="Wishlist"
                >
                  <Heart size={18} className={isLiked ? 'fill-accent-2' : ''} />
                </button>
              </div>

              {/* Assurance Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-line text-[11px] text-muted font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-accent" /> {t('footer.pure.title')}
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={16} className="text-accent" /> {t('footer.cod.title')}
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw size={16} className="text-accent" /> {t('footer.return.title')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info (Description, Ingredients, Benefits) */}
        <div className="mt-10 bg-surface border border-line rounded-3xl p-6 sm:p-8">
          <div className="flex border-b border-line gap-6 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-bold transition-colors relative ${
                activeTab === 'description' ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {lang === 'bn' ? 'বিস্তারিত বর্ণনা' : 'Description'}
              {activeTab === 'description' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 text-sm font-bold transition-colors relative ${
                activeTab === 'ingredients' ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {t('pd.ingredients')}
              {activeTab === 'ingredients' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 text-sm font-bold transition-colors relative ${
                activeTab === 'benefits' ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {t('pd.benefits')}
              {activeTab === 'benefits' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
            </button>
          </div>

          <div className="text-sm leading-relaxed text-ink font-bn-sans">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'ingredients' && (
              <ul className="list-disc pl-5 space-y-1">
                {product.ingredients?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            )}
            {activeTab === 'benefits' && (
              <ul className="list-disc pl-5 space-y-1">
                {product.benefits?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-2xl text-primary mb-6">
              {t('pd.related')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
