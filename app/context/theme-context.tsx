"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";
// === 2 ===
// we need to create a type for the props of the ThemeContextProvider function
// === 5 ===
// ThemeContextProviderProps is a type for the props of the ThemeContextProvider function
type ThemeContextProviderProps = {
  children: React.ReactNode;
};
// === 7 === ThemeContextType is a type for the value of the ThemeContext
type ThemeContextType = {
  theme: Theme;
// () => void; - is a function that takes no arguments and returns nothing
  toggleTheme: () => void;
};

// === 6 ===
// to use theme and setTheme in the Experience component we need to crate a Context Provider (global state)
// ThemeContext - creating a React context
// This context is going to be used to share a certain state 
// and it's updater function across different components in my React application.
// The type of the context is ThemeContextType | null. This means that the context can either hold 
// a value of type ThemeContextType or null.  
const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
// === 3 ===
// for access to this state we need to go to root component and wrap it with the context provider
// === 4 ===
// because on the root level we wrapped the children with the context provider 
// we have to set the { children } as a prop of ThemeContextProvider function

// === 1 ===
// for keeping track of the theme on the trird party package component
// we need to use the context state
// we are setting useState to string - ("light"), but it can't be anything else than the light or dark
// we neen tell to TS what type is going to be
const [theme, setTheme] = useState<Theme>("light");

const toggleTheme = () => {
  if (theme === "light") {
    setTheme("dark");
    window.localStorage.setItem("theme", "dark");
    // add the dark class to the body (dom) 
    document.documentElement.classList.add("dark");
  } else {
    setTheme("light");
    window.localStorage.setItem("theme", "light");
    // remove the dark class from the body (dom)
    document.documentElement.classList.remove("dark");
  }
}

// to sync local storage with the react theme state
useEffect(() => {
  const localTheme = window.localStorage.getItem("theme") as Theme | null;
  if (localTheme) {
    setTheme(localTheme);

      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
// check if the user has a dark mode preference on their OS locally
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  }
  
// [] - means that this effect will run only once after the component is loaded
}, []);
  return (
// createContext returns an object with Provider and Consumer properties
// we are wrapping the children with the context provider
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
// For avoind situation when ThemeContext have type of null
// we going to use custom hook that takes care of that
// it will have access for theme and setTheme(toggleTheme)
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }

  return context;
}