import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import MDXRemoteClientWrapper from "@/components/mdx-remote-client";

export async function generateStaticParams() {
  const files = readdirSync(path.join(process.cwd(), "src/content"));
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Wrap params in Promise.resolve so that awaiting it matches Next.js’ expected type.
  const { slug } = await params;

  if (!slug) {
    // Instead of returning a 404 element, use notFound() so Next.js shows the 404 page.
    notFound();
  }

  const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`);

  if (!existsSync(filePath)) {
    notFound();
  }

  const fileContent = readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content);

  return (
    <div>
      <h1>{data.title || slug}</h1>
      <MDXRemoteClientWrapper mdxSource={mdxSource} />
    </div>
  );
}
