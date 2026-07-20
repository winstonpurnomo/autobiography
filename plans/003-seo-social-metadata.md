# Plan 003: Add SEO and social-sharing metadata (site-wide and per-post)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat fba657a..HEAD -- src/routes/__root.tsx src/routes/blog/$slug.tsx src/routes/index.tsx src/content/blog`
> Plans 001 and 002 legitimately touch `__root.tsx`, `$slug.tsx`, and
> `index.tsx` (lint fixes, date helper). Compare the "Current state" excerpts
> below against the live code; proceed if the head/meta and frontmatter
> structures still match, STOP on structural mismatch.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/002-fix-dates-and-modifier-clicks.md (touches the same files; land after it to avoid conflicts)
- **Category**: dx
- **Planned at**: commit `fba657a`, 2026-07-19

## Why this matters

This is a personal site whose whole purpose is being found and shared, yet it ships almost no metadata: no `<meta name="description">`, no Open Graph or Twitter tags, and no per-page titles — every blog post shares the bare title "Winston Purnomo". Search snippets are auto-generated junk and pasting a post link into LinkedIn/Slack/Twitter produces an empty card. The blog frontmatter type already declares a `description` field (`src/routes/index.tsx:11`) but no post defines one — the intent existed and was never delivered. After this plan, every page has a real title and description, the root has OG/Twitter defaults, and each post page emits its own metadata.

## Current state

- `src/routes/__root.tsx:35-62` — the only head configuration in the app:
  ```tsx
  export const Route = createRootRoute({
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Winston Purnomo" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    }),
    shellComponent: RootDocument,
  });
  ```
- `src/routes/blog/$slug.tsx:27-34` — the post route has a loader but **no `head`**:
  ```tsx
  export const Route = createFileRoute("/blog/$slug")({
    loader: ({ params }) => {
      if (!getPost(params.slug)) {
        throw notFound();
      }
    },
    component: RouteComponent,
  });
  ```
  The component re-derives the post via `getPost(slug)!`. `getPost` (lines 23–25) looks up `postModules` built from `import.meta.glob("../../content/blog/*.mdx", { eager: true })`; each module has `frontmatter: PostMeta` and `default: React.ComponentType`.
- `PostMeta` (declared in both `src/routes/index.tsx:8-12` and `src/routes/blog/$slug.tsx:8-12`): `{ title: string; date: string; description: string }`.
- Post frontmatter today has `title`, `date`, `tags` — **no `description`**. Example (`src/content/blog/welcome-to-my-blog.mdx:1-7`):
  ```yaml
  ---
  title: "Welcome to my blog"
  date: "2025-02-10"
  tags:
    - welcome
    - tech
  ---
  ```
- `public/manifest.json` exists (PWA manifest, `theme_color: "#09090b"`) but is never linked from the document head. `public/favicon-192.png` exists for apple-touch-icon use.
- **Warning**: `public/meta.png` is the **Meta (company) logo** used on the home page work-history buttons — it is NOT an Open Graph image. Do not reference it in any meta tag. No OG image asset exists in this repo; og:image is intentionally omitted (see Maintenance notes).
- The site's production URL is not recorded anywhere in the repo. Absolute `og:url` / canonical tags are therefore **out of scope** — emit only tags that work without knowing the domain.
- TanStack Start convention: route-level `head` receives `{ loaderData }` when the loader returns data; nested routes' meta merges over the root's. Title dedupe: a `{ title: ... }` entry in a child route overrides the root's.

## Commands you will need

| Purpose   | Command             | Expected on success |
|-----------|---------------------|---------------------|
| Typecheck | `bun run typecheck` | exit 0              |
| Lint      | `bun run lint`      | exit 0              |
| Tests     | `bun run test`      | same result as before this plan |
| Build     | `bun run build`     | exit 0              |
| Preview   | `bun run preview` (background) | serves on http://127.0.0.1:3000 |

## Scope

**In scope** (the only files you should modify):
- `src/routes/__root.tsx` (head config only)
- `src/routes/blog/$slug.tsx`
- `src/routes/index.tsx` (only if the shared `PostMeta` type is extracted — see Step 3)
- `src/content/blog/welcome-to-my-blog.mdx` (frontmatter only)
- `src/content/blog/the-language-id-build.mdx` (frontmatter only)
- `src/lib/utils.ts` (only if extracting `PostMeta` there)

**Out of scope** (do NOT touch, even though they look related):
- Creating an OG image, RSS feed, or sitemap — separate direction items.
- MDX body content — frontmatter blocks only.
- `public/manifest.json` — link it, don't edit it.
- Any absolute-URL tag (canonical, og:url, og:image) — the domain isn't known.

## Git workflow

- Branch: `advisor/003-seo-metadata`
- Commit style: short imperative subject. One commit is fine.
- Do NOT push or open a PR unless the operator instructed it.
- Do NOT add a Co-Authored-By trailer (repo owner preference).

## Steps

### Step 1: Expand the root head

