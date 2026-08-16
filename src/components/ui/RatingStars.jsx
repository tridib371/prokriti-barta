import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RatingStars({ rating = 5, reviewCount, size = 16, className = '' }) {
  const { n } = useLanguage();
  
  // Calculate precise full, half, and empty stars
  const rounded = Math.round(rating * 2) / 2; // e.g. 5.0 -> 5 full; 4.5 -> 4 full + 1 half; 4.0 -> 4 full + 1 empty
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" size={size} className="fill-amber-400 text-amber-400" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-line" />
        ))}
      </div>
      <span className="text-xs font-semibold text-muted ml-0.5">
        {n(rating.toFixed(1))} {reviewCount !== undefined && `(${n(reviewCount)})`}
      </span>
    </div>
  );
}
