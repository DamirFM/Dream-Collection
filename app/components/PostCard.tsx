"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
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
        const res = await fetch("/api/posts", { cache: "no-cache" });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error loading Posts:', error);
      }
    };

    getPosts();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((post, index) => (
        <div
          key={post._id}
          className="relative mb-4 break-inside-avoid border border-gray-300 rounded-md overflow-hidden group"
        >
          {post.imageUrl && (
            <div className="relative w-full h-auto">
              <Image
                src={post.imageUrl} // No dynamic parameters to alter the aspect ratio
                alt={post.title}
                width={800} // Set a maximum width for scaling
                height={0} // Let the height adjust based on the aspect ratio of the image
                loading="lazy"
                className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center text-white">
              <span className="text-sm">Username</span>
              <HiDownload className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300" />
            </div>
            <h2 className="text-xl text-white mt-2">{post.title}</h2>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default PostCard;
