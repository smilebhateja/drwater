import Image from "next/image";

export function ProblemSolutionSection() {
  return (
    <section
      aria-label="Problem and solution"
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
        <div>
          <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Let&apos;s talk water
          </h2>

          <div className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-500/10 to-slate-950/60 p-4 sm:p-5">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_0_3px_rgba(163,230,53,0.2)]" />
              The Problem
            </p>
            <p className="max-w-[62ch] text-sm leading-7 text-slate-100 sm:text-base">
              <span className="mb-2 block">
                You drink water every day thinking it&apos;s enough.{" "}
                <span className="font-extrabold text-cyan-200 underline decoration-lime-300 decoration-2 underline-offset-4">
                  It isn&apos;t.
                </span>
              </span>
              <span className="mb-2 block">
                Every stressful day, every hour of screen time produces{" "}
                <span className="font-extrabold text-cyan-200 underline decoration-lime-300 decoration-2 underline-offset-4">
                  oxidative damage
                </span>{" "}
                inside your cells.
                <br />
                This is the reason your body feels slower and harder to recover
                as the years go on.
              </span>
              <span className="block">
                <span className="font-extrabold text-cyan-200 underline decoration-lime-300 decoration-2 underline-offset-4">
                  Regular water does nothing
                </span>{" "}
                about it.
              </span>
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-500/10 to-slate-950/60 p-4 sm:p-5">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_0_3px_rgba(163,230,53,0.2)]" />
              The Solution
            </p>
            <p className="max-w-[62ch] text-sm leading-7 text-slate-100 sm:text-base">
              <span className="block">
                Dr.Water infuses your water with{" "}
                <span className="font-extrabold text-cyan-200 underline decoration-lime-300 decoration-2 underline-offset-4">
                  H₂
                </span>{" "}
                in{" "}
                <span className="font-extrabold text-cyan-200 underline decoration-lime-300 decoration-2 underline-offset-4">
                  5 minutes
                </span>
                , small enough to enter your bloodstream directly to neutralise
                the oxidative stress that your body can&apos;t clear on its own.
              </span>
            </p>
          </div>

          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-950 no-underline shadow-[0_12px_24px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5 hover:bg-cyan-300"
            href="/collections/shop-hydrogen"
          >
            Shop Dr.Water <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_16px_36px_rgba(2,8,23,0.45)]">
          <div className="bg-[radial-gradient(900px_300px_at_20%_0%,rgba(34,211,238,0.2),rgba(255,255,255,0))] p-4 pb-2">
            <Image
              alt="Dr. Water product"
              className="block h-auto w-full rounded-2xl"
              height={600}
              loading="lazy"
              src="https://cdn.shopify.com/s/files/1/0671/4245/1372/files/Old__1.png?v=1771843023&width=600"
              width={600}
            />
          </div>

          <div className="flex flex-col gap-3 p-4">
            {[
              "SAY GOODBYE TO THE 2PM CRASH.",
              "CLEARER SKIN. FASTER RECOVERY. ENERGY THAT ACTUALLY HOLDS.",
              "FEWER ACHES, MORE OF YOUR OLD SELF BACK.",
            ].map((line) => (
              <div
                key={line}
                className="grid grid-cols-[42px_1fr] items-center gap-3 rounded-2xl border border-cyan-200/15 bg-gradient-to-b from-cyan-500/10 to-slate-900/50 p-3"
              >
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-cyan-500 text-lg text-white shadow-[0_10px_20px_rgba(6,182,212,0.35)]">
                  ✦
                </div>
                <p className="m-0 text-sm font-black uppercase leading-tight tracking-tight text-white sm:text-base">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
