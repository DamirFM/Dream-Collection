"use client";
import React, { useState, useEffect } from 'react';
import PostCard from '@/app/components/PostCard';
import { FaSearch } from "react-icons/fa";

export default function FeedPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {

            try {

                const res = await fetch("/api/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();
                setAllPosts(data.posts);
                setFilteredPosts(data.posts); // Initially show all posts
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, allPosts]);

    return (
        <div className="p-3 mt-4 items-center justify-center">
            <div className="relative w-full sm:w-44 md:w-96 lg:w-full">
                <input
                    type="text"
                    className="w-full p-2 pl-10 rounded-3xl focus:outline-none bg-stone-50 text-stone-900 hover:bg-stone-100 focus:bg-stone-200 placeholder-small md:placeholder-large"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500"
                    size={18}
                />
            </div>

            <PostCard posts={filteredPosts} />
        </div>
    );
}
