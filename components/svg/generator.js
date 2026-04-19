/**
 * SVG Generator
 * FlipDot SVG 이미지 생성
 */

import { DEFAULTS } from '../config/defaults.js';
import { generateAnimationCSS } from '../animation/generator.js';
import { calculateGradientColor, parseColors } from '../utils/colors.js';
import shapeRegistry from '../shapes/index.js';

/**
 * SVG 크기 및 표시 영역 계산
 */
export function calculateSvgDimensions(pattern, options) {
    const {
        dotSize       = DEFAULTS.dotSize,
        spacing       = DEFAULTS.spacing,
        animationMode = DEFAULTS.animationMode,
        fixedCols,
        fixedRows,
    } = options;

    const totalDotSize = dotSize + spacing;
    const totalPadding = DEFAULTS.padding + DEFAULTS.borderWidth;

    let svgWidth, svgHeight, displayWidth, displayHeight;

    if (animationMode === 'scroll') {
        displayWidth  = fixedCols ? fixedCols : Math.max(pattern.width, 20);
        displayHeight = pattern.height;
        svgWidth  = displayWidth  * totalDotSize + totalPadding * 2;
        svgHeight = displayHeight * totalDotSize + totalPadding * 2;
    } else if (animationMode === 'waterfall') {
        displayHeight = fixedRows ? fixedRows : pattern.height;
        displayWidth  = pattern.width;
        svgWidth  = (fixedCols ?? pattern.width) * totalDotSize + totalPadding * 2;
        svgHeight = displayHeight * totalDotSize + totalPadding * 2;
    } else {
        displayWidth  = pattern.width;
        displayHeight = pattern.height;
        svgWidth  = pattern.width  * totalDotSize + totalPadding * 2;
        svgHeight = pattern.height * totalDotSize + totalPadding * 2;
    }

    return { svgWidth, svgHeight, displayWidth, displayHeight, totalDotSize, totalPadding };
}

/**
 * 단일 dot 셀(배경 + 악센트 + 도형)을 SVG 문자열로 반환
 */
function renderDotCell(x, y, { dotSize, totalDotSize, totalPadding, dotRadius, colors, dotColor, className, style, dataAttrs, shape }) {
    const cellX  = x * totalDotSize + totalPadding;
    const cellY  = y * totalDotSize + totalPadding;
    const cx     = cellX + dotSize / 2;
    const cy     = cellY + dotSize / 2;

    const bg      = `<rect x="${cellX}" y="${cellY}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
    const accent  = `<polygon points="${cellX},${cellY} ${cellX + 4},${cellY} ${cellX},${cellY + 4}" fill="${colors.shadow}"/>`;
    const dot     = shape.render({ cx, cy, dotRadius, dotSize, dotColor, className, style, dataAttrs });

    return bg + accent + dot;
}

/**
 * Static/Sequential 모드 dot 생성
 */
function generateStaticDots(pattern, options, dimensions) {
    const { dotSize, dotShape = DEFAULTS.dotShape, colors } = options;
    const { totalDotSize, totalPadding } = dimensions;
    const dotRadius    = dotSize / 2 - 1;
    const dotOnColors  = parseColors(colors.dotOn);
    const shape        = shapeRegistry.getShape(dotShape);
    let dots = '';

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const shouldFlip = pattern.data[y]?.[x] === 1;
            const dotColor   = shouldFlip && dotOnColors.length > 1
                ? calculateGradientColor(dotOnColors, x, pattern.width)
                : shouldFlip ? colors.dotOn : colors.dotOff;

            dots += renderDotCell(x, y, {
                dotSize, totalDotSize, totalPadding, dotRadius, colors,
                dotColor,
                className:  shouldFlip ? 'dot-on' : 'dot-off',
                style:      `animation-delay: ${(x + y) * 0.08}s;`,
                dataAttrs:  '',
                shape,
            });
        }
    }

    return dots;
}

/**
 * Scroll 모드 dot 생성 (고정 뷰포트, 텍스트 흐름은 CSS 애니메이션으로)
 */
function generateScrollDots(pattern, options, dimensions) {
    const { dotSize, dotShape = DEFAULTS.dotShape, colors } = options;
    const { displayWidth, totalDotSize, totalPadding } = dimensions;
    const dotRadius   = dotSize / 2 - 1;
    const dotOnColors = parseColors(colors.dotOn);
    const shape       = shapeRegistry.getShape(dotShape);
    let dots = '';

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const dotColor = dotOnColors.length > 1
                ? calculateGradientColor(dotOnColors, x, displayWidth)
                : colors.dotOn;

            dots += renderDotCell(x, y, {
                dotSize, totalDotSize, totalPadding, dotRadius, colors,
                dotColor: colors.dotOff,
                className:  'scroll-dot',
                style:      '',
                dataAttrs:  ` data-x="${x}" data-y="${y}" data-on-color="${dotColor}"`,
                shape,
            });
        }
    }

    return dots;
}

/**
 * Waterfall 모드 dot 생성
 */
function generateWaterfallDots(pattern, options, dimensions) {
    const { dotSize, dotShape = DEFAULTS.dotShape, colors } = options;
    const { displayWidth, displayHeight, totalDotSize, totalPadding } = dimensions;
    const dotRadius   = dotSize / 2 - 1;
    const dotOnColors = parseColors(colors.dotOn);
    const shape       = shapeRegistry.getShape(dotShape);
    let dots = '';

    for (let y = 0; y < displayHeight; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const dotColor = dotOnColors.length > 1
                ? calculateGradientColor(dotOnColors, x, displayWidth)
                : colors.dotOn;

            dots += renderDotCell(x, y, {
                dotSize, totalDotSize, totalPadding, dotRadius, colors,
                dotColor: colors.dotOff,
                className:  'waterfall-dot',
                style:      '',
                dataAttrs:  ` data-x="${x}" data-y="${y}" data-on-color="${dotColor}"`,
                shape,
            });
        }
    }

    return dots;
}

/**
 * 전체 SVG 문자열 생성
 */
export function generateFlipDotSVG(pattern, options) {
    const dimensions = calculateSvgDimensions(pattern, options);
    const { svgWidth, svgHeight, displayWidth, displayHeight } = dimensions;

    let dots;
    if (options.animationMode === 'scroll') {
        dots = generateScrollDots(pattern, options, dimensions);
    } else if (options.animationMode === 'waterfall') {
        dots = generateWaterfallDots(pattern, options, dimensions);
    } else {
        dots = generateStaticDots(pattern, options, dimensions);
    }

    const animationCSS = generateAnimationCSS(options.animationMode, {
        pattern,
        displayWidth,
        displayHeight,
        colors:     options.colors,
        speed:      options.speed,
        direction:  options.direction,
        flipEffect: options.flipEffect,
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        .flip-dot-display { font-family: monospace; }
        ${animationCSS}
    </style>
    <rect width="100%" height="100%" fill="${options.colors.panelBackground}" rx="${DEFAULTS.borderRadius}" ry="${DEFAULTS.borderRadius}"/>
    ${dots}
</svg>`;
}
