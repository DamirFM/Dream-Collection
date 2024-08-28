"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";

const dropdownVariants = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const dropDownIconVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

export default function Header() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropDownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  // Use useCallback to memoize the handler
  const handleClickOutside = useCallback((event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  }, []);

  useEffect(() => {
    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen, handleClickOutside]);

  const controls = useAnimationControls();
  const iconControls = useAnimationControls();

  useEffect(() => {
    if (dropDownOpen) {
      controls.start("open");
      iconControls.start("open");
    } else {
      controls.start("closed");
      iconControls.start("close");
    }
  }, [dropDownOpen, controls, iconControls]);

  // login status
  const { status } = useSession();

  const handleNavigation = (url: string) => {
    window.location.href = url;
    setTimeout(() => {
      closeDropdown();
    }, 100); // Adjust the delay if necessary
  };

  return (
    <header className="z-[999] relative">
      <div className="bg-[#FFEDED] fixed top-0 w-full justify-between items-center p-4 md:p-6 bg-opacity-80  shadow-black/[0.03] backdrop-blur-[0.5rem]  border border-stone-50 border-opacity-40">
        <div className="flex flex-row items-center justify-between space-x-4 md:space-x-4 w-full">
          <div className="flex items-center space-x-4">
            <img src="/assets/collection.svg" alt="Logo" className="-mr-3 h-12" />
            <h1 className="text-2xl font-bold text-stone-900">
              <Link
                href={"/"}
                className="block text-stone-900 hover:text-stone-500 transition duration-300 ease-in-out transform hover:scale-1"
              >
                collection
              </Link>
            </h1>

            <div className="relative w-full sm:w-44 md:w-96 lg:w-full">
              <input
                type="text"
                className="w-full p-2 pl-10 rounded-3xl focus:outline-none bg-stone-50 text-stone-900 hover:bg-stone-100 focus:bg-stone-200 placeholder-small md:placeholder-large"
                placeholder="Search"
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500"
                size={18}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <nav className="hidden md:flex space-x-4 items-center">
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={() => (window.location.href = "/profile")}
                    className="flex flex-row gap-1 text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                  >
                    <Image
                      src="/assets/profile.svg"
                      alt="Community icon"
                      width={24}
                      height={24}
                    />
                    Profile
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="flex flex-row gap-1 text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                  >
                    <Image
                      src="/assets/logout.svg"
                      alt="Community icon"
                      width={24}
                      height={24}
                    />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Explore Button */}
                  <motion.a
                    onClick={() => handleNavigation("/feed")}
                    className="relative block overflow-hidden whitespace-nowrap font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                    initial="initial"
                    whileHover="hovered"
                  >
                    <motion.button
                      variants={{
                        initial: { y: 0 },
                        hovered: { y: "-100%" },
                      }}>
                      Explore
                    </motion.button>
                    <motion.button
                      className="absolute inset-0 "
                      variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                      }}>
                      Explore
                    </motion.button>
                  </motion.a>
                  {/* Collections Button */}
                  <motion.a
                    onClick={() => handleNavigation("/collections")}
                    className="relative block overflow-hidden whitespace-nowrap font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                    initial="initial"
                    whileHover="hovered"
                  >
                    <motion.button
                      variants={{
                        initial: { y: 0 },
                        hovered: { y: "-100%" },
                      }}>
                      Collections
                    </motion.button>
                    <motion.button
                      className="absolute inset-0 "
                      variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                      }}>
                      Collections
                    </motion.button>
                  </motion.a>

                  {/* About Button */}
                  <motion.a
                    onClick={() => handleNavigation("/about")}
                    className="relative block overflow-hidden whitespace-nowrap font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                    initial="initial"
                    whileHover="hovered"
                  >
                    <motion.button
                      variants={{
                        initial: { y: 0 },
                        hovered: { y: "-100%" },
                      }}>
                      About
                    </motion.button>
                    <motion.button
                      className="absolute inset-0 "
                      variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                      }}>
                      About
                    </motion.button>
                  </motion.a>
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="group bg-stone-900 text-white px-4 py-1 flex 
        items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
        hover:bg-stone-950 active:scale-105 transition cursor-pointer"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => (window.location.href = "/join")}
                    className="group bg-stone-50 text-stone-900 px-4 py-1 flex 
        items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
        hover:border-stone-900 active:scale-105 transition cursor-pointer"
                  >
                    Sign up
                  </button>

                </>
              )}
            </nav>

            {/* <section ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-stone-900 py-2">
                <motion.div
                  variants={dropDownIconVariants}
                  animate={iconControls}
                  className="flex items-center justify-center"
                >
                  {dropDownOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </motion.div>
              </button>
            </section> */}
            <section ref={dropdownRef} className=" block lg:hidden">
              <button onClick={toggleDropdown} className="text-stone-900 py-2 mr-5">
                <motion.div
                  variants={dropDownIconVariants}
                  animate={iconControls}
                  className="flex items-center justify-center"
                >
                  {dropDownOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </motion.div>
              </button>
            </section>
          </div>
        </div>

        <motion.nav
          variants={dropdownVariants}
          initial="closed"
          animate={controls}
          className="flex flex-col backdrop-blur-[0.5rem] items-center gap-4 justify-center top-[74px] md:top-[90px] z-10 bg-[#FFEDED] border border-stone-300 p-6 rounded-2xl shadow-md absolute right-0 w-56 sm:w-64 md:w-48"
        >
          {status === "authenticated" ? (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
              <button
                onClick={() => handleNavigation("/profile")}
                className="flex items-center justify-start w-full max-w-xs pl-1 text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
              >
                <Image
                  src="/assets/profile.svg"
                  alt="Profile icon"
                  width={24}
                  height={24}
                />
                <span className="ml-3">Profile</span>
              </button>
              <button
                onClick={() => signOut().then(() => closeDropdown())}
                className="flex items-center justify-start w-full max-w-xs pl-1 text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
              >
                <Image
                  src="/assets/logout.svg"
                  alt="Logout icon"
                  width={24}
                  height={24}
                />
                <span className="ml-3">Logout</span>
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="flex items-center justify-start w-full max-w-xs pl-1 font-semibold text-xl text-stone-900 hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-1"
              >
                <Image
                  src="/assets/heart.svg"
                  alt="Home icon"
                  width={24}
                  height={24}
                />
                <span className="ml-3">Activity</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
              <button
                onClick={() => handleNavigation("/login")}
                className="group bg-stone-900 text-white px-4 py-1 flex 
                items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
                 hover:bg-stone-950 active:scale-105 transition cursor-pointer"
              >
                <span>Login</span>
              </button>
              <div className=" border-2 w-full border-stone-500"></div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center justify-start w-full max-w-xs pl-1 font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
            >
              <Image
                src="/assets/search.svg"
                alt="Search icon"
                width={24}
                height={24}
              />
              <span className="ml-3">Explore</span>
            </button>
            <button
              onClick={() => handleNavigation("/collections")}
              className="flex items-center justify-start w-full max-w-xs pl-1 font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
            >
              <Image
                src="/assets/community.svg"
                alt="Community icon"
                width={24}
                height={24}
              />
              <span className="ml-3">Collections</span>
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="flex items-center justify-start w-full max-w-xs pl-1 font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
            >
              <Image
                src="/assets/home.svg"
                alt="Home icon"
                width={24}
                height={24}
              />
              <span className="ml-3">About</span>
            </button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
