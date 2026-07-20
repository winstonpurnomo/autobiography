# Plan 001: Make typecheck and lint pass so every later change is verifiable

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat fba657a..HEAD -- tsconfig.json vite.config.ts src/routes src/components src/hooks src/lib`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `fba657a`, 2026-07-19

## Why this matters

Both verification gates in this repo are currently red: `bun run typecheck` fails with 7 errors and `bun run lint` fails with 107. That means no change — including the other plans in this directory — can be machine-verified, and new errors accumulate invisibly. Most of the failures have two root causes: `tsconfig.json` targets lib `ES2022` while `src/routes/index.tsx` uses `Array.prototype.toSorted` (ES2023), which turns the `posts` array into an error type and cascades into ~20 downstream "unsafe any" errors; and 79 of the lint errors are inside vendored shadcn components under `src/components/ui/`, which the repo owner has explicitly said not to fix (they are generated code) — they should be excluded from lint instead. After this plan, `bun run typecheck` and `bun run lint` both exit 0 and stay meaningful.

## Current state

- `tsconfig.json` — compiler options; the problem line:
  ```json
  "lib": ["ES2022", "DOM", "DOM.Iterable"],
  ```
- `src/routes/index.tsx:22-27` — uses `toSorted`, unsupported by lib ES2022:
  ```ts
  const posts = Object.entries(postModules)
    .map(([path, mod]) => {
      const slug = path.replace("../content/blog/", "").replace(".mdx", "");
      return { slug, ...mod.frontmatter };
    })
    .toSorted((a, b) => (a.date < b.date ? 1 : -1));
  ```
- `vite.config.ts` — the `lint` block that must gain an ignore pattern:
  ```ts
  lint: {
    extends: [core, react, tanstack, vitest],
    ignorePatterns: core.ignorePatterns,
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { ... },
    options: { typeAware: true, typeCheck: true },
  },
  ```
- Three real **type** errors live in shadcn files and break `tsc --noEmit` (lint-ignoring the directory does not silence `tsc`, so these need minimal code fixes):
  - `src/components/ui/scroll-area.tsx:2` — `import * as React from "react";` is unused (TS6133).
  - `src/components/ui/calendar.tsx:88` — `table: "w-full border-collapse",` inside the `classNames` object; react-day-picker v10's `ClassNames` type has no `table` key — the equivalent key is `month_grid` (verified in `node_modules/react-day-picker/dist/cjs/UI.d.ts:30`, `MonthGrid = "month_grid"`).
  - `src/components/ui/drawer.tsx:343` — passes `scrollFade={scrollFade}` to the local `ScrollArea`, whose props are `ScrollAreaPrimitive.Root.Props` (see `src/components/ui/scroll-area.tsx:6-10`) and do not include `scrollFade`. The prop is therefore already a no-op. `scrollFade` appears only inside `drawer.tsx` (destructured with default at line 316, declared in the props type at line 322, used at line 343) — no other file references it (`grep -rn scrollFade src` returns only those three lines).
- Repo conventions: oxlint suppressions use comments like the existing
  `// oxlint-disable-next-line typescript/no-non-null-assertion` at
  `src/routes/blog/$slug.tsx:38`. Match that style.
- The repo owner's standing instruction: **do not fix lint warnings inside `src/components/ui/`** — that is why Step 3 excludes the directory from lint rather than fixing 79 errors. The three edits in Step 2 are type errors breaking the gate, the only sanctioned touches in that directory.

## Commands you will need

| Purpose   | Command             | Expected on success |
|-----------|---------------------|---------------------|
| Install   | `bun install`       | exit 0 (should be a no-op) |
| Typecheck | `bun run typecheck` | exit 0, no errors   |
| Lint      | `bun run lint`      | exit 0              |
| Format    | `bun run format`    | exit 0              |

There is no test suite yet (`bun run test` reports "No test files found" — expected; do not try to fix that here).

## Scope

**In scope** (the only files you should modify):
- `tsconfig.json`
- `vite.config.ts`
- `src/components/ui/scroll-area.tsx` (one deletion)
- `src/components/ui/calendar.tsx` (one key rename)
- `src/components/ui/drawer.tsx` (remove one dead prop)
- `src/components/mdx-components.tsx`
- `src/routes/__root.tsx`
- `src/routes/blog/$slug.tsx`
- `src/routes/index.tsx` (only if residual errors remain after Step 1)
- `src/hooks/use-mobile.ts`

**Out of scope** (do NOT touch, even though they look related):
- Every other file under `src/components/ui/` — vendored shadcn code; the owner has said not to clean it up.
- `oxlint.config.ts` / `oxfmt.config.ts` — legacy standalone configs; lint runs through `vite.config.ts`.
- `src/routeTree.gen.ts` — generated.
- Any behavioral change to components — this plan is gate-repair only.

## Git workflow

- Branch: `advisor/001-verification-baseline`
- Commit style: short imperative subject, matching `git log` (e.g. "Fable impl'ed animations and scroll fix"). One commit per step is fine.
- Do NOT push or open a PR unless the operator instructed it.
- Do NOT add a Co-Authored-By trailer (repo owner preference).

## Steps

### Step 1: Bump TypeScript lib to ES2023

In `tsconfig.json`, change:

```json
"lib": ["ES2022", "DOM", "DOM.Iterable"],
```

to:

```json
"lib": ["ES2023", "DOM", "DOM.Iterable"],
```

Leave `"target": "ES2022"` unchanged.

**Verify**: `bun run typecheck` → exactly 3 errors remain, all in
`src/components/ui/` (scroll-area.tsx TS6133, calendar.tsx TS2353,
drawer.tsx TS2322). The `src/routes/index.tsx` errors are gone.

