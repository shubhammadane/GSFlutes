import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Truck, Tag, X, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { formatINR } from '../components/PriceDisplay';
import { SITE_CONFIG } from '../data/config';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    isFreeShipping,
    remainingForFreeShipping,
    freeShippingProgress,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
      setCouponCodeInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container cart-page-section">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <div className="empty-state-card" style={{ marginTop: '2rem' }}>
          <div className="empty-state-icon">
            <ShoppingBag size={42} />
          </div>
          <h2 className="empty-state-title">Your cart is waiting for its first melody.</h2>
          <p className="empty-state-sub">
            Explore our handcrafted Indian bamboo flutes calibrated for every musical journey.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore Flutes <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-section container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
      </div>

      <h1 style={{ fontSize: '2.4rem', marginBottom: '2rem' }}>
        Shopping <span style={{ color: 'var(--color-amber)' }}>Cart</span>
      </h1>

      <div className="cart-page-grid">
        {/* LEFT: CART ITEMS */}
        <div>
          <div className="cart-table-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                Cart Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
              <button
                type="button"
                onClick={clearCart}
                style={{ fontSize: '0.82rem', color: '#B93838', fontWeight: '600' }}
              >
                Clear All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row" style={{ gridTemplateColumns: '90px 1fr' }}>
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <Link
                          to={`/product/${item.slug}`}
                          className="cart-item-title"
                          style={{ fontSize: '1.05rem' }}
                        >
                          {item.name}
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                          Scale Key: <strong>{item.key}</strong> | {item.category}
                        </div>
                      </div>

                      <button
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="cart-item-bottom" style={{ marginTop: '1.25rem' }}>
                      <div className="quantity-controller">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                          {formatINR(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {formatINR(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link
              to="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-amber)', fontWeight: '600' }}
            >
              <ArrowLeft size={16} /> Continue Exploring More Flutes
            </Link>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY CARD */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>

          {/* Free Shipping Progress */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              <Truck size={16} color="var(--color-amber)" />
              {isFreeShipping ? (
                <span style={{ color: 'var(--color-success)' }}>Free Delivery Unlocked!</span>
              ) : (
                <span>Add {formatINR(remainingForFreeShipping)} more for Free Shipping</span>
              )}
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${freeShippingProgress}%` }} />
            </div>
          </div>

          {/* Lines */}
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          {appliedCoupon && (
            <div className="summary-line" style={{ color: 'var(--color-success)' }}>
              <span>Coupon Discount ({appliedCoupon.code})</span>
              <span>-{formatINR(discountAmount)}</span>
            </div>
          )}

          <div className="summary-line">
            <span>Shipping</span>
            <span>{isFreeShipping ? 'FREE' : formatINR(shippingFee)}</span>
          </div>

          <div className="summary-line total-line">
            <span>Estimated Total</span>
            <span>{formatINR(grandTotal)}</span>
          </div>

          {/* Coupon Input */}
          <div className="coupon-box">
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Tag size={13} color="var(--color-amber)" /> Have a Promo Code?
            </span>

            {appliedCoupon ? (
              <div className="applied-coupon-tag">
                <span>{appliedCoupon.code} Applied</span>
                <X size={15} style={{ cursor: 'pointer' }} onClick={removeCoupon} />
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <input
                  type="text"
                  placeholder="e.g. FIRST10, GSFLUTE200"
                  className="coupon-input"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                >
                  Apply
                </button>
              </form>
            )}
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Try <strong>FIRST10</strong> for 10% off or <strong>GSFLUTE200</strong> on orders &gt; ₹1,499.
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowRight size={17} />
          </button>
        </aside>
      </div>
    </div>
  );
}
