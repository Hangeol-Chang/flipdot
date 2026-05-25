/**
 * Animation Generator
 * 애니메이션 CSS 생성 모듈
 * 효과 상태(off/mid/on)는 각 shape에서 가져온다.
 *
 * 모든 모드는 .anim-dot 단일 클래스 + [data-x][data-y] 속성 셀렉터로 통일.
 * static/sequential: 공유 @keyframes + 각 on-dot 별 셀렉터로 animation-delay 적용
 * scroll/waterfall:  per-dot @keyframes anim-X-Y 로 타이밍 인코딩
 */

import { ANIMATION_CONFIG } from '../config/defaults.js';

const DEFAULT_EFFECT = {
    off: 'fill: {dotOff}; transform: rotateY(0deg);',
    mid: 'fill: {dotOff}; transform: rotateY(90deg);',
    on:  'fill: {dotOn}; transform: rotateY(180deg);',
};

const DOT_BASE = 'transform-box: view-box;';

function resolveColors(effect, colors) {
    const resolve = (s) => s.replace(/\{dotOff\}/g, colors.dotOff).replace(/\{dotOn\}/g, colors.dotOn);

    if (effect.keyframes) {
        const entries = Object.entries(effect.keyframes);
        const keyframes = Object.fromEntries(entries.map(([k, v]) => [k, resolve(v)]));
        const styles = entries.map(([, v]) => resolve(v));
        return {
            keyframes,
            off: styles[0],
            mid: styles[Math.floor(styles.length / 2)],
            on:  styles[styles.length - 1],
        };
    }

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

export function generateStaticAnimation(pattern, colors, shape) {
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);
    const timing = ANIMATION_CONFIG;

    const keyframeBody = e.keyframes
        ? Object.entries(e.keyframes).map(([pct, s]) => `    ${pct} { ${s} }`).join('\n')
        : `    0%   { ${e.off} }\n    50%  { ${e.mid} }\n    100% { ${e.on}  }`;

    let css = `.anim-dot { ${DOT_BASE} ${e.off} }\n`;
    css += `@keyframes staticFlip {\n${keyframeBody}\n}\n\n`;

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            if (pattern.data[y]?.[x] !== 1) continue;
            const delay = (x + y) * timing.diagonalDelayMultiplier;
            css += `.anim-dot[data-x="${x}"][data-y="${y}"] { animation: staticFlip ${timing.staticFlipDuration}s ease-out forwards; animation-delay: ${delay}s; }\n`;
        }
    }

    return css;
}

export function generateSequentialAnimation(pattern, colors, speed = 1.0, direction = 'normal', shape) {
    const timing = calculateTiming(speed);
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);

    let css = `.anim-dot { ${DOT_BASE} ${e.off} }\n`;
    css += `@keyframes seqFlip {\n`;
    css += `    0%, 100% { ${e.off} }\n`;
    css += `    10%, 90% { ${e.mid} }\n`;
    css += `    20%, 80% { ${e.on}  }\n`;
    css += `}\n\n`;

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            if (pattern.data[y]?.[x] !== 1) continue;
            const d = direction === 'reverse'
                ? (pattern.width - 1 - x) + (pattern.height - 1 - y)
                : x + y;
            const delay = d * timing.diagonalDelayMultiplier;
            css += `.anim-dot[data-x="${x}"][data-y="${y}"] { animation: seqFlip ${timing.sequentialCycleDuration}s ease-in-out infinite; animation-delay: ${delay}s; }\n`;
        }
    }

    return css;
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

/**
 * scroll / waterfall 공통 구현
 * axis='horizontal' → scroll,  axis='vertical' → waterfall
 */
function generateScrollingAnimation(axis, pattern, displayWidth, displayHeight, colors, speed = 1.0, direction = 'normal', shape) {
    const timing = calculateTiming(speed);
    const e = resolveColors(shape?.effect ?? DEFAULT_EFFECT, colors);

    const isH         = axis === 'horizontal';
    const cols        = displayWidth;
    const rows        = isH ? pattern.height : displayHeight;
    const patternDim  = isH ? pattern.width  : pattern.height;
    const displayDim  = isH ? displayWidth   : displayHeight;
    const scrollSteps = patternDim + displayDim;
    const totalScrollTime    = scrollSteps * timing.stepInterval;
    const totalCycleDuration = totalScrollTime + timing.pauseTime;

    let css = `.anim-dot { animation-fill-mode: forwards; ${DOT_BASE} ${e.off} }\n\n`;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                let active;
                if (isH) {
                    const pos = direction === 'reverse'
                        ? pattern.width - 1 - (step - x)
                        : step - displayWidth + x + 1;
                    active = pos >= 0 && pos < pattern.width && pattern.data[y]?.[pos] === 1;
                } else {
                    const pos = direction === 'reverse'
                        ? step - displayHeight + y + 1
                        : pattern.height - 1 - (step - y);
                    active = pos >= 0 && pos < pattern.height && x < pattern.width && pattern.data[pos]?.[x] === 1;
                }
                if (active) activeSteps.push(step);
            }

            const name = `anim-${x}-${y}`;
            css += buildKeyframes(name, activeSteps, timing, totalCycleDuration, totalScrollTime, e);
            css += `.anim-dot[data-x="${x}"][data-y="${y}"] { animation: ${name} ${totalCycleDuration}s infinite ease-in-out; }\n\n`;
        }
    }

    return css;
}

export function generateScrollAnimation(pattern, displayWidth, displayHeight, colors, speed = 1.0, direction = 'normal', shape) {
    return generateScrollingAnimation('horizontal', pattern, displayWidth, displayHeight, colors, speed, direction, shape);
}

export function generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed = 1.0, direction = 'normal', shape) {
    return generateScrollingAnimation('vertical', pattern, displayWidth, displayHeight, colors, speed, direction, shape);
}

export function generateAnimationCSS(animationMode, options) {
    const { pattern, displayWidth, displayHeight, colors, speed, direction, shape } = options;

    switch (animationMode) {
        case 'scroll':
            return generateScrollAnimation(pattern, displayWidth, displayHeight, colors, speed, direction, shape);
        case 'waterfall':
            return generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, speed, direction, shape);
        case 'sequential':
            return generateSequentialAnimation(pattern, colors, speed, direction, shape);
        case 'static':
        default:
            return generateStaticAnimation(pattern, colors, shape);
    }
}
