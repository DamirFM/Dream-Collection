"use client"; // This ensures the file is treated as a client-side component

import React, { useState, useEffect } from 'react';
import PostCard from '@/app/components/PostCard';
import { FaSearch } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

type Post = {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    tags: string[];
    userId: User;
};;
type User = {
    _id: string;
    name: string;
};
// Helper function to extract query parameters from URL
const getQueryParam = (param: string) => {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }
    return null;
};

export default function FeedPage() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [category, setCategory] = useState<string | null>(null);

    // Effect to handle initial category setting from URL
    useEffect(() => {
        setCategory(getQueryParam('category')); // Set category from URL on initial load
    }, []);

    // Effect to fetch posts based on category
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();
                setAllPosts(data.posts as Post[]);

                // Filter posts based on category if it exists
                if (category) {
                    const filtered = data.posts.filter((post: Post) =>
                        post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
                    );
                    setFilteredPosts(filtered);
                } else {
                    setFilteredPosts(data.posts);
                }
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        };

        fetchPosts();
    }, [category]);

    // Effect to filter posts based on search term
    useEffect(() => {
        if (!category) {
            const filtered = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredPosts(filtered);
        }
    }, [searchTerm, allPosts, category]);

    return (
        <div className="p-3 mt-4 items-center justify-center">
            {/* Welcome Text */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Capture moments, share memories</h1>
                <p className="text-lg">Where every picture tells a story</p>
            </div>

            {/* Sticky Search Input in Separate Div */}
            <div className="sticky top-20 z-10 flex items-center justify-center mb-4">
                <div className="relative w-full max-w-md bg-[#D7C3F1] bg-opacity-80 p-4 rounded-xl shadow-lg ">
                    <input
                        type="text"
                        className="w-full p-2 pl-10 rounded-3xl focus:outline-none bg-stone-50 bg-opacity-80 text-stone-900 hover:bg-stone-100 focus:bg-stone-200 placeholder-small md:placeholder-large"
                        placeholder="Search by title or tags"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch
                        className="absolute ml-3 left-3 top-1/2 transform -translate-y-1/2 text-stone-500"
                        size={18}
                    />
                </div>
            </div>

            {/* Static Button */}
            <Link className="flex justify-center mb-8" href="/addPost">
                <motion.button
                    className="group relative px-7 py-3 flex items-center gap-2 rounded-full bg-stone-900 text-white focus:scale-110 hover:scale-110 hover:bg-stone-950 active:scale-105 transition cursor-pointer lg:ml-5"
                >
                    Create a new dream
                    <BsArrowRight />
                </motion.button>
            </Link>

            {/* Post Cards */}
            <PostCard posts={filteredPosts} />
        </div>
    );
}
