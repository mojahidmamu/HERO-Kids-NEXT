import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 transition-all duration-300"
      aria-label="Hero Kidz Home"
    >
      {/* Logo Icon */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md shadow-pink-200 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-pink-200">
        {/* Decorative Circle */}
        <div className="absolute inset-1 rounded-xl border border-white/20" />

        {/* Brand Symbol */}
        <span className="relative text-xl font-black text-white">M</span>

        {/* Small Star */}
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[9px] shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          ⭐
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-pink-500">
          Hero
          <span className="text-pink-500 group-hover:text-rose-500">Kidz</span>
        </span>

        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-pink-400">
          Learn • Play • Grow
        </span>
      </div>
    </Link>
  );
};

export default Logo;
