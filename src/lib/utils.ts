import { useNavigate } from "@tanstack/react-router";
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import React from "react";
import { flushSync } from "react-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useNavTransition() {
  const navigate = useNavigate();

  return (
    to: string,
    params: Record<string, string> | undefined,
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      navigate({ to, params });
      const container = document.querySelector("[data-scroll-container]");
      if (container) {container.scrollTop = 0;}
      return;
    }

    document.documentElement.style.setProperty("--vt-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--vt-y", `${e.clientY}px`);

    document.startViewTransition(() => {
      flushSync( async () => navigate({ to, params }));
      const container = document.querySelector("[data-scroll-container]");
      if (container) {container.scrollTop = 0;}
    });
  };
}
