// oxlint-disable react/no-unescaped-entities
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  cn,
  enterAnimation,
  formatPostDate,
  useNavTransition,
} from "@/lib/utils";

interface PostMeta {
  title: string;
  date: string;
  description: string;
}

interface PostModule {
  frontmatter: PostMeta;
}

const postModules = import.meta.glob<PostModule>("../content/blog/*.mdx", {
  eager: true,
});

const posts = Object.entries(postModules)
  .map(([path, mod]) => {
    const slug = path.replace("../content/blog/", "").replace(".mdx", "");
    return { slug, ...mod.frontmatter };
  })
  .toSorted((a, b) => (a.date < b.date ? 1 : -1));

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleNavClick = useNavTransition();

  return (
    <section className="flex min-h-screen max-w-215 flex-col justify-center px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <p
        className={cn(
          enterAnimation,
          "mb-4 font-mono text-xs leading-tight tracking-wide text-muted-foreground uppercase"
        )}
      >
        Software Engineer · San Francisco Bay Area
      </p>
      <div
        className={cn(
          enterAnimation,
          "mb-8 flex items-end gap-5 self-start motion-delay-100"
        )}
      >
        <h1 className="font-serif text-7xl text-balance text-foreground">
          Hello, I'm Winston
        </h1>
        <div className="mb-2 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground select-none sm:flex">
          WP
        </div>
      </div>
      <p
        className={cn(
          enterAnimation,
          "max-w-245 text-xl leading-snug text-pretty text-muted-foreground motion-delay-200"
        )}
      >
        I'm a software engineer based in Silicon Valley.
      </p>

      <div
        className={cn(
          enterAnimation,
          "flex space-x-2 pt-6 text-muted-foreground motion-delay-300"
        )}
      >
        <a
          href="https://github.com/winstonpurnomo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="x-0 rounded-full text-xl text-foreground"
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
            className="x-0 rounded-full text-xl text-foreground"
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

      <section
        id="about"
        className={cn(enterAnimation, "space-y-8 pt-16 motion-delay-[400ms]")}
      >
        <p className="mb-2 font-mono text-xs leading-tight tracking-wide text-muted-foreground uppercase">
          About
        </p>
        <p className="text-xl leading-snug text-pretty text-foreground">
          Currently, I work at{" "}
          <a
            href="https://snowflake.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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

        <p className="text-xl leading-snug text-pretty text-foreground">
          Previously, I worked at{" "}
          <a href="https://meta.com" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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

        <p className="text-xl leading-snug text-pretty text-foreground">
          Before that, I was a co-founder of a{" "}
          <a
            href="https://ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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

        <p className="text-xl leading-snug text-pretty text-foreground">
          Prior to that, I was a software engineer at{" "}
          <a href="https://apple.com" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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
          on the Apple Pay team. Our team built the software stack on iOS that
          talked to the radios.
        </p>

        <p className="text-xl leading-snug text-pretty text-foreground">
          I graduated from{" "}
          <a
            href="https://berkeley.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="-translate-y-0.5 rounded-full py-0.5 align-middle text-xl text-foreground"
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

      <section
        id="writing"
        className={cn(enterAnimation, "pt-16 motion-delay-500")}
      >
        <p className="mb-6 font-mono text-xs leading-tight tracking-wide text-muted-foreground uppercase">
          Writing
        </p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex items-baseline justify-between gap-4 border-t border-border py-3"
                onClick={(e) => {
                  handleNavClick("/blog/$slug", { slug: post.slug }, e);
                }}
              >
                <span className="text-base text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {formatPostDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
