// // src/Components/Home/ProductCard.jsx

// import Image from "next/image";
// import Link from "next/link";
// import { FiShoppingCart, FiStar } from "react-icons/fi";

// const ProductCard = ({ product }) => {
//   const {
//     id,
//     title,
//     image,
//     price,
//     discount = 0,
//     ratings = 4.5,
//     sold = 0,
//   } = product;

//   const discountedPrice = discount
//     ? Math.round(price - (price * discount) / 100)
//     : price;

//   return (
//     <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
//       {/* Image */}
//       <Link href={`/products/${id}`}>
//         <div className="relative aspect-square overflow-hidden bg-slate-50">
//           <Image
//             src={image}
//             alt={title}
//             fill
//             className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
//           />

//           {/* Discount */}
//           {discount > 0 && (
//             <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
//               -{discount}%
//             </span>
//           )}
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="p-4">
//         <Link href={`/products/${id}`}>
//           <h2 className="line-clamp-2 min-h-[3rem] text-lg font-bold text-slate-800 transition-colors hover:text-pink-500">
//             {title}
//           </h2>
//         </Link>

//         {/* Rating */}
//         <div className="mt-2 flex items-center gap-2">
//           <div className="flex">
//             {[...Array(5)].map((_, index) => (
//               <FiStar
//                 key={index}
//                 className="h-4 w-4 fill-yellow-400 text-yellow-400"
//               />
//             ))}
//           </div>

//           <span className="text-xs text-slate-500">{ratings}</span>

//           <span className="text-xs text-slate-400">({sold} sold)</span>
//         </div>

//         {/* Price */}
//         <div className="mt-3 flex items-center gap-2">
//           <span className="text-2xl font-extrabold text-pink-500">
//             ৳{discountedPrice}
//           </span>

//           {discount > 0 && (
//             <span className="text-sm text-slate-400 line-through">
//               ৳{price}
//             </span>
//           )}
//         </div>

//         {/* Button */}
//         <button className="btn btn-primary mt-4 w-full">
//           <FiShoppingCart />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
