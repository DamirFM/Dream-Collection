"use client";
import React from "react";
import { useSession } from "next-auth/react";
import PostCard from "../components/PostCard";
import LoginPage from "../login/page";
import Image from "next/image";

export default function ProfilePage() {
  const { status, data: session } = useSession();

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex  justify-center w-full h-screen bg-stone-50">
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-screen-xl p-8 bg-stone-50 rounded-md">
            <div className="flex flex-row justify-center items-center mt-12 relative">
              <Image
                height={100}
                width={100}
                src={session?.user?.image || "/default-profile.jpg"} // Display the session image or default
                alt="User Photo"
                className="w-24 h-24 rounded-full shadow-md mb-4"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-stone-900">
                  {session?.user?.name}
                </h2>
                <p className="text-stone-700">Software Developer</p>
                <p className="text-stone-500">Toronto, Canada</p>
                <p className="text-stone-700">
                  I am a software developer with a passion for building web
                  applications.
                </p>
              </div>
              <div className="flex flex-col mb-8 gap-2">
                <button
                  type="button"
                  className="text-stone-900 border border-stone-500 py-1 px-4 rounded-xl font-semibold text-xl hover:text-stone-50 hover:bg-stone-800 transition duration-300 ease-in-out transform hover:scale-1"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleNavigation("/addPost")}
                  type="button"
                  className="text-stone-900 border border-stone-500 py-1 px-4 rounded-xl font-semibold text-xl hover:text-stone-50 hover:bg-stone-800 transition duration-300 ease-in-out transform hover:scale-1"
                >
                  New Post
                </button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-screen-xl p-8 bg-stone-50 rounded-md mt-4">
            <h2 className="text-2xl font-bold text-stone-900">My Posts</h2>
            <PostCard />
          </div>
        </div>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}

