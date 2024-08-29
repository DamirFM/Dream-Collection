import React from 'react';
import PostCard from '@/app/components/PostCard';
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function FeedPage() {
    return (
        <div className="p-3 mt-4 items-center justify-center">
            <div className="relative w-full sm:w-44 md:w-96 lg:w-full">
                <input
                    type="text"
                    className="w-full p-2 pl-10 rounded-3xl focus:outline-none bg-stone-50 text-stone-900 hover:bg-stone-100 focus:bg-stone-200 placeholder-small md:placeholder-large"
                    placeholder="Search"
                />
                <FaSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500"
                    size={18}
                />
            </div>


            <PostCard />
        </div>
    );
}
