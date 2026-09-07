import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../data/config';
import { useToast } from './ToastContext';

const CartContext = createContext();

const CART_STORAGE_KEY = 'gsflutes_cart_v1';
const APPLIED_COUPON_KEY = 'gsflutes_applied_coupon_v1';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(APPLIED_COUPON_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(APPLIED_COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(APPLIED_COUPON_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon:', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, openDrawer = true) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });

    addToast(`"${product.name}" added to cart.`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart.`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Price calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const isFreeShipping = subtotal >= SITE_CONFIG.freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : SITE_CONFIG.shippingFlatRate;

  const remainingForFreeShipping = Math.max(
    0,
    SITE_CONFIG.freeShippingThreshold - subtotal
  );

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / SITE_CONFIG.freeShippingThreshold) * 100)
  );

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.discountPercentage) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = appliedCoupon.flatDiscount;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? shippingFee : 0));

  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = SITE_CONFIG.coupons.find((c) => c.code === cleanCode);

    if (!found) {
      addToast(`Invalid coupon code "${cleanCode}".`, 'error');
      return false;
    }

    if (subtotal < (found.minOrder || 0)) {
      addToast(`Minimum cart value of ₹${found.minOrder} required for ${cleanCode}.`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon "${cleanCode}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingFee,
        isFreeShipping,
        remainingForFreeShipping,
        freeShippingProgress,
        grandTotal,
        appliedCoupon,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
