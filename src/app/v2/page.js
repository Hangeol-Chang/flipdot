'use client';

import { useEffect } from "react";
import DotV2 from "../../../components/flipdot/dotv2";

export default function Page() {

    const fetchPokemon = async () => {
        console.log("실행이 안되나?")
        const res = await fetch('http://localhost:3000/api/test')
        console.log(await res);
        const data = await res.json()
        console.log(data);
        // return data
    }

    useEffect(() => {
        fetchPokemon()
    }, []);
    

    return (
        <div
            style={{
                color : 'red',
                disply : 'flex',
                flexDirection : 'column',
            }}    
        >
            <DotV2 />
        </div>
    )
}