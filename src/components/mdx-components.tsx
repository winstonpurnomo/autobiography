import { useTheme } from "next-themes";
import ShikiHighlighter from "react-shiki";
import React from "react";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

function Code({ className, children, ...props }: CodeProps) {
  const { resolvedTheme } = useTheme();

  if (!className) {
    return (
      <code
        className="bg-muted rounded px-1 py-0.5 text-sm font-mono before:content-none after:content-none"
        {...props}
      >
        {children}
      </code>
    );
  }

  const language = className.replace("language-", "") || "text";
  const code =
    typeof children === "string" ? children.trimEnd() : String(children ?? "");

  return (
    <ShikiHighlighter
      language={language}
      theme={resolvedTheme === "dark" ? "github-dark" : "github-light"}
      className="text-[13px] border"
      showLineNumbers
      {...props}
    >
      {code}
    </ShikiHighlighter>
  );
}

function processTextNode(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="bg-muted rounded px-1 py-0.5 text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function processChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return processTextNode(child);
    }
    return child;
  });
}

function Paragraph({ children }: { children?: React.ReactNode }) {
  return <p>{processChildren(children)}</p>;
}

export const mdxComponents = {
  pre: ({ children }: { children?: React.ReactNode }) => children,
  code: Code,
  p: Paragraph,
};
