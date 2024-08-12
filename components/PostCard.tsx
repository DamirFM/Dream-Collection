// "use client";
import Link from 'next/link';
import React from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './UI/removeBtn';

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
    console.error('Error loading Posts:', error);
  }
}

const PostCard = async () => {

  const { posts } = await getPosts();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: {
          [x: string]: any; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined;
        }, index: React.Key | null | undefined) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="m-0 text-xl">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.description}</p>
            </div>
            <div className="flex justify-between items-center p-4">
              <RemoveBtn id={post._id} />
              <Link href={`/editPost/${post._id}`} >
                <HiPencilAlt className="text-2xl text-gray-600 cursor-pointer" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostCard;