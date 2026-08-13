import React, { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 1000;
const REGULAR_DELIVERY_CHARGE = 60;

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      if (!product || !product.id) return state;
      const existingIndex = state.findIndex(item => item && item.product && item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...state];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...state, { product, quantity }];
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item && item.product && item.product.id !== action.payload);
    }
    case 'UPDATE_QTY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item && item.product && item.product.id !== productId);
      }
      return state.map(item =>
        item && item.product && item.product.id === productId ? { ...item, quantity } : item
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    case 'HYDRATE': {
      return action.payload || [];
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pb_cart');
        const parsed = saved ? JSON.parse(saved) : [];
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.product && item.product.id && typeof item.product.price === 'number');
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (!item || !item.product || typeof item.product.price !== 'number') return acc;
      return acc + item.product.price * (item.quantity || 1);
    }, 0);
  }, [cart]);

  const itemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  }, [cart]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return isFreeShipping ? 0 : REGULAR_DELIVERY_CHARGE;
  }, [cart, isFreeShipping]);

  const total = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        deliveryCharge,
        total,
        isFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
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
