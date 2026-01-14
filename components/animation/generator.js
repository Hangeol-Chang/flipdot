/**
 * Animation Generator
 * 애니메이션 CSS 생성을 담당하는 모듈
 */

import { ANIMATION_CONFIG } from '../config/defaults.js';

/**
 * 애니메이션 타이밍 계산
 */
export function calculateTiming(speed = 1.0) {
    return {
        flipDuration: ANIMATION_CONFIG.flipDuration / speed,
        holdDuration: ANIMATION_CONFIG.holdDuration / speed,
        stepInterval: ANIMATION_CONFIG.stepInterval / speed,
        pauseTime: ANIMATION_CONFIG.pauseTime / speed,
        sequentialCycleDuration: ANIMATION_CONFIG.sequentialCycleDuration / speed,
        staticFlipDuration: ANIMATION_CONFIG.staticFlipDuration,
        diagonalDelayMultiplier: ANIMATION_CONFIG.diagonalDelayMultiplier,
    };
}

/**
 * Static 애니메이션 CSS 생성
 */
export function generateStaticAnimation(colors) {
    return `
        /* Static/Basic 모드: 한 번만 실행되는 애니메이션 */
        .dot-on {
            animation: staticFlip 0.8s ease-out forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
        
        .dot-off {
            fill: ${colors.dotOff};
            opacity: 1;
            transform: none;
        }
        
        @keyframes staticFlip {
            0% {
                fill: ${colors.dotOff};
                transform: rotateZ(0deg) rotateY(0deg);
                opacity: 1;
            }
            50% {
                fill: ${colors.dotOff};
                transform: rotateZ(45deg) rotateY(90deg);
                opacity: 1;
            }
            100% {
                fill: ${colors.dotOn};
                transform: rotateZ(90deg) rotateY(180deg);
                opacity: 1;
            }
        }
    `;
}

/**
 * Sequential 애니메이션 CSS 생성
 */
export function generateSequentialAnimation(colors, speed = 1.0) {
    const timing = calculateTiming(speed);
    
    return `
        /* Sequential 모드: 순차적 반복 애니메이션 */
        .dot-on {
            animation: sequentialFlip ${timing.sequentialCycleDuration}s ease-in-out infinite;
            transform-box: content-box;
            transform-origin: center center;
        }
        
        .dot-off {
            fill: ${colors.dotOff};
            opacity: 1;
            transform: none;
        }
        
        @keyframes sequentialFlip {
            0%, 100% {
                fill: ${colors.dotOff};
                transform: rotateZ(0deg) rotateY(0deg);
                opacity: 1.0;
            }
            10%, 90% {
                fill: ${colors.dotOff};
                transform: rotateZ(45deg) rotateY(90deg);
                opacity: 1;
            }
            20% {
                fill: ${colors.dotOn};
                transform: rotateZ(90deg) rotateY(180deg);
                opacity: 1;
            }
            80% {
                fill: ${colors.dotOn};
                transform: rotateZ(90deg) rotateY(180deg);
                opacity: 1;
            }
        }
    `;
}

/**
 * Scroll 애니메이션 CSS 생성
 */
