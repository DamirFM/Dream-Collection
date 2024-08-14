import React from "react";

export default function About() {
    return (
        <div className="flex items-center justify-center h-screen bg-stone-50">
            <div className="w-full max-w-xl p-8 bg-stone-50 ">
                <h2 className="text-center text-2xl font-bold mb-6">About</h2>
                <p className="text-center text-lg">
                    This is a simple Next.js app with authentication and a profile page
                </p>
            </div>
        </div>
    );
}