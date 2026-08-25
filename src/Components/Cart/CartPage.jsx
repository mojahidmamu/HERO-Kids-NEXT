// src/Components/Cart/CartPage.jsx
"use client";

import { useCart } from "@/src/Components/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiArrowLeft,
  FiTrash2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const deliveryCharge = totalPrice > 1000 ? 0 : 50;
  const totalWithDelivery = totalPrice + deliveryCharge;

  // 
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="text-8xl">🛒</div>
        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Your cart is empty
        </h2>
        <p className="mt-2 text-slate-500">
          Looks like you haven't added any items yet
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
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
            My Cart
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({totalItems} items)
            </span>
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:shadow-md"
        >
          <FiTrash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/*  */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/*   */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>

            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-semibold text-slate-800">
                  ৳{totalPrice}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery Charge</span>
                <span className="font-semibold text-slate-800">
                  {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-slate-800">Total</span>
                  <span className="text-pink-500">৳{totalWithDelivery}</span>
                </div>
              </div>
            </div>

            {/*   */}
            <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiTruck className="text-pink-500" />
                <span>
                  {deliveryCharge === 0
                    ? "Free Delivery"
                    : `Delivery Charge: ৳${deliveryCharge}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiShield className="text-pink-500" />
                <span>Safe & Secure Shopping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiRefreshCw className="text-pink-500" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/*   */}
            <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
 


// Cart Item page in smae file:  
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const {
    id,
    title,
    image,
    price,
    quantity,
    discount = 0,
    ratings = 4.5,
    reviews = 0,
  } = item;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;
  const totalPrice = discountedPrice * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:shadow-lg sm:flex-row sm:items-center"
    >
      {/*  */}
      <Link href={`/products/${id}`} className="flex-shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            width={96}
            height={96}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>

      {/*   */}
      <div className="flex-1 space-y-1">
        <Link href={`/products/${id}`}>
          <h3 className="line-clamp-1 font-semibold text-slate-800 transition-colors hover:text-pink-500">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(ratings)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">({reviews})</span>
        </div>
      </div>

      {/*   */}
      <div className="flex items-center gap-4 sm:ml-auto">
        
        <div className="min-w-[80px] text-right">
          <span className="text-lg font-bold text-pink-500">৳{totalPrice}</span>
          {discount > 0 && (
            <span className="ml-2 text-xs text-slate-400 line-through">
              ৳{price * quantity}
            </span>
          )}
        </div>

         
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-pink-100 hover:text-pink-500"
          >
            <FiMinus size={16} />
          </button>
          <span className="w-8 text-center font-semibold text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-pink-100 hover:text-pink-500"
          >
            <FiPlus size={16} />
          </button>
        </div>

        
        <button
          onClick={() => onRemove(id)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};
 

const FiStar = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
