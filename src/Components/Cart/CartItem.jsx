// // src/Components/Cart/CartItem.jsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FiMinus, FiPlus, FiTrash2, FiStar } from "react-icons/fi";
// import { motion } from "framer-motion";

// const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
//   const {
//     id,
//     title,
//     image,
//     price,
//     quantity,
//     discount = 0,
//     ratings = 4.5,
//     reviews = 0,
//   } = item;

//   // ডিসকাউন্ট প্রাইস
//   const discountedPrice = discount
//     ? Math.round(price - (price * discount) / 100)
//     : price;
//   const totalPrice = discountedPrice * quantity;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:shadow-lg sm:flex-row sm:items-center"
//     >
//       {/* প্রোডাক্ট ইমেজ */}
//       <Link href={`/products/${id}`} className="flex-shrink-0">
//         <div className="relative h-24 w-24 overflow-hidden rounded-xl">
//           <Image
//             src={image}
//             alt={title}
//             width={96}
//             height={96}
//             className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//       </Link>

//       {/* প্রোডাক্ট তথ্য */}
//       <div className="flex-1 space-y-1">
//         <Link href={`/products/${id}`}>
//           <h3 className="font-semibold text-slate-800 transition-colors hover:text-pink-500">
//             {title}
//           </h3>
//         </Link>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <FiStar
//                 key={i}
//                 className={`h-3 w-3 ${
//                   i < Math.floor(ratings)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-slate-200"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-slate-400">({reviews})</span>
//         </div>
//       </div>

//       {/* প্রাইস ও কোয়ান্টিটি */}
//       <div className="flex items-center gap-4 sm:ml-auto">
//         {/* প্রাইস */}
//         <div className="min-w-[80px] text-right">
//           <span className="text-lg font-bold text-pink-500">৳{totalPrice}</span>
//           {discount > 0 && (
//             <span className="ml-2 text-xs text-slate-400 line-through">
//               ৳{price * quantity}
//             </span>
//           )}
//         </div>

//         {/* কোয়ান্টিটি কন্ট্রোল */}
//         <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
//           <button
//             onClick={() => onUpdateQuantity(id, quantity - 1)}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-pink-100 hover:text-pink-500"
//             aria-label="Decrease quantity"
//           >
//             <FiMinus size={16} />
//           </button>
//           <span className="w-8 text-center font-semibold text-slate-800">
//             {quantity}
//           </span>
//           <button
//             onClick={() => onUpdateQuantity(id, quantity + 1)}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-pink-100 hover:text-pink-500"
//             aria-label="Increase quantity"
//           >
//             <FiPlus size={16} />
//           </button>
//         </div>

//         {/* রিমুভ বাটন */}
//         <button
//           onClick={() => onRemove(id)}
//           className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
//           aria-label="Remove item"
//         >
//           <FiTrash2 size={18} />
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default CartItem;
