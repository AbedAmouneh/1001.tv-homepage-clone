import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/react-query";
import Search from "@/components/Search";

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
          <footer className="bg-gray-800 text-white p-4 text-center">
            © 2024 1001 TV. All rights reserved.
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}
