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

type PostCardProps = {
  posts: Post[];
};

const PostCard: React.FC<PostCardProps> = ({ posts }) => {
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
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative mb-4 break-inside-avoid border border-gray-300 rounded-md overflow-hidden group"
        >
          {post.imageUrl && (
            <div className="relative w-full h-auto">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={0}
                loading="lazy"
                className="object-cover object-center w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center text-white">
              <span className="text-sm">Username</span>
              <a
                href={post.imageUrl}
                download
                className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300"
                title={`Download ${post.title}`}
              >
                <HiDownload className="text-lg cursor-pointer hover:text-gray-300 transition-colors duration-300" />
              </a>
            </div>
            <h2 className="text-xl text-white mt-2">{post.title}</h2>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default PostCard;
