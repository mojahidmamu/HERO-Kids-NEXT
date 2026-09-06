// src/Components/Layouts/Navbar.jsx
"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import {
  FiMenu,
  FiHome,
  FiPackage,
  FiBookOpen,
  FiMail,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion"; 
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: FiHome },
    { href: "/products", label: "Products", icon: FiPackage },
    { href: "/blog", label: "Blog", icon: FiBookOpen },
    { href: "/contact", label: "Contact", icon: FiMail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="navbar mx-auto min-h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="navbar-start gap-2">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-slate-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-500"
            >
              <FiMenu className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[60] mt-4 w-56 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-xl px-4 py-3 font-medium text-slate-600 transition-all duration-300 hover:bg-pink-50 hover:text-pink-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="transition-transform duration-300 hover:scale-[1.02]">
            <Logo />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <nav className="rounded-full border border-slate-200 bg-slate-50/80 p-1 shadow-sm">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-white hover:text-pink-500 hover:shadow-sm"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2 sm:gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 hover:shadow-md"
          >
            <TiShoppingCart className="text-2xl transition-transform duration-300 group-hover:scale-110" />

            {/* Dynamic Cart Count */}
            <AnimatePresence mode="popLayout">
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-white"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* User Section */}
          {status === "authenticated" ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-white pl-2 pr-3 py-1.5 border border-slate-200 shadow-sm transition-all hover:border-pink-200 hover:shadow-md"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={session.user?.image || "/assets/default-avatar.png"}
                    alt={session.user?.name || "User"}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {session.user?.name?.split(" ")[0] || "User"}
                </span>
                <FiChevronDown
                  className={`text-slate-400 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white py-2 shadow-xl ring-1 ring-slate-100"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-all hover:bg-pink-50 hover:text-pink-500"
                    >
                      <FiUser size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-500 transition-all hover:bg-red-50"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="group relative hidden overflow-hidden rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-200 sm:inline-flex"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          )}

          {/* Mobile Login */}
          {status !== "authenticated" && (
            <Link
              href="/login"
              className="btn btn-sm rounded-full border-0 bg-pink-500 px-4 text-white shadow-md shadow-pink-200 transition-all duration-300 hover:bg-pink-600 hover:shadow-lg sm:hidden"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;