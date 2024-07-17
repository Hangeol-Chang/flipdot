"use client";
import styles from './page.module.css'
import { useState } from 'react';
import DotDisplay from '../../components/flipdot/dotDisplay';

export default function Home() {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(20);

    const [mod, setMoe] = useState(0);
    
    const flip = (r, c) => {
        const id = r*1000 + c;
        const dot = document.getElementById(id);
        dot.setFliped(true);
    }

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
                    <DotDisplay row={row} col={col}/>
                </div>
            </div>
        </main>
    )
}
