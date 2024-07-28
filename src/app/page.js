"use client";
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';
import { DotDisplay } from '../../components/flipdot/dotDisplay';
import { Syne_Tactile } from 'next/font/google';

// 계산에 사용되는 함수 대부분은 추후에 api로 분리할 것

export default function Home() {
    const [dotCount, setDotCount] = useState([10, 20]);
    const [dotSize , setDotSize ] = useState(50);   // 30 ~ 150 정도의 값으로 움직일 것.

    const [windowSizeLimit, ] = useState({min : [300, 300], max : [3840, 1440]});
    const [dotCountLimit, ] = useState(  {min : [10, 10],   max : [25, 100] }  );
    const [dotSizeLimit, ] = useState({min : 50, max : 80});
    
    const [fullScreenMode, setFullScreenMode] = useState(false);

    const saturateDotCount = (row, col) => {
        if(     row < dotCountLimit.min[0]) row = dotCountLimit.min[0];
        else if(row > dotCountLimit.max[0]) row = dotCountLimit.max[0];

        if(     col < dotCountLimit.min[1]) col = dotCountLimit.min[1];
        else if(col > dotCountLimit.max[1]) col = dotCountLimit.max[1];

        return [row, col];
    }
    const saturateDotSize = (size) => {
        if(size < dotSizeLimit.min) return dotSizeLimit.min;
        if(size > dotSizeLimit.max) return dotSizeLimit.max;
        return size;
    }

    const calulateDotCount = (width, height) => {
        const row = Math.floor(height);
        const col = Math.floor(width );

        return saturateDotCount(row, col);
    }
    const CalculateDotSize = (width, height) => {
        const step = (windowSizeLimit.max[0] - windowSizeLimit.min[0]) / (dotSizeLimit.max - dotSizeLimit.min);
        return saturateDotSize(dotSize + (width - windowSizeLimit.min[0]) / step);
    }


    const [mod, setMoe] = useState(0);

    const displayRef = useRef();
    
    const flip = (r, c, flag) => {
        displayRef.current.flip(r, c, flag);
    }
    
    const interval = 300;
    const randomFlip = () => {
        const rR = Math.floor(Math.random() * dotCount[0]);
        const rC = Math.floor(Math.random() * dotCount[1]); 
        
        flip(rR, rC, true);
        setTimeout(() => {resetFlip(rR, rC)}, interval);
        setTimeout(() => {randomFlip()}, interval);
    }

    const resetFlip = (r, c) => {
        flip(r, c, false);
    }

    const refreshAll = (r = 0, c = 0) => {
        // 전체 false처리 해버리는 코드.
        flip(r, c, true);
        setTimeout();
    }

    useEffect(() => {
        randomFlip();
    }, [])

    
    const handleResize = () => {
        let newDotSize = 50;
        let newDotCount = [10, 20];
        
        if(fullScreenMode) {
            newDotSize = CalculateDotSize(window.innerWidth, window.innerHeight);
            newDotCount = calulateDotCount(window.innerWidth / newDotSize, window.innerHeight / 80);
        }
        
        setDotSize(newDotSize);
        setDotCount(newDotCount);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {            
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        } 
        else return () => window.removeEventListener("resize", () => {return null});
    }, []); 
    useEffect(() => {
        handleResize();
    }, [fullScreenMode])


    return (
        <main className={styles.main}>
            <div
                style={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center', 
                    // margin : 30,
                }}
            >
                <button
                    onClick={() => setFullScreenMode(!fullScreenMode)}
                    style={{
                        backgroundColor : 'black',
                        color : 'white',
                        border : '1px solid',
                        padding : '10px',
                        borderRadius : '50px'
                    }}
                >
                    fullscreen Mode
                </button>
                
                <div style={{backgroundColor : '#111111', border : '15px solid', borderRadius : '10px'}}>
                    <DotDisplay ROW={dotCount[0]} COL={dotCount[1]} DOTSIZE={dotSize} ref={displayRef} />
                </div>
            </div>
        </main>
    )
}
