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
        className={`${nunito.className} bg-stone-50 text-stone-900 relative h-screen`}
      >
        <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] "></div>
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem]  "></div>
        <NextAuthProvider>
          <Header />

          <main className="pt-[58px] md:pt-[70px]">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
