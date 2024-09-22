import { ImageResponse } from "next/og";
import { styleModel } from '../components/model/styleModel';

export function GET(request) {
    // url parsing
    const {
        style = 'basic',
        width = 400,
        height = 200,

    } = request;
    
    let fliped = false;

    const stylePacket= {
        width,
        height,
    }

    let styleScript = 
        <style>
            {styleModel.getModel(style).style(stylePacket)}
        </style>
    ;

    let displayScript = 
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width} height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            {/* <circle 
                fill="red"
                stroke="none"

                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                
                cx="25" cy="25" r="25"  
            /> */}

            <path d="M0 0 L0 10 L10 0 Z" fill="#AAAAAA" />
            <path d="M50 50 L50 40 L40 50 Z" fill="#AAAAAA" />

        </svg>
    ;

    return new ImageResponse((
        <div
            style={{
                display: 'flex',
                background: 'blue',
                // width: '100%',
                // height: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {styleScript}
            {displayScript}
        </div>
        ),
        { width, height },
    );
}
// 실행 됨.