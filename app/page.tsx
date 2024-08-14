import React from "react";
import { Roboto } from "next/font/google";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default async function HomePage() {
  // Fetch posts data on the server side
  const posts = await getPosts();

  return (
    <div className="p-8 items-center justify-center">
      <h1 className={`${roboto.className} text-stone-900 text-8xl font-extrabold`}>
        Dream Gallery
      </h1>
      <p className="text-stone-700 text-2xl font-semibold">
        A place to share your dreams with the world
      </p>
      <Link href="/addPost">
        <button className="bg-stone-900 text-white px-4 py-2 rounded-lg mt-4 hover:bg-stone-500 hover:text-stone-200 transition duration-300 ease-in-out transform hover:scale-1">
          Create a new dream
        </button>
      </Link>
      <h2 className="text-3xl font-semibold mt-8">Dreams</h2>
      {/* Pass the fetched posts as props to the PostCard component */}
      <PostCard posts={posts} />
    </div>
  );
}

// Server-side function to fetch posts
const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading Posts:", error);
    return []; // Return an empty array in case of error
  }
};
