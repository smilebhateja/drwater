import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { ProductDetails } from "@/components/ProductDetails";
import { CartSheet } from "@/components/CartSheet";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="relative">
      <ProductDetails product={product} />
      <CartSheet />
    </div>
  );
}
