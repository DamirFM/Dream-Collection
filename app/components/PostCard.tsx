"use client";
import Link from 'next/link';
import React, { useRef, useEffect, useState, } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './UI/removeBtn';



// http://localhost:3000/api/posts
const PostCard = () => {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/posts", {
          cache: "no-cache",
        });
        console.log(typeof res);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error loading Posts:', error);
      };

    }
    getPosts();
  }, []);




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: {
        [x: string]: any; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined;
      }) => (

        <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
          {post.imageUrl && (
            <img src={post.imageUrl} alt='post title' className="w-full h-48 object-cover" />
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
  );
};

export default PostCard;
