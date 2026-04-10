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
  {
    provider: "A",
    name: "Claude Opus 4.6",
    score: 67.74,
    color: "var(--chart-1)",
  },
  {
    provider: "A",
    name: "Claude Sonnet 4.6",
    score: 66.1,
    color: "var(--chart-1)",
  },
  {
    provider: "M",
    name: "Meta Muse Spark",
    score: 64.8,
    color: "var(--chart-2)",
  },
  { provider: "G", name: "Gemini 3 Pro", score: 63.5, color: "var(--chart-3)" },
  { provider: "O", name: "GPT-5.2", score: 62.9, color: "var(--chart-4)" },
  { provider: "O", name: "GPT-5.1 mini", score: 61.7, color: "var(--chart-4)" },
  { provider: "Z", name: "GLM 5.1", score: 60.4, color: "var(--chart-5)" },
  {
    provider: "A",
    name: "Claude Haiku 4.5",
    score: 59.8,
    color: "var(--chart-1)",
  },
  {
    provider: "G",
    name: "Gemini 3 Flash",
    score: 58.9,
    color: "var(--chart-3)",
  },
  { provider: "Z", name: "GLM 5 Air", score: 57.6, color: "var(--chart-5)" },
  { provider: "G", name: "Gemma 3", score: 56.2, color: "var(--chart-2)" },
  { provider: "O", name: "GPT-5 nano", score: 55.1, color: "var(--chart-4)" },
  {
    provider: "A",
    name: "Claude Haiku 4",
    score: 53.8,
    color: "var(--chart-1)",
  },
  {
    provider: "M",
    name: "Mistral Large 3",
    score: 52.4,
    color: "var(--chart-2)",
  },
  { provider: "D", name: "DeepSeek V4", score: 51, color: "var(--chart-3)" },
  {
    provider: "Q",
    name: "Qwen 3.6 Plus",
    score: 49.6,
    color: "var(--chart-5)",
  },
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
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground antialiased">
      <header className="relative z-50 -mb-3 shrink-0 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-380 items-center justify-between px-6 sm:px-10">
          <div className="flex items-center gap-3 font-semibold tracking-tight text-foreground">
            <span className="text-lg">◣◥</span>
            <span className="text-[1.2rem] leading-none">vals.ai</span>
          </div>

          <nav className="hidden items-center gap-10 text-[0.9rem] text-muted-foreground lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="flex min-h-10 items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <span>{item}</span>
                {item === "Model Guide" ? (
                  <span className="rounded-sm bg-primary px-1.5 py-0.5 text-xs leading-none font-bold text-primary-foreground">
                    NEW
                  </span>
                ) : null}
              </a>
            ))}
            <button className="flex min-h-10 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <span className="text-lg">◔</span>
              <span className="text-sm">▾</span>
            </button>
          </nav>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-x-0 bottom-0 z-0">
          <div className="mx-auto max-w-300 -mb-0.5 border-x border-t border-border bg-card px-6 py-18 sm:px-10 sm:py-24">
            <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-24">
              <div className="max-w-200">
                <div className="mb-8 flex items-center gap-3 font-semibold tracking-tight text-foreground">
                  <span className="text-base">◣◥</span>
                  <span className="text-[1rem] leading-none">vals.ai</span>
                </div>

                <p className="mb-5 text-base text-muted-foreground">
                  Join our mailing list to receive benchmark updates
                </p>

                <div className="mb-4 flex max-w-115 flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 flex-1 rounded-md border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none"
                  />
                  <button className="h-12 rounded-md border border-border bg-primary px-5 font-mono text-[0.82rem] tracking-[0.08em] text-primary-foreground transition-transform active:scale-[0.96]">
                    SUBSCRIBE
                  </button>
                </div>

                <p className="mb-8 text-base text-muted-foreground">
                  By subscribing, I agree to the Vals&apos;{" "}
                  <span className="font-mono text-foreground text-sm">
                    PRIVACY POLICY.
                  </span>
                </p>

                <p className="mb-6 text-base text-muted-foreground">
                  Copyright © 2025 Vals AI, Inc. All rights reserved.
                </p>

                <div className="flex gap-8 font-mono text-[0.92rem] text-foreground">
                  <a
                    href="#"
                    className="transition-colors hover:text-primary text-sm"
                  >
                    X (TWITTER) ↗
                  </a>
                  <a
                    href="#"
                    className="transition-colors hover:text-primary text-sm"
                  >
                    LINKEDIN ↗
                  </a>
                </div>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                {FOOTER_LINK_COLUMNS.map((column) => (
                  <div
                    key={column.join("-")}
                    className="space-y-4 font-mono text-sm text-foreground"
                  >
                    {column.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block transition-colors hover:text-primary"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 h-full overflow-y-auto overscroll-y-contain">
          <div className="mx-auto max-w-300 pt-2">
            <div className="border-b border-border" />
            <div className="border-x border-b border-border bg-background">
              <section className="border-b border-border text-sm text-muted-foreground">
                <div className="grid grid-cols-4 overflow-hidden">
                  {TICKER.map((item, index) => (
                    <div
                      key={`${item.date}-${item.text}`}
                      className="flex min-h-16 items-center gap-4 border-r border-border px-6 last:border-r-0"
                    >
                      <span className="hidden text-muted-foreground md:inline">
                        •
                      </span>
                      <span className="font-mono text-[0.68rem] tracking-[0.16em] text-muted-foreground">
                        {item.date}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[0.68rem] tracking-[0.16em]",
                          item.label === "BENCHMARK"
                            ? "text-chart-3"
                            : "text-chart-1"
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
                    <p className="mb-4 text-xl leading-tight tracking-tight text-muted-foreground">
                      Independent Evaluation, Unbiased Benchmarks
                    </p>
                    <h1 className="mb-8 max-w-190 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance text-foreground">
                      Testing AI on Real-World Tasks
                    </h1>
                    <p className="max-w-245 text-xl leading-[1.65] text-muted-foreground">
                      We benchmark the world&apos;s leading AI models on
                      rigorous, domain-specific tasks in finance, law, software,
                      healthcare, and more. We run all of our own evaluations
                      and create many of our benchmarks in house.
                    </p>
                  </div>
                </section>

                <section className="px-6 pb-28 sm:px-10 sm:pb-36">
                  <div className="mb-12 flex flex-wrap gap-3 font-mono text-[0.72rem] tracking-[0.12em] text-muted-foreground">
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
                            "relative rounded-md px-4 py-3 transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {label}
                          {isActive ? (
                            <span className="absolute top-full left-0 mt-1.5 h-px w-26 bg-primary" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mb-3 max-w-230 leading-8 text-muted-foreground">
                    {TAB_COPY[tab]}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-primary transition-colors hover:opacity-80"
                  >
                    View Full List →
                  </a>

                  <div className="mt-16">
                    <div className="mb-5 flex items-center justify-between font-mono text-[0.7rem] tracking-[0.11em] text-muted-foreground">
                      <span>VALS INDEX</span>
                      <span>4/9/2026</span>
                    </div>

                    <div className="relative overflow-hidden border border-border bg-card p-4 sm:p-6">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] bg-position-[0_0] opacity-40" />

                      <div className="relative z-10 mb-8 flex items-center gap-2 text-sm font-medium tracking-tight text-muted-foreground">
                        <span>◣◥</span>
                        <span>vals.ai</span>
                      </div>

                      <div className="relative h-105 sm:h-130">
                        <div
                          className="absolute right-0 left-0 border-t border-dashed border-border"
                          style={{ top: "25%" }}
                        />
                        <div
                          className="absolute right-0 -translate-y-1/2 text-[2rem] tracking-tight text-foreground"
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
                                  className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-secondary-foreground shadow-sm"
                                  title={bar.name}
                                >
                                  {bar.provider}
                                </div>
                                <div
                                  className="relative w-full max-w-14 overflow-hidden border border-border bg-muted shadow-inner"
                                  style={{ height: `${heightPercentage}%` }}
                                >
                                  <div
                                    className="absolute inset-0 opacity-90"
                                    style={{
                                      backgroundColor: bar.color,
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
            </div>
          </div>

          <div className="h-[30rem]" />
        </div>
      </div>
    </div>
  );
}
