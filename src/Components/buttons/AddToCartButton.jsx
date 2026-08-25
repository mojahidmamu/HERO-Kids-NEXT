// src/Components/UI/AddToCartButton.jsx
"use client";

import { useState } from "react";
import { useCart } from "@/src/Components/context/CartContext";
import { FiShoppingCart, FiCheck, FiLoader } from "react-icons/fi";
import CartModal from "./CartModal";

const AddToCartButton = ({ product, className = "" }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
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
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-600 to-rose-600 transition-transform duration-300 group-hover:translate-x-0" />
      </button>

      {/* Success Modal */}
      <CartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  );
};

export default AddToCartButton;
