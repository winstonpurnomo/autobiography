import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ChevronDownIcon, SunIcon } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import appCss from "../styles.css?url";

const SITE_DESCRIPTION =
  "Winston Purnomo is a software engineer in the San Francisco Bay Area — currently a Forward-Deployed Engineer on the AI team at Snowflake, previously at Meta and Apple.";

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
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/favicon-192.png" },
    ],
  }),
  shellComponent: RootDocument,
});

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const lastPointer = useRef({ x: 0, y: 0 });

  const handleThemeChange = (newTheme: string) => {
    const { x, y } = lastPointer.current;

    if (typeof document.startViewTransition !== "function") {
      setTheme(newTheme);
      return;
    }

    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
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
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
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
  const isHome = useRouterState({
    select: (s) => s.location.pathname === "/",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {!isHome && (
        <Link
          to="/"
          className="fixed top-5 left-6 z-50 text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:top-6 sm:left-8"
        >
          winston/purnomo
        </Link>
      )}
      <div className="fixed top-5 right-5 z-50 sm:top-6 sm:right-8">
        <ThemeSelector />
      </div>
      <main className="mx-auto w-full max-w-2xl px-6 py-20 sm:px-8 sm:py-28">
        {children}
      </main>
    </div>
  );
}

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
