"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

// Define the interface for a card
interface CardProps {
    id: number;
    url: string;
    title: string;
}

// Update the Example component to include the interface
const Example = () => {
    return (
        <div className="bg-neutral-800">
            <div className="flex h-48 items-center justify-center">
                <span className="font-semibold uppercase text-neutral-500">
                    Explore latest collections
                </span>
            </div>
            <HorizontalScrollCarousel />
        </div>
    );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

// Apply the CardProps type to the Card component
const Card = ({ card }: { card: CardProps }) => {
    return (
        <div
            className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
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
                <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}
                </p>
            </div>
        </div>
    );
};

export default Example;

// Apply the CardProps type to the cards array
const cards: CardProps[] = [
    {
        url: "/images/9C4571AC-CC11-42C3-B4AA-9144E283A48B_4_5005_c.jpeg",
        title: "Travel",
        id: 1,
    },
    {
        url: "/images/damir-yakupov-tPPuhI9GivY-unsplash.jpg",
        title: "Nature",
        id: 2,
    },
    {
        url: "/images/mason-field-5sV4J34W7tU-unsplash.jpg",
        title: "Landscapes",
        id: 3,
    },
    {
        url: "/images/colin-lloyd-qOFeQAzHuuw-unsplash.jpg",
        title: "Architect",
        id: 4,
    },
    {
        url: "/images/fabian-betto-U_nB2WPRUkc-unsplash.jpg",
        title: "Animals",
        id: 5,
    },
    {
        url: "/images/samsung-uk-XooIapRIKwY-unsplash.jpg",
        title: "People",
        id: 6,
    },
    {
        url: "/images/susan-wilkinson-9UrY00l27_E-unsplash.jpg",
        title: "Textures",
        id: 7,
    },
];
