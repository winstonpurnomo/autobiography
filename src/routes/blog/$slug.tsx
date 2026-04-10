import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdx-components";
import { useNavTransition } from "@/lib/utils";

interface PostMeta {
  title: string;
  date: string;
  description: string;
}

interface PostModule {
  frontmatter: PostMeta;
  default: React.ComponentType;
}

const postModules = import.meta.glob<PostModule>(
  "../../content/blog/*.mdx",
  { eager: true }
);

function getPost(slug: string): PostModule | undefined {
  return postModules[`../../content/blog/${slug}.mdx`];
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const post = getPost(slug)!;
  const Content = post.default;
  const handleNavClick = useNavTransition();

  return (
    <article className="px-6 sm:px-10 py-16 sm:py-24 max-w-215">
      <Link
        to="/blog"
        onClick={(e) => handleNavClick("/blog", undefined, e)}
        className="mb-10 flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3" />
        All posts
      </Link>

      <p className="mb-3 font-mono text-xs text-muted-foreground">
        {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <h1 className="mb-10 text-5xl font-serif text-foreground">
        {post.frontmatter.title}
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_code]:font-mono [&_code]:before:content-none [&_code]:after:content-none [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80">
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
      </div>
    </article>
  );
}
