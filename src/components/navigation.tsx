"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    console.log("Current theme:", theme);
    setTheme(theme === "light" ? "dark" : "light");
    console.log("Theme set to:", theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between py-8 font-serif">
      <Link
        href="/"
        className="border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        winston/purnomo
      </Link>
      <div className="flex items-center gap-8">
        <nav className="flex gap-8">
          <Link
            href="/blog"
            className={`text-sm ${
              pathname === "/blog"
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/experience"
            className={`text-sm ${
              pathname === "/experience"
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Experience
          </Link>
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  );
}