In `src/routes/__root.tsx`, extend the `head: () => ({ ... })` return. Define the description once above the route:

```tsx
const SITE_DESCRIPTION =
  "Winston Purnomo is a software engineer in the San Francisco Bay Area — currently a Forward-Deployed Engineer on the AI team at Snowflake, previously at Meta and Apple.";
```

Meta entries to have (keeping the existing three):

```tsx
meta: [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Winston Purnomo" },
  { name: "description", content: SITE_DESCRIPTION },
  { name: "theme-color", content: "#09090b" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "Winston Purnomo" },
  { property: "og:title", content: "Winston Purnomo" },
  { property: "og:description", content: SITE_DESCRIPTION },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: "Winston Purnomo" },
  { name: "twitter:description", content: SITE_DESCRIPTION },
],
```

Links to have (keeping the existing two):

```tsx
links: [
  { rel: "stylesheet", href: appCss },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "apple-touch-icon", href: "/favicon-192.png" },
],
```

**Verify**: `bun run typecheck` → exit 0.

### Step 2: Add `description` to both posts' frontmatter

- `src/content/blog/welcome-to-my-blog.mdx` — add below `date`:
  ```yaml
  description: "Why I rebuilt my personal site, what stack it runs on now, and what's coming next."
  ```
- `src/content/blog/the-language-id-build.mdx` — add below `date`:
  ```yaml
  description: "If I designed a programming language today: Go-style imports and the other opinionated choices I'd make."
  ```

Change nothing else in the frontmatter or body.

**Verify**: `grep -c "description:" src/content/blog/*.mdx` → each file reports 1.

### Step 3: Return the post from the loader and add a per-post head

In `src/routes/blog/$slug.tsx`, replace the route definition with:

```tsx
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) {
      // oxlint-disable-next-line typescript/only-throw-error
      throw notFound();
    }
    return { frontmatter: post.frontmatter };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.frontmatter.title} — Winston Purnomo` },
          { name: "description", content: loaderData.frontmatter.description },
          { property: "og:type", content: "article" },
          { property: "og:title", content: loaderData.frontmatter.title },
          {
            property: "og:description",
            content: loaderData.frontmatter.description,
          },
          { name: "twitter:title", content: loaderData.frontmatter.title },
          {
            name: "twitter:description",
            content: loaderData.frontmatter.description,
          },
        ]
      : [],
  }),
  component: RouteComponent,
});
```

(If plan 001 already placed the `only-throw-error` suppression on the old
loader line, carry it over as shown.) The component keeps using
`getPost(slug)!` — no component changes required.

If `head` in this TanStack Start version does not receive `loaderData`
(typecheck error on the destructure), STOP and report the actual `head`
context type rather than guessing.

**Verify**: `bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 4: Verify rendered output end-to-end

```sh
bun run build            # expect exit 0
bun run preview &        # starts server on 127.0.0.1:3000
sleep 5
curl -s http://127.0.0.1:3000/ | grep -o 'name="description"' | head -1
curl -s http://127.0.0.1:3000/blog/welcome-to-my-blog | grep -o '<title>[^<]*</title>'
kill %1
```

**Verify**: first grep prints `name="description"`; second prints
`<title>Welcome to my blog — Winston Purnomo</title>`. If the preview server
binds a different port, read the port from its startup output and retry once;
if SSR HTML contains no head tags at all, STOP and report.

## Test plan

No unit tests for meta tags (they'd test the framework). The end-to-end check
in Step 4 is the test: SSR HTML for `/` contains the description meta, and a
post page carries its own title. Run `bun run test` once at the end to confirm
the suite (from plan 002, if landed) still passes.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `bun run typecheck` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run build` exits 0
- [ ] SSR HTML for `/` contains `name="description"` and `rel="manifest"`
- [ ] SSR HTML for `/blog/welcome-to-my-blog` contains `Welcome to my blog — Winston Purnomo` in `<title>`
- [ ] `grep -rn "meta.png" src/routes/__root.tsx src/routes/blog/` returns no matches (the Meta logo was not used as an OG image)
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Plan 001 has not landed (gates red at start).
- The `head` option's context does not provide `loaderData` (Step 3).
- SSR output in Step 4 contains no `<head>` content (would mean the app isn't
  server-rendering heads; the approach needs rethinking, not patching).
- You feel the need to hardcode a production domain anywhere — that decision
  belongs to the owner.

## Maintenance notes

- **Deferred: og:image.** No social-card image exists (`public/meta.png` is the
  Meta company logo — never use it for this). When the owner creates one
  (1200×630 PNG, e.g. `public/og.png`), add `og:image` / `twitter:image` tags
  and switch `twitter:card` to `summary_large_image`.
- **Deferred: canonical/og:url** until the production domain is recorded in the
  repo (suggest an env var or a constant in `__root.tsx` when it is).
- New blog posts must include a `description:` frontmatter field; the post head
  renders it directly. Reviewer should check any new `.mdx` for it.
- If an RSS feed/sitemap is added later (direction item), reuse the frontmatter
  descriptions added here.
