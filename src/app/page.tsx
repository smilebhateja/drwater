import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSheet } from "@/components/CartSheet";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroCarousel />
      <ProductGrid />
      <CartSheet />
    </div>
  );
}
