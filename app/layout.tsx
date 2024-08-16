import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { NextAuthProvider } from "./providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Gallery",
  description: "All your dreams in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} bg-stone-100 text-stone-950 relative h-screen`}
      >
        <NextAuthProvider>
          <Header />
          <main className="pt-[58px] md:pt-[70px]">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
