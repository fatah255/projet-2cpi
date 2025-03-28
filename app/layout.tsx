import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/Sonner";
import { ModalProvider } from "@/providers/modalProvider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project 2CPI",
  description: "A project 2CPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
