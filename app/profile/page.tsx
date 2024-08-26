"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import PostCard from "../components/PostCard";
import LoginPage from "../login/page";
import Image from "next/image";

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState<string>(
    "/path/to/your/profile-pic.jpg"
  ); // Initial image path



  // Get the session object
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex justify-center w-full h-screen bg-stone-50">
        <div className="w-full max-w-screen-xl p-8 bg-stone-50 rounded-md">
          <div className="flex flex-row justify-center items-center mt-12 relative">
            <Image
              height={100}
              width={100}
              src={session?.user?.image || profilePic} // Display the session image or default
              alt="User Photo"
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />

            <div className="ml-4">
              <h2 className="text-2xl font-bold text-stone-900">
                {session?.user?.name}
              </h2>
              {/* <p className="text-stone-700">{session?.user?.email}</p> */}
              <p className="text-stone-700">Software Developer</p>
              <p className="text-stone-500">Toronto, Canada</p>
              <p className="text-stone-700">
                I am a software developer with a passion for building web
                applications.
              </p>
            </div>
            <div className="mb-12">
              <button
                type="button"
                className="w-full px-2 py-1 mb-4  bg-stone-50 text-stone-900 border border-stone-900 rounded-md hover:border-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center mb-6"></div>
        </div>
        <div className="w-full max-w-screen-xl p-8 bg-stone-50 rounded-md mt-4">
          <h2 className="text-2xl font-bold text-stone-900">My Posts</h2>
          <PostCard />
        </div>
      </div>


    );
  } else {
    return <LoginPage />;
  }
}

