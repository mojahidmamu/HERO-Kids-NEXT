// src/Components/Checkout/CheckoutButton.jsx
"use client";

import { useState } from "react";
import { useCart } from "@/src/Components/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiLoader } from "react-icons/fi";

const CheckoutButton = () => {
  const { cartItems } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/cart");
      return;
    }

    if (cartItems.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || cartItems.length === 0}
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <FiLoader className="animate-spin" size={20} />
            Redirecting to Stripe...
          </>
        ) : (
          <>
            <FiCreditCard size={20} />
            Proceed to Checkout
          </>
        )}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  );
};

export default CheckoutButton;
