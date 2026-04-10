// oxlint-disable react/no-unescaped-entities
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col justify-center px-6 sm:px-10 sm:pt-28 sm:pb-24 max-w-215 min-h-screen">
      <p className="mb-4 text-xs leading-tight tracking-wide text-muted-foreground uppercase font-mono">
        Software Engineer · San Francisco Bay Area
      </p>
      <h1 className="mb-8 max-w-190 text-7xl text-balance text-foreground">
        Hello, I'm Winston
      </h1>
      <p className="max-w-245 text-base leading-[1.75] text-muted-foreground">
        I'm a{" "}
        <a
          href="https://www.ycombinator.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="text-base rounded-full text-foreground"
          >
            <img
              src="/yc.svg"
              alt="YC"
              className="inline-block h-3 w-3"
            />
            Y Combinator
            <ArrowUpRightIcon className="inline-block size-3" />
          </Button>
        </a>{" "}
        alumni and software engineer based in Silicon Valley. Currently, I am a
        forward-deployed engineer on the{" "}
        <a
          href="https://snowflake.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="text-base rounded-full text-foreground"
          >
            <img
              src="/snowflake-color.svg"
              alt="Snowflake"
              className="inline-block h-3 w-3"
            />
            Snowflake
            <ArrowUpRightIcon className="inline-block size-3" />
          </Button>
        </a>{" "}
        AI team.
      </p>

      <div className="pt-6 flex space-x-2 text-muted-foreground">
        <a
          href="https://github.com/winstonpurnomo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="text-base rounded-full x-0 text-foreground"
            variant="outline"
          >
            <div
              className="inline-block h-3 w-3 bg-current"
              style={{
                maskImage: "url(/github.svg)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url(/github.svg)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              aria-label="GitHub"
            />
            GitHub
            <ArrowUpRightIcon className="inline-block size-3" />
          </Button>
        </a>

        <a
          href="https://linkedin.com/in/wpurnomo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="text-base rounded-full x-0 text-foreground"
            variant="outline"
          >
            <img
              src="/linkedin.png"
              alt="LinkedIn"
              className="inline-block h-3 w-3"
            />
            LinkedIn
            <ArrowUpRightIcon className="inline-block size-3" />
          </Button>
        </a>
      </div>
    </section>
  );
}
