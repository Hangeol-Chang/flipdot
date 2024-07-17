import styles from './dot.css'

export default function Dot({size = 30,}) {
    const black1 = '#333333';
    const black2 = '#222222';
    const black3 = '#111111';

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


    const Circle = () => {
        return (
            <div className={"circle"}
                style={{
                    width : size,
                    height : size,
                    position : 'absolute',
                    // webkitMaskSize: '10px',
                    // WebkitMaskImage : 'linear-gradient(rgba(0, 0, 0, 1) 50%, transparent)',
                }}
            >
            </div>
        )
    }

    return (
        <div
            style={{
                width : size,
                height : size,
                margin : '1px',
                backgroundColor : black3,
                flexShrink : 0,
            }}
        >
            <TopTriangle />
            <Circle />
            <BotTriangle />
        </div>
    )
}