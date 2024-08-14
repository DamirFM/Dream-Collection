"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./UI/RemoveBtn";
import { useScroll, useTransform, motion } from "framer-motion";

type PostCardProps = {
  posts: Array<{ _id: string; title: string; description: string }>;
};

const PostCard = ({ posts }: PostCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  let data = Array.from(posts);
  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgess, opacity: opacityProgess }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.map((post) => (
        <div key={post._id} className="border border-gray-300 rounded-lg overflow-hidden">
          <img className="w-full h-48 object-cover" />
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
    </motion.div>
  );
};

export default PostCard;
