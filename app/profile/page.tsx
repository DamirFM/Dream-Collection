"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from '../components/UI/removeBtn';
import LoginPage from "../login/page";
import Image from "next/image";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl?: string;
};

export default function ProfilePage() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await fetch("/api/posts/user", { cache: "no-cache" }); // Fetch only the user's posts
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts); // Set only the user's posts
      } catch (error) {
        console.error('Error loading Posts:', error);
      }
    };

    if (session) {
      getUserPosts(); // Fetch posts only when the user is authenticated
    }
  }, [session]);

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
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-screen-xl p-8 bg-stone-50 rounded-md">
            <div className="flex flex-row justify-center items-center mt-12 relative">
              <Image
                height={100}
                width={100}
                src={session?.user?.image || "/default-profile.jpg"}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
                  {post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="m-0 text-xl">{post.title}</h2>
                    <p className="mt-2 text-gray-600">{post.description}</p>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <RemoveBtn id={post._id} />
                    <Link href={`/editPost/${post._id}`}>
                      <HiPencilAlt className="text-2xl text-gray-600 cursor-pointer" />
                    </Link>
                  </div>
                </div>

              ))}


            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}

