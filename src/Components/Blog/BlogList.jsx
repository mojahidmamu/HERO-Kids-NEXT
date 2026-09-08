"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const BlogList = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(posts.map((p) => p.category).filter(Boolean)),
  ];

  const filteredPosts = posts.filter((post) => {
    const title = post.title || "";
    const description = post.description || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mt-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search blog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-pink-300 focus:ring-2 focus:ring-pink-200 sm:w-64"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl">🔍</div>
          <h3 className="mt-4 text-xl font-semibold text-slate-600">
            No posts found
          </h3>
          <p className="text-slate-400">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
