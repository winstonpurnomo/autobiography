# Plan 002: Fix off-by-one blog dates and restore modifier-click behavior on internal links

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat fba657a..HEAD -- src/lib/utils.ts src/routes/index.tsx src/routes/blog/$slug.tsx src/routes/__root.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. (Plan 001 touches `__root.tsx` and
> `$slug.tsx` for lint fixes — those diffs are expected; the excerpts below
> are unaffected by them.)

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-fix-verification-baseline.md
- **Category**: bug
- **Planned at**: commit `fba657a`, 2026-07-19

## Why this matters

Two user-visible correctness bugs. First: blog post dates are stored as ISO strings like `"2025-07-26"`; `new Date("2025-07-26")` parses as **UTC midnight**, and `toLocaleDateString("en-US")` then renders in the visitor's local timezone — so every visitor west of UTC (all of the US, including the site owner in the Bay Area) sees the previous day, e.g. "Jul 25, 2025" for a post dated July 26. Second: the custom view-transition navigation hook calls `e.preventDefault()` unconditionally, so Cmd/Ctrl+click, Shift+click, and Alt+click on any internal link navigate the current tab instead of opening a new tab/window — hijacking standard browser behavior. Both fixes are small and share the same files.

## Current state

- `src/lib/utils.ts` — shared helpers (`cn`, `enterAnimation`, `useNavTransition`). The buggy hook (lines 15–37):
  ```ts
  export function useNavTransition() {
    const navigate = useNavigate();

    return (
      to: string,
      params: Record<string, string> | undefined,
      e: React.MouseEvent
    ) => {
      e.preventDefault();

      if (typeof document.startViewTransition !== "function") {
        void navigate({ to, params });
        return;
      }

      document.documentElement.style.setProperty("--vt-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--vt-y", `${e.clientY}px`);

      document.startViewTransition(async () => {
        await navigate({ to, params });
      });
    };
  }
  ```
  The returned handler is attached to TanStack `<Link>` `onClick` in three places: `src/routes/__root.tsx:143` (header logo → `/`), `src/routes/index.tsx:275` (blog list → `/blog/$slug`), `src/routes/blog/$slug.tsx:47` (back link → `/`). TanStack `<Link>` renders a real `<a href>` and natively respects modifier clicks — it is only the unconditional `preventDefault` that breaks them.
- `src/routes/index.tsx:283-287` — date rendering site 1:
  ```tsx
  {new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}
  ```
- `src/routes/blog/$slug.tsx:63-67` — date rendering site 2 (same pattern, `month: "long"`).
- Post dates in frontmatter are plain ISO day strings, e.g. `src/content/blog/the-language-id-build.mdx` has `date: "2025-07-26"`.
- Test infra: vitest 4 via `bun run test` (`vp test run`). **There are currently zero test files**, and the bare run currently prints `No test files found, exiting with code 1` followed by an unrelated `ReferenceError: module is not defined` from the vite plugin chain. This plan adds the repo's first test; the ReferenceError may or may not affect it — see STOP conditions.
- Conventions: named exports from `src/lib/utils.ts`; no default exports in lib code.

## Commands you will need

| Purpose   | Command             | Expected on success |
|-----------|---------------------|---------------------|
| Typecheck | `bun run typecheck` | exit 0              |
| Lint      | `bun run lint`      | exit 0              |
| Tests     | `bun run test`      | exit 0, 3 tests pass |
| Format    | `bun run format`    | exit 0              |

(Gates are green at start only if plan 001 has landed — check `plans/README.md`.)

## Scope

**In scope** (the only files you should modify):
- `src/lib/utils.ts`
- `src/lib/utils.test.ts` (create)
- `src/routes/index.tsx`
- `src/routes/blog/$slug.tsx`

**Out of scope** (do NOT touch, even though they look related):
- `src/routes/__root.tsx` — it uses `useNavTransition` but needs no edit; the fix lives inside the hook.
- The `ThemeSelector` view-transition code in `__root.tsx` — different feature (theme switch, not navigation), not click-hijacking.
- `src/content/blog/*.mdx` — the date strings themselves are correct.
- Anything under `src/components/ui/`.

## Git workflow

- Branch: `advisor/002-dates-and-modifier-clicks`
- Commit style: short imperative subject. One commit for both fixes + test is fine.
- Do NOT push or open a PR unless the operator instructed it.
- Do NOT add a Co-Authored-By trailer (repo owner preference).

## Steps

### Step 1: Add a timezone-safe date formatter to `src/lib/utils.ts`

Add this exported function (below `enterAnimation`, above `useNavTransition`):

