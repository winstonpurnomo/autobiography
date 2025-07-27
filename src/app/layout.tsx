import { Gabarito } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "winston/purnomo",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gabarito.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1 py-8">
                <div className="mx-auto max-w-md">{children}</div>
              </main>
              <Toaster />
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
