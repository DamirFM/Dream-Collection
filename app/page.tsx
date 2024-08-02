import React from 'react';
import { Roboto } from "next/font/google";
import PostCard from '@/components/PostCard';
const roboto = Roboto({ subsets: ['latin'], weight: '400' });
export default function HomePage() {
  return (
    <div className="p-8 items-center justify-center">
      <h1 className={`${roboto.className} text-stone-900 text-8xl font-extrabold`}>Dream Gallery </h1>
      <p className="text-stone-700 text-2xl font-semibold">A place to share your dreams with the world</p>
      <PostCard  />

    </div>
  );
}
