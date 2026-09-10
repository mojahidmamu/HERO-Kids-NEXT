// src/app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";

// ✅ Disable body parsing – required for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    // ✅ Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // ✅ Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        // ✅ Here you would update your database
        // For now, we'll just log it
        console.log("✅ Payment successful!");
        console.log("User:", session.metadata.userEmail);
        console.log("Amount:", session.amount_total / 100);
        console.log("Items:", session.metadata.items);

        // 🔴 In production, save to database:
        // await db.order.create({
        //   userId: session.metadata.userId,
        //   stripeSessionId: session.id,
        //   amount: session.amount_total / 100,
        //   status: "paid",
        //   items: JSON.parse(session.metadata.items),
        //   createdAt: new Date(),
        // });
      }
      break;
    }

    case "payment_intent.payment_failed": {
      console.log("❌ Payment failed:", event.data.object.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
