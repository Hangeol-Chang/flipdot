/**
 * SVG Generator
 * FlipDot SVG 이미지 생성
 */

import { DEFAULTS } from '../config/defaults.js';
import { generateAnimationCSS } from '../animation/generator.js';
import { calculateGradientColor, parseColors } from '../utils/colors.js';

/**
 * SVG 크기 계산
 */
export function calculateSvgDimensions(pattern, options) {
    const { 
        dotSize = DEFAULTS.dotSize, 
        spacing = DEFAULTS.spacing, 
        animationMode = DEFAULTS.animationMode,
        fixedCols,
        fixedRows
    } = options;
    
    const totalDotSize = dotSize + spacing;
    const totalPadding = DEFAULTS.padding + DEFAULTS.borderWidth;
    
    let svgWidth, svgHeight, displayWidth, displayHeight;
    
    if (animationMode === 'scroll') {
        if (fixedCols) {
            displayWidth = fixedCols;
        } else {
            displayWidth = Math.max(pattern.width, 20);
        }
        svgWidth = displayWidth * totalDotSize + totalPadding * 2;
        svgHeight = pattern.height * totalDotSize + totalPadding * 2;
        displayHeight = pattern.height;
    } else if (animationMode === 'waterfall') {
        if (fixedRows) {
            displayHeight = fixedRows;
        } else {
            displayHeight = pattern.height;
        }
        if (fixedCols) {
            displayWidth = fixedCols;
            svgWidth = displayWidth * totalDotSize + totalPadding * 2;
        } else {
            displayWidth = pattern.width;
            svgWidth = pattern.width * totalDotSize + totalPadding * 2;
        }
        svgHeight = displayHeight * totalDotSize + totalPadding * 2;
        displayWidth = pattern.width;
    } else {
        svgWidth = pattern.width * totalDotSize + totalPadding * 2;
        svgHeight = pattern.height * totalDotSize + totalPadding * 2;
        displayWidth = pattern.width;
        displayHeight = pattern.height;
    }
    
    return { svgWidth, svgHeight, displayWidth, displayHeight, totalDotSize, totalPadding };
}

/**
 * Dot 요소들 생성
 */
export function generateDots(pattern, options, dimensions) {
    const { 
        dotSize = DEFAULTS.dotSize,
        animationMode = DEFAULTS.animationMode,
        colors
    } = options;
    
    const { displayWidth, displayHeight, totalDotSize, totalPadding } = dimensions;
    const dotRadius = dotSize / 2 - 1;
    
    const dotOnColors = parseColors(colors.dotOn);
    let dots = '';
    
    if (animationMode === 'scroll') {
        dots = generateScrollDots(pattern, displayWidth, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors);
    } else if (animationMode === 'waterfall') {
        dots = generateWaterfallDots(pattern, displayWidth, displayHeight, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors);
    } else {
        dots = generateStaticDots(pattern, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors, animationMode);
    }
    
    return dots;
}

/**
 * Static/Sequential 모드용 Dot 생성
 */
function generateStaticDots(pattern, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors, animationMode) {
    let dots = '';
    
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
            const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
            const shouldFlip = pattern.data[y] && pattern.data[y][x] === 1;
            
            // 배경 사각형
            dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
            
            // 포인트 효과
            dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
            
            // Dot 색상 결정
            let dotColor;
            if (shouldFlip && dotOnColors.length > 1) {
                dotColor = calculateGradientColor(dotOnColors, x, pattern.width);
            } else {
                dotColor = shouldFlip ? colors.dotOn : colors.dotOff;
            }
            
            const animationDelay = (x + y) * 0.08;
            const animationClass = shouldFlip ? 'dot-on' : 'dot-off';
            
            dots += `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="${dotColor}" class="${animationClass}" 
                       style="animation-delay: ${animationDelay}s; "/>`;
        }
    }
    
    return dots;
}

/**
 * Scroll 모드용 Dot 생성
 */
function generateScrollDots(pattern, displayWidth, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors) {
    let dots = '';
    
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
            const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
            
            dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
            dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
            
            let dotColor = colors.dotOff;
            if (dotOnColors.length > 1) {
                dotColor = calculateGradientColor(dotOnColors, x, displayWidth);
            } else {
                dotColor = colors.dotOn;
            }
            
            dots += `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="${colors.dotOff}" 
                       class="scroll-dot" data-x="${x}" data-y="${y}" data-on-color="${dotColor}"/>`;
        }
    }
    
    return dots;
}

/**
 * Waterfall 모드용 Dot 생성
 */
function generateWaterfallDots(pattern, displayWidth, displayHeight, dotSize, dotRadius, totalDotSize, totalPadding, colors, dotOnColors) {
    let dots = '';
    
    for (let y = 0; y < displayHeight; y++) {
        for (let x = 0; x < displayWidth; x++) {
            const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
            const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
            
            dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
            dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
            
            let dotColor = colors.dotOff;
            if (dotOnColors.length > 1) {
                dotColor = calculateGradientColor(dotOnColors, x, displayWidth);
            } else {
                dotColor = colors.dotOn;
            }
            
            dots += `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="${colors.dotOff}" 
                       class="waterfall-dot" data-x="${x}" data-y="${y}" data-on-color="${dotColor}"/>`;
        }
    }
    
    return dots;
}

/**
 * 전체 SVG 생성
 */
export function generateFlipDotSVG(pattern, options) {
    const dimensions = calculateSvgDimensions(pattern, options);
    const { svgWidth, svgHeight, displayWidth, displayHeight } = dimensions;
    
    const dots = generateDots(pattern, options, dimensions);
    
    const animationCSS = generateAnimationCSS(options.animationMode, {
        pattern,
        displayWidth,
        displayHeight,
        colors: options.colors,
        speed: options.speed,
        direction: options.direction
    });
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        .flip-dot-display { 
            font-family: monospace; 
        }
        ${animationCSS}
    </style>
    <!-- 패딩과 테두리 영역 -->
    <rect width="100%" height="100%" fill="${options.colors.panelBackground}" rx="${DEFAULTS.borderRadius}" ry="${DEFAULTS.borderRadius}"/>
    ${dots}
</svg>`;
}
