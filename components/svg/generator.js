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
 * 단일 dot 셀을 SVG 문자열로 반환 (배경·악센트·도형은 shape이 전담)
 */
function renderDotCell(x, y, { dotSize, totalDotSize, totalPadding, dotRadius, colors, className, style, dataAttrs, shape }) {
    const cellX = x * totalDotSize + totalPadding;
    const cellY = y * totalDotSize + totalPadding;
    const cx    = cellX + dotSize / 2;
    const cy    = cellY + dotSize / 2;

    const styleWithOrigin = `${style} transform-origin: ${cx}px ${cy}px;`;
    return shape.render({ cx, cy, cellX, cellY, dotRadius, dotSize, colors, className, style: styleWithOrigin, dataAttrs });
}

/**
 * dot 그리드 생성 — 모든 모드 공통
 * isOnFn(x, y): 해당 셀이 켜진 상태인지 반환
 */
function generateDots(cols, rows, options, dimensions) {
    const { dotSize, dotShape = DEFAULTS.dotShape, colors } = options;
    const { totalDotSize, totalPadding } = dimensions;
    const dotRadius   = dotSize / 2 - 1;
    const dotOnColors = parseColors(colors.dotOn);
    const shape       = shapeRegistry.getShape(dotShape);
    let dots = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const dotOnColor = dotOnColors.length > 1
                ? calculateGradientColor(dotOnColors, x, cols)
                : colors.dotOn;

            dots += renderDotCell(x, y, {
                dotSize, totalDotSize, totalPadding, dotRadius, colors,
                dotOnColor,
                className: 'anim-dot',
                style:     `color: ${dotOnColor};`,
                dataAttrs: ` data-x="${x}" data-y="${y}"`,
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

    const cols = (options.animationMode === 'scroll' || options.animationMode === 'waterfall') ? displayWidth  : pattern.width;
    const rows = options.animationMode === 'waterfall'                                          ? displayHeight : pattern.height;
    const dots = generateDots(cols, rows, options, dimensions);

    const shape = shapeRegistry.getShape(options.dotShape ?? DEFAULTS.dotShape);
    const animationCSS = generateAnimationCSS(options.animationMode, {
        pattern,
        displayWidth,
        displayHeight,
        colors:    options.colors,
        speed:     options.speed,
        direction: options.direction,
        shape,
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        svg { --dotOn: ${options.colors.dotOn}; --dotOff: ${options.colors.dotOff}; }
        .flip-dot-display { font-family: monospace; }
        ${animationCSS}
        ${shape.css ?? ''}
    </style>
    <rect width="100%" height="100%" fill="${options.colors.panelBackground}" rx="${DEFAULTS.borderRadius}" ry="${DEFAULTS.borderRadius}"/>
    ${dots}
</svg>`;
}
