// src/Components/UI/BuyNowButton.jsx
"use client";

import { useRouter } from "next/navigation"; 
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/src/Components/context/CartContext";

const BuyNowButton = ({ product, className = "" }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    // প্রোডাক্ট কার্টে যোগ করা
    addToCart(product);

    // কার্ট পেজে রিডাইরেক্ট
    router.push("/cart");
  };

  return (
    <button
      onClick={handleBuyNow}
      className={`group relative overflow-hidden rounded-2xl border-2 border-pink-200 bg-white px-8 py-3.5 font-bold text-pink-500 transition-all duration-300 hover:border-pink-500 hover:bg-pink-50 hover:shadow-lg hover:scale-105 ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <FiShoppingBag size={20} />
        Buy Now
      </span>

      {/* হোভার ইফেক্ট */}
      <div className="absolute inset-0 -translate-x-full bg-pink-50 transition-transform duration-300 group-hover:translate-x-0" />
    </button>
  );
};

export default BuyNowButton;
