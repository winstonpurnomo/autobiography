import { createFileRoute, Link } from "@tanstack/react-router";
import { useNavTransition } from "@/lib/utils";

interface PostMeta {
  title: string;
  date: string;
  description: string;
}

interface PostModule {
  frontmatter: PostMeta;
}

const postModules = import.meta.glob<PostModule>(
  "../../content/blog/*.mdx",
  { eager: true }
);

const posts = Object.entries(postModules)
  .map(([path, mod]) => {
    const slug = path.replace("../../content/blog/", "").replace(".mdx", "");
    return { slug, ...mod.frontmatter };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleNavClick = useNavTransition();

  return (
    <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-215">
      <p className="mb-4 text-xs leading-tight tracking-wide text-muted-foreground uppercase font-mono">
        Writing
      </p>
      <h1 className="mb-12 text-5xl font-serif text-foreground">Blog</h1>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block"
              onClick={(e) =>
                handleNavClick("/blog/$slug", { slug: post.slug }, e)
              }
            >
              <p className="mb-1 font-mono text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mb-1.5 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