export function generateScrollAnimation(pattern, displayWidth, colors, speed = 1.0, direction = 'normal') {
    const timing = calculateTiming(speed);
    const totalTextWidth = pattern.width;
    const scrollSteps = totalTextWidth + displayWidth;
    const totalScrollTime = scrollSteps * timing.stepInterval;
    const totalCycleDuration = totalScrollTime + timing.pauseTime;
    
    let animationCSS = `
        /* 스크롤 모드 애니메이션 */
        .scroll-dot {
            animation-fill-mode: forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
    `;
    
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < displayWidth; x++) {
            let keyframes = `@keyframes scroll-${x}-${y} {\n  0% { fill: ${colors.dotOff}; }\n`;
            
            let activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                let textPosition;
                if (direction === 'reverse') {
                    textPosition = totalTextWidth - 1 - (step - x);
                } else {
                    textPosition = step - displayWidth + x + 1;
                }
                if (textPosition >= 0 && textPosition < totalTextWidth) {
                    const shouldFlip = pattern.data[y] && pattern.data[y][textPosition] === 1;
                    if (shouldFlip) {
                        activeSteps.push(step);
                    }
                }
            }
            
            for (let i = 0; i < activeSteps.length; i++) {
                const step = activeSteps[i];
                const stepStartTime = step * timing.stepInterval;
                const stepStartPercent = (stepStartTime / totalCycleDuration) * 100;
                
                const isPrevConsecutive = i > 0 && activeSteps[i - 1] === step - 1;
                
                if (isPrevConsecutive) {
                    continue;
                }
                
                const flipOnStart = stepStartPercent;
                const flipOnMid = stepStartPercent + (timing.flipDuration / 2 / totalCycleDuration) * 100;
                const flipOnEnd = stepStartPercent + (timing.flipDuration / totalCycleDuration) * 100;
                
                keyframes += `  ${flipOnStart}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(0deg) rotateY(0deg);
                }\n`;
                keyframes += `  ${flipOnMid}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(45deg) rotateY(90deg);
                }\n`;
                keyframes += `  ${flipOnEnd}% { 
                    fill: ${colors.dotOn}; 
                    transform: rotateZ(90deg) rotateY(180deg);
                }\n`;
                
                let lastConsecutiveStep = step;
                while (i < activeSteps.length - 1 && activeSteps[i + 1] === lastConsecutiveStep + 1) {
                    i++;
                    lastConsecutiveStep = activeSteps[i];
                }
                
                const lastStepTime = lastConsecutiveStep * timing.stepInterval;
                const holdEndTime = lastStepTime + timing.holdDuration;
                const flipOffEndTime = holdEndTime + timing.flipDuration;
                
                const holdEndPercent = (holdEndTime / totalCycleDuration) * 100;
                const flipOffMidPercent = ((holdEndTime + timing.flipDuration / 2) / totalCycleDuration) * 100;
                const flipOffEndPercent = (flipOffEndTime / totalCycleDuration) * 100;
                
                keyframes += `  ${holdEndPercent}% { 
                    fill: ${colors.dotOn}; 
                    transform: rotateZ(90deg) rotateY(180deg);
                }\n`;
                keyframes += `  ${flipOffMidPercent}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(45deg) rotateY(90deg);
                }\n`;
                keyframes += `  ${flipOffEndPercent}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(0deg) rotateY(0deg);
                }\n`;
            }
            
            const scrollEndPercent = (totalScrollTime / totalCycleDuration) * 100;
            keyframes += `  ${scrollEndPercent}% { fill: ${colors.dotOff}; }\n`;
            keyframes += `  100% { fill: ${colors.dotOff}; }\n`;
            keyframes += `}\n\n`;
            
            animationCSS += keyframes;
            
            animationCSS += `.scroll-dot[data-x="${x}"][data-y="${y}"] {\n`;
            animationCSS += `  animation: scroll-${x}-${y} ${totalCycleDuration}s infinite ease-in-out;\n`;
            animationCSS += `  transform-box: content-box;\n`;
            animationCSS += `  transform-origin: center center;\n`;
            animationCSS += `}\n\n`;
        }
    }
    
    return animationCSS;
}

/**
 * Waterfall 애니메이션 CSS 생성
 */
