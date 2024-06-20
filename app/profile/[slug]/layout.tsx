import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { app } from "@/app/firebase/config";
import { getAuth } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile | Fireblog",
  description: "User Profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}