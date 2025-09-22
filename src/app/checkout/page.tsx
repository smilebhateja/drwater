export const metadata = {
  title: "Checkout | DrWater"
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-24 text-center sm:px-10">
      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-aqua">
        Quick checkout
      </span>
      <h1 className="text-3xl font-semibold">Secure Stripe checkout</h1>
      <p className="text-sm text-white/70">
        Add any product to your cart to launch Stripe Checkout in a secure window. You can also use the
        Stripe test keys locally by setting <code className="rounded bg-black/40 px-1">STRIPE_SECRET_KEY</code>
        in your environment.
      </p>
      <p className="text-xs text-white/50">
        Need support? Email hydration@drwater.com and we&apos;ll help you build your hydration ritual.
      </p>
    </section>
  );
}
