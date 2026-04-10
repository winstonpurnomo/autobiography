import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

type TabKey = "best" | "open" | "pareto";

type ModelBar = {
  provider: string;
  name: string;
  score: number;
  color: string;
};

type TickerItem = {
  date: string;
  label: "MODEL" | "BENCHMARK";
  text: string;
};

const BARS: ModelBar[] = [
  { provider: "A", name: "Claude Opus 4.6", score: 67.74, color: "#8b5a3c" },
  { provider: "A", name: "Claude Sonnet 4.6", score: 66.1, color: "#8b5a3c" },
  { provider: "M", name: "Meta Muse Spark", score: 64.8, color: "#2f4a8b" },
  { provider: "G", name: "Gemini 3 Pro", score: 63.5, color: "#2f6b4a" },
  { provider: "O", name: "GPT-5.2", score: 62.9, color: "#1f5f4a" },
  { provider: "O", name: "GPT-5.1 mini", score: 61.7, color: "#1f5f4a" },
  { provider: "Z", name: "GLM 5.1", score: 60.4, color: "#6b3c8b" },
  { provider: "A", name: "Claude Haiku 4.5", score: 59.8, color: "#8b5a3c" },
  { provider: "G", name: "Gemini 3 Flash", score: 58.9, color: "#2f6b4a" },
  { provider: "Z", name: "GLM 5 Air", score: 57.6, color: "#6b3c8b" },
  { provider: "G", name: "Gemma 3", score: 56.2, color: "#8b6b2f" },
  { provider: "O", name: "GPT-5 nano", score: 55.1, color: "#2f6b4a" },
  { provider: "A", name: "Claude Haiku 4", score: 53.8, color: "#8b5a3c" },
  { provider: "M", name: "Mistral Large 3", score: 52.4, color: "#8b6b2f" },
  { provider: "D", name: "DeepSeek V4", score: 51, color: "#8b3c3c" },
  { provider: "Q", name: "Qwen 3.6 Plus", score: 49.6, color: "#6b8b3c" },
];

const TICKER: TickerItem[] = [
  {
    date: "04/08/2026",
    label: "MODEL",
    text: "Qwen 3.6 Plus evaluated!",
  },
  {
    date: "04/08/2026",
    label: "MODEL",
    text: "Meta Muse Spark ranks 3 on the Vals Index",
  },
  {
    date: "04/07/2026",
    label: "MODEL",
    text: "GLM 5.1 takes the top open-weight spot on the Vals Index",
  },
  {
    date: "04/06/2026",
    label: "BENCHMARK",
    text: "New legal benchmark: ContractQA v2 released",
  },
];

const NAV = [
  "Benchmarks",
  "Models",
  "Comparison",
  "Model Guide",
  "App Reports",
  "News",
  "About",
] as const;

const TAB_COPY: Record<TabKey, string> = {
  best: "Top performing models from the Vals Index. Includes a range of tasks across finance, coding, and law.",
  open: "Top performing open weight models from the Vals Index. Includes a range of tasks across finance, coding, and law.",
  pareto:
    "Pareto efficient models that balance raw capability with deployment efficiency across the Vals Index.",
};

const FOOTER_LINK_COLUMNS = [
  [
    "Benchmarks",
    "Models",
    "Comparison",
    "Model Guide",
    "App Reports",
    "Platform ↗",
  ],
  ["About Us", "Methodology", "News", "Careers ↗", "Privacy Policy ↗"],
] as const;

