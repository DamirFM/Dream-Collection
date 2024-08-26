import React from "react";
import { Roboto } from "next/font/google";
import FeedPage from "@/app/feed/page";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  return (
    <div className="p-8 items-center justify-center">
      <h1 className={`${roboto.className} text-stone-900 text-8xl font-extrabold`}>
        Dream Gallery
      </h1>
      <p className="text-stone-700 text-2xl font-semibold">
        A place to share your dreams with the world
      </p>
      <Link href="/addPost">
        <button className="bg-stone-900 text-white px-4 py-2 rounded-lg mt-4 hover:bg-stone-500 hover:text-stone-200 transition duration-300 ease-in-out transform hover:scale-105">
          Create a new dream
        </button>
      </Link>
      < FeedPage />
    </div>
  );
}