export function generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed = 1.0, direction = 'normal') {
    const timing = calculateTiming(speed);
    const totalTextHeight = pattern.height;
    const scrollSteps = totalTextHeight + displayHeight;
    const totalScrollTime = scrollSteps * timing.stepInterval;
    const totalCycleDuration = totalScrollTime + timing.pauseTime;
    
    let animationCSS = `
        /* 워터폴 모드 애니메이션 */
        .waterfall-dot {
            animation-fill-mode: forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
    `;
    
    for (let y = 0; y < displayHeight; y++) {
        for (let x = 0; x < displayWidth; x++) {
            let keyframes = `@keyframes waterfall-${x}-${y} {\n  0% { fill: ${colors.dotOff}; }\n`;
            
            let activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                let textPosition;
                if (direction === 'reverse') {
                    textPosition = step - displayHeight + y + 1;
                } else {
                    textPosition = totalTextHeight - 1 - (step - y);
                }
                if (textPosition >= 0 && textPosition < totalTextHeight && x < pattern.width) {
                    const shouldFlip = pattern.data[textPosition] && pattern.data[textPosition][x] === 1;
                    if (shouldFlip) {
                        activeSteps.push(step);
                    }
                }
            }
            
            for (let i = 0; i < activeSteps.length; i++) {
                const step = activeSteps[i];
                const stepStartTime = step * timing.stepInterval;
                const stepStartPercent = (stepStartTime / totalCycleDuration) * 100;
                
                const isPrevConsecutive = i > 0 && activeSteps[i - 1] === step - 1;
                
                if (isPrevConsecutive) {
                    continue;
                }
                
                const flipOnStart = stepStartPercent;
                const flipOnMid = stepStartPercent + (timing.flipDuration / 2 / totalCycleDuration) * 100;
                const flipOnEnd = stepStartPercent + (timing.flipDuration / totalCycleDuration) * 100;
                
                keyframes += `  ${flipOnStart}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(0deg) rotateY(0deg);
                }\n`;
                keyframes += `  ${flipOnMid}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(45deg) rotateY(90deg);
                }\n`;
                keyframes += `  ${flipOnEnd}% { 
                    fill: ${colors.dotOn}; 
                    transform: rotateZ(90deg) rotateY(180deg);
                }\n`;
                
                let lastConsecutiveStep = step;
                while (i < activeSteps.length - 1 && activeSteps[i + 1] === lastConsecutiveStep + 1) {
                    i++;
                    lastConsecutiveStep = activeSteps[i];
                }
                
                const lastStepTime = lastConsecutiveStep * timing.stepInterval;
                const holdEndTime = lastStepTime + timing.holdDuration;
                const flipOffEndTime = holdEndTime + timing.flipDuration;
                
                const holdEndPercent = (holdEndTime / totalCycleDuration) * 100;
                const flipOffMidPercent = ((holdEndTime + timing.flipDuration / 2) / totalCycleDuration) * 100;
                const flipOffEndPercent = (flipOffEndTime / totalCycleDuration) * 100;
                
                keyframes += `  ${holdEndPercent}% { 
                    fill: ${colors.dotOn}; 
                    transform: rotateZ(90deg) rotateY(180deg);
                }\n`;
                keyframes += `  ${flipOffMidPercent}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(45deg) rotateY(90deg);
                }\n`;
                keyframes += `  ${flipOffEndPercent}% { 
                    fill: ${colors.dotOff}; 
                    transform: rotateZ(0deg) rotateY(0deg);
                }\n`;
            }
            
            const scrollEndPercent = (totalScrollTime / totalCycleDuration) * 100;
            keyframes += `  ${scrollEndPercent}% { fill: ${colors.dotOff}; }\n`;
            keyframes += `  100% { fill: ${colors.dotOff}; }\n`;
            keyframes += `}\n\n`;
            
            animationCSS += keyframes;
            
            animationCSS += `.waterfall-dot[data-x="${x}"][data-y="${y}"] {\n`;
            animationCSS += `  animation: waterfall-${x}-${y} ${totalCycleDuration}s infinite ease-in-out;\n`;
            animationCSS += `  transform-box: content-box;\n`;
            animationCSS += `  transform-origin: center center;\n`;
            animationCSS += `}\n\n`;
        }
    }
    
    return animationCSS;
}

/**
 * 애니메이션 모드에 따른 CSS 생성
 */
export function generateAnimationCSS(animationMode, options) {
    const { pattern, displayWidth, displayHeight, colors, speed, direction } = options;
    
    switch (animationMode) {
        case 'scroll':
            return generateScrollAnimation(pattern, displayWidth, colors, speed, direction);
        case 'waterfall':
            return generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed, direction);
        case 'sequential':
            return generateSequentialAnimation(colors, speed);
        case 'static':
        default:
            return generateStaticAnimation(colors);
    }
}
