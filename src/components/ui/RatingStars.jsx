import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RatingStars({ rating = 5, reviewCount, size = 16, className = '' }) {
  const { n } = useLanguage();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`inline-flex items-center gap-1 text-accent ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-accent text-accent" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="fill-accent text-accent" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-muted/30" />
        ))}
      </div>
      <span className="text-xs font-medium text-muted ml-0.5">
        {n(rating.toFixed(1))} {reviewCount !== undefined && `(${n(reviewCount)})`}
      </span>
    </div>
  );
}
