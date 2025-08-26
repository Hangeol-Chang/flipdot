import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const black1 = '#333333';
const black2 = '#222222';
const black3 = '#111111';

const white1 = '#EEEEEE';

function Circle({size, fliped}) {
    const [localFliped, setLocalFliped] = useState(false);

    useEffect(() => {
        if(fliped == true) {
            setLocalFliped(true);
        }
        else {
            setTimeout(function() {setLocalFliped(false)}, 500);
        }
        // 1초 지연.
    }, [fliped]);

    return (
        <div 
            style={{
                width : size,
                height : size,
                position : 'absolute',
                borderRadius : '50%',
                zIndex: 10,
                transition : `
                    transform 0.3s ease-in-out, 
                    background-color 0.15s ease-in-out`,

                backgroundColor : localFliped ? white1 : black2,
                transform       : localFliped ? 
                    `perspective(800px) rotateZ(0deg) rotateY(0deg)` : 
                    `perspective(800px) rotateZ(90deg) rotateY(180deg)`,
            }}
        >
        </div>
    );
}

export const Dot = forwardRef(({size=30, id, mod}, ref) => {
    // export default function Dot ({size = 30, id, mod, ref}) {
    const [fliped, setFliped] = useState(false);
    useImperativeHandle(ref, () => ({
        flip
    }));

    const flip = (flag) => { 
        if(flag != fliped)  setFliped(flag);
    }

    const Triangle = ({clipPath}) => {
        return (
            <div
                style={{
                    width : size, height : size,
                    backgroundColor : black2,
                    position : 'absolute',
                    zIndex: 5,
                    clipPath : clipPath
                }}
            >
            </div>
        )
    }
    const TopTriangle = () => { return <Triangle clipPath={'polygon(0% 0, 20% 0, 0 20%)'} /> }
    const BotTriangle = () => { return <Triangle clipPath={'polygon(100% 100%, 80% 100%, 100% 80%)'} /> }

    return (
        <div
            style={{
                width : size,
                height : size,
                margin : '1px',
                backgroundColor : black3,
                flexShrink : 0,
                position: 'relative',
                zIndex: 1,
            }}
            onMouseEnter={() => setFliped(true)}
            onMouseLeave={() => setFliped(false)} 
            id={id}
        >
            <TopTriangle />
            <Circle size={size} fliped={fliped}/>
            <BotTriangle />
        </div>
    )
})
Dot.displayName = 'Dot';