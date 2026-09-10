// src/Components/Checkout/PaymentSaver.jsx
"use client";

import { useEffect, useState } from "react";
import { usePayments } from "@/src/Components/context/PaymentContext";
import { useCart } from "@/src/Components/context/CartContext";

export default function PaymentSaver({
  sessionId,
  amount,
  itemCount,
  customerName,
}) {
  const { addPayment } = usePayments();
  const { clearCart } = useCart();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sessionId || saved) return;

    // ✅ Save payment to history
    addPayment({
      id: sessionId,
      date: new Date().toISOString(),
      amount,
      itemCount,
      customerName,
      status: "paid",
    });

    // ✅ Clear the cart
    clearCart();

    setSaved(true);
  }, [
    sessionId,
    saved,
    addPayment,
    clearCart,
    amount,
    itemCount,
    customerName,
  ]);

  return null;
}
