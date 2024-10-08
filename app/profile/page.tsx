"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt, HiDownload } from "react-icons/hi";
import RemoveBtn from "../components/UI/removeBtn";
import LoginPage from "../login/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Masonry from "react-masonry-css";
import BlurFade from "@/components/magicui/blur-fade";


type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export default function ProfilePage() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const getUserPosts = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const res = await fetch(`/api/posts/filter_tag/`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${session.user._id}`,
              'Content-Type': 'application/json',
            },
            cache: "no-cache",
            credentials: 'include',
          });

          if (!res.ok) throw new Error("Failed to fetch posts");

          const data = await res.json();
          setPosts(data.posts);
          setLoadingImages(new Array(data.posts.length).fill(true));
        } catch (error) {
          console.error("Error loading posts:", error);
        }
      }
    };

    getUserPosts();
  }, [status, session?.user]);

  const handleImageLoad = (index: number) => {
    setLoadingImages(prevLoadingImages => {
      const newLoadingImages = [...prevLoadingImages];
      newLoadingImages[index] = false;
      return newLoadingImages;
    });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-slate-900 dark:hover:text-purple-500 ">
        Loading...
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  if (status === "authenticated" && session?.user) {
    const { name, email, profileImageUrl, description, location } = session.user;

    // Fetch profile image from session user
    const displayProfileImage = profileImageUrl ? profileImageUrl : "/default-profile.jpg";


    return (
      <div className="relative flex flex-col items-center w-full min-h-screen">
        {/* Background Blobs */}
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[50rem] dark:bg-slate-900"></div>
        <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-slate-800"></div>

        <div className="relative flex flex-col items-center w-full max-w-screen-lg p-4 md:p-8 lg:p-12">
          <div className="w-full flex flex-row items-center text-center mt-3 sm:flex-row sm:text-left">
            {/* <Image
              height={100}
              width={100}
              src={profileImageUrl || "/default-profile.jpg"}
              alt="User Photo"
              className="w-24 h-24 rounded-full shadow-md mb-4 sm:mb-0"
            /> */}
            <div className="ml-0 sm:ml-4">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-300">
                {name || "User Name"}
              </h2>
              <p className="text-stone-700 dark:text-stone-300">{email || "User email..."}</p>
              {/* <p className="text-stone-700">{description || "User description..."}</p>
              {location && (
                <p className="text-stone-700">
                  Location: {location.lat}, {location.lng}
                </p>
              )} */}
            </div>
            <div className="flex flex-col mt-4 p-2 mb-3 sm:mt-0 sm:ml-auto gap-2">
              {/* <Link href={`/editProfile/${session.user._id}`}>
                Edit Profile
              </Link> */}
              <button
                onClick={() => router.push("/addPost")}
                type="button"
                className="group bg-stone-900 text-white px-4 py-2 flex 
                items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
                hover:bg-gray-950 active:scale-105 transition cursor-pointer dark:text-stone-300"
              >
                New Post
              </button>
            </div>
          </div>

          <div className="w-full mt-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6 dark:text-stone-300">My Posts</h2>
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
                          height={600}
                          layout="responsive"
                          loading="lazy"
                          onLoad={() => handleImageLoad(idx)}
                          className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                        />
                      </div>
                    </BlurFade>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-white">{session.user.name}</span>
                        <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                      </div>
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
