import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

export async function generateStaticParams() {
  const files = readdirSync(path.join(process.cwd(), "src/content"));
  return files.map((file) => ({
    slug: file.replace(/\.mdx?$/, ""),
  }));
}

interface Frontmatter {
  title: string;
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
  const data = await compileMDX<Frontmatter>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
    components: useMDXComponents({}),
  });

  return (
    <div className="max-w-[80rem] px-6 md:px-12 mx-auto">{data.content}</div>
  );
}
