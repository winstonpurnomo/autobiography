// @ts-nocheck
"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface CodeProps {
  children: ReactNode;
  language?: string;
  className?: string;
}

function Code({ children, language, className = "" }: CodeProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    let mounted = true;

    const highlightCode = async () => {
      if (!codeRef.current || typeof window === "undefined") return;

      try {
        // Reset highlighting state
        setIsHighlighted(false);

        // Clear any existing highlighting and get text content
        if (codeRef.current) {
          const codeText =
            typeof children === "string"
              ? children
              : codeRef.current.textContent || String(children);
          codeRef.current.textContent = codeText;
        }

        // Dynamically import Prism
        const Prism = await import("prismjs");

        // Load language components
        if (language) {
          switch (language) {
            case "javascript":
            case "js":
              await import("prismjs/components/prism-javascript");
              break;
            case "typescript":
            case "ts":
              await import("prismjs/components/prism-typescript");
              break;
            case "jsx":
              await import("prismjs/components/prism-jsx");
              break;
            case "tsx":
              await import("prismjs/components/prism-tsx");
              break;
            case "python":
            case "py":
              await import("prismjs/components/prism-python");
              break;
            case "go":
              await import("prismjs/components/prism-go");
              break;
            case "rust":
            case "rs":
              await import("prismjs/components/prism-rust");
              break;
            case "swift":
              await import("prismjs/components/prism-swift");
              break;
            case "json":
              await import("prismjs/components/prism-json");
              break;
            case "css":
              await import("prismjs/components/prism-css");
              break;
            case "bash":
            case "shell":
              await import("prismjs/components/prism-bash");
              break;
          }
        }

        // Small delay to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 10));

        if (mounted && codeRef.current) {
          Prism.default.highlightElement(codeRef.current);
          setIsHighlighted(true);
        }
      } catch (error) {
        console.warn("Failed to load Prism.js:", error);
        if (mounted) setIsHighlighted(true); // Show unstyled code
      }
    };

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [children, language]);

  return (
    <>
      <style global jsx>{`
        /* Prism.js Tomorrow Night Theme */
        code[class*="language-"],
        pre[class*="language-"] {
          color: #ccc;
          background: none;
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          font-size: 1em;
          text-align: left;
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          word-wrap: normal;
          line-height: 1.5;
          tab-size: 4;
          hyphens: none;
        }

        .token.comment,
        .token.block-comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #999;
        }

        .token.punctuation {
          color: #ccc;
        }

        .token.tag,
        .token.attr-name,
        .token.namespace,
        .token.deleted {
          color: #e2777a;
        }

        .token.function-name {
          color: #6196cc;
        }

        .token.boolean,
        .token.number,
        .token.function {
          color: #f08d49;
        }

        .token.property,
        .token.class-name,
        .token.constant,
        .token.symbol {
          color: #f8c555;
        }

        .token.selector,
        .token.important,
        .token.atrule,
        .token.keyword,
        .token.builtin {
          color: #cc99cd;
        }

        .token.string,
        .token.char,
        .token.attr-value,
        .token.regex,
        .token.variable {
          color: #7ec699;
        }

        .token.operator,
        .token.entity,
        .token.url {
          color: #67cdcc;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }

        .token.inserted {
          color: green;
        }
      `}</style>
      <div className={`my-4 rounded-lg bg-gray-900 p-4 ${className}`}>
        {language && (
          <div className="mb-2 text-gray-400 text-xs uppercase tracking-wide">
            {language}
          </div>
        )}
        <pre className="overflow-x-auto">
          <code
            className={`whitespace-pre font-mono text-gray-100 text-sm leading-relaxed ${language ? `language-${language}` : ""}`}
            ref={codeRef}
            style={{ opacity: isHighlighted ? 1 : 0.7 }}
          >
            {children}
          </code>
        </pre>
      </div>
    </>
  );
}

export { Code };
