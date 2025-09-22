import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error: "Stripe secret key missing. Set STRIPE_SECRET_KEY in your environment."
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16"
  });

  const body = await request.json();
  const items: { priceId: string; quantity: number }[] = body.items ?? [];

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({ price: item.priceId, quantity: item.quantity })),
    mode: "payment",
    success_url: `${request.headers.get("origin")}/success`,
    cancel_url: `${request.headers.get("origin")}/checkout`
  });

  return NextResponse.json({ url: session.url });
}
