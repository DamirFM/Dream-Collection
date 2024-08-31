// /feed/page.tsx

import React, { Suspense } from 'react';
import FeedClientComponent from '@/app/components/FeedClientComponent'; // Import the client-side component

export default function FeedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedClientComponent />
        </Suspense>
    );
}
