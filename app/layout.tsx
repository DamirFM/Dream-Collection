import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { NextAuthProvider } from "./providers";
import ThemeSwitch from "./components/theme-switch";
import ThemeContextProvider from "./context/theme-context";
import { Toaster } from 'react-hot-toast';
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

        className={`${nunito.className} bg-stone-50 text-stone-900 relative h-screen  dark:bg-stone-950 dark:text-gray-50 dark:text-opacity-90`}
      >
        {/* First div */}
        <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] 
                sm:w-[68.75rem] dark:hidden 
                xs:top-[-3rem] xs:right-[2rem] xs:h-[20rem] xs:w-[20rem]">
        </div>

        {/* Second div */}
        <div className="bg-[#edfbff] absolute top-[-6rem] -z-10 left-[-25rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] 
                sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem] 
                dark:bg-slate-900 
                xs:top-[-3rem] xs:left-[-5rem] xs:h-[20rem] xs:w-[30rem]">
        </div>

        {/* Third div */}
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] 
                sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem] 
                dark:bg-slate-800 
                xs:top-[-3rem] xs:left-[-10rem] xs:h-[20rem] xs:w-[30rem]">
        </div>
        <ThemeContextProvider>
          <NextAuthProvider>
            <Header />

            <main className="pt-[58px] md:pt-[70px]">{children}</main>
            <ThemeSwitch />
            <Toaster position="top-center" reverseOrder={true} />
          </NextAuthProvider>

        </ThemeContextProvider>
      </body>
    </html>
  );
}


