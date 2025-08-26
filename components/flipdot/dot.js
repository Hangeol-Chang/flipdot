import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const black1 = '#333333';
const black2 = '#222222';
const black3 = '#111111';

const white1 = '#EEEEEE';

function Circle({size, fliped, animationDelay = 0, animationMode = 'BASIC'}) {
    const [localFliped, setLocalFliped] = useState(false);
    const [isAnimationReady, setIsAnimationReady] = useState(false);
    const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] = useState(false);
    const [breathingCycle, setBreathingCycle] = useState(0);

    useEffect(() => {
        // 초기 애니메이션 지연 후 준비 상태로 설정
        const timer = setTimeout(() => {
            setIsAnimationReady(true);
            // 초기 애니메이션: 한 번 뒤집었다가 원래 상태로
            setLocalFliped(true);
            setTimeout(() => {
                setLocalFliped(false);
                setHasInitialAnimationPlayed(true);
            }, 400); // 400ms 후 다시 원래 상태로
        }, animationDelay);

        return () => clearTimeout(timer);
    }, [animationDelay]);

    // BREATHING 모드 효과
    useEffect(() => {
        if (animationMode !== 'BREATHING' || !hasInitialAnimationPlayed) return;

        const breathingInterval = setInterval(() => {
            // 3초마다 대각선 애니메이션 실행
            const breathingTimer = setTimeout(() => {
                setLocalFliped(true);
                setTimeout(() => {
                    setLocalFliped(false);
                }, 400);
            }, animationDelay);

            setBreathingCycle(prev => prev + 1);

            return () => clearTimeout(breathingTimer);
        }, 3000); // 3초마다 반복

        return () => clearInterval(breathingInterval);
    }, [animationMode, hasInitialAnimationPlayed, animationDelay]);

    useEffect(() => {
        if(!hasInitialAnimationPlayed) return; // 초기 애니메이션이 끝나지 않았으면 무시
        if(animationMode === 'BREATHING') return; // BREATHING 모드에서는 사용자 입력 무시
        
        if(fliped == true) {
            setLocalFliped(true);
        }
        else {
            setTimeout(function() {setLocalFliped(false)}, 500);
        }
    }, [fliped, hasInitialAnimationPlayed, animationMode]);

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
                    `rotateZ(0deg) rotateY(0deg)` : 
                    `rotateZ(90deg) rotateY(180deg)`,
            }}
        >
        </div>
    );
}

export const Dot = forwardRef(({size=30, id, mod, row, col, animationMode = 'BASIC'}, ref) => {
    // export default function Dot ({size = 30, id, mod, ref}) {
    const [fliped, setFliped] = useState(false);
    
    // 대각선 애니메이션 지연 계산 (왼쪽 위에서 오른쪽 아래로)
    const animationDelay = (row + col) * 80; // 80ms씩 지연
    
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
            <Circle size={size} fliped={fliped} animationDelay={animationDelay} animationMode={animationMode}/>
            <BotTriangle />
        </div>
    )
})
Dot.displayName = 'Dot';