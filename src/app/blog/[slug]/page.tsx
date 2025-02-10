import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import MDXRemoteClient from "@/components/mdx-remote-client";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function generateStaticParams() {
  const files = readdirSync(path.join(process.cwd(), "content"));
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  if (!existsSync(filePath)) {
    return <h1>404 - Page Not Found</h1>;
  }

  const fileContent = readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content);

  return (
    <div>
      <h1>{data.title || slug}</h1>
      <MDXRemoteClient mdxSource={mdxSource} />
    </div>
  );
}
