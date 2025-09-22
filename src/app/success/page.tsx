export const metadata = {
  title: "Order confirmed | DrWater"
};

export default function SuccessPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-24 text-center sm:px-10">
      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-aqua">
        Order confirmed
      </span>
      <h1 className="text-3xl font-semibold">Hydration experience unlocked</h1>
      <p className="text-sm text-white/70">
        Thank you for joining the DrWater ritual. We&apos;ve emailed your receipt and shipping details. Track your order
        anytime from the confirmation email.
      </p>
      <a
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-full bg-aqua px-6 text-sm font-semibold text-midnight transition hover:bg-white"
      >
        Continue exploring
      </a>
    </section>
  );
}
