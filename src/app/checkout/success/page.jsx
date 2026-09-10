// src/app/checkout/success/page.jsx
import { stripe } from "@/src/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiUser, FiShoppingBag } from "react-icons/fi";
import PaymentSaver from "@/src/Components/Checkout/PaymentSaver";

export default async function CheckoutSuccessPage({ searchParams }) {
  const sessionId = (await searchParams).session_id;

  if (!sessionId) redirect("/cart");

  // ✅ Verify session with Stripe API (server-side)
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch (error) {
    console.error("Session retrieve error:", error);
    redirect("/cart");
  }

  // ✅ Verify payment status
  if (!session || session.payment_status !== "paid") {
    redirect("/cart");
  }

  const amountPaid = (session.amount_total / 100).toFixed(2);
  const itemCount =
    session.line_items?.data?.reduce(
      (total, item) => total + item.quantity,
      0,
    ) || 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12">
      {/* ✅ Save payment to context (client-side) */}
      <PaymentSaver
        sessionId={session.id}
        amount={parseFloat(amountPaid)}
        itemCount={itemCount}
        customerName={session.customer_details?.name || "Customer"}
      />

      <div className="w-full max-w-lg rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <FiCheckCircle className="text-5xl text-green-500" />
          </div>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-slate-800">
          Payment Successful! 🎉
        </h1>
        <p className="mt-2 text-slate-500">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Payment Details */}
        <div className="mt-6 space-y-3 rounded-2xl bg-pink-50 p-5 text-left">
          <div className="flex justify-between">
            <span className="text-slate-600">Customer</span>
            <span className="font-semibold text-slate-800">
              {session.customer_details?.name || "Customer"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Email</span>
            <span className="font-semibold text-slate-800 text-sm">
              {session.customer_details?.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Items</span>
            <span className="font-semibold text-slate-800">
              {itemCount} items
            </span>
          </div>
          <div className="flex justify-between border-t border-pink-200 pt-3">
            <span className="text-slate-600">Amount Paid</span>
            <span className="text-xl font-bold text-pink-500">
              ৳{amountPaid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Payment Status</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
              Paid ✅
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/profile"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl"
          >
            <FiUser size={20} />
            View Profile
          </Link>
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-pink-200 bg-white px-6 py-3 font-bold text-pink-500 transition-all hover:border-pink-500 hover:bg-pink-50 hover:shadow-lg"
          >
            <FiShoppingBag size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
