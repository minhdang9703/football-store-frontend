import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.size === product.size && item.color.name === product.color.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size && item.color?.name === product.color?.name
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, { ...product, cartItemId: Date.now() }];
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    showNotification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
