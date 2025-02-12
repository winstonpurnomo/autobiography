import { Gabarito, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";
import type React from "react";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata = {
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
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            <div className="flex min-h-screen flex-col px-6">
              <Navigation />
              <main className="flex-1 py-8">
                <div className="max-w-md mx-auto">{children}</div>
              </main>
              <Toaster />
              <Footer />
            </div>
          </Providers>
          r
        </ThemeProvider>
      </body>
    </html>
  );
}
