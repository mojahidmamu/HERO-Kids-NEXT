// src/app/api/checkout/route.js
import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../../../lib/AuthOption";

export async function POST(request) {
  try {
    // ✅ Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to checkout" },
        { status: 401 },
      );
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // ✅ Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.bangla || item.title,
          metadata: { productId: item.id },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // ✅ Create Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: session.user.email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
