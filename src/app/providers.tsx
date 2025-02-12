"use client";

export function Providers({ children }: { children: React.ReactNode }) {
  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    { children }
  );
}
