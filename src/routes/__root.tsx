import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  linkOptions,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ChevronDownIcon, SidebarIcon, SunIcon } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerProvider,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, useNavTransition } from "@/lib/utils";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Winston Purnomo",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
    ],
  }),
  shellComponent: RootDocument,
});

const NAV = [
  {
    label: "Contact",
    to: linkOptions({ to: "/contact" }),
  },
] as const;

const FOOTER_LINK_COLUMNS = [["Contact"]] as const;

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const lastPointer = useRef({ x: 0, y: 0 });

  const handleThemeChange = (newTheme: string) => {
    const { x, y } = lastPointer.current;

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);

    document.startViewTransition(() => {
      flushSync(() => setTheme(newTheme));
    });
  };

  const trackPointer = (e: React.PointerEvent) => {
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button type="button" {...props}>
            <div className="flex space-x-2 items-center">
              <SunIcon className="size-4" />
              <ChevronDownIcon className="size-3" />
            </div>
          </button>
        )}
      />
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        onPointerDown={trackPointer}
      >
        <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
          <DropdownMenuRadioItem value="light" className="text-md">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-md" value="dark">
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-md" value="system">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const handleNavClick = useNavTransition();

  return (
    <DrawerProvider>
      <div
        ref={setPortalContainer}
        className="[--bleed:3rem] relative flex h-screen flex-col overflow-hidden bg-black text-foreground antialiased"
      >
        <DrawerIndentBackground className="absolute inset-0 bg-black" />
        <DrawerIndent className="[--indent-radius:calc(1rem*(1-var(--drawer-swipe-progress,0)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress,0)*100000),1))] relative flex min-h-0 flex-1 flex-col bg-background origin-[center_top] will-change-transform [--progress:var(--drawer-swipe-progress,0)] [transform:scale(1)_translateY(0)] [transition:transform_0.45s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] data-[active]:[transform:scale(calc(0.96+(0.04*var(--progress))))_translateY(calc(0.75rem*(1-var(--progress))))] data-[active]:rounded-t-2xl">
          <div className="relative flex h-screen flex-col overflow-hidden">
            <Drawer>
              <header className="relative z-50 -mb-3 shrink-0 border-b border-border/80 bg-background/95 backdrop-blur-sm">
                <div className="mx-auto flex h-18 max-w-380 items-center justify-between px-6 sm:px-10">
                  <Link
                    to="/"
                    onClick={(e) => handleNavClick("/", undefined, e)}
                  >
                    <div className="flex items-center gap-3 font-semibold tracking-tight text-foreground">
                      <span className="leading-none">winston/purnomo</span>
                    </div>
                  </Link>

                  <nav className="hidden items-center gap-10 text-muted-foreground lg:flex">
                    {NAV.map((item) => (
                      <Link
                        key={item.label}
                        {...item.to}
                        onClick={(e) =>
                          handleNavClick(item.to.to, undefined, e)
                        }
                      >
                        {({ isActive }) => (
                          <span
                            className={cn(
                              "flex min-h-10 items-center gap-1.5 tracking-tight transition-colors hover:text-foreground",
                              isActive ? "underline underline-offset-2" : "",
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>
                    ))}
                    <ThemeSelector />
                  </nav>

                  <DrawerTrigger
                    className="flex items-center justify-center lg:hidden"
                    render={(props) => (
                      <button type="button" {...props}>
                        <SidebarIcon className="size-4 text-muted-foreground" />
                      </button>
                    )}
                  />
                </div>
              </header>

              <DrawerPopup
                portalProps={{ container: portalContainer }}
                position="bottom"
                showBar
                className="max-h-[80vh]"
              >
                <DrawerContent>
                  <div className="px-6 py-4">
                    <nav className="flex flex-col gap-1">
                      {NAV.map((item) => (
                        <Link
                          key={item.label}
                          {...item.to}
                          onClick={(e) =>
                            handleNavClick(item.to.to, undefined, e)
                          }
                        >
                          {({ isActive }) => (
                            <DrawerClose>
                              <span
                                className={cn(
                                  "flex min-h-12 items-center text-lg font-medium transition-colors hover:text-muted-foreground",
                                  isActive ? "text-primary" : "text-foreground",
                                )}
                              >
                                {item.label}
                              </span>
                            </DrawerClose>
                          )}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-6 border-t border-border pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm">Theme</span>
                        <ThemeSelector />
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </DrawerPopup>

              <div className="relative min-h-0 flex-1">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground/6"
                    width="1800"
                    height="1800"
                    viewBox="-900 -900 1800 1800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden="true"
                  >
                    {[120, 240, 360, 480, 600, 720, 840].map((r) => (
                      <circle key={r} r={r} />
                    ))}
                    {Array.from({ length: 24 }, (_, i) => {
                      const angle = (i * Math.PI * 2) / 24;
                      return (
                        <line
                          key={i}
                          x1={0}
                          y1={0}
                          x2={Number((Math.cos(angle) * 840).toFixed(2))}
                          y2={Number((Math.sin(angle) * 840).toFixed(2))}
                          strokeWidth="0.75"
                        />
                      );
                    })}
                    <circle r={4} fill="currentColor" stroke="none" />
                  </svg>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-0 overflow-y-scroll">
                  <div className="mx-auto max-w-300 h-100 border-x border-t border-border bg-card px-6 py-10 sm:px-10 sm:py-24">
                    <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-24">
                      <div className="max-w-200">
                        <div className="mb-8 flex items-center gap-3 font-semibold tracking-tight text-foreground">
                          <span className="leading-none">winston/purnomo</span>
                        </div>

                        <p className="mb-8 text-base text-muted-foreground">
                          Copyright © 2026 Winston Purnomo. All rights reserved.
                        </p>
                      </div>

                      <div className="grid gap-10 sm:grid-cols-2">
                        {FOOTER_LINK_COLUMNS.map((column) => (
                          <div
                            key={column.join("-")}
                            className="space-y-4 font-mono text-sm text-foreground"
                          >
                            {column.map((item) => (
                              // oxlint-disable-next-line jsx_a11y/anchor-is-valid
                              <a
                                key={item}
                                href="#"
                                className="block transition-colors hover:text-primary"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-scroll-container
                  className="relative z-10 h-full overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]"
                >
                  <div className="mx-auto max-w-300 pt-2">
                    <div className="border-b border-border" />
                    <div className="border-x border-b border-border bg-background min-h-[90vh]">
                      <main>{children}</main>
                    </div>
                  </div>

                  <div className="h-100" />
                </div>
              </div>
            </Drawer>
          </div>
        </DrawerIndent>
      </div>
    </DrawerProvider>
  );
}

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutComponent>
            <Outlet />
          </LayoutComponent>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
