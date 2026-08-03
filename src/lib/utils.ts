import { useNavigate } from "@tanstack/react-router";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Staggered page-enter animation: pair with a motion-delay-* class per chunk.
// No motion-blur-in here: it leaves a `filter` on the element, which keeps it on
// its own compositing layer and permanently soft-rasterizes text on mobile.
export const enterAnimation =
  "motion-translate-y-in-[12px] motion-opacity-in-0 motion-duration-500 motion-ease-spring-smooth";

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

export function useNavTransition() {
  const navigate = useNavigate();

  return (
    to: string,
    params: Record<string, string> | undefined,
    e: React.MouseEvent
  ) => {
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
