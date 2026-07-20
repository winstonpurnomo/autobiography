import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import ultracite from "ultracite/oxfmt";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";
import vitest from "ultracite/oxlint/vitest";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    ...ultracite,
    sortTailwindcss: {
      functions: ["cn", "cva"],
      stylesheet: "src/styles.css",
    },
  },
  lint: {
    extends: [core, react, tanstack, vitest],
    ignorePatterns: [...(core.ignorePatterns ?? []), "src/components/ui/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "sort-keys": "off",
      "func-style": "off",
      "no-use-before-define": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: { typeAware: true, typeCheck: true },
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["vp check --fix"],
  },
  plugins: lazyPlugins(() => [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: "@mdx-js/react",
    }),
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ]),
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "127.0.0.1",
    port: Number(process.env.PORT) || 3000,
  },
});
