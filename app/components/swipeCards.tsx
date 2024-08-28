import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface CardData {
    id: number;
    url: string;
}

interface CardProps extends CardData {
    cards: CardData[];
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

const SwipeCards: React.FC = () => {
    const [cards, setCards] = useState<CardData[]>(cardData);

    const handleTab = () => {
        setCards((prevCards) => {
            const updatedCards = [...prevCards];
            updatedCards.unshift(updatedCards.pop()!); // Ensure that pop() is not undefined
            return updatedCards;
        });
    };

    return (
        <div
            className="grid h-[500px] w-full place-items-center"
            onClick={handleTab}  // Handle tab click
        >
            {cards.map((card) => {
                if (!card) return null; // Handle the case where card is undefined
                return (
                    <Card key={card.id} cards={cards} setCards={setCards} {...card} />
                );
            })}
        </div>
    );
};

const Card: React.FC<CardProps> = ({ id, url, setCards, cards }) => {
    const x = useMotionValue(0);

    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

    const isFront = id === cards[cards.length - 1].id;

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : id % 2 ? 6 : -6;

        return `${rotateRaw.get() + offset}deg`;
    });

    return (
        <motion.img
            src={url}
            alt="Placeholder alt"
            className="h-96 w-72 origin-bottom rounded-lg bg-stone-50 object-cover hover:cursor-pointer"
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                opacity,
                rotate,
                transition: "0.125s transform",
                boxShadow: isFront
                    ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
                    : undefined,
            }}
            animate={{
                scale: isFront ? 1 : 0.98,
            }}
        />
    );
};

export default SwipeCards;

const cardData = [
    { id: 1, url: "https://images.unsplash.com/photo-1644801049787-38f91347b7d1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, url: "https://images.unsplash.com/photo-1672373257974-5244831eee43?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, url: "https://images.unsplash.com/photo-1710732018220-921f723ada05?q=80&w=2798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, url: "https://images.unsplash.com/photo-1634872698595-64f8d41aaf5e?q=80&w=2571&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, url: "https://images.unsplash.com/photo-1613922342608-7384dff0f93e?q=80&w=2544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, url: "https://images.unsplash.com/photo-1566680103706-61324bfc6572?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, url: "https://images.unsplash.com/photo-1553798081-85009962337f?q=80&w=2266&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, url: "https://images.unsplash.com/photo-1641184534911-2ac0af3a477f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];
