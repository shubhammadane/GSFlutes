import React from 'react';

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function PriceDisplay({ price, oldPrice, size = 'md' }) {
  const isLarge = size === 'lg';
  return (
    <div className="price-wrap">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          className="price-current"
          style={{ fontSize: isLarge ? '2rem' : '1.25rem', color: 'var(--text-main)' }}
        >
          {formatINR(price)}
        </span>
        {oldPrice && oldPrice > price && (
          <span
            className="price-old"
            style={{ fontSize: isLarge ? '1.1rem' : '0.85rem' }}
          >
            {formatINR(oldPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
