// src/Components/Profile/ProfilePage.jsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiLogOut,
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiArrowRight,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useCart } from "@/src/Components/context/CartContext";
import { useWishlist } from "@/src/Components/context/WishlistContext";
import { useEffect, useState } from "react";
import { usePayments } from "../context/PaymentContext";

const ProfilePage = () => {
  // ✅ সব হুক একসাথে, শুরুতেই
  const { data: session, status } = useSession();
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { wishlistItems } = useWishlist();

  const [memberSince, setMemberSince] = useState("");

  const { payments } = usePayments();
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  // ✅ useEffect - শর্তহীনভাবে কল হবে, কিন্তু ভিতরে শর্ত দিয়ে কাজ করবে
  useEffect(() => {
    if (status === "authenticated") {
      const storedDate = localStorage.getItem("memberSince");
      if (storedDate) {
        setMemberSince(storedDate);
      } else {
        const now = new Date();
        const options = { year: "numeric", month: "long" };
        const formattedDate = now.toLocaleDateString("en-US", options);
        localStorage.setItem("memberSince", formattedDate);
        setMemberSince(formattedDate);
      }
    }
  }, [status]); // status পরিবর্তন হলে রান হবে

  // ✅ এখন early return গুলো সব হুকের পরে আসবে
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
          <p className="mt-4 text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const user = session?.user;
  const { name, email, image } = user || {};

  const orders = getTotalItems();
  const wishlistCount = wishlistItems.length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/20 blur-3xl" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-[5%] top-[15%] text-3xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute right-[8%] top-[20%] text-2xl"
      >
        🌟
      </motion.div>
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg"
          >
            <FiHome className="transition-transform group-hover:scale-110" />
            Home
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white hover:shadow-lg"
          >
            <FiLogOut className="transition-transform group-hover:scale-110" />
            Logout
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="relative h-32 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 sm:h-48">
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 sm:left-12 sm:-translate-x-0">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:h-32 sm:w-32">
                <Image
                  src={image || "/assets/default-avatar.png"}
                  alt={name || "User"}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-lg backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <FaGoogle className="text-red-500" />
                Google Account
              </span>
            </div>
          </div>

          <div className="mt-16 px-6 pb-8 sm:mt-20 sm:px-8">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                {name || "User"}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-2 text-slate-500 sm:justify-start">
                <FiMail size={16} />
                {email || "No email provided"}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-pink-50 p-4 text-center transition-all hover:shadow-md">
                <p className="text-2xl font-bold text-pink-500">{orders}</p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
              <div className="rounded-2xl bg-purple-50 p-4 text-center transition-all hover:shadow-md">
                <p className="text-2xl font-bold text-purple-500">
                  {wishlistCount}
                </p>
                <p className="text-sm text-slate-600">Wishlist Items</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4 text-center transition-all hover:shadow-md">
                <p className="text-2xl font-bold text-blue-500">★ 4.8</p>
                <p className="text-sm text-slate-600">Rating</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-pink-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                  <FiUser size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Full Name
                  </p>
                  <p className="font-semibold text-slate-800">
                    {name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-pink-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
                  <FiMail size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Email
                  </p>
                  <p className="font-semibold text-slate-800">
                    {email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-pink-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-500">
                  <FiCalendar size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Member Since
                  </p>
                  <p className="font-semibold text-slate-800">
                    {memberSince || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-pink-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-500">
                  <FaGoogle size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Provider
                  </p>
                  <p className="font-semibold text-slate-800">Google OAuth</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cart"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
              >
                <FiShoppingBag size={20} />
                My Orders
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-pink-200 bg-white px-6 py-3 font-bold text-pink-500 transition-all hover:border-pink-500 hover:bg-pink-50 hover:shadow-lg"
              >
                <FiHeart size={20} />
                Wishlist
              </Link>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Hero Kidz
              </p>
              <p className="mt-1 text-[9px] text-slate-300">
                Learn • Play • Grow
              </p>
            </div>
          </div>
        </motion.div>
      </div>



      {/* Add this section after the stats grid: */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          💳 Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-8 text-center">
            <FiCreditCard className="mx-auto text-4xl text-slate-300" />
            <p className="mt-2 text-slate-500">No payments yet</p>
            <p className="text-sm text-slate-400">
              Your payment history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((payment, index) => (
              <div
                key={payment.id || index}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <FiCheckCircle size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {payment.itemCount} item(s)
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(payment.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-pink-500">৳{payment.amount}</p>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
