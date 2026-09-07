import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'gsflutes_wishlist_v1';

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading wishlist from localStorage:', e);
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Error saving wishlist to localStorage:', e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist.`, 'info');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist.`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlistItems.find((p) => p.id === productId);
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
    if (item) {
      addToast(`Removed "${item.name}" from wishlist.`, 'info');
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    addToast('Wishlist cleared.', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
