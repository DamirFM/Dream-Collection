"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";

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

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen]);

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
      <div className="fixed top-0 w-full justify-between items-center p-4 md:p-6 bg-stone-50 bg-opacity-95">
        <div className="flex flex-row items-center justify-between space-x-4 md:space-x-4 w-full">
          <div className="flex items-center space-x-4">
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
                className="w-full p-2 pl-10 rounded-3xl focus:outline-none bg-stone-200 text-stone-900 hover:bg-stone-300 focus:bg-stone-200 placeholder-small md:placeholder-large"
                placeholder="Search images"
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
                    className="flex flex-row gap-1  text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
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
                    className="flex flex-row gap-1  text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
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
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
                >
                  Login
                </button>
              )}
            </nav>

            <section ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-stone-900">
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
          className="flex flex-col items-center gap-4 justify-center top-[74px] md:top-[90px] z-10 bg-stone-50 border border-stone-300 p-6 rounded-lg shadow-md absolute right-0 w-56 sm:w-64 md:w-48"
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
            </div>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="text-stone-900 border border-stone-500  py-2 px-4 rounded-md font-semibold text-xl hover:text-stone-200 hover:bg-stone-800 transition duration-300 ease-in-out transform hover:scale-1"
            >
              <span >Login</span>
            </button>

          )}
          <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <button
              onClick={closeDropdown}
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
              onClick={closeDropdown}
              className="flex items-center justify-start w-full max-w-xs pl-1 font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
            >
              <Image
                src="/assets/community.svg"
                alt="Community icon"
                width={24}
                height={24}
              />
              <span className="ml-3">Community</span>
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
              <span className="ml-3">Legal</span>
            </button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
// export default Header;
