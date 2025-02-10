import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

export default async function BlogListPage() {
  const contentDir = path.join(process.cwd(), "content");
  const files = readdirSync(contentDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(contentDir, file);
      const fileContent = readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date) : new Date(0),
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title} - {post.date.toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
