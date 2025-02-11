"use client";

import dynamic from "next/dynamic";

// Dynamically import the client-only component with SSR disabled.
// This is allowed here because this file is a client component.
const MDXRemoteClient = dynamic(
  () => import("@/components/mdx-remote-client"),
  { ssr: false },
);

export default function MDXRemoteClientWrapper({
  mdxSource,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { mdxSource: any }) {
  return <MDXRemoteClient mdxSource={mdxSource} />;
}
