import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../components/PriceDisplay';

export default function Wishlist({ onQuickView }) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1, true);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container section-padding">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        <div className="empty-state-card" style={{ marginTop: '2rem' }}>
          <div className="empty-state-icon">
            <Heart size={40} color="#B93838" />
          </div>
          <h2 className="empty-state-title">Your wishlist is waiting for something special.</h2>
          <p className="empty-state-sub">
            Save your favorite bansuri scales here to review and purchase when you are ready.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Discover Flutes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <div style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem' }}>
            My <span style={{ color: 'var(--color-amber)' }}>Wishlist</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            You have {wishlistItems.length} handcrafted flute{wishlistItems.length > 1 ? 's' : ''} saved.
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          Clear Wishlist
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {wishlistItems.map((product) => (
          <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <ProductCard product={product} onQuickView={onQuickView} />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem' }}
                onClick={() => handleMoveToCart(product)}
              >
                <ShoppingBag size={14} /> Move to Cart
              </button>
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: '0.55rem', color: '#B93838', borderColor: '#D4C3B5' }}
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from Wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