function RouteComponent() {
  const [tab, setTab] = useState<TabKey>("best");
  const maxScore = Math.max(...BARS.map((bar) => bar.score));
  const topScore = BARS[0]?.score ?? 0;

  return (
    <div className="dark flex h-screen flex-col overflow-hidden bg-[#171717] text-white antialiased">
      <header className="relative z-50 -mb-3 shrink-0 border-b border-white/12 bg-[#171717]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-380 items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-3 font-semibold tracking-tight text-white">
            <span className="text-lg">◣◥</span>
            <span className="text-[2rem] leading-none">vals.ai</span>
          </div>

          <nav className="hidden items-center gap-10 text-[0.95rem] text-white/90 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="flex min-h-10 items-center gap-1.5 transition-colors hover:text-white"
              >
                <span>{item}</span>
                {item === "Model Guide" ? (
                  <span className="rounded-sm bg-[#e7ff4f] px-1.5 py-0.5 text-[10px] leading-none font-bold text-black">
                    NEW
                  </span>
                ) : null}
              </a>
            ))}
            <button className="flex min-h-10 items-center gap-2 text-white/75 transition-colors hover:text-white">
              <span className="text-lg">◔</span>
              <span className="text-sm">▾</span>
            </button>
          </nav>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
        <div className="mx-auto max-w-380 pt-2">
          <div className="border-b border-white/20" />
          <div className="border-x border-white/12">
            <section className="border-b border-white/12 text-sm text-white/70">
              <div className="grid grid-cols-4 overflow-hidden">
                {TICKER.map((item, index) => (
                  <div
                    key={`${item.date}-${item.text}`}
                    className="flex min-h-16 items-center gap-4 border-r border-white/12 px-6 last:border-r-0"
                  >
                    <span className="hidden text-white/35 md:inline">•</span>
                    <span className="font-mono text-xs tracking-[0.18em] text-white/55">
                      {item.date}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-xs tracking-[0.18em]",
                        item.label === "BENCHMARK"
                          ? "text-[#49bf88]"
                          : "text-[#d8eb40]"
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={
                        index === 0 ? "truncate" : "hidden truncate xl:inline"
                      }
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <main>
              <section className="px-6 pt-20 pb-18 sm:px-10 sm:pt-28 sm:pb-24">
                <div className="max-w-215">
                  <p className="mb-4 text-[clamp(1.8rem,2.8vw,2.1rem)] leading-tight tracking-tight text-white/72">
                    Independent Evaluation, Unbiased Benchmarks
                  </p>
                  <h1 className="mb-8 max-w-190 font-serif text-[clamp(3.6rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-balance text-white">
                    Testing AI on Real-World Tasks
                  </h1>
                  <p className="max-w-245 text-[clamp(1.45rem,2vw,1.65rem)] leading-[1.65] text-white/68">
                    We benchmark the world&apos;s leading AI models on rigorous,
                    domain-specific tasks in finance, law, software, healthcare,
                    and more. We run all of our own evaluations and create many
                    of our benchmarks in house.
                  </p>
                </div>
              </section>

              <section className="px-6 pb-28 sm:px-10 sm:pb-36">
                <div className="mb-12 flex flex-wrap gap-3 font-mono text-[0.8rem] tracking-[0.14em] text-white/75">
                  {(
                    [
                      ["best", "BEST PERFORMING MODELS"],
                      ["open", "BEST OPEN WEIGHT MODELS"],
                      ["pareto", "PARETO EFFICIENT MODELS"],
                    ] as const
                  ).map(([key, label]) => {
                    const isActive = tab === key;

                    return (
                      <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={cn(
                          "relative rounded-sm px-4 py-3 transition-colors",
                          isActive
                            ? "bg-white text-black"
                            : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/88"
                        )}
                      >
                        {label}
                        {isActive ? (
                          <span className="absolute top-full left-0 mt-1.5 h-px w-26 bg-white/90" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <p className="mb-3 max-w-[920px] text-[1.15rem] leading-8 text-white/62">
                  {TAB_COPY[tab]}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-[1.05rem] text-[#f0c341] transition-colors hover:text-[#ffe17a]"
                >
                  View Full List →
                </a>

                <div className="mt-16">
                  <div className="mb-5 flex items-center justify-between font-mono text-[0.78rem] tracking-[0.12em] text-white/52">
                    <span>VALS INDEX</span>
                    <span>4/9/2026</span>
                  </div>

                  <div className="relative overflow-hidden border border-white/12 bg-[#141414] p-4 sm:p-6">
                    <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] [background-position:0_0] opacity-40" />

                    <div className="relative z-10 mb-8 flex items-center gap-2 text-sm font-medium tracking-tight text-white/75">
                      <span>◣◥</span>
                      <span>vals.ai</span>
                    </div>

                    <div className="relative h-[420px] sm:h-[520px]">
                      <div
                        className="absolute right-0 left-0 border-t border-dashed border-[#9ed5d2]/70"
                        style={{ top: "25%" }}
                      />
                      <div
                        className="absolute right-0 -translate-y-1/2 text-[2rem] tracking-tight text-white/78"
                        style={{ top: "25%" }}
                      >
                        {topScore.toFixed(2)}%
                      </div>

                      <div className="absolute inset-x-0 top-10 bottom-0 flex items-end justify-between gap-2 sm:gap-3">
                        {BARS.map((bar) => {
                          const heightPercentage =
                            (bar.score / maxScore) * 72 + 12;

                          return (
                            <div
                              key={bar.name}
                              className="flex min-w-0 flex-1 flex-col items-center justify-end"
                            >
                              <div
                                className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-[#2a2a2a] text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                                title={bar.name}
                              >
                                {bar.provider}
                              </div>
                              <div
                                className="relative w-full max-w-[56px] overflow-hidden border border-white/16 bg-[#242424] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
                                style={{ height: `${heightPercentage}%` }}
                              >
                                <div
                                  className="absolute inset-0 opacity-90"
                                  style={{
                                    backgroundColor: `${bar.color}26`,
                                    backgroundImage: `repeating-linear-gradient(135deg, ${bar.color} 0 2px, transparent 2px 10px)`,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="relative z-10 -mt-px border-t border-white/12 bg-[#111111] px-6 py-18 sm:px-10 sm:py-24">
              <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-24">
                <div className="max-w-[620px]">
                  <div className="mb-8 flex items-center gap-3 font-semibold tracking-tight text-white">
                    <span className="text-lg">◣◥</span>
                    <span className="text-[2rem] leading-none">vals.ai</span>
                  </div>

                  <p className="mb-5 text-[1.05rem] text-white/84">
                    Join our mailing list to receive benchmark updates
                  </p>

                  <div className="mb-4 flex max-w-[460px] flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="h-12 flex-1 border border-white/10 bg-white/6 px-4 text-white placeholder:text-white/28 focus:border-white/30 focus:outline-none"
                    />
                    <button className="h-12 border border-white/16 bg-white px-5 font-mono text-sm tracking-[0.08em] text-black transition-transform active:scale-[0.96]">
                      SUBSCRIBE
                    </button>
                  </div>

                  <p className="mb-8 text-white/58">
                    By subscribing, I agree to the Vals&apos;{" "}
                    <span className="font-mono text-white">
                      PRIVACY POLICY.
                    </span>
                  </p>

                  <p className="mb-6 text-white/46">
                    Copyright © 2025 Vals AI, Inc. All rights reserved.
                  </p>

                  <div className="flex gap-8 font-mono text-white/88">
                    <a href="#" className="transition-colors hover:text-white">
                      X (TWITTER) ↗
                    </a>
                    <a href="#" className="transition-colors hover:text-white">
                      LINKEDIN ↗
                    </a>
                  </div>
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  {FOOTER_LINK_COLUMNS.map((column) => (
                    <div
                      key={column.join("-")}
                      className="space-y-4 font-mono text-[1.05rem] tracking-[0.08em] text-white/88"
                    >
                      {column.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block transition-colors hover:text-white"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
