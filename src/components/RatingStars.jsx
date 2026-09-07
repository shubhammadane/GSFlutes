import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({ rating = 5, size = 14, showScore = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="#C5A059" color="#C5A059" />
      ))}
      {hasHalfStar && <StarHalf size={size} fill="#C5A059" color="#C5A059" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} color="#D4C3B5" />
      ))}
      {showScore && (
        <span style={{ fontSize: '0.8rem', fontWeight: '700', marginLeft: '4px', color: 'var(--text-main)' }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
