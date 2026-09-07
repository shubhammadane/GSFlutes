import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Award,
  Package,
  CheckCircle2,
  Volume2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import RatingStars from '../components/RatingStars';
import PriceDisplay, { formatINR } from '../components/PriceDisplay';
import FluteAudioPlayer from '../components/FluteAudioPlayer';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { REVIEWS_DATA } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetails({ onQuickView }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>
          The bansuri flute you are looking for might have been moved or is currently unavailable.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore All Flutes
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  return (
    <div className="product-details-container container">
      {/* Breadcrumb */}
      <div style={{ marginBottom: '2rem' }}>
        <Breadcrumb
          items={[
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/shop?category=${encodeURIComponent(product.category)}` },
            { label: product.name }
          ]}
        />
      </div>

      <div className="product-details-grid">
        {/* LEFT: IMAGE GALLERY */}
        <div className="product-gallery">
          <div className="main-image-display">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
            />
            {product.discount > 0 && (
              <span
                className="badge badge-discount"
                style={{ position: 'absolute', top: 16, left: 16, fontSize: '0.85rem' }}
              >
                -{product.discount}% OFF
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumb-item ${selectedImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS & ACTIONS */}
        <div className="product-info-panel">
          <div className="product-badges-row">
            <span className="badge badge-gold">Key {product.key}</span>
            <span className="badge badge-dark">{product.category}</span>
            {product.bestseller && (
              <span className="badge badge-gold">
                <Sparkles size={12} /> Bestseller
              </span>
            )}
            <span style={{ fontSize: '0.82rem', color: 'var(--color-success)', fontWeight: '700', marginLeft: 'auto' }}>
              ● {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Low Stock'}
            </span>
          </div>

          <h1 className="product-page-title">{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <RatingStars rating={product.rating} size={16} />
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ({product.reviewsCount} customer reviews)
            </span>
          </div>

          {/* Price Block */}
          <div className="product-page-price-block">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span className="price-main">{formatINR(product.price)}</span>
              {product.oldPrice && (
                <span className="price-original">{formatINR(product.oldPrice)}</span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="save-badge">Save {product.discount}% Today</span>
            )}
          </div>

          {/* Audio Pitch Synthesizer */}
          {product.audioFreq && (
            <FluteAudioPlayer
              frequency={product.audioFreq}
              fluteName={product.pitch || product.name}
            />
          )}

          {/* Short description */}
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Key Specs Chips */}
          <div className="product-key-specs-grid">
            <div className="spec-chip">
              <span className="spec-chip-label">Key / Scale</span>
              <span className="spec-chip-val">{product.key} Natural</span>
            </div>
            <div className="spec-chip">
              <span className="spec-chip-label">Length</span>
              <span className="spec-chip-val">{product.approxLength}</span>
            </div>
            <div className="spec-chip">
              <span className="spec-chip-label">Bamboo Material</span>
              <span className="spec-chip-val">Seasoned Assam Cane</span>
            </div>
            <div className="spec-chip">
              <span className="spec-chip-label">Tuning Calibration</span>
              <span className="spec-chip-val">A=440Hz Classical</span>
            </div>
          </div>

          {/* Actions & Quantity */}
          <div className="product-actions-form">
            <div className="quantity-and-add">
              <div className="quantity-controller">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
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
                <ShoppingBag size={18} />
                <span>Add to Cart — {formatINR(product.price * quantity)}</span>
              </button>

              <button
                type="button"
                className={`btn btn-outline btn-icon-only ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart
                  size={18}
                  fill={isFavorited ? '#B93838' : 'none'}
                  color={isFavorited ? '#B93838' : 'currentColor'}
                />
              </button>
            </div>

            <button
              type="button"
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              Buy Now with 1-Click Express Checkout
            </button>
          </div>

          {/* Trust assurances */}
          <div className="product-trust-list">
            <div className="trust-item-mini">
              <Truck size={20} />
              <span>Free Express Delivery Above ₹999</span>
            </div>
            <div className="trust-item-mini">
              <ShieldCheck size={20} />
              <span>100% 440Hz Master Tuned</span>
            </div>
            <div className="trust-item-mini">
              <Package size={20} />
              <span>Heavy Duty PVC Transit Tube</span>
            </div>
            <div className="trust-item-mini">
              <Award size={20} />
              <span>Includes Flute Carry Sleeve</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL TABS: Specifications & Extended Info */}
      <section style={{ marginTop: '4.5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2.5rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            style={{
              paddingBottom: '1rem',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: activeTab === 'description' ? 'var(--color-amber)' : 'var(--text-muted)',
              borderBottom: activeTab === 'description' ? '2.5px solid var(--color-amber)' : 'none'
            }}
          >
            Craft Details &amp; Acoustic Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            style={{
              paddingBottom: '1rem',
              fontSize: '1.15rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: activeTab === 'specs' ? 'var(--color-amber)' : 'var(--text-muted)',
              borderBottom: activeTab === 'specs' ? '2.5px solid var(--color-amber)' : 'none'
            }}
          >
            Technical Specifications
          </button>
        </div>

        {activeTab === 'description' ? (
          <div style={{ maxWidth: '850px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Art of the {product.name}</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {product.longDescription}
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Our bamboo is sourced exclusively from mature groves in Assam where climate and elevation produce dense, thick-walled cane with resonant acoustic fibers. Each piece is naturally seasoned under shade to prevent cracking and warping, creating an instrument that lasts for generations of musical practice.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: '750px' }}>
            <table className="specs-table">
              <tbody>
                {product.specifications.map((spec, i) => (
                  <tr key={i}>
                    <td className="spec-name">{spec.label}</td>
                    <td className="spec-val">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* RELATED FLUTES */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '5.5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section-header">
            <span className="section-tag">Explore More</span>
            <h2 className="section-title">
              Related <span className="gold-text">Flutes</span>
            </h2>
            <p className="section-subtitle">
              Complementary scales and companion flutes from the {product.category} collection.
            </p>
          </div>
          <ProductGrid products={relatedProducts} onQuickView={onQuickView} />
        </section>
      )}
    </div>
  );
}
