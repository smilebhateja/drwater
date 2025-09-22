import Link from "next/link";
import { products } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

export function ProductGrid() {
  return (
    <section className="bg-[#071220] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-aqua/70">Catalog</p>
            <h2 className="mt-2 text-2xl font-semibold">Explore every hydration ritual</h2>
          </div>
          <span className="hidden text-xs text-white/40 sm:inline">Tap to add, swipe to explore</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f34] to-[#050b13] p-6"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{product.tagline}</p>
                <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                <p className="text-sm text-white/60">{product.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-xs uppercase tracking-[0.3em] text-aqua transition group-hover:text-white"
                >
                  View
                </Link>
              </div>
              <div className="mt-4">
                <AddToCartButton product={product} variant="ghost" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
