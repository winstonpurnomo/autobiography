import { useTheme } from "next-themes";
import ShikiHighlighter from "react-shiki";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

function Code({ className, children, ...props }: CodeProps) {
  const { resolvedTheme } = useTheme();
  const language = className?.replace("language-", "") ?? "text";
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

export const mdxComponents = {
  pre: ({ children }: { children?: React.ReactNode }) => children,
  code: Code,
};
