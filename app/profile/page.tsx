'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "../components/UI/removeBtn";
import LoginPage from "../login/page";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [imageUrl, setImageUrl] = useState(session?.user?.image || "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadPhoto", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } else {
      console.error("Failed to upload image");
    }
  };

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await fetch("/api/posts/user", { cache: "no-cache" });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error loading Posts:", error);
      }
    };

    if (session) {
      getUserPosts();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="relative flex justify-center w-full min-h-screen">
        {/* Background Blobs */}
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[50rem]"></div>
        <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>

        <div className="relative flex flex-col items-center w-full max-w-screen-lg p-4 md:p-8 lg:p-12">
          <div className="w-full flex flex-col items-center text-center sm:flex-row sm:text-left">
            <Image
              height={100}
              width={100}
              src={imageUrl || "/default-profile.jpg"}
              alt="User Photo"
              className="w-24 h-24 rounded-full shadow-md mb-4 sm:mb-0"
            />
            <div className="ml-0 sm:ml-4">
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
            <div className="flex flex-col mt-4 sm:mt-0 sm:ml-auto gap-2">
              <button
                type="button"
                className="group bg-stone-900 text-white px-6 py-2 flex 
            items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
            hover:bg-gray-950 active:scale-105 transition cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleNavigation("/addPost")}
                type="button"
                className="group bg-stone-900 text-white px-6 py-2 flex 
            items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110
            hover:bg-gray-950 active:scale-105 transition cursor-pointer"
              >
                New Post
              </button>
            </div>
          </div>

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-full mt-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">My Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-300 rounded-lg overflow-hidden shadow-lg"
                >
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
