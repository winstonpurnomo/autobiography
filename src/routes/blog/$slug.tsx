import { MDXProvider } from "@mdx-js/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { mdxComponents } from "@/components/mdx-components";
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
  default: React.ComponentType;
}

const postModules = import.meta.glob<PostModule>("../../content/blog/*.mdx", {
  eager: true,
});

function getPost(slug: string): PostModule | undefined {
  return postModules[`../../content/blog/${slug}.mdx`];
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) {
      // oxlint-disable-next-line typescript/only-throw-error
      throw notFound();
    }
    return { frontmatter: post.frontmatter };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.frontmatter.title} — Winston Purnomo` },
          { name: "description", content: loaderData.frontmatter.description },
          { property: "og:type", content: "article" },
          { property: "og:title", content: loaderData.frontmatter.title },
          {
            property: "og:description",
            content: loaderData.frontmatter.description,
          },
          { name: "twitter:title", content: loaderData.frontmatter.title },
          {
            name: "twitter:description",
            content: loaderData.frontmatter.description,
          },
        ]
      : [],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  // oxlint-disable-next-line typescript/no-non-null-assertion
  const post = getPost(slug)!;
  const Content = post.default;
  const handleNavClick = useNavTransition();

  return (
    <article className="max-w-215 px-6 py-16 sm:px-10 sm:py-24">
      <Link
        to="/"
        onClick={(e) => {
          handleNavClick("/", undefined, e);
        }}
        className={cn(
          enterAnimation,
          "mb-10 flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        )}
      >
        <ArrowLeftIcon className="size-3" />
        All posts
      </Link>

      <p
        className={cn(
          enterAnimation,
          "mb-3 font-mono text-xs text-muted-foreground motion-delay-100"
        )}
      >
        {formatPostDate(post.frontmatter.date, "long")}
      </p>

      <h1
        className={cn(
          enterAnimation,
          "mb-10 font-serif text-5xl text-balance text-foreground motion-delay-200"
        )}
      >
        {post.frontmatter.title}
      </h1>

      <div
        className={cn(
          enterAnimation,
          "prose max-w-none text-foreground prose-neutral motion-delay-300 dark:prose-invert prose-headings:text-balance prose-p:text-pretty [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 [&_code]:font-mono [&_code]:before:content-none [&_code]:after:content-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif"
        )}
      >
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
      </div>
    </article>
  );
}
