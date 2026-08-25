// src/context/CartContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage থেকে কার্ট লোড করা
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
        setCartItems([]);
      }
    }
    setIsLoading(false);
  }, []);

  // LocalStorage-এ কার্ট সেভ করা
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // কার্টে আইটেম যোগ করা
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // আইটেম থাকলে quantity বাড়ানো
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // নতুন আইটেম যোগ করা
        return [...prevItems, { ...product, quantity }];
      }
    });

    // সাকসেস মেসেজ
    toast.success(`${product.title} added to cart!`, {
      duration: 3000,
      position: "bottom-right",
      icon: "🛒",
    });
  };

  // কার্ট থেকে আইটেম রিমুভ করা
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
    toast.success("Item removed from cart", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  // আইটেমের quantity আপডেট করা
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // কার্ট ক্লিয়ার করা
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  // কার্টের মোট আইটেম সংখ্যা
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // কার্টের মোট মূল্য
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
