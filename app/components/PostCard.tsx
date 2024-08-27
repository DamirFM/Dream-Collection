"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HiDownload } from 'react-icons/hi';

type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-cache" }); // Fetch all posts
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts); // Set all posts
      } catch (error) {
        console.error('Error loading Posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-0 md:py-3 gap-4">
      {posts.map((post, index) => {
        const dynamicStyle = {
          '--row-span': post.imageUrl ? 'span 2' : 'span 1',
        } as React.CSSProperties;

        return (
          <div
            key={post._id}
            className="relative border border-gray-300 rounded-md overflow-hidden group"
            style={dynamicStyle}
          >
            {post.imageUrl && (
              <div className="relative w-full h-0 pb-[56.25%]">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={index === 0} // Add priority to the first image
                  sizes="(min-width: 1351px) 416px, (min-width: 992px) calc((100vw - 88px) / 3), (min-width: 768px) calc((100vw - 64px) / 2), 100vw"
                />
              </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-white">
                <span className="text-sm">Username</span>
                <HiDownload className="text-lg cursor-pointer" />
              </div>
              <h2 className="text-xl text-white mt-2">{post.title}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
