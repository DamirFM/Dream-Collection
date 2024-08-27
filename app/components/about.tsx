"use client";
import React from "react";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { motion } from 'framer-motion';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const slideDown = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const DURATION = 1.5;
const STAGGER = 0.1;

const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
    press: { scale: 0.95, transition: { duration: 0.2, ease: "easeInOut" } }
};

const DrawOutlineButton = ({ children, ...rest }) => {
    return (
        <motion.button
            {...rest}
            className="group relative px-7 py-3 flex items-center gap-2 rounded-full bg-stone-900 text-white outline-none transition-colors duration-[400ms] hover:text-indigo-300"
            initial="initial"
            animate="visible"
            whileHover="hover"
            whileTap="press"
            variants={buttonVariants}
        >
            <span className="flex items-center gap-2">
                {children}
            </span>

        </motion.button>
    );
};

export default function AboutComponent() {
    const textHeader1 = "Dream Gallery";
    const textHeader2 = "A place to share your dreams with the world";

    return (
        <div className="flex flex-col justify-center items-center space-y-6">
            <motion.h1
                className={`${workSans.className} text-stone-900 mt-4 font-black text-center uppercase relative block overflow-hidden whitespace-nowrap text-4xl sm:text-6xl md:text-8xl lg:text-9xl`}
                initial="hidden"
                whileHover="hovered"
                animate="visible"
                variants={slideUp}
                style={{
                    lineHeight: 0.75,
                }}
            >
                <div>
                    {textHeader1.split("").map((char, index) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * index,
                            }}
                            className="inline-block"
                            key={index}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </div>
                <div className="absolute inset-0">
                    {textHeader1.split("").map((char, index) => (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * index,
                            }}
                            className="inline-block"
                            key={index}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </div>
            </motion.h1>
            <motion.div
                className="text-stone-700 text-2xl text-center font-semibold"
                initial="hidden"
                animate="visible"
                variants={slideDown}
            >
                <div className={`${workSans.className} text-center font-thin text-stone-800 uppercase relative block overflow-hidden whitespace-nowrap text-xs sm:text-xl md:text-3xl lg:text-4xl`}>
                    {textHeader2.split("").map((char, index) => (
                        <motion.span
                            className="hoverText"

                            key={index}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </div>

            </motion.div>

            <Link href="/addPost">
                <DrawOutlineButton>
                    Create a new dream
                    <BsArrowRight />
                </DrawOutlineButton>
            </Link>
        </div>
    );
}
