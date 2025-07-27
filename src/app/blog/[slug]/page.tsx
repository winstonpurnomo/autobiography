import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import * as motion from "motion/react-client";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { useMDXComponents } from "@/mdx-components";

const MDX_RE = /\.mdx?$/i;

export function generateStaticParams() {
  const files = readdirSync(path.join(process.cwd(), "src/content"));
  return files.map((file) => ({
    slug: file.replace(MDX_RE, ""),
  }));
}

interface Frontmatter {
  title: string;
  date: string;
  tags?: string[];
}

const badgeColors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-red-100",
  "bg-purple-100",
];

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
    <div className="mx-auto max-w-[80rem] px-6 md:px-12">
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {data.frontmatter.title}
      </motion.h1>
      <motion.em
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        {data.frontmatter.date}
      </motion.em>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        {data.frontmatter.tags?.map((tag, i) => (
          <Badge
            className={`mr-2 bg-white-50 ${badgeColors[i % badgeColors.length]} text-black`}
            key={tag}
          >
            {tag}
          </Badge>
        ))}
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      >
        {data.content}
      </motion.div>
    </div>
  );
}
