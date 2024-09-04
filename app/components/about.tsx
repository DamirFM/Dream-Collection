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
        <div className="flex flex-col  lg:justify-center items-center mt-3 md:mt-8 sm:mt-5 space-y-6 lg:space-y-0">
            {/* Header Section */}
            <div className="text-stone-700 text-center font-semibold mt-4 sm:mt-0 fade-in">
                <div
                    className={`${workSans.className} text-stone-900 -mb-3 font-black text-center lg:text-right uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] lg:ml-5`}
                >
                    {textHeader1.split("").map((char, index) => (
                        <span className="hoverText" key={index}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="flex flex-col lg:flex-row justify-between items-center  lg:items-stretch w-full lg:w-2/3 lg:space-x-10 space-y-6 lg:space-y-0">
                {/* Left Side: Text and Buttons */}
                <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-2/3 space-y-4 lg:-ml-10">
                    {/* Text Paragraph */}
                    <p className="text-center lg:text-left text-stone-900 font-semibold text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-4xl lg:ml-5 fade-in">
                        {textPar}
                    </p>
                    {/* Buttons */}
                    <div className="flex justify-center space-x-2 lg:justify-start">
                        <Link href="/addPost">
                            <button className="group relative px-7 py-3 flex items-center sm:flex-col md:flex-row gap-2 rounded-full bg-stone-900 text-white focus:scale-110 hover:scale-105 hover:bg-stone-950 active:scale-105 transition cursor-pointer lg:ml-5">
                                <span>Create a new dream</span>
                                <BsArrowRight className="order-last sm:order-first sm:mt-2 md:order-last md:mt-0" />
                            </button>
                        </Link>
                        <Link href="/feed">
                            <button className="group relative px-7 py-3 flex items-center sm:flex-col md:flex-row gap-2 rounded-full bg-stone-900 text-white focus:scale-110 hover:scale-105 hover:bg-[#ff1493] active:scale-105 transition cursor-pointer lg:ml-5">
                                <span>Gallery</span>
                                <BsArrowRight className="order-last sm:order-first sm:mt-2 md:order-last md:mt-0" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side: SwipeCards */}
                <div className="flex w-full lg:w-1/3 lg:justify-end  ">
                    <div className="w-full flex justify-center items-center lg:justify-end">
                        <SwipeCards />
                    </div>
                </div>
            </div>
        </div>
    );
}
