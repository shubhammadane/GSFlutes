import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import RatingStars from './RatingStars';
import PriceDisplay from './PriceDisplay';
import FluteAudioPlayer from './FluteAudioPlayer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, true);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
          />
        </Link>

        {/* Badges top-left */}
        <div className="card-badges">
          {product.discount > 0 && (
            <span className="badge badge-discount">-{product.discount}%</span>
          )}
          {product.bestseller && (
            <span className="badge badge-gold">
              <Sparkles size={11} /> Bestseller
            </span>
          )}
        </div>

        {/* Top-right wishlist button */}
        <div className="card-actions-top">
          <button
            type="button"
            className={`wishlist-toggle-btn ${isFavorited ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label="Save to Wishlist"
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              size={17}
              fill={isFavorited ? '#B93838' : 'none'}
              color={isFavorited ? '#B93838' : 'currentColor'}
            />
          </button>
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          className="quick-view-overlay-btn"
          onClick={handleQuickView}
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category-label">{product.category}</span>
          <span className="key-badge">Key: {product.key}</span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="product-card-title">{product.name}</h3>
        </Link>

        <div className="product-card-rating">
          <RatingStars rating={product.rating} size={13} showScore={false} />
          <span className="rating-count">({product.reviewsCount})</span>
        </div>

        {/* Compact audio pitch tester */}
        {product.audioFreq && (
          <FluteAudioPlayer
            frequency={product.audioFreq}
            fluteName={product.pitch || product.name}
            compact={true}
          />
        )}

        <p className="product-card-desc">{product.description}</p>

        <div className="product-card-footer">
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
