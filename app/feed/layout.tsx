import FeedNavbar from "@/components/Feed/FeedNavbar/FeedNavbar";
import FeedSideBar from "@/components/Feed/FeedSideBar";
import MobileBottombar from "@/components/Feed/MobileBottomBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feed | Fireblog",
  description: "Dashboard",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex  h-screen">
          <div className="w-full md:flex z-20">
            <FeedNavbar />
            <FeedSideBar />
            {children}
            <MobileBottombar />
          </div>
        </div>
      </body>
    </html>
  );
}
