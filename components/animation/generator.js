/**
 * Animation Generator
 * 애니메이션 CSS 생성 모듈
 * 효과 상태(off/mid/on)는 각 shape에서 가져온다.
 */

import { ANIMATION_CONFIG } from '../config/defaults.js';

const DEFAULT_EFFECT = {
    off: 'fill: {dotOff}; transform: rotateY(0deg);',
    mid: 'fill: {dotOff}; transform: rotateY(90deg);',
    on:  'fill: {dotOn}; transform: rotateY(180deg);',
};

function resolveColors(effect, colors) {
    const resolve = (s) => s.replace(/\{dotOff\}/g, colors.dotOff).replace(/\{dotOn\}/g, colors.dotOn);
    return {
        off: resolve(effect.off),
        mid: resolve(effect.mid),
        on:  resolve(effect.on),
    };
}

export function calculateTiming(speed = 1.0) {
    return {
        flipDuration:            ANIMATION_CONFIG.flipDuration / speed,
        holdDuration:            ANIMATION_CONFIG.holdDuration / speed,
        stepInterval:            ANIMATION_CONFIG.stepInterval / speed,
        pauseTime:               ANIMATION_CONFIG.pauseTime / speed,
        sequentialCycleDuration: ANIMATION_CONFIG.sequentialCycleDuration / speed,
        staticFlipDuration:      ANIMATION_CONFIG.staticFlipDuration,
        diagonalDelayMultiplier: ANIMATION_CONFIG.diagonalDelayMultiplier,
    };
}

export function generateStaticAnimation(colors, shape) {
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);
    return `
        .dot-on {
            animation: staticFlip 0.8s ease-out forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
        .dot-off { ${e.off} }
        @keyframes staticFlip {
            0%   { ${e.off} }
            50%  { ${e.mid} }
            100% { ${e.on}  }
        }
    `;
}

export function generateSequentialAnimation(colors, speed = 1.0, shape) {
    const timing = calculateTiming(speed);
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);
    return `
        .dot-on {
            animation: sequentialFlip ${timing.sequentialCycleDuration}s ease-in-out infinite;
            transform-box: content-box;
            transform-origin: center center;
        }
        .dot-off { ${e.off} }
        @keyframes sequentialFlip {
            0%, 100% { ${e.off} }
            10%, 90% { ${e.mid} }
            20%, 80% { ${e.on}  }
        }
    `;
}

/**
 * scroll/waterfall 공통 per-dot keyframes 생성
 */
function buildKeyframes(name, activeSteps, timing, totalCycleDuration, totalScrollTime, e) {
    let kf = `@keyframes ${name} {\n  0% { ${e.off} }\n`;

    for (let i = 0; i < activeSteps.length; i++) {
        const step = activeSteps[i];

        if (i > 0 && activeSteps[i - 1] === step - 1) continue;

        const t0 = (step * timing.stepInterval / totalCycleDuration) * 100;
        const t1 = t0 + (timing.flipDuration / 2 / totalCycleDuration) * 100;
        const t2 = t0 + (timing.flipDuration     / totalCycleDuration) * 100;

        kf += `  ${t0.toFixed(3)}% { ${e.off} }\n`;
        kf += `  ${t1.toFixed(3)}% { ${e.mid} }\n`;
        kf += `  ${t2.toFixed(3)}% { ${e.on}  }\n`;

        let last = step;
        while (i < activeSteps.length - 1 && activeSteps[i + 1] === last + 1) {
            i++;
            last = activeSteps[i];
        }

        const holdEnd    = last * timing.stepInterval + timing.holdDuration;
        const flipOffEnd = holdEnd + timing.flipDuration;

        const p0 = (holdEnd                             / totalCycleDuration) * 100;
        const p1 = ((holdEnd + timing.flipDuration / 2) / totalCycleDuration) * 100;
        const p2 = (flipOffEnd                          / totalCycleDuration) * 100;

        kf += `  ${p0.toFixed(3)}% { ${e.on}  }\n`;
        kf += `  ${p1.toFixed(3)}% { ${e.mid} }\n`;
        kf += `  ${p2.toFixed(3)}% { ${e.off} }\n`;
    }

    const endPct = (totalScrollTime / totalCycleDuration) * 100;
    kf += `  ${endPct.toFixed(3)}% { ${e.off} }\n`;
    kf += `  100% { ${e.off} }\n}\n\n`;
    return kf;
}

const DOT_ANIM_BASE = 'transform-box: content-box; transform-origin: center center;';

export function generateScrollAnimation(pattern, displayWidth, colors, speed = 1.0, direction = 'normal', shape) {
    const timing = calculateTiming(speed);
    const scrollSteps = pattern.width + displayWidth;
    const totalScrollTime = scrollSteps * timing.stepInterval;
    const totalCycleDuration = totalScrollTime + timing.pauseTime;
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);

    let css = `.scroll-dot { animation-fill-mode: forwards; ${DOT_ANIM_BASE} }\n\n`;

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                const pos = direction === 'reverse'
                    ? pattern.width - 1 - (step - x)
                    : step - displayWidth + x + 1;
                if (pos >= 0 && pos < pattern.width && pattern.data[y]?.[pos] === 1) {
                    activeSteps.push(step);
                }
            }

            const name = `scroll-${x}-${y}`;
            css += buildKeyframes(name, activeSteps, timing, totalCycleDuration, totalScrollTime, e);
            css += `.scroll-dot[data-x="${x}"][data-y="${y}"] { animation: ${name} ${totalCycleDuration}s infinite ease-in-out; ${DOT_ANIM_BASE} }\n\n`;
        }
    }

    return css;
}

export function generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed = 1.0, direction = 'normal', shape) {
    const timing = calculateTiming(speed);
    const scrollSteps = pattern.height + displayHeight;
    const totalScrollTime = scrollSteps * timing.stepInterval;
    const totalCycleDuration = totalScrollTime + timing.pauseTime;
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);

    let css = `.waterfall-dot { animation-fill-mode: forwards; ${DOT_ANIM_BASE} }\n\n`;

    for (let y = 0; y < displayHeight; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                const pos = direction === 'reverse'
                    ? step - displayHeight + y + 1
                    : pattern.height - 1 - (step - y);
                if (pos >= 0 && pos < pattern.height && x < pattern.width && pattern.data[pos]?.[x] === 1) {
                    activeSteps.push(step);
                }
            }

            const name = `waterfall-${x}-${y}`;
            css += buildKeyframes(name, activeSteps, timing, totalCycleDuration, totalScrollTime, e);
            css += `.waterfall-dot[data-x="${x}"][data-y="${y}"] { animation: ${name} ${totalCycleDuration}s infinite ease-in-out; ${DOT_ANIM_BASE} }\n\n`;
        }
    }

    return css;
}

export function generateAnimationCSS(animationMode, options) {
    const { pattern, displayWidth, displayHeight, colors, speed, direction, shape } = options;

    switch (animationMode) {
        case 'scroll':
            return generateScrollAnimation(pattern, displayWidth, colors, speed, direction, shape);
        case 'waterfall':
            return generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed, direction, shape);
        case 'sequential':
            return generateSequentialAnimation(colors, speed, shape);
        case 'static':
        default:
            return generateStaticAnimation(colors, shape);
    }
}
