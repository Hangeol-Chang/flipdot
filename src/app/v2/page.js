'use client';

import { useEffect } from "react";
import DotV2 from "../../../components/flipdot/dotv2";

export default function Page() {

    const fetchPokemon = async () => {
        const res = await fetch('http://localhost:3000/api')
        console.log(await res);
        return res;
    }

    const fetchPokemon2 = async () => {
        const res = await fetch('http://localhost:3000/api/test')
        console.log(await res);
    }
    
    const aa = fetchPokemon();
    useEffect(() => {
        fetchPokemon();
        fetchPokemon2();
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
            <img src="http://localhost:3000/api" />
        </div>
    )
}