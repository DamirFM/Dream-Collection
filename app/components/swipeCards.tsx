"use client";

import React, { useState } from "react";
import Image from "next/image";

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
            className="grid h-[500px] w-full place-items-center grid-flow-col gap-4 xs:-mt-4"
            onClick={handleTab} // Handle tab click
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
    const isFront = id === cards[cards.length - 1].id;

    return (
        <Image
            src={url}
            alt="Placeholder alt"
            width={288} // width and height values based on the 'w-72' class (72 * 4 = 288)
            height={384} // height value based on the 'h-96' class (96 * 4 = 384)
            className={`h-96 w-72 origin-bottom rounded-md bg-stone-50 object-cover hover:cursor-pointer card ${isFront ? "card-front" : ""
                }`}
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
