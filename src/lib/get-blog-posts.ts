import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: Date;
};

export async function getBlogPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), "src/content");
  const files = fs.readdirSync(contentDir);

  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date) : new Date(0),
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
