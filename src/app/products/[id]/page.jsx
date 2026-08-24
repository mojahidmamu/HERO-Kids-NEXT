// src/app/products/page.jsx
import products from "@/src/data/toys.json";
import ProductDetails from "@/src/Components/Home/ProductDetails";

export const metadata = {
  title: "All Products - Hero Kidz",
  description: "Discover premium toys and educational products for kids",
};

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">All Products</h1>
        <p className="text-slate-500">Showing {products.length} items</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;