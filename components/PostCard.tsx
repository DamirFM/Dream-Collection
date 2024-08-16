"use client";
import Link from 'next/link';
import React, { useRef, useEffect, useState, } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './UI/removeBtn';
import { useScroll, useTransform, motion } from 'framer-motion'


const PostCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // first we need actual HTML reference to the element
    target: ref,
    // then we need to define the viewport offset
    // this mean when we actually will start the animation
    // start animation "0 1" mean when the bottom of the element is at the top of the viewport
    // finish animation "1.33 1" mean when the bottom of the element is at the bottom of the viewport
    offset: ["0 1", "1.33 1"]
  })
  // managing the scale and opacity of the element (I do not want section appear from 0 scale and 0 opacity to 1 scale and 1 opacity, I want to start from 0.8 scale and 0.6 opacity to 1 scale and 1 opacity)
  // we need to use useTransform hook to transform the scrollYProgress
  // we need to define the range of the scrollYProgress
  // we need to define the range of the scaleProgess and opacityProgess
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
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
    <>
      <motion.div
        ref={ref}
        style={{ scale: scaleProgess, opacity: opacityProgess }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </motion.div>
    </>
  );
};

export default PostCard;


