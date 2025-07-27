import type { MDXComponents } from "mdx/types";
import { Code } from "./components/ui/code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="mb-4">{children}</p>,
    Code: ({ children, language }) => (
      <Code language={language}>{children}</Code>
    ),
    ...components,
  };
}
