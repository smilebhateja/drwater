"use client";

import { useTransition } from "react";
import { useCart, getCartTotals } from "./cartStore";
import { createCheckoutSession } from "./checkoutActions";

export function CartSheet() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCart();
  const { subtotal } = getCartTotals(items);
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-end bg-black/50 backdrop-blur-md">
      <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0a1722] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quick Cart</h2>
          <button
            type="button"
            className="text-sm text-white/60 hover:text-white"
            onClick={() => toggleCart(false)}
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-white/60">Your cart is empty. Tap a hotspot to add.</p>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.slug} className="rounded-2xl border border-white/10 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.15em] text-aqua/70">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-white/60">{item.product.tagline}</p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-white/50 hover:text-white"
                      onClick={() => removeItem(item.product.slug)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-white/20 text-center"
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-white/20 text-center"
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-sm text-white/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-3 text-xs text-white/50">
                Secure checkout powered by Stripe. Taxes and shipping calculated at checkout.
              </p>
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-aqua font-semibold text-midnight transition hover:bg-white"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    const response = await createCheckoutSession(items);
                    if (response?.url) {
                      window.location.href = response.url;
                    }
                  })
                }
              >
                {isPending ? "Redirecting…" : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
