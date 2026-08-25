"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiHome, FiShoppingBag, FiSearch } from "react-icons/fi";

const Error404 = () => {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-16">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pink Blob */}
        <div
          className="
            absolute -left-24 -top-24
            h-72 w-72
            rounded-full
            bg-pink-200/40
            blur-3xl
            animate-pulse
          "
        />

        {/* Purple Blob */}
        <div
          className="
            absolute -bottom-32 -right-20
            h-80 w-80
            rounded-full
            bg-purple-200/40
            blur-3xl
            animate-pulse
          "
        />

        {/* Floating Stars */}
        <span className="absolute left-[12%] top-[20%] text-3xl animate-bounce">
          ⭐
        </span>

        <span className="absolute right-[15%] top-[25%] text-2xl animate-pulse">
          ✨
        </span>

        <span className="absolute bottom-[20%] left-[18%] text-2xl animate-pulse">
          💖
        </span>

        <span className="absolute bottom-[15%] right-[20%] text-3xl animate-bounce">
          ⭐
        </span>

        {/* Small Dots */}
        <span className="absolute left-[25%] top-[15%] h-3 w-3 rounded-full bg-pink-400/60" />
        <span className="absolute right-[28%] bottom-[20%] h-4 w-4 rounded-full bg-purple-400/50" />
      </div>
 

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* 404 Number */}
        <div className="relative mx-auto mb-6 inline-block">
          <h1
            className="
              select-none
              text-[120px]
              font-black
              leading-none
              tracking-tighter
              text-transparent
              bg-gradient-to-r
              from-pink-500
              via-rose-500
              to-purple-500
              bg-clip-text
              drop-shadow-sm
              sm:text-[160px]
              md:text-[190px]
            "
          >
            404
          </h1>

          {/* Floating Question Mark */}
          <span
            className="
              absolute
              -right-5
              -top-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-white
              text-2xl
              font-black
              text-pink-500
              shadow-xl
              ring-4
              ring-pink-100
              animate-bounce
            "
          >
            ?
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
          Oops! This Page Got Lost 
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
          Looks like this page went on a little adventure. Don't worry — let's
          get you back to Hero Kidz and find something amazing!
        </p>


        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Home */}
          <Link
            href="/"
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-pink-500
              px-7
              py-3.5
              font-bold
              text-white
              shadow-lg
              shadow-pink-200
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-pink-600
              hover:shadow-xl
              hover:shadow-pink-200
              sm:w-auto
            "
          >
            <FiHome
              size={19}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Back to Home
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white
              px-7
              py-3.5
              font-bold
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-pink-200
              hover:bg-pink-50
              hover:text-pink-500
              hover:shadow-md
              sm:w-auto
            "
          >
            <FiShoppingBag
              size={19}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Explore Products
          </Link>
        </div>

        {/* Search Suggestion */}
        <div
          className="
            mx-auto
            mt-10
            flex
            max-w-md
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-slate-100
            bg-white/80
            px-5
            py-4
            shadow-sm
            backdrop-blur-sm
          "
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
            <FiSearch size={19} />
          </div>

          <div className="text-left">
            <p className="text-sm font-bold text-slate-700">
              Looking for something?
            </p>

            <p className="text-xs text-slate-400">
              Check out our latest products and collections.
            </p>
          </div>
        </div>

        {/* Brand Message */}
        <p className="mt-8 text-sm font-medium text-slate-400">
          ✨ Hero Kidz — Learn • Play • Grow
        </p>
      </div>
    </main>
  );
};

export default Error404;
