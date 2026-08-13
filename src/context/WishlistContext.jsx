import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pb_wishlist');
        const parsed = saved ? JSON.parse(saved) : [];
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.id);
        }
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pb_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlist(prev => {
      const exists = prev.some(item => item && item.id === product.id);
      if (exists) {
        return prev.filter(item => item && item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some(item => item && item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item && item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
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
