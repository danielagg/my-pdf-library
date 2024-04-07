import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./nextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My PDF Library",
  description: "Track your progress and manage your PDFs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-tl from-gray-100 to-gray-50`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
