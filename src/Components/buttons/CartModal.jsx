// src/Components/UI/CartModal.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CartModal = ({ isOpen, onClose, product }) => {
  // ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-slate-100 p-1.5 text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600"
          >
            <FiX size={18} />
          </button>

          {/*  */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <FiCheckCircle className="text-4xl text-green-500" />
            </div>
          </div>

          {/*  */}
          <h3 className="mt-3 text-center text-lg font-bold text-slate-800">
            Added to Cart! 🎉
          </h3>
          <p className="text-center text-sm text-slate-500">
            Item has been added to your cart
          </p>

          {/*  */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-pink-50 p-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="line-clamp-1 text-sm font-semibold text-slate-800">
                {product.title}
              </h4>
              <p className="text-base font-bold text-pink-500">
                ৳{product.price}
              </p>
            </div>
          </div>

          {/*   */}
          <div className="mt-4 space-y-2.5">
            <Link
              href="/cart"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
            >
              View Cart
            </Link>
            <button
              onClick={onClose}
              className="w-full rounded-xl border-2 border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-pink-200 hover:bg-pink-50"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartModal;
