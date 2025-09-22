"use client";

import { Product } from "@/lib/products";
import { useAddToCart } from "./checkoutActions";
import { useCart } from "./cartStore";

export function AddToCartButton({ product, variant = "primary" }: { product: Product; variant?: "primary" | "ghost"; }) {
  const addToCart = useAddToCart(product);
  const toggleCart = useCart((state) => state.toggleCart);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart();
        toggleCart(true);
      }}
      className={
        variant === "primary"
          ? "flex h-11 items-center justify-center rounded-full bg-aqua px-6 text-sm font-semibold text-midnight transition hover:bg-white"
          : "flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white/70 transition hover:border-white hover:text-white"
      }
    >
      Add to cart
    </button>
  );
}
