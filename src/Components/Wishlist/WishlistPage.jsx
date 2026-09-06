// src/Components/Wishlist/WishlistPage.jsx
"use client";

import { useWishlist } from "@/src/Components/context/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiArrowLeft,
  FiStar,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/src/Components/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  // লগইন না থাকলে লগইন পেজে রিডাইরেক্ট
  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/wishlist");
    return null;
  }

  // লোডিং স্টেট
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
          <p className="mt-4 text-slate-500">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // খালি উইশলিস্ট
  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="text-8xl">💔</div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-2 -top-2 text-2xl"
          >
            😢
          </motion.div>
        </motion.div>
        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-slate-500">
          Start saving your favorite items by clicking the heart icon ❤️
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* হেডার */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-slate-800">
              My Wishlist
              <span className="ml-2 text-sm font-normal text-slate-400">
                ({wishlistItems.length} items)
              </span>
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:shadow-md"
          >
            <FiTrash2 size={16} />
            Clear All
          </button>
        </div>

        {/* উইশলিস্ট গ্রিড */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((product, index) => (
              <WishlistCard
                key={product.id}
                product={product}
                index={index}
                onRemove={removeFromWishlist}
                onAddToCart={addToCart}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;

// ============================================
// উইশলিস্ট কার্ড কম্পোনেন্ট
// ============================================
const WishlistCard = ({ product, index, onRemove, onAddToCart }) => {
  const {
    id,
    title,
    image,
    price,
    discount = 0,
    ratings = 4.5,
    reviews = 0,
    sold = 0,
  } = product;

  // ডিসকাউন্ট প্রাইস
  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;
  const originalPrice = discount ? price : null;

  // স্টার রেটিং
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-200"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${title} added to cart! 🛒`, {
      duration: 2000,
      position: "bottom-right",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
    >
      {/* ইমেজ */}
      <Link href={`/products/${id}`} className="relative block overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* ডিসকাউন্ট ব্যাজ */}
          {discount > 0 && (
            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              -{discount}%
            </div>
          )}

          {/* সোল্ড ব্যাজ */}
          {sold > 0 && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
              🔥 {sold} sold
            </div>
          )}

          {/* রিমুভ বাটন (হোভার) */}
          <button
            onClick={() => onRemove(id)}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-red-50"
          >
            <FiX
              className="text-slate-600 transition-colors hover:text-red-500"
              size={18}
            />
          </button>
        </div>
      </Link>

      {/* কন্টেন্ট */}
      <div className="p-4">
        {/* রেটিং */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars(ratings)}
          </div>
          <span className="text-xs text-slate-400">({reviews})</span>
        </div>

        {/* টাইটেল */}
        <Link href={`/products/${id}`}>
          <h3 className="mt-1 line-clamp-2 font-semibold text-slate-800 transition-colors hover:text-pink-500">
            {title}
          </h3>
        </Link>

        {/* প্রাইস */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-pink-500">
            ৳{discountedPrice}
          </span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ৳{originalPrice}
            </span>
          )}
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-2 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center justify-center gap-1.5">
              <FiShoppingCart size={16} />
              Add to Cart
            </span>
          </button>
          <button
            onClick={() => onRemove(id)}
            className="rounded-xl border border-red-200 px-4 py-2 text-red-500 transition-all hover:bg-red-50 hover:shadow-md"
          >
            <FiHeart className="fill-red-500" size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
