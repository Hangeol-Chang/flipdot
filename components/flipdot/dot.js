import { forwardRef, useImperativeHandle, useState } from 'react';
import { Transition } from 'react-transition-group';

const black1 = '#333333';
const black2 = '#222222';
const black3 = '#111111';

const white1 = '#EEEEEE';

function Circle({size, fliped}) {
    return (
        <div
            style={{
                position : 'absolute',
                width : size,
                height : size,
            }}
        >
            <Transition in={fliped} timeout={500}>
                {(state) => (
                    <div 
                        style={{
                            width : size,
                            height : size,
                            position : 'absolute',
                            borderRadius : '50%',
                            // transition : 'transform 0.3s',
                            transition: `opacity .5s ease-in-out background-color 0.1s ease-in-out`,
                            transition : 'transform 0.3s ease-in-out',
                            backgroundColor : state === 'exited' ? black2 : white1,
                            // backgroundColor : `${fliped ? white1 : black2}`,
                            transform : state === 'exited' ? 'perspective(800px) rotateZ(0deg) rotateY(0deg)' : 'perspective(800px) rotateZ(90deg) rotateY(180deg)',
                        }}
                    >
                    </div>
                )}
            </Transition>
        </div>
    )
}

export const Dot = forwardRef(({size=30, id, mod}, ref) => {
    // export default function Dot ({size = 30, id, mod, ref}) {
    const [fliped, setFliped] = useState(false);
    useImperativeHandle(ref, () => ({flip}));
    function flip() { setFliped(!fliped);  }

    const Triangle = ({clipPath}) => {
        return (
            <div
                style={{
                    width : size, height : size,
                    backgroundColor : black2,
                    position : 'absolute',
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