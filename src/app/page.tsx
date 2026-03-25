import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { ProblemSolutionSection } from "@/components/ProblemSolutionSection";
import { CartSheet } from "@/components/CartSheet";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroCarousel />
      <ProblemSolutionSection />
      <ProductGrid />
      <CartSheet />
    </div>
  );
}
