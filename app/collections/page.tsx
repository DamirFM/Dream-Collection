"use client";
import { motion } from "framer-motion";
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
        <div className="py-10 bg-neutral-800 text-white">
            {/* Header Section */}
            <div className="flex h-48 items-center justify-center">
                <span className="font-semibold uppercase text-neutral-500">
                    Explore Latest Collections
                </span>
            </div>

            {/* Text Descriptions for Categories */}
            <div className="px-10 text-center mb-10">
                <p className="text-lg mb-4">
                    Discover a wide variety of categories in our photo app. From breathtaking landscapes to intimate portraits, our curated collections are designed to inspire and delight.
                </p>
                <p className="text-lg mb-4">
                    Whether you're looking for vibrant cityscapes, serene nature shots, or dynamic action photography, we have something for everyone. Dive into each category and find the perfect image to capture your imagination.
                </p>
                <p className="text-lg mb-4">
                    Our photographers span the globe, bringing you unique perspectives from diverse cultures and environments. Explore today and let your creativity soar!
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
        <section className="px-10 py-10">
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
        <motion.div
            className="group relative h-[300px] w-full overflow-hidden rounded-lg bg-neutral-200"
            whileHover={{ scale: 1.05 }} // Adds a scaling effect on hover
            transition={{ duration: 0.3 }} // Smooth transition for hover effect
        >
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>
            <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-gradient-to-br from-white/20 to-white/0 p-4 text-2xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}
                </p>
            </div>
        </motion.div>
    );
};

export default Example;

// Sample Cards Data
const cards: CardProps[] = [
    {
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=2787&auto=format&fit=crop&q=80",
        title: "Travel",
        id: 1,
    },
    {
        url: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=2787&auto=format&fit=crop&q=80",
        title: "Nature",
        id: 2,
    },
    {
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=2787&auto=format&fit=crop&q=80",
        title: "Landscapes",
        id: 3,
    },
    {
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=2787&auto=format&fit=crop&q=80",
        title: "Architect",
        id: 4,
    },
    {
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=2787&auto=format&fit=crop&q=80",
        title: "Animals",
        id: 5,
    },
    {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=2787&auto=format&fit=crop&q=80",
        title: "People",
        id: 6,
    },
    {
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=2787&auto=format&fit=crop&q=80",
        title: "Textures",
        id: 7,
    },
];
