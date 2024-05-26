import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1001.tv",
  description: "1001.tv Homepage Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
