"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { featuredProducts } from "@/lib/products";
import { ProductViewer } from "./ProductViewer";
import { AddToCartButton } from "./AddToCartButton";
import { useWebGLSupport } from "./useWebGLSupport";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const supportsWebGL = useWebGLSupport();
  const products = useMemo(() => featuredProducts.slice(0, 3), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [products.length]);

  const activeProduct = products[activeIndex];

  return (
    <section className="px-6 pb-20 pt-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-aqua">
            Immersive hydration
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Touch, rotate, and feel each hydration ritual in 3D.
          </h1>
          <p className="max-w-xl text-sm text-white/70">
            Discover bottles, reverse osmosis hubs, and performance electrolytes. Every product
            is rendered in a tactile 3D viewer with hotspots that surface specs, use-cases, and quick buy actions.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/product/${activeProduct.slug}`}
              className="flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
            >
              Explore {activeProduct.title}
            </Link>
            <AddToCartButton product={activeProduct} />
          </div>
          <div className="flex items-center gap-3 pt-4">
            {products.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-12 flex-1 items-center gap-3 rounded-2xl border px-3 py-2 text-left text-xs transition ${
                  index === activeIndex
                    ? "border-aqua/70 bg-aqua/10 text-white"
                    : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-aqua" />
                <span>{product.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          {supportsWebGL ? (
            <ProductViewer
              key={activeProduct.slug}
              modelUrl={activeProduct.modelUrl}
              fallbackShape={activeProduct.fallbackShape}
              hotspots={activeProduct.hotspots}
              className="h-[60vh] min-h-[420px]"
            />
          ) : (
            <div className="flex h-[60vh] min-h-[420px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2035] to-[#050b13] text-center">
              <div className="space-y-3 px-10">
                <p className="text-lg font-semibold">WebGL unavailable</p>
                <p className="text-sm text-white/70">
                  View a high-resolution image of {activeProduct.title} or continue on a WebGL-ready device for the full experience.
                </p>
                <Link
                  href={`/product/${activeProduct.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-aqua px-6 text-sm font-semibold text-midnight"
                >
                  View product
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
