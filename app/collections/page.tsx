"use client";

import Link from "next/link";

// Define the interface for a card
interface CardProps {
    id: number;
    url: string;
    title: string;
}

// Main Example Component
const Example = () => {
    return (
        <div className="py-5 bg-stone-50 text-stone-900">
            {/* Header Section */}
            <div className="flex items-center justify-center">
                <span className="font-semibold uppercase text-neutral-500">
                    Explore Latest Collections
                </span>
            </div>

            {/* Text Descriptions for Categories */}
            <div className="px-5 text-center mb-5">
                <p className="text-lg mb-4">
                    Discover a wide variety of categories in our photo app. From breathtaking landscapes to intimate portraits, our curated collections are designed to inspire and delight.
                </p>
            </div>

            {/* Grid Gallery Section */}
            <GridGallery />
        </div>
    );
};

// Grid Gallery Component
const GridGallery = () => {
    return (
        <section className="px-5 py-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cards.map((card) => (
                    <Link href={`/feed?category=${encodeURIComponent(card.title)}`} key={card.id}>
                        <Card card={card} />
                    </Link>
                ))}
            </div>
        </section>
    );
};

// Card Component
const Card = ({ card }: { card: CardProps }) => {
    return (
        <div className="gallery-card">
            <div
                className="gallery-card-image"
                style={{
                    backgroundImage: `url(${card.url})`,
                }}
            ></div>
            <div className="gallery-card-title-wrapper">
                <div className="gallery-card-title-bg">
                    <p className="gallery-card-title">{card.title}</p>
                </div>
            </div>
        </div>
    );
};

export default Example;

// Sample Cards Data
const cards: CardProps[] = [
    {
        url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2186&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Travel",
        id: 1,
    },
    {
        url: "https://images.unsplash.com/photo-1621849400072-f554417f7051?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Nature",
        id: 2,
    },
    {
        url: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Landscape",
        id: 3,
    },
    {
        url: "https://images.unsplash.com/photo-1662975516305-225a12e79959?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Architect",
        id: 4,
    },
    {
        url: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Animals",
        id: 5,
    },
    {
        url: "https://images.unsplash.com/photo-1510022079733-8b58aca7c4a9?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "People",
        id: 6,
    },
    {
        url: "https://images.unsplash.com/photo-1475965894430-b05c9d13568a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Texture",
        id: 7,
    },
    {
        url: "https://images.unsplash.com/photo-1568150279679-d16bc9eb9eb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Business",
        id: 8,
    },
    {
        url: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Other",
        id: 9,
    },
];
