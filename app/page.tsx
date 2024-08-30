import React from "react";
import { Roboto } from "next/font/google";
import FeedPage from "@/app/feed/page";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import AboutComponent from "./components/about";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-8">
      <AboutComponent />
      {/* <div className="w-full mt-8">
        <FeedPage />
      </div> */}

    </div>


  );
}
