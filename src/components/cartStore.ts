"use client";

import { create } from "zustand";
import { Product } from "@/lib/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  toggleCart: (open?: boolean) => void;
  reset: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.slug === product.slug);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.slug === product.slug
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1 }],
        isOpen: true
      };
    }),
  removeItem: (slug) =>
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.product.slug !== slug)
    })),
  updateQuantity: (slug, quantity) =>
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.product.slug === slug ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    })),
  toggleCart: (open) =>
    set((state) => ({
      ...state,
      isOpen: open ?? !state.isOpen
    })),
  reset: () => set({ items: [], isOpen: false })
}));

export function getCartTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, totalQuantity };
}
