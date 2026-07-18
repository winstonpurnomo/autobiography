import { useNavigate } from "@tanstack/react-router";
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Staggered page-enter animation: pair with a motion-delay-* class per chunk.
export const enterAnimation =
  "motion-translate-y-in-[12px] motion-opacity-in-0 motion-blur-in-[4px] motion-duration-500 motion-ease-spring-smooth";

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
