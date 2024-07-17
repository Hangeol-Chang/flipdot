"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Dot from '../../components/flipdot/dot'
import { useState } from 'react';

export default function Home() {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(20);

    const DotRow = () => {
        let result = [];
        for(let c = 0; c < col; c++) {
            result.push(<Dot size={50} />);
        }
        return result;
    }

    const DotDisplay = () => {
        let result = [];
        for(let r = 0; r < row; r++) {
            result.push(
                <div
                    style={{
                        display : 'flex',
                        flexDirection : 'row',
                        backgroundColor : '#111111',
                    }}
                >
                    {DotRow(r)}
                </div>
            );
        }
        return result;
    }

    return (
        <main className={styles.main}
        
        >
            <div
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center', 
                    margin : 30,
                }}
            >
                <div style={{backgroundColor : '#111111', border : '20px solid', borderRadius : '10px'}}>
                    <DotDisplay />
                </div>
            </div>
        </main>
    )
}
