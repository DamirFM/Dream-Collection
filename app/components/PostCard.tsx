"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="relative border border-gray-300 rounded-lg overflow-hidden">
          {post.imageUrl && (
            <div className="relative w-full h-48">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority // Add this line
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="m-0 text-xl">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
