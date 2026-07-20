import { useTheme } from "next-themes";
import React from "react";
import ShikiHighlighter from "react-shiki";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

function Code({ className, children, ...props }: CodeProps) {
  const { resolvedTheme } = useTheme();

  if (className === undefined || className === "") {
    return (
      <code
        className="rounded bg-muted px-1 py-0.5 font-mono text-sm before:content-none after:content-none"
        {...props}
      >
        {children}
      </code>
    );
  }

  const language = className.replace("language-", "") || "text";
  const code =
    // oxlint-disable-next-line typescript/no-base-to-string
    typeof children === "string" ? children.trimEnd() : String(children ?? "");

  return (
    <ShikiHighlighter
      language={language}
      theme={resolvedTheme === "dark" ? "github-dark" : "github-light"}
      className="border text-[13px]"
      showLineNumbers
      {...props}
    >
      {code}
    </ShikiHighlighter>
  );
}

function processTextNode(text: string): React.ReactNode[] {
  const parts = text.split(/(?<inlineCode>`[^`]+`)/gu);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function processChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child): React.ReactNode => {
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
  pre: ({ children }: { children?: React.ReactNode }): React.ReactNode =>
    children,
  code: Code,
  p: Paragraph,
};
