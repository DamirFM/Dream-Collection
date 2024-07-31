'use client'

import React, { useState } from 'react'

import { FaSearch, FaBars } from "react-icons/fa";



export default function Header() {
  
const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    // z-[999] is a index for the header to be on top of everything
    // relative is a position for the header to be relative to the parent element
    <header className='z-[999] relative'>
        <div className='fixed top-0 w-full justify-between items-center p-4 md:p-4 bg-stone-50 border-b border-stone-300'>
            <div className='flex flex-row items-center space-x-4 md:space-y-0 md:space-x-4 w-full'>
                <h1 className='text-2xl  font-bold text-stone-900'>collection</h1>

                <div className='relative w-full md:w-auto'>
                <input 
                    type='text' 
                    className='w-64 md:w-96 p-2 pl-10 rounded-3xl focus:outline-none bg-stone-200 text-stone-900 hover:bg-stone-300 focus:bg-stone-200' 
                    placeholder='Search photos and pictures'
                />
                  <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 ' size={18} />

                </div>

                <nav className='hidden md:flex space-x-4'>

                    <a href='#' className='text-stone-900 hover:underline'>Login</a>
                </nav>

                <div className='md:hidden'>
                  <button onClick={toggleMenu} className='text-stone-900'>
                    <FaBars size={24} />
                  </button>
                </div>
            </div>
          {/* {menuOpen && (...)} -  is a shorthand for conditional rendering in React. It will only render the element inside the parentheses if menuOpen is true. */}
          {menuOpen && (
            <nav className='md:hidden mt-4'>
              <a href='#' className='block text-stone-900 hover:underline'>Login</a>
              </nav>)}
        </div>
    </header>
  )
}
