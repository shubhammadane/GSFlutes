import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import PriceDisplay, { formatINR } from './PriceDisplay';
import FluteAudioPlayer from './FluteAudioPlayer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Images */}
          <div>
            <div className="main-image-display" style={{ marginBottom: '1rem' }}>
              <img src={product.images[selectedImg] || product.images[0]} alt={product.name} />
            </div>
            {product.images.length > 1 && (
              <div className="gallery-thumbs">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-item ${selectedImg === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImg(idx)}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold">Key {product.key}</span>
              <span className="badge badge-dark">{product.category}</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.6rem' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <RatingStars rating={product.rating} size={15} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({product.reviewsCount} verified reviews)</span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="md" />
            </div>

            {product.audioFreq && (
              <div style={{ marginBottom: '1.25rem' }}>
                <FluteAudioPlayer frequency={product.audioFreq} fluteName={product.pitch || product.name} compact={true} />
              </div>
            )}

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="quantity-controller">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={17} /> Add to Cart — {formatINR(product.price * quantity)}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={15} fill={isFavorited ? '#B93838' : 'none'} color={isFavorited ? '#B93838' : 'currentColor'} />
                {isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-amber)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Full Product Page <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
