// NumberTicker.tsx (CSS-based implementation)

import React, { useEffect, useState } from "react";

interface NumberTickerProps {
    value: number;
    direction: "up" | "down";
}

const NumberTicker: React.FC<NumberTickerProps> = ({ value, direction }) => {
    const [displayValue, setDisplayValue] = useState<number>(0);

    useEffect(() => {
        let startValue = direction === "up" ? 0 : value;
        const increment = direction === "up" ? 1 : -1;

        const interval = setInterval(() => {
            setDisplayValue((prev) => {
                const nextValue = prev + increment;
                if (direction === "up" && nextValue >= value) {
                    clearInterval(interval);
                    return value;
                } else if (direction === "down" && nextValue <= value) {
                    clearInterval(interval);
                    return value;
                }
                return nextValue;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [value, direction]);

    return <span className="ticker">{displayValue}</span>;
};

export default NumberTicker;
