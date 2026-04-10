import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ChevronDownIcon, SidebarIcon, SunIcon, XIcon } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { useRef } from "react";

import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPortal,
  DrawerPopup,
  DrawerProvider,
  DrawerTrigger,
  DrawerViewport,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    ],
  }),
  shellComponent: RootDocument,
});

const NAV = ["Blog", "About", "Contact"] as const;

const FOOTER_LINK_COLUMNS = [
  ["Blog", "About", "Contact"],
  ["GitHub ↗", "LinkedIn ↗"],
] as const;

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

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
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
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
  const portalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <DrawerProvider>
      <div className="[--bleed:3rem] relative flex h-screen flex-col overflow-hidden bg-black text-foreground antialiased">
        <DrawerIndentBackground className="absolute inset-0 bg-black" />
        <DrawerIndent className="relative flex min-h-0 flex-1 flex-col bg-background origin-[center_top] will-change-transform [--progress:var(--drawer-swipe-progress,0)] [transform:scale(1)_translateY(0)] [transition:transform_0.45s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] data-[active]:[transform:scale(calc(0.96+(0.04*var(--progress))))_translateY(calc(0.75rem*(1-var(--progress))))] data-[active]:rounded-t-2xl">
          <div
            ref={portalContainerRef}
            className="relative flex h-screen flex-col overflow-hidden"
          >
            <Drawer>
              <header className="relative z-50 -mb-3 shrink-0 border-b border-border/80 bg-background/95 backdrop-blur-sm">
                <div className="mx-auto flex h-18 max-w-380 items-center justify-between px-6 sm:px-10">
                  <div className="flex items-center gap-3 font-semibold tracking-tight text-foreground">
                    <span className="leading-none">winston/purnomo</span>
                  </div>

                  <nav className="hidden items-center gap-10 text-muted-foreground lg:flex">
                    {NAV.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="flex min-h-10 items-center gap-1.5 transition-colors hover:text-foreground"
                      >
                        <span>{item}</span>
                      </a>
                    ))}
                    <ThemeSelector />
                  </nav>

                  <DrawerTrigger className="flex items-center justify-center lg:hidden">
                    <SidebarIcon className="size-4 text-muted-foreground" />
                  </DrawerTrigger>
                </div>
              </header>

              <DrawerPortal container={portalContainerRef.current}>
                <DrawerBackdrop />
                <DrawerViewport position="bottom">
                  <DrawerPopup
                    position="bottom"
                    showBar
                    className="max-h-[80vh]"
                  >
                    <div className="px-6 py-4">
                      <nav className="flex flex-col gap-1">
                        {NAV.map((item) => (
                          <DrawerClose
                            key={item}
                            render={(props) => (
                              <a href={`#${item.toLowerCase()}`} {...props}>
                                <span className="flex min-h-12 items-center text-lg font-medium text-foreground transition-colors hover:text-muted-foreground">
                                  {item}
                                </span>
                              </a>
                            )}
                          />
                        ))}
                      </nav>
                      <div className="mt-6 border-t border-border pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm">Theme</span>
                          <ThemeSelector />
                        </div>
                      </div>
                    </div>
                  </DrawerPopup>
                </DrawerViewport>
              </DrawerPortal>

              <div className="relative min-h-0 flex-1">
                <div className="absolute inset-x-0 bottom-0 z-0">
                  <div className="mx-auto max-w-300 border-x border-t border-border bg-card px-6 py-18 sm:px-10 sm:py-24">
                    <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-24">
                      <div className="max-w-200">
                        <div className="mb-8 flex items-center gap-3 font-semibold tracking-tight text-foreground">
                          <span className="leading-none">winston/purnomo</span>
                        </div>

                        <p className="mb-5 text-base text-muted-foreground">
                          Join my mailing list to receive occasional updates
                        </p>

                        <div className="mb-4 flex max-w-115 flex-col gap-3 sm:flex-row">
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="h-12 flex-1 rounded-md border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none"
                          />
                          <button className="h-12 rounded-md border border-border bg-primary px-5 font-mono text-[0.82rem] tracking-[0.08em] text-primary-foreground transition-transform active:scale-[0.96]">
                            SUBSCRIBE
                          </button>
                        </div>

                        <p className="mb-8 text-base text-muted-foreground">
                          Copyright © 2026 Winston Purnomo. All rights reserved.
                        </p>

                        <div className="flex gap-8 font-mono text-[0.92rem] text-foreground">
                          <a
                            href="https://github.com/wpurnomo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary text-sm"
                          >
                            GITHUB ↗
                          </a>
                          <a
                            href="https://linkedin.com/in/wpurnomo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary text-sm"
                          >
                            LINKEDIN ↗
                          </a>
                        </div>
                      </div>

                      <div className="grid gap-10 sm:grid-cols-2">
                        {FOOTER_LINK_COLUMNS.map((column) => (
                          <div
                            key={column.join("-")}
                            className="space-y-4 font-mono text-sm text-foreground"
                          >
                            {column.map((item) => (
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

                <div className="relative z-10 h-full overflow-y-auto overscroll-y-contain">
                  <div className="mx-auto max-w-300 pt-2">
                    <div className="border-b border-border" />
                    <div className="border-x border-b border-border bg-background">
                      <main>{children}</main>
                    </div>
                  </div>

                  <div className="h-105" />
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
