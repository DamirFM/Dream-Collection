"use client";
import { useThemeContext } from "@/app/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {

  // consume the theme and toggleTheme from the ThemeContext
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-500"
      onClick={toggleTheme}
    >
      {/* change the icon */}
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}