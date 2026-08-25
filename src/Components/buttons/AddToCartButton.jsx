// src/Components/UI/AddToCartButton.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart, FiCheck, FiLoader, FiLock } from "react-icons/fi";
import CartModal from "./CartModal";
import { motion } from "framer-motion";

const AddToCartButton = ({ product, className = "" }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();

  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = () => {
    // ✅ চেক: ইউজার লগইন আছে কিনা
    if (status === "unauthenticated") {
      setShowLoginPrompt(true);
      // 2 সেকেন্ড পরে লগইন পেজে রিডাইরেক্ট
      setTimeout(() => {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`,
        );
      }, 1500);
      return;
    }

    // লোডিং হলে কিছু করবে না
    if (status === "loading") return;

    // লগইন থাকলে কার্টে যোগ করো
    setIsLoading(true);

    setTimeout(() => {
      addToCart(product);
      setIsAdded(true);
      setIsLoading(false);
      setShowModal(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
    }, 500);
  };

  // লোডিং স্টেট
  if (status === "loading") {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 rounded-2xl bg-slate-200 px-6 py-3.5 font-bold text-slate-400 ${className}`}
      >
        <FiLoader className="animate-spin" size={20} />
        Loading...
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isLoading || isAdded}
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <FiLoader className="animate-spin" size={20} />
              Adding...
            </>
          ) : isAdded ? (
            <>
              <FiCheck size={20} />
              Added!
            </>
          ) : (
            <>
              <FiShoppingCart size={20} />
              Add to Cart
            </>
          )}
        </span>

        {/* হোভার ইফেক্ট */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-600 to-rose-600 transition-transform duration-300 group-hover:translate-x-0" />
      </button>

      {/* লগইন প্রম্পট (সিম্পল টুলটিপ) */}
      {showLoginPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-2xl ring-1 ring-pink-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
              <FiLock className="text-pink-500" size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Please Login First</p>
              <p className="text-sm text-slate-500">
                Redirecting to login page...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* সাকসেস মডেল */}
      <CartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  );
};

export default AddToCartButton;
