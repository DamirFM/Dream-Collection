"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion, useAnimationControls } from "framer-motion";

const dropdownVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    height: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
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
}

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

  return (
    <header className="z-[999] relative">
      <div className="fixed top-0 w-full justify-between items-center p-4 md:p-6 bg-stone-50 border-b border-stone-300">
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
            <nav className="hidden md:flex space-x-4">
              <Link
                href={"/login"}
                className="text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
              >
                Login
              </Link>
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
          className="flex flex-col items-center justify-center top-[74px] md:top-[90px] z-10 gap-6 bg-stone-50 border border-stone-300 p-10 rounded-lg shadow-lg absolute right-0 w-64 sm:w-72 md:w-80"
        >
          <Link
            href={"/login"}
            onClick={closeDropdown}
            className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
          >
            Login
          </Link>
          <button
            onClick={closeDropdown}
            className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
          >
            Explore
          </button>
          <button
            onClick={closeDropdown}
            className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
          >
            Community
          </button>
          <button
            onClick={closeDropdown}
            className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1"
          >
            Legal
          </button>
        </motion.nav>
      </div>
    </header>
  );
}