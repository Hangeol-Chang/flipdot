"use client";
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';
import { DotDisplay } from '../../components/flipdot/dotDisplay';

export default function Home() {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(20);

    const [mod, setMoe] = useState(0);

    const displayRef = useRef();
    
    const flip = (r, c, flag) => {
        displayRef.current.flip(r, c, flag);
    }
    
    const interval = 300;
    const randomFlip = () => {
        const rR = Math.floor(Math.random() * row);
        const rC = Math.floor(Math.random() * col);
        
        flip(rR, rC, true);
        setTimeout(() => {reserFlip(rR, rC)}, interval);
        setTimeout(() => {randomFlip()}, interval);
    }

    const reserFlip = (r, c) => {
        flip(r, c, false);
    }

    useEffect(() => {
        randomFlip();
    }, [])

    return (
        <main className={styles.main}>
            <div
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center', 
                    margin : 30,
                }}
            >
                <div style={{backgroundColor : '#111111', border : '15px solid', borderRadius : '10px'}}>
                    <DotDisplay ROW={row} COL={col} ref={displayRef} />
                </div>
            </div>
        </main>
    )
}
