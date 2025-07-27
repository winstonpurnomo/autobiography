"use client";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

interface MDXRemoteClientProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function MDXRemoteClient({ mdxSource }: MDXRemoteClientProps) {
  return <MDXRemote {...mdxSource} />;
}
