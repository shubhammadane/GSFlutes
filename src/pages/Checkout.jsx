import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Info
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { formatINR } from '../components/PriceDisplay';

export default function Checkout() {
  const { cartItems, subtotal, discountAmount, shippingFee, grandTotal, isFreeShipping, clearCart } = useCart();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    country: 'India',
    paymentMethod: 'upi',
    upiId: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    netBank: 'HDFC Bank'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const indianStates = [
    'Maharashtra', 'Karnataka', 'Delhi', 'Gujarat', 'Tamil Nadu',
    'Uttar Pradesh', 'Rajasthan', 'Telangana', 'West Bengal', 'Kerala',
    'Madhya Pradesh', 'Punjab', 'Haryana', 'Bihar', 'Goa', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Please enter a valid 10-digit phone number';
    if (!formData.address.trim()) errs.address = 'Please enter your delivery street address';
    if (!formData.city.trim()) errs.city = 'Please enter your city';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = 'Please enter a valid 6-digit Pincode';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `GS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cartItems],
        total: grandTotal,
        customer: { ...formData },
        deliveryDays: '3-5 Business Days'
      };

      setConfirmedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // ORDER SUCCESS CONFIRMATION SCREEN
  if (confirmedOrder) {
    return (
      <div className="container" style={{ padding: '3rem 0 5rem' }}>
        <div className="order-success-screen">
          <div className="success-icon-wrap">
            <CheckCircle size={44} />
          </div>

          <h1 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
            Order Confirmed!
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            “Thank you for choosing GSFlutes. Your musical journey starts here.”
          </p>

          <div className="order-id-badge">
            <Sparkles size={16} />
            <span>Order ID: <strong>{confirmedOrder.orderId}</strong></span>
          </div>

          <div className="tracking-timeline-box">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Order &amp; Acoustic Verification Status
            </h4>
            <div className="timeline-step-row">
              <div className="step-dot" />
              <div>
                <strong>Order Placed &amp; Logged</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We received your order specifications.</p>
              </div>
            </div>
            <div className="timeline-step-row">
              <div className="step-dot" style={{ background: '#C5A059' }} />
              <div>
                <strong>440Hz Master Acoustic Tuning Check</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Flutes will be tested by our tuner before dispatch.</p>
              </div>
            </div>
            <div className="timeline-step-row">
              <div className="step-dot" style={{ background: '#D4C3B5' }} />
              <div>
                <strong>Secured PVC Tube Packaging &amp; Express Dispatch</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated delivery in {confirmedOrder.deliveryDays}.</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem' }}>
            <div><strong>Recipient:</strong> {confirmedOrder.customer.fullName} ({confirmedOrder.customer.phone})</div>
            <div style={{ marginTop: '0.3rem' }}><strong>Shipping to:</strong> {confirmedOrder.customer.address}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state} — {confirmedOrder.customer.pincode}</div>
            <div style={{ marginTop: '0.3rem' }}><strong>Payment:</strong> {confirmedOrder.customer.paymentMethod.toUpperCase()} (Demo Paid: {formatINR(confirmedOrder.total)})</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary">
              Explore More Instruments <ArrowRight size={16} />
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmed order
  if (cartItems.length === 0) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Your Checkout is Empty</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Please add a bansuri flute to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">
          Explore Flutes
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-section container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb items={[{ label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />
      </div>

      <h1 style={{ fontSize: '2.4rem', marginBottom: '2rem' }}>
        Checkout &amp; <span style={{ color: 'var(--color-amber)' }}>Shipping</span>
      </h1>

      <div className="checkout-grid">
        {/* LEFT: CHECKOUT FORM */}
        <form onSubmit={handlePlaceOrder} className="checkout-form-container">
          {/* STEP 1: CUSTOMER INFO */}
          <div className="checkout-step-card">
            <h3 className="checkout-step-title">
              <span className="step-num-badge">1</span>
              <span>Customer Information</span>
            </h3>

            <div className="form-group">
              <label className="form-label">Full Name <span className="req">*</span></label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (for SMS Tracking) <span className="req">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* STEP 2: SHIPPING ADDRESS */}
          <div className="checkout-step-card">
            <h3 className="checkout-step-title">
              <span className="step-num-badge">2</span>
              <span>Shipping Address</span>
            </h3>

            <div className="form-group">
              <label className="form-label">Street Address &amp; Flat / House No. <span className="req">*</span></label>
              <input
                type="text"
                name="address"
                placeholder="e.g. Flat 402, Lotus Residency, MG Road"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <span className="form-error-msg">{errors.address}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">City <span className="req">*</span></label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Pune"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <span className="form-error-msg">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">State <span className="req">*</span></label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Pincode <span className="req">*</span></label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="e.g. 411001"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
                {errors.pincode && <span className="form-error-msg">{errors.pincode}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  disabled
                  style={{ background: 'var(--bg-secondary)', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="checkout-step-card">
            <h3 className="checkout-step-title">
              <span className="step-num-badge">3</span>
              <span>Payment Method</span>
            </h3>

            <div className="payment-methods-grid">
              {/* Option 1: UPI */}
              <div
                className={`payment-tab-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'upi' }))}
              >
                <QrCode size={24} color="var(--color-amber)" />
                <div>
                  <div className="payment-tab-title">UPI / QR Code</div>
                  <div className="payment-tab-sub">GPay, PhonePe, Paytm</div>
                </div>
              </div>

              {/* Option 2: Card */}
              <div
                className={`payment-tab-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
              >
                <CreditCard size={24} color="var(--color-amber)" />
                <div>
                  <div className="payment-tab-title">Debit / Credit Card</div>
                  <div className="payment-tab-sub">Visa, Mastercard, RuPay</div>
                </div>
              </div>

              {/* Option 3: Net Banking */}
              <div
                className={`payment-tab-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'netbanking' }))}
              >
                <Building size={24} color="var(--color-amber)" />
                <div>
                  <div className="payment-tab-title">Net Banking</div>
                  <div className="payment-tab-sub">All Indian Major Banks</div>
                </div>
              </div>

              {/* Option 4: COD */}
              <div
                className={`payment-tab-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
              >
                <Banknote size={24} color="var(--color-amber)" />
                <div>
                  <div className="payment-tab-title">Cash on Delivery</div>
                  <div className="payment-tab-sub">Pay upon secure delivery</div>
                </div>
              </div>
            </div>

            {/* Payment Details Container */}
            <div className="payment-details-box">
              {formData.paymentMethod === 'upi' && (
                <div className="upi-demo-content">
                  <div className="upi-apps-icons">
                    <span className="upi-app-pill">Google Pay</span>
                    <span className="upi-app-pill">PhonePe</span>
                    <span className="upi-app-pill">Paytm</span>
                    <span className="upi-app-pill">BHIM UPI</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Enter UPI ID (VPA)</label>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="e.g. mobile@okaxis, yourname@upi"
                      value={formData.upiId}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'card' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="•••• •••• •••• ••••"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Expiry MM/YY</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        name="cardCvv"
                        placeholder="•••"
                        maxLength={4}
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'netbanking' && (
                <div className="form-group">
                  <label className="form-label">Select Bank</label>
                  <select
                    name="netBank"
                    value={formData.netBank}
                    onChange={handleInputChange}
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Cash on delivery is available for your address. Please keep exact cash ready at the time of delivery.
                </div>
              )}

              {/* Demo Mode Notice */}
              <div className="demo-payment-alert">
                <Info size={18} />
                <span>
                  <strong>Demo Mode:</strong> This is a secure frontend checkout preview. No real money will be deducted upon clicking "Place Order".
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying & Placing Order...' : `Place Order — ${formatINR(grandTotal)}`}
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <aside className="order-summary-card">
          <h3>Your Order ({cartItems.reduce((a, i) => a + i.quantity, 0)})</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={item.images ? item.images[0] : item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} × {formatINR(item.price)}</div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800' }}>
                  {formatINR(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-line" style={{ color: 'var(--color-success)' }}>
              <span>Discount</span>
              <span>-{formatINR(discountAmount)}</span>
            </div>
          )}

          <div className="summary-line">
            <span>Shipping</span>
            <span>{isFreeShipping ? 'FREE' : formatINR(shippingFee)}</span>
          </div>

          <div className="summary-line total-line">
            <span>Grand Total</span>
            <span>{formatINR(grandTotal)}</span>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--color-amber)" />
              <span>Acoustic tuning check included with every flute</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <Truck size={16} color="var(--color-amber)" />
              <span>Hard PVC travel casing for 100% damage-free shipping</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
