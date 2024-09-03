"use client";
import React, { useState, useEffect } from "react";
import NumberTicker from '@/app/components/NumberTicker';

type Post = {
    _id: string;
    title: string
    description: string;
    imageUrl?: string;
};

export default function About() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [userCount, setUserCount] = useState<number>(0); // State for user count

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();
                setAllPosts(data.posts as Post[]);
                setFilteredPosts(data.posts as Post[]); // Initially show all posts
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUserCount(data.userCount); // The response now contains a 'userCount' field
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        fetchPosts();
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchTerm, allPosts]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
            {/* Background Blurs */}
            <div className="bg-[#FFEDED] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] "></div>
            <div className="bg-[#D7C3F1] absolute top-[-6rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[28rem] xl:left-[15rem] 2xl:left-[-5rem] "></div>

            {/* About Section */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-md mb-8">
                <h2 className="text-center text-3xl font-bold mb-6">About</h2>
                <p className="text-center text-lg mb-4">
                    Welcome to our gallery application, a place where creativity meets inspiration. This platform allows users to share, explore, and appreciate visual arts from creators all around the world. Our goal is to foster a community of visual storytellers and inspire through imagery.
                </p>
            </div>

            {/* Counter and Trust Section */}
            <div className="mb-8 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-center text-black dark:text-white mb-4">
                    Join over <NumberTicker value={99} direction="up" />+ creators already sharing their art
                </p>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
                    Build your portfolio, connect with a community, and let your art shine.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-black dark:text-white">4.8/5</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average user rating</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-black dark:text-white">
                            <NumberTicker value={allPosts.length} direction="up" />+
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Artworks shared</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-black dark:text-white">
                            <NumberTicker value={999} direction="up" />+
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Search Queries</p>
                    </div>
                </div>
            </div>

            {/* Legal Disclaimer Section */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-4">Legal Disclaimer</h3>
                <p className="text-justify mb-4">
                    All images shared on this platform are provided by users under their respective licenses. We do not claim ownership over any content shared by our users. By uploading images, users agree that they have the right to distribute these images and that they are not infringing on any third-party rights. The platform is not responsible for any copyright violations by its users.
                </p>
            </div>

            {/* Privacy Policy Section */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-4">Privacy Policy</h3>
                <p className="text-justify mb-4">
                    We value your privacy and are committed to protecting your personal information. Our platform collects minimal data necessary for account creation and user interaction. We do not sell or share your personal information with third parties except as required by law. Users are encouraged to review our full privacy policy to understand how their data is used and protected.
                </p>
            </div>

            {/* Terms of Use Section */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-4">Terms of Use</h3>
                <p className="text-justify mb-4">
                    By using our platform, you agree to abide by our terms of use. This includes respecting the intellectual property rights of others, refraining from posting harmful or offensive content, and complying with all applicable laws and regulations. The use of free shared images is permitted as long as proper credit is given to the creators, and usage adheres to the specified licenses of the images.
                </p>
                <p className="text-justify">
                    We reserve the right to remove any content that violates our terms of use and to terminate the accounts of users who engage in prohibited activities. Please review our full terms of service for detailed information.
                </p>
            </div>

            {/* Footer or Additional Links */}
            <div className="w-full max-w-3xl p-4 text-center text-sm text-gray-600">
                <p>&copy; 2024 Gallery Application. All rights reserved.</p>
            </div>
        </div>
    );
}
