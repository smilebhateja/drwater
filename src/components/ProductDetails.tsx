"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { ProductViewer } from "./ProductViewer";
import { AddToCartButton } from "./AddToCartButton";
import { useWebGLSupport } from "./useWebGLSupport";

export function ProductDetails({ product }: { product: Product }) {
  const supportsWebGL = useWebGLSupport();
  const [activeHotspot, setActiveHotspot] = useState(product.hotspots[0]?.id);

  const hotspotContent = useMemo(
    () => product.hotspots.find((hotspot) => hotspot.id === activeHotspot),
    [activeHotspot, product.hotspots]
  );

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10 lg:flex-row">
      <div className="flex-1">
        {supportsWebGL ? (
          <ProductViewer
            modelUrl={product.modelUrl}
            hotspots={product.hotspots}
            fallbackShape={product.fallbackShape}
            className="h-[65vh] min-h-[480px]"
          />
        ) : (
          <div className="flex h-[65vh] min-h-[480px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2035] to-[#050b13] text-center">
            <div className="space-y-3 px-10">
              <p className="text-lg font-semibold">Experience fallback</p>
              <p className="text-sm text-white/70">
                WebGL is not available. View the product gallery image or revisit on a compatible device to interact in 3D.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-aqua/80">{product.tagline}</p>
          <h1 className="text-4xl font-semibold">{product.title}</h1>
          <p className="text-sm text-white/70">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-white/60 sm:grid-cols-3">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              {highlight}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Hydration experience</span>
            <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <AddToCartButton product={product} variant="ghost" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Hotspots</p>
          <div className="flex flex-wrap gap-3">
            {product.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                  activeHotspot === hotspot.id
                    ? "border-aqua bg-aqua/10 text-white"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
                onClick={() => setActiveHotspot(hotspot.id)}
              >
                {hotspot.title}
              </button>
            ))}
          </div>
          {hotspotContent && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              {hotspotContent.description}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
