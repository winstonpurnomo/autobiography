// oxlint-disable react/no-unescaped-entities
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-col justify-center px-6 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24 max-w-215 min-h-screen">
      <p className="mb-4 text-xs leading-tight tracking-wide text-muted-foreground uppercase font-mono">
        Software Engineer · San Francisco Bay Area
      </p>
      <div className="mb-8 flex items-center gap-5">
        <h1 className="max-w-190 text-7xl text-balance text-foreground font-serif">
          Hello, I'm Winston
        </h1>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-foreground font-semibold text-lg select-none">
          WP
        </div>
      </div>
      <p className="max-w-245 text-xl leading-loose text-muted-foreground">
        I'm a software engineer based in Silicon Valley.
      </p>

      <div className="pt-6 flex space-x-2 text-muted-foreground">
        <a
          href="https://github.com/winstonpurnomo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="text-xl rounded-full x-0 text-foreground"
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
            className="text-xl rounded-full x-0 text-foreground"
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

      <section id="about" className="pt-16 space-y-8">
        <p className="text-xl leading-snug text-foreground">
          Currently, I work at{" "}
          <a
            href="https://snowflake.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/snowflake-color.svg"
                alt="Snowflake"
                className="inline-block h-4 w-4"
              />
              Snowflake
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>{" "}
          as a Forward-Deployed Engineer on the AI team.
        </p>

        <p className="text-xl leading-snug text-foreground">
          Previously, I worked at{" "}
          <a
            href="https://meta.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/meta.png"
                alt="Meta"
                className="inline-block h-3 w-4"
              />
              Meta
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>{" "}
          as a Software Engineer on the Click to WhatsApp Ads team. I helped
          ship features that empower small business all around the world to
          reach their customers where they already are.
        </p>

        <p className="text-xl leading-snug text-foreground">
          Before that, I was a co-founder of a{" "}
          <a
            href="https://ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/yc.svg"
                alt="Y Combinator"
                className="inline-block h-3 w-4"
              />
              Y Combinator
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>{" "}
          portfolio company,{" "}
          <a
            href="https://wavelength.cx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/wavelength.png"
                alt="Wavelength"
                className="inline-block h-3 w-4"
              />
              Wavelength
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>
          , where we built the AI-native customer success platform.
        </p>

        <p className="text-xl leading-snug text-foreground">
          Prior to that, I was a software engineer at{" "}
          <a
            href="https://apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/apple.svg"
                alt="Apple"
                className="inline-block h-3.5 w-3"
              />
              Apple
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>{" "}
          on the Apple Pay team. Our team built the software stack on iOS
          that talked to the radios.
        </p>

        <p className="text-xl leading-snug text-foreground">
          I graduated from{" "}
          <a
            href="https://berkeley.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="text-xl rounded-full text-foreground align-middle py-0.5"
            >
              <img
                src="/berkeley.png"
                alt="Berkeley"
                className="inline-block h-3.5 w-3"
              />
              UC Berkeley
              <ArrowUpRightIcon className="inline-block size-3.5" />
            </Button>
          </a>{" "}
          with a degree in Computer Science in three years.
        </p>
      </section>
    </section>
  );
}
