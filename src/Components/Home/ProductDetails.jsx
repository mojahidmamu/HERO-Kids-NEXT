// src/app/products/[id]/page.jsx
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
  FiMinus,
  FiPlus,
  FiHome,
} from "react-icons/fi";
import products from "@/src/data/toys.json";

// স্ট্যাটিক প্যারামিটার জেনারেট
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// মেটাডেটা
export async function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} - Hero Kidz`,
    description: product.description?.slice(0, 160) || "Premium kids products",
  };
}

const ProductDetailsPage = ({ params }) => {
//   const product = products.find((p) => p.id === parseInt(params.id));

  const productId =  params.id;
//   console.log("Product ID (parsed):", productId);

  const product = products.find((p) => p.id === productId);
//   console.log("Found product:", product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;

// ============================================
// প্রোডাক্ট ডিটেইলস কম্পোনেন্ট
// ============================================
const ProductDetails = ({ product }) => {
  const {
    id,
    title,
    bangla,
    image,
    price,
    percentage,
    description,
    qna = [],
    reviews = 0,
    sold = 0,
    ratings = 4.5,
    info = [],
  } = product;

  // ডিসকাউন্ট প্রাইস ক্যালকুলেট
  const discountedPrice = percentage
    ? Math.round(price - (price * percentage) / 100)
    : price;
  const originalPrice = percentage ? price : null;

  // স্টার রেটিং
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-200"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* ===== নেভিগেশন ===== */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg"
            >
              <FiHome className="transition-transform group-hover:scale-110" />
              Home
            </Link>
            <Link
              href="/products"
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-white p-2 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg">
              <FiHeart size={20} />
            </button>
            <button className="rounded-full bg-white p-2 shadow-md transition-all hover:bg-pink-500 hover:text-white hover:shadow-lg">
              <FiShare2 size={20} />
            </button>
          </div>
        </div>

        {/* ===== মেইন কন্টেন্ট ===== */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ===== ইমেজ সেকশন ===== */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={title}
                width={600}
                height={600}
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* ডিসকাউন্ট ব্যাজ */}
              {percentage > 0 && (
                <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{percentage}%
                </div>
              )}

              {/* সোল্ড কাউন্ট */}
              {sold > 0 && (
                <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  🔥 {sold} sold
                </div>
              )}
            </div>

            {/* থাম্বনেইল গ্যালারি */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {[image, image, image, image].map((img, idx) => (
                <div
                  key={idx}
                  className="h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 border-transparent transition-all hover:border-pink-500 hover:shadow-md"
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== ডিটেইলস সেকশন ===== */}
          <div className="space-y-6">
            {/* টাইটেল */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 lg:text-4xl">
                {title}
              </h1>
              {bangla && (
                <p className="mt-1 text-lg text-slate-500">{bangla}</p>
              )}
            </div>

            {/* রেটিং */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(ratings)}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {ratings}
              </span>
              <span className="text-sm text-slate-400">
                ({reviews} reviews)
              </span>
            </div>

            {/* প্রাইস */}
            <div className="flex items-end gap-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 p-4">
              <span className="text-4xl font-extrabold text-pink-500">
                ৳{discountedPrice}
              </span>
              {originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ৳{originalPrice}
                </span>
              )}
              {percentage > 0 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                  Save {percentage}%
                </span>
              )}
            </div>

            {/* ইনফো পয়েন্টস */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {info.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md"
                >
                  <FiCheckCircle className="mt-0.5 text-pink-500" size={18} />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>

            {/* ডেলিভারি তথ্য */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <FiTruck className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-600">Delivery</p>
                  <p className="text-sm font-bold text-slate-800">
                    Free Shipping
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <FiShield className="text-green-500" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-600">Safety</p>
                  <p className="text-sm font-bold text-slate-800">100% Safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <FiRefreshCw className="text-purple-500" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-600">Returns</p>
                  <p className="text-sm font-bold text-slate-800">
                    7 Days Easy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <FiCheckCircle className="text-orange-500" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-600">Stock</p>
                  <p className="text-sm font-bold text-green-600">In Stock</p>
                </div>
              </div>
            </div>

            {/* অ্যাকশন বাটন */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl">
                <span className="flex items-center justify-center gap-2">
                  <FiShoppingCart size={20} />
                  Add to Cart
                </span>
              </button>
              <button className="rounded-2xl border-2 border-pink-200 bg-white px-8 py-4 font-bold text-pink-500 transition-all hover:border-pink-500 hover:bg-pink-50 hover:shadow-lg">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ===== বিবরণ সেকশন ===== */}
        <div className="mt-12 rounded-3xl bg-white p-6 shadow-xl lg:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            📖 Product Description
          </h2>
          <div className="prose max-w-none text-slate-600">
            {description?.split("\n").map((para, idx) => (
              <p key={idx} className="mb-3 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ===== Q&A সেকশন ===== */}
        {qna.length > 0 && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl lg:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              ❓ Questions & Answers
            </h2>
            <div className="space-y-4">
              {qna.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 p-4 transition-all hover:border-pink-200 hover:shadow-md"
                >
                  <p className="font-semibold text-slate-800">
                    Q: {item.question}
                  </p>
                  <p className="mt-2 text-slate-600">
                    <span className="font-medium text-pink-500">A:</span>{" "}
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== সম্পর্কিত প্রোডাক্ট ===== */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            🔗 You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((p) => p.id !== id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-1 text-sm font-semibold text-slate-800">
                      {related.title}
                    </h3>
                    <p className="text-lg font-bold text-pink-500">
                      ৳{related.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
