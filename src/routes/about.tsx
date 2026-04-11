// oxlint-disable react/no-unescaped-entities
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section id="about" className="px-6 sm:px-10 py-12 max-w-215 mx-auto">
      <div className="space-y-8">
        <div>
          <p className="text-xl leading-loose text-foreground">
            Currently, I work at{" "}
            <a
              href="https://snowflake.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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

          <p className="mt-4 text-xl leading-snug text-foreground">
            Previously, I worked at{" "}
            <a
              href="https://meta.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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

          <p>
            <p className="mt-4 text-xl leading-snug text-foreground">
              Before that, I was a co-founder of a{" "}
              <a
                href="https://ycombinator.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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
                  className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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
          </p>

          <p>
            <p className="mt-4 text-xl leading-snug text-foreground">
              Prior to that, I was a software engineer at{" "}
              <a
                href="https://apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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
          </p>

          <p>
            <p className="mt-4 text-xl leading-snug text-foreground">
              I graduated from{" "}
              <a
                href="https://berkeley.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="text-xl rounded-full text-foreground align-middle py-4 mb-2"
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
          </p>
        </div>
      </div>
    </section>
  );
}
