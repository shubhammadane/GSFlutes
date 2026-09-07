import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], onQuickView, emptyMessage }) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-results-box">
        <h3>No Flutes Found</h3>
        <p>{emptyMessage || "We couldn't find any flutes matching your criteria. Try adjusting your filters or search terms."}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
