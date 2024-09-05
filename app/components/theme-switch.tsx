"use client";

import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeContext } from "@/app/context/theme-context";

export default function ThemeSwitch() {
  // Consume the theme and toggleTheme from the ThemeContext
  const { theme, toggleTheme } = useThemeContext();

  // State to manage component mounting
  const [mounted, setMounted] = useState(false);

  // Effect to mark component as mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid server-client mismatches by rendering a fallback initially
  if (!mounted) {
    return (
      <button
        className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-500"
        aria-label="theme-switcher"
      />
    );
  }

  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-500"
      onClick={toggleTheme}
      aria-label="theme-switcher"
    >
      {/* Change the icon based on the theme */}
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
