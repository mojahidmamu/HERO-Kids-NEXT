// src/Components/Products/Products.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import products from "@/src/data/toys.json";
import CardButton from "../buttons/AddToCartButton";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category || "Uncategorized");

    const uniqueCats = ["All", ...new Set(cats)];
    return uniqueCats;
  }, [products]);

  //
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    //
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    //
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
      case "popular":
        filtered.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  // wishlist toggle function
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // card animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Our Products
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({filteredProducts.length} items)
            </span>
          </h2>
          <p className="text-sm text-slate-500">
            Premium toys for your little ones
          </p>
        </div>

        {/*View Mode Toggle*/}
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-lg p-2 transition-all ${
              viewMode === "grid"
                ? "bg-white text-slate-800 shadow-md"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-lg p-2 transition-all ${
              viewMode === "list"
                ? "bg-white text-slate-800 shadow-md"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <FiList size={20} />
          </button>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toLowerCase())}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selectedCategory === cat.toLowerCase()
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-700 transition-all hover:border-pink-300 focus:border-pink-500 focus:outline-none"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rating</option>
            <option value="popular">Most Popular</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-3 text-slate-400" />
        </div>
      </div>

      {/* Product Grid */}
      <AnimatePresence>
        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id || index}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className={`group relative rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl ${
                viewMode === "list" ? "flex gap-6 p-4" : "overflow-hidden"
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div
                className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "w-full"}`}
              >
                <div
                  className={`relative overflow-hidden ${viewMode === "list" ? "rounded-xl" : "rounded-t-2xl"}`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={300}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === "list" ? "h-48" : "h-64"
                    }`}
                  />

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                  >
                    <FiHeart
                      className={`transition-colors ${
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600"
                      }`}
                      size={20}
                    />
                  </button>

                  {/* Hover Overlay Action */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-full bg-white p-3 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-pink-500 hover:text-white"
                    >
                      <FiEye size={20} />
                    </Link>
                    <button className="rounded-full bg-white p-3 text-slate-700 shadow-lg transition-all hover:scale-110 hover:bg-pink-500 hover:text-white">
                      <FiShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div
                className={`flex flex-col ${viewMode === "list" ? "flex-1 p-4" : "p-4"}`}
              >
                {/* Rating */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.ratings || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">
                    ({product.reviews || 0})
                  </span>
                </div>

                {/* Title */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-800 transition-colors hover:text-pink-500">
                    {product.title}
                  </h3>
                </Link>

                {/* Info (in List View) */}
                {viewMode === "list" && (
                  <p className="mb-3 line-clamp-2 text-sm text-slate-500">
                    {product.description?.slice(0, 150)}...
                  </p>
                )}

                {/* Price */}
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-pink-500">
                      ৳{product.price}
                    </span>
                    {product.discount > 0 && (
                      <span className="ml-2 text-sm text-slate-400 line-through">
                        ৳
                        {Math.round(
                          product.price / (1 - product.discount / 100),
                        )}
                      </span>
                    )}
                  </div>

                  {/* Sold Count */}
                  {product.sold > 0 && (
                    <span className="text-xs text-slate-400">
                      Sold: {product.sold}
                    </span>
                  )}
                </div>

                {/* Add to Cart (in Grid View) */}
                {viewMode === "grid" && (
                  <CardButton product={product}></CardButton>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/*   No Results  */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl bg-white py-20"
        >
          <div className="text-6xl">🔍</div>
          <h3 className="mt-4 text-xl font-semibold text-slate-600">
            No products found
          </h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default Products;
