import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import categories from '../../data/categories.json';
import Button from '../ui/Button';

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onResetFilters
}) {
  return (
    <div className="bg-surface border border-line rounded-2xl p-5 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <h3 className="font-display font-bold text-base text-primary flex items-center gap-2">
          <Filter size={18} className="text-accent" /> ফিল্টার সমূহ
        </h3>
        <button
          onClick={onResetFilters}
          className="text-xs text-accent-2 hover:underline flex items-center gap-1 font-medium"
        >
          <RotateCcw size={12} /> রিসেট
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-2">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-sans">ক্যাটাগরি</h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
              selectedCategory === '' ? 'bg-accent/15 text-accent font-bold' : 'text-ink hover:bg-bg'
            }`}
          >
            <span>সব পণ্য (All Products)</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug ? 'bg-accent/15 text-accent font-bold' : 'text-ink hover:bg-bg'
              }`}
            >
              <span>{cat.bnName}</span>
              <span className="text-[10px] text-muted">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3 pt-3 border-t border-line">
        <div className="flex justify-between items-center text-xs">
          <h4 className="font-bold uppercase tracking-wider text-muted font-sans">সর্বোচ্চ দাম</h4>
          <span className="font-bold text-primary font-mono">৳{priceRange}</span>
        </div>
        <input
          type="range"
          min="150"
          max="1500"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted font-mono">
          <span>৳১৫০</span>
          <span>৳১৫০০</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2 pt-3 border-t border-line">
        <h4 className="font-bold text-xs uppercase tracking-wider text-muted font-sans">সর্বনিম্ন রেটিং</h4>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => setMinRating(rate)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                minRating === rate
                  ? 'bg-primary text-surface border-primary'
                  : 'bg-bg text-ink border-line hover:border-muted'
              }`}
            >
              {rate === 0 ? 'All' : `${rate}+ ★`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
