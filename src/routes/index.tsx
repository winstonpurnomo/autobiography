// oxlint-disable react/no-unescaped-entities
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

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

// Inline underline-style link with a company logo, sized to sit on the text baseline.
function Chip({
  href,
  icon,
  iconAlt,
  iconClassName,
  children,
}: {
  href: string;
  icon: string;
  iconAlt: string;
  iconClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground/60"
    >
      <img
        src={icon}
        alt={iconAlt}
        className={cn("inline-block h-4 w-4", iconClassName)}
      />
      {children}
      <ArrowUpRightIcon className="inline-block size-3 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
    </a>
  );
}

function RouteComponent() {
  const handleNavClick = useNavTransition();

  return (
    <div className="flex flex-col">
      {/* Avatar */}
      <div
        className={cn(
          enterAnimation,
          "mb-8 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/80 to-primary text-lg font-semibold text-primary-foreground shadow-lg select-none"
        )}
      >
        WP
      </div>

      {/* Name */}
      <h1
        className={cn(
          enterAnimation,
          "mb-6 font-serif text-5xl leading-none text-foreground motion-delay-100 sm:text-6xl"
        )}
      >
        Winston Purnomo
      </h1>

      {/* Bio */}
      <div
        className={cn(
          enterAnimation,
          "flex max-w-xl flex-col gap-4 text-lg leading-loose text-pretty text-muted-foreground motion-delay-200"
        )}
      >
        <p>
          Currently, I work at{" "}
          <Chip
            href="https://snowflake.com"
            icon="/snowflake-color.svg"
            iconAlt="Snowflake"
          >
            Snowflake
          </Chip>{" "}
          as a Forward-Deployed Engineer on the AI team.
        </p>
        <p>
          Previously, I worked at{" "}
          <Chip
            href="https://meta.com"
            icon="/meta.png"
            iconAlt="Meta"
            iconClassName="h-3 w-4"
          >
            Meta
          </Chip>{" "}
          as a Software Engineer on the Click to WhatsApp Ads team. I helped
          ship features that empower small business all around the world to
          reach their customers where they already are.
        </p>
        <p>
          Before that, I was a co-founder of a{" "}
          <Chip
            href="https://ycombinator.com"
            icon="/yc.svg"
            iconAlt="Y Combinator"
            iconClassName="h-3 w-4"
          >
            Y Combinator
          </Chip>{" "}
          portfolio company,{" "}
          <Chip
            href="https://wavelength.cx"
            icon="/wavelength.png"
            iconAlt="Wavelength"
            iconClassName="h-3 w-4"
          >
            Wavelength
          </Chip>
          , where we built the AI-native customer success platform.
        </p>
        <p>
          Prior to that, I was a software engineer at{" "}
          <Chip
            href="https://apple.com"
            icon="/apple.svg"
            iconAlt="Apple"
            iconClassName="h-3.5 w-3"
          >
            Apple
          </Chip>{" "}
          on the Apple Pay team. Our team built the software stack on iOS that
          talked to the radios.
        </p>
        <p>
          I graduated from{" "}
          <Chip
            href="https://berkeley.edu"
            icon="/berkeley.png"
            iconAlt="Berkeley"
            iconClassName="h-3.5 w-3"
          >
            UC Berkeley
          </Chip>{" "}
          with a degree in Computer Science in three years.
        </p>
      </div>

      {/* Links */}
      <div
        className={cn(
          enterAnimation,
          "mt-6 flex items-center gap-6 text-lg motion-delay-300"
        )}
      >
        <a
          href="https://github.com/winstonpurnomo"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground/60"
        >
          <img
            src="/github.svg"
            alt="GitHub"
            className="inline-block h-4 w-4 dark:invert"
          />
          GitHub
          <ArrowUpRightIcon className="inline-block size-3 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
        </a>
        <a
          href="https://linkedin.com/in/wpurnomo"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground/60"
        >
          <img
            src="/linkedin.png"
            alt="LinkedIn"
            className="inline-block h-4 w-4 object-contain"
          />
          LinkedIn
          <ArrowUpRightIcon className="inline-block size-3 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
        </a>
      </div>

      {/* Writing */}
      <section
        id="writing"
        className={cn(enterAnimation, "mt-20 motion-delay-[400ms]")}
      >
        <h2 className="mb-5 font-serif text-2xl text-foreground">Writing</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex items-baseline justify-between gap-4 border-t border-border py-3 last:border-b"
                onClick={(e) => {
                  handleNavClick("/blog/$slug", { slug: post.slug }, e);
                }}
              >
                <span className="text-base text-muted-foreground transition-colors group-hover:text-foreground">
                  {post.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground/70">
                  {formatPostDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
