import { ImageResponse } from "next/og";

export function GET(request) {
    let fliped = false;

    return new ImageResponse((
        <div
            style={{
            display: 'flex',
            fontSize: 40,
            background: 'blue',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 0 0"
            >
                <circle 
                    fill="red"
                    stroke="none"

                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}

                    transform={`translate(${fliped ? 10 : 0}, 10) rotate(${fliped ? 180 : 0})`}
                    transition="translate 0.3s ease-in-out"
                    // style={{
                    //     transition: 'transform 0.3s ease-in-out',
                    //     transform: 'rotate(0deg)',
                    // }}
                    
                    cx="25" cy="25" r="25"  
                />

                <path d="M0 0 L0 10 L10 0 Z" fill="#AAAAAA" />
                <path d="M50 50 L50 40 L40 50 Z" fill="#AAAAAA" />

            </svg>
        </div>
        ),
        { width: 50, height: 50, },
    );
}
// 실행 됨.