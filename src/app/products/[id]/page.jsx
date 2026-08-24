// src/app/products/[id]/page.jsx

import { notFound } from "next/navigation";
import products from "@/src/data/toys.json";
import ProductDetails from "@/src/Components/Home/ProductDetails";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - Hero Kidz`,
    description:
      product.description?.slice(0, 160) ||
      "Premium kids products",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails product={product} />
  );
}