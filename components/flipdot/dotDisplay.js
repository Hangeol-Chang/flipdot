import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dot } from "./dot.js";

// export default function DotDisplay({row, col, mod=0}) {
export const DotDisplay = forwardRef(({ROW, COL, DOTSIZE, mod=0}, ref) => {
    let dotRefs = useRef({});
    const [isInitialized, setIsInitialized] = useState(false);
    
    useImperativeHandle(ref, () => ({ flip }))

    // 컴포넌트가 마운트된 후 초기 애니메이션 시작
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialized(true);
        }, 100); // 100ms 후 초기화 시작

        return () => clearTimeout(timer);
    }, []);

    const flip = function(r, c, flag) {
        const idx = r*COL + c;
        if(dotRefs.current[idx] != undefined) {
            dotRefs.current[idx].flip(flag);
        }
    }
    
    const DotArray = function({R, C}) {        
        let result = [];
        for(let r = 0; r < R; r++) {
            result.push(
                <div key={r*r}
                    style={{
                        display : 'flex',
                        flexDirection : 'row',
                    }}
                >
                    {
                        Array.from(new Array(C)).map((_, c) => 
                            <Dot key={r*COL + c} size={DOTSIZE} id={r*COL + c} mod={mod} 
                                row={r} col={c}
                                ref = {ref => dotRefs.current[r*COL + c] = ref}
                            />
                        )
                    }
                </div>
            );
        }
        return result;
    }

    return ( <DotArray R={ROW} C={COL} /> )
});
DotDisplay.displayName = 'DotDisplay';