### Step 2: Fix the three shadcn type errors (minimal edits only)

1. `src/components/ui/scroll-area.tsx` — delete line 2
   (`import * as React from "react";`).
2. `src/components/ui/calendar.tsx:88` — rename the object key `table` to
   `month_grid` (keep the value `"w-full border-collapse"`).
3. `src/components/ui/drawer.tsx` — remove the `scrollFade` prop entirely:
   delete `scrollFade = true,` from the destructuring (~line 316), delete
   `scrollFade?: boolean;` from the props type (~line 322), and change
   `<ScrollArea className="touch-auto" scrollFade={scrollFade}>` (~line 343)
   to `<ScrollArea className="touch-auto">`. This is behavior-preserving:
   `ScrollArea` never accepted the prop, so it was already inert.

**Verify**: `bun run typecheck` → exit 0, no errors.

### Step 3: Exclude vendored shadcn components from lint

In `vite.config.ts`, change:

```ts
ignorePatterns: core.ignorePatterns,
```

to:

```ts
ignorePatterns: [...core.ignorePatterns, "src/components/ui/**"],
```

If `core.ignorePatterns` turns out not to be spreadable (not an array), STOP and report its actual shape instead of guessing.

**Verify**: `bun run lint 2>&1 | grep -c 'components/ui/'` → `0`.
Remaining lint errors should be confined to `src/components/mdx-components.tsx`,
`src/routes/__root.tsx`, `src/routes/blog/$slug.tsx`, and
`src/hooks/use-mobile.ts` (plus possibly `src/routes/index.tsx`).

### Step 4: Fix the remaining app-code lint errors

Apply exactly these fixes (all are mechanical; the rule name in parentheses is what the error output shows):

1. `src/components/mdx-components.tsx:43` (prefer-named-capture-group, require-unicode-regexp) — change
   ```ts
   const parts = text.split(/(`[^`]+`)/g);
   ```
   to
   ```ts
   const parts = text.split(/(?<inlineCode>`[^`]+`)/gu);
   ```
   (`String.prototype.split` still includes named-group captures in its result, so behavior is unchanged.)
2. `src/components/mdx-components.tsx:14` (strict-boolean-expressions) — change `if (!className)` to `if (className === undefined || className === "")`.
3. `src/components/mdx-components.tsx:27` (no-base-to-string) — add on the line above:
   ```ts
   // oxlint-disable-next-line typescript/no-base-to-string
   ```
   Do NOT change the expression itself — its semantics are covered by a separate, unselected finding.
4. `src/components/mdx-components.tsx:60` and `:73` (promise-function-async) — these fire because React 19's `ReactNode` includes promises. Add explicit return type annotations: the callback inside `React.Children.map` at line 60 becomes `(child): React.ReactNode => {`, and the `pre` component at line 73 becomes `pre: ({ children }: { children?: React.ReactNode }): React.ReactNode => children,`. If the annotation alone does not silence the rule, use an `// oxlint-disable-next-line typescript/promise-function-async` comment instead.
5. `src/routes/__root.tsx:71` (strict-boolean-expressions) — change `if (!document.startViewTransition)` to `if (typeof document.startViewTransition !== "function")` (this matches the same check in `src/lib/utils.ts:25`).
6. `src/routes/blog/$slug.tsx:30` (only-throw-error) — `throw notFound()` is the standard TanStack Router idiom; suppress with `// oxlint-disable-next-line typescript/only-throw-error` on the line above.
7. `src/hooks/use-mobile.ts:19` (strict-boolean-expressions) — change `return !!isMobile;` to `return isMobile ?? false;`.

If errors remain in `src/routes/index.tsx` after Step 1's lib bump (they should all have been cascades of the `toSorted` error), and each has an obvious one-line mechanical fix stated in the error's own help text, apply it. Otherwise STOP.

**Verify**: `bun run lint` → exit 0. `bun run typecheck` → exit 0.

### Step 5: Format and final check

Run `bun run format`, then re-run both gates.

**Verify**: `bun run typecheck` → exit 0; `bun run lint` → exit 0;
`git status` shows only in-scope files modified.

## Test plan

No test suite exists in this repo yet (plan 002 introduces the first test).
Verification for this plan is the two gates going green, plus a manual smoke
check if you can run the dev server: `bun x vp dev` and load `/` — the page
renders, theme switcher works. If the dev server cannot start in your
environment, the two green gates are sufficient; note that in your report.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `bun run typecheck` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run lint 2>&1 | grep -c 'components/ui/'` prints 0
- [ ] `grep -n '"ES2023"' tsconfig.json` matches
- [ ] `grep -rn "scrollFade" src/` returns no matches
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- After Step 1, `bun run typecheck` reports errors in files other than the
  three named shadcn files.
- `core.ignorePatterns` in Step 3 is not an array or the spread fails.
- After Step 4, lint reports errors not on this plan's list and their fix is
  not a one-liner stated in the error's help text, or more than 5 unlisted
  errors appear.
- Fixing anything appears to require editing shadcn files beyond the three
  named edits in Step 2.

## Maintenance notes

- `src/components/ui/**` is now lint-ignored but still type-checked. When
  shadcn components are re-generated/updated, new type errors may appear;
  the convention is minimal type-level fixes only, no lint cleanup.
- The `month_grid` rename in calendar.tsx tracks react-day-picker's v9+ key
  names; if react-day-picker is upgraded again, re-check the `ClassNames` keys.
- Plans 002–004 assume both gates are green; they must not land before this.
- Reviewer focus: confirm the drawer still scrolls correctly on mobile
  (the removed `scrollFade` prop was inert, so no visual change is expected).
