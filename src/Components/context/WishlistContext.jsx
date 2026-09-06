// src/context/WishlistContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage থেকে উইশলিস্ট লোড করা
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist:", error);
        setWishlistItems([]);
      }
    }
    setIsLoading(false);
  }, []);

  // LocalStorage-এ উইশলিস্ট সেভ করা
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoading]);

  // উইশলিস্টে প্রোডাক্ট যোগ করা
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // ইতিমধ্যে থাকলে রিমুভ করবে (টগল)
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        // নতুন যোগ করবে
        toast.success(`${product.title} added to wishlist! ❤️`, {
          duration: 2000,
          position: "bottom-right",
          icon: "❤️",
        });
        return [...prevItems, product];
      }
    });
  };

  // উইশলিস্ট থেকে রিমুভ করা
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item) {
        toast.success(`${item.title} removed from wishlist`, {
          duration: 2000,
          position: "bottom-right",
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // চেক করা কোন প্রোডাক্ট উইশলিস্টে আছে কিনা
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // উইশলিস্ট ক্লিয়ার করা
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success("Wishlist cleared", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    isLoading,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
