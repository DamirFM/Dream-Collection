"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch, FaBars } from "react-icons/fa";


export default function Header() {

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const [selectedValue, setSelectedValue] = useState('');
  // const options = [
  // { value: "Option 1", label: "Option 1" },
  // { value: "Option 2", label: "Option 2" },
  // { value: "Option 3", label: "Option 3" },
  // ];
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  const handleClickOutside = (event: { target: any; }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (dropDownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownOpen]);

  return (
    // z-[999] is a index for the header to be on top of everything
    // relative is a position for the header to be relative to the parent element
    <header className="z-[999] relative">
      <div className="fixed top-0 w-full justify-between items-center p-4 md:p-6 bg-stone-50 border-b border-stone-300">
        <div className="flex flex-row items-center justify-between space-x-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex items-center space-x-4">
          <h1 className="text-2xl  font-bold text-stone-900 ">
          <Link href="/" className="block text-stone-900 hover:text-stone-500 transition duration-300 ease-in-out transform hover:scale-1">
          collection
            </Link></h1>
          {/* Search bar */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              className="w-44 md:w-96  p-2 pl-10 rounded-3xl focus:outline-none bg-stone-200 text-stone-900 hover:bg-stone-300 focus:bg-stone-200 placeholder-small md:placeholder-large"
              placeholder="Search images"
          
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 "
              size={18}
            />
          </div>
        </div>

          {/* Navigation */}
          <div className="flex flex-row space-x-4">
          <nav className="hidden md:flex space-x-4">
            <Link href="/login" className="text-stone-900 font-semibold text-xl hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1">
              Login
            </Link>
          </nav>

          <div >
            <button onClick={toggleDropdown} className="text-stone-900">
              <FaBars size={24} />
            </button>
          </div>
          </div>
        </div>
        {/* {dropDownOpen && (...)} -  is a shorthand for conditional rendering in React. It will only render the element inside the parentheses if menuOpen is true. */}
        {dropDownOpen && (
    
        <nav ref={dropdownRef} className="flex flex-col items-center justify-center top-[74px] md:top-[90px] z-10 gap-6 bg-stone-50 border border-stone-300 p-10 rounded-lg shadow-lg absolute right-0 w-60 h-96">
          <Link href="/login" onClick={closeDropdown} className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1">
            Login
          </Link>
          <button onClick={closeDropdown} className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1">
            Explore
          </button>
          <button onClick={closeDropdown} className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1">
            Community
          </button>
          <button onClick={closeDropdown} className="block font-semibold text-xl text-stone-900 hover:text-stone-400 transition duration-300 ease-in-out transform hover:scale-1">
            Legal
          </button>
        </nav>
        )}
      </div>
    </header>
  );
}
