"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "../components/UI/removeBtn";
import LoginPage from "../login/page";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { HiDownload } from 'react-icons/hi';
import BlurFade from "@/components/magicui/blur-fade";
// Define the variants for the BarLoader animation
const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as "mirror", // Ensure repeatType is a specific allowed type
      duration: 1,
      ease: "circIn",
    },
  },
};

// BarLoader component
const BarLoader = () => (
  <motion.div
    transition={{ staggerChildren: 0.25 }}
    initial="initial"
    animate="animate"
    className="flex gap-1"
  >
    <motion.div variants={variants} className="h-12 w-2 bg-white" />
    <motion.div variants={variants} className="h-12 w-2 bg-white" />
    <motion.div variants={variants} className="h-12 w-2 bg-white" />
    <motion.div variants={variants} className="h-12 w-2 bg-white" />
    <motion.div variants={variants} className="h-12 w-2 bg-white" />
  </motion.div>
);

type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export default function ProfilePage() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("Session Data:", session);

      const getUserPosts = async () => {
        try {
          const res = await fetch("/api/posts/filter_tag/", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${session.user}` // Add the token here
            },
            cache: "no-cache"
          });
          if (!res.ok) throw new Error("Failed to fetch posts");
          const data = await res.json();
          setPosts(data.posts);
        } catch (error) {
          console.error("Error loading posts:", error);
        }
      };

      getUserPosts();
    }
  }, [session, status]);


  const [loadingImages, setLoadingImages] = useState<boolean[]>(posts.map(() => true));

  const handleImageLoad = (index: number) => {
    setLoadingImages(prevLoadingImages => {
      const newLoadingImages = [...prevLoadingImages];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <BarLoader />
      </div>
    );
  }
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };
  if (status === "authenticated" && session && session.user) {
    // Extract user details from session
    const { name, email, image, description, location } = session.user;

    return (
      <div className="relative flex flex-col items-center w-full min-h-screen">
        {/* Background Blobs */}
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[50rem]"></div>
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>

        <div className="relative flex flex-col items-center w-full max-w-screen-lg p-4 md:p-8 lg:p-12">
          <div className="w-full flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image
              height={100}
              width={100}
              src={image || "/default-profile.jpg"} // Use image from session or default
              alt="User Photo"
              className="w-24 h-24 rounded-full shadow-md mb-4 sm:mb-0"
            />
            <div className="ml-0 sm:ml-4">
              <h2 className="text-2xl font-bold text-stone-900">
                {name || "User Name"}
              </h2>
              <p className="text-stone-700">{email || "User email..."}</p>
              <p className="text-stone-700">{description || "User description..."}</p>
              {/* Optionally display location if it's included */}
              {location && (
                <p className="text-stone-700">
                  Location: {location.lat}, {location.lng}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4 sm:mt-0 sm:ml-auto gap-2">
              <Link href={`/editProfile/${session.user._id}`}>
                Edit Profile
              </Link>
              <button
                onClick={() => router.push("/addPost")}
                type="button"
                className="group bg-stone-900 text-white px-6 py-2 flex 
                items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
                hover:bg-gray-950 active:scale-105 transition cursor-pointer"
              >
                New Post
              </button>
            </div>
          </div>

          <div className="w-full mt-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">My Posts</h2>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {posts.map((post, idx) => (
                <div
                  key={post._id}
                  className="relative mb-4 break-inside-avoid rounded-lg overflow-hidden group"
                >
                  {post.imageUrl && (
                    <BlurFade key={post.imageUrl} delay={0.25 + idx * 0.05} inView>
                      <div className="relative w-full h-auto">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={800}
                          height={600} // Default height
                          layout="responsive" // Responsive layout
                          loading="lazy"
                          onLoad={() => handleImageLoad(idx)}
                          className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                        />
                      </div>
                    </BlurFade>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Bottom Section: Username, Post Title, and Action Buttons */}
                    <div className="flex justify-between items-center w-full">
                      {/* Left Side: Username and Post Title */}
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-white">{session.user.name}</span>
                        <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                      </div>

                      {/* Right Side: Action Buttons */}
                      <div className="flex items-center space-x-4">
                        <a
                          href={post.imageUrl}
                          download
                          className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
                          title={`Download ${post.title}`}
                        >
                          <HiDownload className="text-lg text-white cursor-pointer hover:text-gray-300 transition-colors duration-300" />
                        </a>
                        <RemoveBtn id={post._id} />
                        <Link href={`/editPost/${post._id}`}>
                          <HiPencilAlt className="text-2xl text-white cursor-pointer hover:text-gray-300 transition-colors duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>



                </div>
              ))}
            </Masonry>

          </div>

        </div>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}
