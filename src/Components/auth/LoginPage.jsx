// src/Components/Auth/LoginPage.jsx
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FcGoogle,
  FiGithub,
  FiMail,
  FiLock,
  FiArrowRight,
  FiHome,
  FiAlertCircle
} from "react-icons/fi";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ইতিমধ্যে লগইন থাকলে রিডাইরেক্ট
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError("");
    try {
      await signIn(provider, { 
        callbackUrl: callbackUrl,
        redirect: true 
      });
    } catch (error) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  // লোডিং স্টেট
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // ইতিমধ্যে লগইন থাকলে কিছু দেখাবে না (রিডাইরেক্ট হবে)
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* ডেকোরেটিভ এলিমেন্টস */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/20 blur-3xl" />

      {/* ফ্লোটিং ডেকোরেশন */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-[10%] top-[20%] text-3xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute right-[12%] top-[25%] text-2xl"
      >
        🌟
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute left-[20%] bottom-[30%] text-2xl"
      >
        ⭐
      </motion.div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* কার্ড */}
          <div className="relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* হোম বাটন */}
            <Link
              href="/"
              className="absolute left-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition-all hover:bg-pink-100 hover:text-pink-500"
            >
              <FiHome size={20} />
            </Link>

            {/* লোগো */}
            <div className="flex justify-center">
              <div className="relative h-20 w-20">
                <Image
                  src="/assets/logo.png"
                  alt="Hero Kidz"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* হেডিং */}
            <div className="mt-4 text-center">
              <h1 className="text-3xl font-extrabold text-slate-800">
                Welcome Back! 👋
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue shopping
              </p>
            </div>

            {/* এরর মেসেজ */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600"
              >
                <FiAlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {/* সোশ্যাল লগইন বাটন */}
            <div className="mt-6 space-y-3">
              {/* Google Login */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-medium text-slate-700 transition-all hover:border-pink-300 hover:bg-pink-50 hover:shadow-lg disabled:opacity-70"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
                <FiArrowRight className="absolute right-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.button>

              {/* GitHub Login */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-medium text-slate-700 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg disabled:opacity-70"
              >
                <FiGithub size={24} />
                <span>Continue with GitHub</span>
                <FiArrowRight className="absolute right-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </motion.button>
            </div>

            {/* ডিভাইডার */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400">or continue with</span>
              </div>
            </div>

            {/* ইমেইল লগইন */}
            <div className="space-y-3">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <button className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl">
                Sign In
              </button>
            </div>

            {/* সাইনআপ লিংক */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-pink-500 hover:underline">
                Sign up
              </Link>
            </p>

            {/* ব্র্যান্ড */}
            <div className="mt-6 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Hero Kidz
              </p>
              <p className="mt-1 text-[9px] text-slate-300">Learn • Play • Grow</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;