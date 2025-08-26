'use client';
import { useState } from "react";
import DotV2 from "../../../components/flipdot/dotv2";
import ImageComponent from "../../../components/flipdot/ImageComponent";

export default function Page() {
    const [queryString, setQueryString] = useState("width=400&height=200");

    return (
        <div
            style={{
                color : 'red',
                // disply : 'flex',
                // flexDirection : 'column',
            }}    
        >
            <ImageComponent queryString={queryString} />
            {/* <DotV2 /> */}
            {/* <img src="http://localhost:3000/api" /> */}
        </div>
    )
}