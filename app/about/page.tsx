// app/about/page.tsx

import React from 'react';
import ClientAbout from './ClientAbout';

// Server Component: Data fetching happens here
export default async function About() {
    let initialPosts = [];
    let initialUserCount = 0;

    try {
        // Fetch posts data
        const postsResponse = await fetch(`${process.env.API_URL}/api/posts`, { cache: 'no-store' });
        const postsData = await postsResponse.json();
        initialPosts = postsData.posts || [];

        // Fetch user count
        const userResponse = await fetch(`${process.env.API_URL}/api/user`, { cache: 'no-store' });
        const userData = await userResponse.json();
        initialUserCount = userData.userCount || 0;
    } catch (error) {
        console.error("Error fetching server-side data:", error);
    }

    return (
        <ClientAbout
            initialPosts={initialPosts}
            initialUserCount={initialUserCount}
        />
    );
}
