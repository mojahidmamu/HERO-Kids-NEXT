// src/Components/Home/Banner.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiGift,
  FiStar,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";  

const Banner = () => {
  //  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-pink-50 shadow-xl">
      {/*  */}
      <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl animate-pulse" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-purple-200/20 blur-3xl animate-pulse" />

      {/*  */}
      <motion.div
        className="absolute left-[8%] top-24 text-3xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute right-[8%] top-20 text-3xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute left-[45%] top-12 text-2xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
      >
        🌟
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/*   */}
          <motion.div
            className="z-10 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            {/*   */}
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="animate-pulse">🔥</span>
              New Arrivals 2026
            </motion.div>

            {/*   */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Big Dreams,
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Little Smiles
              </span>
            </motion.h1>

            {/*   */}
            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Discover amazing toys, books, clothes and everything your little
              ones need to learn, play and grow happily.
            </motion.p>

            {/*   */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {[
                {
                  icon: FiShield,
                  title: "Safe & Non-Toxic",
                  sub: "Kid Friendly",
                  color: "purple",
                },
                {
                  icon: FiGift,
                  title: "Best Gifts",
                  sub: "For Kids",
                  color: "blue",
                },
                {
                  icon: FiStar,
                  title: "Premium Quality",
                  sub: "Carefully Selected",
                  color: "green",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-${item.color}-100 text-${item.color}-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/*   */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3.5 text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  Shop Now
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-600 to-rose-600 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>

              <Link
                href="/categories"
                className="group rounded-full border-2 border-pink-200 bg-white/80 px-8 py-3.5 text-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:bg-pink-50 hover:shadow-lg"
              >
                <span className="font-semibold">Explore Collections</span>
              </Link>
            </motion.div>

            {/*   */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="mt-6 inline-flex items-center gap-4 rounded-2xl border-2 border-orange-200 bg-white/80 px-5 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-orange-400 hover:shadow-xl"
            >
              <div className="text-4xl animate-bounce">🚀</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                  Special Offer
                </p>
                <p className="text-xl font-extrabold text-slate-800">
                  Up to 30% OFF
                </p>
                <p className="text-xs text-slate-500">On selected items</p>
              </div>
            </motion.div>
          </motion.div>

          {/*   */}
          <motion.div
            className="relative flex min-h-[350px] items-center justify-center lg:min-h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/*   */}
            <motion.div
              className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-r from-yellow-200 to-pink-200 blur-2xl sm:h-[380px] sm:w-[380px] lg:h-[450px] lg:w-[450px]"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/*   */}
            <motion.div
              className="relative z-10 w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/assets/hero.png"
                alt="Happy kids playing with toys"
                width={800}
                height={600}
                priority
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/*   */}
            <motion.div
              className="absolute -right-2 top-4 z-20 rounded-3xl border-4 border-dashed border-white bg-gradient-to-br from-pink-500 to-rose-500 px-4 py-3 text-center text-white shadow-2xl sm:right-4 sm:top-8"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <p className="text-lg font-extrabold">😊 Happiness</p>
              <p className="text-xs">Delivered to</p>
              <p className="text-sm font-bold text-yellow-200">Your Doorstep</p>
            </motion.div>

            {/*   */}
            <motion.div
              className="absolute -left-2 bottom-5 z-20 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-2xl backdrop-blur-sm sm:left-4"
              animate={{
                y: [0, -8, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                <FiTruck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Fast Delivery
                </p>
                <p className="text-xs text-slate-500">Right to your door</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/*  */}
        <motion.div
          className="relative z-20 mt-8 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white shadow-2xl sm:grid-cols-4 sm:gap-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: FiTruck, title: "Fast Delivery", sub: "On Time" },
            { icon: FiClock, title: "Easy Returns", sub: "Hassle Free" },
            { icon: FiShield, title: "24/7 Support", sub: "We're Here" },
            { icon: FiGift, title: "Secure Payment", sub: "100% Safe" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              className={`flex items-center justify-center gap-3 p-3 ${idx < 3 ? "border-r border-white/20" : ""}`}
            >
              <item.icon size={22} className="text-yellow-300" />
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-white/70">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
