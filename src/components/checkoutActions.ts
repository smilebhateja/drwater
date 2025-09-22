"use client";

import { useCart } from "./cartStore";
import { Product } from "@/lib/products";

type CheckoutItem = {
  product: Product;
  quantity: number;
};

export async function createCheckoutSession(items: CheckoutItem[]) {
  try {
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items.map((item) => ({ priceId: item.product.priceId, quantity: item.quantity }))
      })
    });

    if (!response.ok) {
      console.error("Failed to create checkout session", await response.text());
      return null;
    }
    return (await response.json()) as { url: string };
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return null;
  }
}

export function useAddToCart(product: Product) {
  const addItem = useCart((state) => state.addItem);
  return () => addItem(product);
}
