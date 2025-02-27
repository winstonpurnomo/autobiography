"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Drawer } from "@geist-ui/core";
import { Button } from "./ui/button";

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

  const [drawer, setDrawer] = useState(false);

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between py-8 font-serif">
      <Link
        href="/"
        className="border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        <span className="sm:hidden">w/p</span>
        <span className="hidden sm:inline">winston/purnomo</span>
      </Link>
      <div className="flex items-center gap-8">
        <nav className="flex">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </Button>
          <Drawer
            placement="bottom"
            visible={drawer}
            onClose={() => setDrawer(false)}
            onContentClick={() => setDrawer(false)}
          >
            <div className="flex flex-col gap-12 py-6">
              <Drawer.Title>Menu</Drawer.Title>
              <Link
                href="/blog"
                className={`px-6 ${
                  pathname === "/blog"
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <span>Blog</span>
              </Link>
              <Link
                href="/portfolio"
                className={`px-6 ${
                  pathname === "/portfolio"
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <span>Portfolio</span>
              </Link>
              <Link
                href="/contact"
                className={`px-6 ${
                  pathname === "/contact"
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <span>Contact</span>
              </Link>
            </div>
          </Drawer>
          <div className="hidden lg:block">
            <Link
              href="/blog"
              className={`text-sm px-4 ${
                pathname === "/blog"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <span>Blog</span>
            </Link>
            <Link
              href="/portfolio"
              className={`text-sm px-4 ${
                pathname === "/portfolio"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <span>Portfolio</span>
            </Link>
            <Link
              href="/contact"
              className={`text-sm px-4 ${
                pathname === "/contact"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <span>Contact</span>
            </Link>
          </div>
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
