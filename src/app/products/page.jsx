import Products from "@/src/Components/Home/Products";

export const metadata = {
  title: "All Products", 
  description: "Explore our wide range of products and find the perfect fit for your needs. From innovative solutions to everyday essentials, we have something for everyone.",
};

const Product = () => {
    return (
        <div>
            <Products></Products>
        </div>
    );
};

export default Product;