```ts
// Post dates are day-precision ISO strings ("2025-07-26"); format in UTC so
// the rendered day never shifts with the visitor's timezone.
export function formatPostDate(
  isoDate: string,
  month: "short" | "long" = "short"
): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month,
    day: "numeric",
  });
}
```

**Verify**: `bun run typecheck` → exit 0.

### Step 2: Use it at both render sites

1. `src/routes/index.tsx` — import `formatPostDate` from `@/lib/utils` (extend the existing `cn, enterAnimation, useNavTransition` import) and replace the `new Date(post.date).toLocaleDateString(...)` expression (lines ~283–287) with `formatPostDate(post.date)`.
2. `src/routes/blog/$slug.tsx` — same import extension; replace the expression at lines ~63–67 with `formatPostDate(post.frontmatter.date, "long")`.

**Verify**: `grep -rn "toLocaleDateString" src/routes/` → no matches.
`bun run typecheck` → exit 0.

### Step 3: Respect modifier clicks in `useNavTransition`

In `src/lib/utils.ts`, at the top of the returned handler (before `e.preventDefault()`), add:

```ts
// Let the browser handle new-tab/new-window gestures and already-handled events.
if (
  e.defaultPrevented ||
  e.button !== 0 ||
  e.metaKey ||
  e.ctrlKey ||
  e.shiftKey ||
  e.altKey
) {
  return;
}
```

Nothing else in the function changes. When the handler returns early, the underlying TanStack `<Link>` anchor performs its default behavior (open in new tab, etc.).

**Verify**: `bun run typecheck` → exit 0; `bun run lint` → exit 0.

### Step 4: Add the repo's first unit test

Create `src/lib/utils.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { formatPostDate } from "./utils";

describe("formatPostDate", () => {
  it("renders the calendar day from the ISO string, not a timezone-shifted day", () => {
    expect(formatPostDate("2025-07-26")).toBe("Jul 26, 2025");
  });

  it("supports long month names", () => {
    expect(formatPostDate("2025-02-10", "long")).toBe("February 10, 2025");
  });

  it("does not shift dates at year boundaries", () => {
    expect(formatPostDate("2025-01-01")).toBe("Jan 1, 2025");
  });
});
```

Note: `utils.ts` imports `useNavigate` from `@tanstack/react-router` at module top; importing the module in a test is fine (the hook is never called).

**Verify**: `bun run test` → exit 0, 3 tests pass. See STOP conditions if the
pre-existing `ReferenceError: module is not defined` blocks the run.

### Step 5: Format and final check

Run `bun run format`, re-run all three gates.

**Verify**: typecheck, lint, test all exit 0; `git status` shows only in-scope files.

## Test plan

- New file `src/lib/utils.test.ts` (created in Step 4): three cases — the exact
  regression this plan fixes (a date that shifts in US timezones), the long-month
  variant used on the post page, and a year-boundary date.
- No existing test to model after — this is the repo's first test file; the
  structure above is the pattern.
- Verification: `bun run test` → 3 passing tests.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `bun run typecheck` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run test` exits 0 with 3 passing tests (or the test-infra STOP condition was reported)
- [ ] `grep -rn "toLocaleDateString" src/routes/` returns no matches
- [ ] `grep -n "metaKey" src/lib/utils.ts` matches (modifier guard present)
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Plan 001 has not landed (gates are red before you start).
- The code at the locations in "Current state" doesn't match the excerpts.
- `bun run test` fails with the pre-existing `ReferenceError: module is not
  defined` (or any error not caused by your test's assertions) even though the
  test file exists. In that case: keep Steps 1–3, delete nothing, and report
  that test infra needs its own fix — do NOT attempt to repair the vitest/vite
  plugin chain, and do NOT modify `vite.config.ts`.
- The date assertions fail with a one-day offset **in UTC** (would mean the
  `timeZone: "UTC"` assumption is wrong — report actual output).

## Maintenance notes

- All future date rendering should go through `formatPostDate`; adding another
  raw `new Date(x).toLocaleDateString(...)` reintroduces the bug. A reviewer
  should grep for `toLocaleDateString` in new code.
- If posts ever gain time-of-day precision (full ISO timestamps), the
  `timeZone: "UTC"` choice must be revisited.
- The modifier-click guard assumes handlers are attached to TanStack `<Link>`
  elements (real anchors). If `useNavTransition` is ever used on a non-anchor
  element, early-returning will make those clicks do nothing.
- Deferred: the `ReferenceError` in the bare vitest run predates this plan and
  is out of scope here.
