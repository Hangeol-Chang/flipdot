import { useEffect, useRef, useState } from "react";
import { Dot } from "./dot.js";

export default function DotDisplay({row, col, mod=0}) {
    const [refs, setRefs] = useState([]);
    
    const MakeRefs = (R, C) => {
        console.log(R, C)
    }

    const DotRow = function(r, C) {
        let refRow = [];
        let result = [];
        for(let c = 0; c < C; c++) {
            const dotRef = useRef();
            // useEffect(() => {
            //     dotRef.current.flip();
            // }, []);
            result.push(<Dot key={r*1000 + c} size={50} id={r*1000 + c} mod={mod} ref={dotRef}/>);
            refRow.push(dotRef);
        }
        
        // setRefs([...refs, refRow]);
        // console.log(refs);
        return result;
    }


    const DotArray = function({R, C}) {
        MakeRefs(R, C);
        
        let result = [];
        for(let r = 0; r < R; r++) {
            result.push(
                <div key={r*r}
                    style={{
                        display : 'flex',
                        flexDirection : 'row',
                    }}
                >
                    {DotRow(r, C)}
                </div>
            );
        }
        return result;
    }

    return (
        <DotArray R={row} C={col} />
    )
}