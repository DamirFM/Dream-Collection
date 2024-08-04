"use client";
import Link from 'next/link';
import React from 'react';
import {  HiPencilAlt } from 'react-icons/hi';
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
    console.error('Error loading Posts:',error);
  }
}

const PostCard = async () => {

  const {posts} = await getPosts();

  return (
    <>
    {posts.map((post: {
      [x: string]: any; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; 
} , index: React.Key | null | undefined) => (
<ul className="border border-gray-300 gap-5 rounded-lg overflow-hidden my-4">
<li className="flex items-center p-2" key={index}>
      {/* <div className="flex items-center p-2">
        <img   className="w-10 h-10 rounded-full mr-2" />
        <div>
          <p className="font-bold">author.username</p>
          <p className="text-gray-600 text-sm">today</p>
        </div>
      </div> */}
      <img className="w-full" />
      <div className="p-4">
        <h2 className="m-0 text-xl">{post.title}</h2>
        <p className="mt-2">{post.description}</p>
      </div>

        <RemoveBtn />
        <Link 
        href={`/editPost/${post._id}`} >
          <HiPencilAlt className="text-2xl text-gray-600 cursor-pointer" />
        </Link>
     
        </li>
    </ul>
    ))}
    </>
  );
};

export default PostCard;