"use client";

import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { Work_Sans } from "next/font/google";
import SwipeCards from "./swipeCards";

const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function AboutComponent() {
    const textHeader1 = "Dream Collection";
    const textPar =
        "A place to share your dreams with the world. Here, you can transform your personal visions into a global showcase, connecting with a vibrant community of dreamers and creators.";

    return (
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between items-center mt-3 md:mt-8 sm:mt-5 space-y-6 lg:space-y-0">
            {/* Content for the right side */}
            <div className="flex flex-col justify-center items-center lg:items-start space-y-4 w-full lg:w-2/3">
                {/* "Dream" */}
                <div className="text-stone-700 text-center font-semibold mt-4 sm:mt-0 fade-in">
                    <div
                        className={`${workSans.className} text-stone-900 -mb-3 font-black text-center lg:text-right uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] lg:ml-5`}
                    >
                        {textHeader1.split(" ")[0].split("").map((char, index) => (
                            <span className="hoverText" key={index}>
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                </div>
                {/* "Collection" */}
                <div className="text-stone-700 text-2xl text-center font-semibold fade-in">
                    <div
                        className={`${workSans.className} text-stone-900 -mt-4 font-black text-center lg:text-right uppercase relative block overflow-hidden whitespace-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] lg:ml-5`}
                    >
                        {textHeader1.split(" ")[1].split("").map((char, index) => (
                            <span className="hoverText" key={index}>
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                </div>
                {/* "A place to share your dreams with the world" */}
                <p className="text-center lg:text-left text-stone-900 font-semibold text-xl sm:text-4xl md:text-4xl lg:text-85xl xl:text-5xl lg:ml-5 fade-in">
                    {textPar}
                </p>
                <div className="flex justify-center space-x-2 lg:justify-start">
                    <Link href="/addPost">
                        <button className="group relative px-7 py-3 flex items-center gap-2 rounded-full bg-stone-900 text-white focus:scale-110 hover:scale-110 hover:bg-stone-950 active:scale-105 transition cursor-pointer lg:ml-5">
                            Create a new dream
                            <BsArrowRight />
                        </button>
                    </Link>
                    <Link href="/feed">
                        <button className="group relative px-7 py-3 flex items-center gap-2 rounded-full bg-stone-900 text-white focus:scale-110 hover:scale-110 hover:bg-[#ff1493] active:scale-105 transition cursor-pointer lg:ml-5">
                            Gallery
                            <BsArrowRight />
                        </button>
                    </Link>
                </div>
            </div>
            {/* Content for the left side on large screens */}
            <div className="flex justify-center sm:order-2 lg:order-none sm:-mt-16 lg:justify-start w-full lg:w-1/3 lg:-ml-12">
                <SwipeCards />
            </div>
        </div>
    );
}
