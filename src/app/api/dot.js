import { ImageResponse } from 'next/og'

export async function GET(request) {

    const targetImage = (
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
    );
    
    return new ImageResponse(
        targetJsx, {
            width: 1200,
            height: 627,
            fonts: [
                {
                    style: "normal",
                    name: "Noto Sans KR",
                    data: notoSansFontBuffer,
                    weight: 600,
                },
                {
                    style: "normal",
                    name: "Noto Color Emoji",
                    data: notoColorEmojiFontBuffer,
                },
            ],
        }
    )

}