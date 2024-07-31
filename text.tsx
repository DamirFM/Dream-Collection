import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="z-[999] relative">
      <div className="fixed top-0 w-full justify-between items-center p-4 md:p-6 bg-stone-50 border-b border-stone-300">
        <div className="flex flex-row items-center justify-between space-x-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-stone-900">
              <Link href="/" className="block text-stone-900 hover:underline">
                collection
              </Link>
            </h1>
            {/* Search bar */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                className="w-44 md:w-96 p-2 pl-10 rounded-3xl focus:outline-none bg-stone-200 text-stone-900 hover:bg-stone-300 focus:bg-stone-200 placeholder-small md:placeholder-large"
                placeholder="Search images"
              />
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500"
                size={18}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-row space-x-4">
            <nav className="hidden md:flex space-x-4">
              <Link href="/login" className="text-stone-900 hover:underline">
                Login
              </Link>
            </nav>

            <div className="relative">
              <button onClick={toggleMenu} className="text-stone-900">
                <FaBars size={24} />
              </button>
              {menuOpen && (
                <nav className="md:hidden mt-4 bg-stone-50 border border-stone-300 p-2 rounded-lg shadow-lg absolute right-0">
                  <Link href="/login" className="block text-stone-900 hover:underline mb-2">
                    Login
                  </Link>
                  <button onClick={toggleDropdown} className="block text-stone-900 hover:underline">
                    Options
                  </button>
                  {dropdownOpen && (
                    <div className="mt-2 bg-stone-50 border border-stone-300 rounded-lg shadow-lg">
                      <select
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        className="w-full p-2 bg-stone-200 rounded-b-lg focus:outline-none"
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
