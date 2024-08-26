// // pages/feed.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import PostCard from "@/app/components/PostCard";

// interface Post {
//     _id: string;
//     title: string;
//     description: string;
//     imageUrl?: string;
// }

// const FeedPage: React.FC = () => {
//     const [posts, setPosts] = useState<Post[]>([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await fetch("/api/posts", { cache: "no-cache" });
//                 if (!res.ok) throw new Error("Failed to fetch posts");
//                 const data = await res.json();
//                 setPosts(data.posts);
//             } catch (error) {
//                 console.error("Error loading Posts:", error);
//             }
//         };
//         fetchPosts();
//     }, []);

//     return (
//         <div className="container mx-auto px-4">
//             <h1 className="text-3xl font-bold my-6">All Posts</h1>
//             <PostCard posts={posts} />
//         </div>
//     );
// };

// export default FeedPage;
