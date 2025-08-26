"use client";

import { useEffect, useState } from 'react';

function Circle2({className}) {
    const [fliped, setFliped] = useState(false);
    
    useEffect(() => {
        const toggleFlip = (a) => {
            setFliped(a);
            console.log("fliped", a, fliped);
        }
        setTimeout(() => {toggleFlip(!fliped)}, 1000);
    }, [fliped]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={1000}
            height={1000}
            viewBox="0 0 1000 1000"
            className={`w-full h-auto ${className}`}
        >
        <circle 
            fill="white"
            stroke="none"

            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}

            style={{
                transition: 'transform 0.3s ease-in-out',
                transform: fliped ? 'rotate(-10deg)' : 'rotate(0deg)',
            }}
            
            cx="25" cy="25" r="25"  
        />

        <path d="M0 0 L0 10 L10 0 Z" fill="#AAAAAA" />
        <path d="M50 50 L50 40 L40 50 Z" fill="#AAAAAA" />

      </svg>
    )
}

export default function DotV2({className}) {
    return (
        <Circle2 className={className} />
    )
}