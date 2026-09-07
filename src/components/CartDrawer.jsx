import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from './PriceDisplay';
import { SITE_CONFIG } from '../data/config';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    remainingForFreeShipping,
    freeShippingProgress,
    discountAmount,
    shippingFee,
    grandTotal
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h3>
            <ShoppingBag size={20} color="var(--color-amber)" />
            <span>Your Cart</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </h3>
          <button
            className="action-btn"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {cartItems.length > 0 && (
          <div className="free-shipping-progress-banner">
            <div className="progress-banner-text">
              <Truck size={15} color="var(--color-amber)" />
              {isFreeShipping ? (
                <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>
                  🎉 You unlocked Free Express Delivery!
                </span>
              ) : (
                <span>
                  Add <span className="highlight">{formatINR(remainingForFreeShipping)}</span> more for Free Shipping!
                </span>
              )}
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        {cartItems.length === 0 ? (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div className="empty-state-icon">
              <ShoppingBag size={36} />
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your cart is waiting for its first melody.</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Explore our handcrafted Indian bamboo flutes.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                closeCart();
                navigate('/shop');
              }}
            >
              Explore Flutes
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.images ? item.images[0] : item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="cart-item-title"
                    >
                      {item.name}
                    </Link>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <span className="cart-item-key">Key: {item.key} | {item.category}</span>

                  <div className="cart-item-bottom">
                    <div className="quantity-controller" style={{ scale: '0.85', transformOrigin: 'left center' }}>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-price">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-totals-row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="cart-totals-row" style={{ color: 'var(--color-success)' }}>
                <span>Discount</span>
                <span>-{formatINR(discountAmount)}</span>
              </div>
            )}

            <div className="cart-totals-row">
              <span>Shipping</span>
              <span>{isFreeShipping ? 'FREE' : formatINR(shippingFee)}</span>
            </div>

            <div className="cart-totals-row grand-total">
              <span>Total</span>
              <span>{formatINR(grandTotal)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline"
                style={{ width: '100%', padding: '0.65rem' }}
                onClick={handleViewCart}
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
