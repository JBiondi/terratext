"use client"

import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface CelebrationProps {
    trigger: boolean;
    duration: number;
}

export default function Celebration({ trigger, duration }: CelebrationProps) {
    const { width, height } = useWindowSize();
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (trigger) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), duration);
            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return show ? <Confetti width={width} height={height} recycle={false} numberOfPieces={500} /> : null;
}