import React from "react";

export default function About() {
    return (
        <div className="relative flex justify-center w-full h-screen ">
            <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
            <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem]"></div>
            <div className="w-full max-w-xl p-8  ">
                <h2 className="text-center text-2xl font-bold mb-6">About</h2>
                <p className="text-center text-lg">
                    This is a simple Next.js app with authentication and a profile page
                </p>
            </div>
        </div>
    );
}