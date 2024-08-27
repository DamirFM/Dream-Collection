import React from "react";
import { Roboto } from "next/font/google";
import FeedPage from "@/app/feed/page";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  return (
    <div className="p-2 flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h1 className={`${roboto.className} text-stone-900 text-8xl mt-4 font-extrabold text-center`}>
          Dream Gallery
        </h1>
        <p className="text-stone-700 text-2xl text-center font-semibold">
          A place to share your dreams with the world
        </p>
        <Link href="/addPost">
          <button className="group bg-stone-900 text-white px-7 py-3 flex 
        items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
        hover:bg-gray-950 active:scale-105 transition cursor-pointer">
            Create a new dream
            <BsArrowRight />
          </button>
        </Link>
      </div>
      <div className="w-full mt-8">
        <FeedPage />
      </div>
    </div>


  );
}
