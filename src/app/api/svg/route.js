import { NextResponse } from 'next/server';
import { FD_TEXT_MAP_ENG } from '../../../../components/types/textmapEng.js';
import { FD_TEXT_MAP_NUM } from '../../../../components/types/textmapNum.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // URL 파라미터 파싱
    const text = searchParams.get('text') || 'HELLO';
    const style = searchParams.get('style') || 'basic';
    const dotSize = parseInt(searchParams.get('dotSize')) || 20;
    const spacing = parseInt(searchParams.get('spacing')) || 2;
    
    // 텍스트를 dot 패턴으로 변환
    const textPattern = textToPattern(text.toUpperCase());
    
    // SVG 생성
    const svg = generateFlipDotSVG(textPattern, {
        style,
        dotSize,
        spacing
    });
    
    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}

function textToPattern(text) {
    const patterns = [];
    let totalWidth = 0;
    let maxHeight = 0;
    
    // 각 문자의 패턴을 가져와서 연결
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let pattern = null;
        
        if (char === ' ') {
            // 공백 처리
            pattern = {
                size: [7, 3],
                data: Array(7).fill().map(() => Array(3).fill(0))
            };
        } else if (FD_TEXT_MAP_ENG[char]) {
            pattern = FD_TEXT_MAP_ENG[char];
        } else if (FD_TEXT_MAP_NUM[char]) {
            pattern = FD_TEXT_MAP_NUM[char];
        }
        
        if (pattern) {
            patterns.push(pattern);
            totalWidth += pattern.size[1];
            maxHeight = Math.max(maxHeight, pattern.size[0]);
            
            // 문자 간 간격 (마지막 문자가 아닌 경우)
            if (i < text.length - 1) {
                totalWidth += 1;
            }
        }
    }
    
    // 전체 패턴 배열 생성
    const fullPattern = Array(maxHeight).fill().map(() => Array(totalWidth).fill(0));
    
    let currentX = 0;
    for (const pattern of patterns) {
        for (let y = 0; y < pattern.size[0]; y++) {
            for (let x = 0; x < pattern.size[1]; x++) {
                if (y < pattern.data.length && x < pattern.data[y].length) {
                    fullPattern[y][currentX + x] = pattern.data[y][x];
                }
            }
        }
        currentX += pattern.size[1] + 1; // 문자 간 간격
    }
    
    return {
        width: totalWidth,
        height: maxHeight,
        data: fullPattern
    };
}

function generateFlipDotSVG(pattern, options) {
    const { dotSize, spacing, style } = options;
    const dotRadius = dotSize / 2 - 1;
    const totalDotSize = dotSize + spacing;
    
    const svgWidth = pattern.width * totalDotSize;
    const svgHeight = pattern.height * totalDotSize;
    
    // 스타일 설정
    const colors = getStyleColors(style);
    
    let dots = '';
    
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const centerX = x * totalDotSize + dotSize / 2;
            const centerY = y * totalDotSize + dotSize / 2;
            
            const shouldFlip = pattern.data[y] && pattern.data[y][x] === 1;
            
            // 배경 사각형 (dot holder) - 테두리 제거
            dots += `<rect x="${x * totalDotSize}" y="${y * totalDotSize}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
            
            // 왼쪽 위 삼각형만 남김 (포인트 효과)
            dots += `<polygon points="${x * totalDotSize},${y * totalDotSize} ${x * totalDotSize + 4},${y * totalDotSize} ${x * totalDotSize},${y * totalDotSize + 4}" fill="${colors.shadow}"/>`;
            
            // 중앙 원 (실제 flip dot)
            const dotColor = shouldFlip ? colors.dotOn : colors.dotOff;
            
            // 애니메이션 지연 계산 (대각선 순서)
            const animationDelay = (x + y) * 0.08; // 80ms씩 지연
            const animationClass = shouldFlip ? 'dot-on' : 'dot-off';
            
            // 각 dot를 개별적으로 배치하고 transform-origin을 명시적으로 설정
            dots += `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="${dotColor}" class="${animationClass}" 
                       style="animation-delay: ${animationDelay}s; "/>`;
        }
    }
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        .flip-dot-display { 
            font-family: monospace; 
        }
        
        /* 켜진 dot들만 애니메이션 적용 */
        .dot-on {
            fill: ${colors.dotOn};
            animation: sequentialFlip 0.5s ease-in-out forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
        
        /* 꺼진 dot들은 애니메이션 없이 정적 상태 */
        .dot-off {
            fill: ${colors.dotOff};
            opacity: 1;
            transform: none;
        }
        
        /* 순차적 뒤집기 애니메이션 */
        @keyframes sequentialFlip {
            0% {
                fill: ${colors.dotOff};
                transform:         
                    rotateZ(0deg)
                    rotateY(0deg);
                opacity: 1.0;
            }
            50% {
                fill: ${colors.dotOff};
                transform: 
                    rotateZ(45deg)
                    rotateY(90deg);
                opacity: 1;
            }
            51% {
                fill: ${colors.dotOn};
                transform: 
                    rotateZ(45deg)
                    rotateY(90deg);
                opacity: 1;
            }
            100% {
                fill: ${colors.dotOn};
                transform: 
                    rotateZ(90deg)
                    rotateY(180deg);
                opacity: 1;
            }
        }
    </style>
    <rect width="100%" height="100%" fill="${colors.panelBackground}"/>
    ${dots}
</svg>`;
}

function getStyleColors(style) {
    const styles = {
        light: {
            panelBackground: '#F5F5F5',
            background: '#E0E0E0',
            border: '#CCCCCC',
            shadow: '#BBBBBB',
            dotOn: '#000000',
            dotOff: '#D0D0D0'
        },
        retro: {
            panelBackground: '#2D4A22',
            background: '#3D5A32',
            border: '#4D6A42',
            shadow: '#1D3A12',
            dotOn: '#8FBC8F',
            dotOff: '#2D4A22'
        },
        modern: {
            panelBackground: '#1A1A2E',
            background: '#16213E',
            border: '#0F3460',
            shadow: '#0A1426',
            dotOn: '#E94560',
            dotOff: '#1A1A2E'
        },
        dark: {
            panelBackground: '#000000',
            background: '#0A0A0A',
            border: '#1A1A1A',
            shadow: '#000000',
            dotOn: '#FFFFFF',
            dotOff: '#0F0F0F'
        }
    };
    
    return styles[style] || styles.dark;
}
