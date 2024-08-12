"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import SignInBtn from '@/components/UI/SignInBtn';

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState<string>("/path/to/your/profile-pic.jpg"); // Initial image path

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get the session object
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen bg-stone-50">
      <div>Loading...</div>
    </div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <div className="flex flex-col items-center mb-6 relative">
            <label className="relative cursor-pointer">
              <img
                src={session?.user?.image || profilePic} // Display the session image or default
                alt="User Photo"
                className="w-24 h-24 rounded-full shadow-md mb-4"
              />
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="absolute inset-0 flex items-center justify-center w-24 h-24 rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16v-4m0 0V8m0 4h4m-4 0h10.5m-5.5-4l3-3m0 0l3 3m-3-3v12"
                  />
                </svg>
              </div>
            </label>
            <h2 className="text-2xl font-bold text-stone-900">{session?.user?.name}</h2>
            <p className="text-stone-700">{session?.user?.email}</p>
            <p className="text-stone-700">Software Developer</p>
            <p className="text-stone-500">Toronto, Canada</p>
          </div>
          <form>
            <label className="block mb-4">
              <span className="text-stone-700">Bio</span>
              <textarea
                className="mt-1 block w-full px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                placeholder="Tell us about yourself"
              />
            </label>
            <button
              type="button"
              className="w-full px-4 py-2 mb-4 bg-stone-900 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
            >
              Edit Profile
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <div className="flex items-center justify-center h-screen bg-stone-50">
      <SignInBtn />
    </div>;
  }
}
