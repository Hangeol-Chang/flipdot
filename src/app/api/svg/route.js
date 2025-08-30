import { NextResponse } from 'next/server';
import { FD_TEXT_MAP_ENG, FD_TEXT_MAP_ENG_LOWER } from '../../../../components/types/textmapEng.js';
import { FD_TEXT_MAP_NUM } from '../../../../components/types/textmapNum.js';
import { FD_TEXT_MAP_SPECIAL } from '../../../../components/types/textmapSpecial.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // URL 파라미터 파싱
    const text = searchParams.get('text') || 'HELLO';
    const style = searchParams.get('style') || 'dark';
    const dotSize = parseInt(searchParams.get('dotSize')) || 20;
    const spacing = parseInt(searchParams.get('spacing')) || 2;
    const animationMode = searchParams.get('animationMode') || 'static';
    const speed = parseFloat(searchParams.get('speed')) || 1.0; // 기본값 1.0 (보통 속도)
    const customDots = searchParams.get('customdots'); // 커스텀 dot 패턴
    const direction = searchParams.get('direction') || 'normal'; // 'normal', 'reverse'
    
    // 고정 매트릭스 크기 파라미터
    const fixedRows = searchParams.get('row') ? parseInt(searchParams.get('row')) : null;
    const fixedCols = searchParams.get('column') ? parseInt(searchParams.get('column')) : null;
    
    // 커스텀 색상 파라미터 (# 기호 자동 추가)
    const customColors = {
        dotOn: searchParams.get('dotOn') ? addHashToColor(searchParams.get('dotOn')) : null,
        dotOff: searchParams.get('dotOff') ? addHashToColor(searchParams.get('dotOff')) : null,
        background: searchParams.get('background') ? addHashToColor(searchParams.get('background')) : null
    };
    
    // 텍스트를 dot 패턴으로 변환 (대소문자 구분) 또는 커스텀 패턴 사용
    let textPattern;
    if (customDots) {
        textPattern = customDotsToPattern(customDots);
    } else {
        textPattern = textToPattern(text);
    }
    
    // 고정 크기가 지정된 경우 패턴을 자르거나 패딩
    // scroll/waterfall 모드에서는 각각 column/row 고정 시 텍스트를 자르지 않고 화면 크기만 제한
    let finalPattern;
    if (animationMode === 'scroll' && fixedCols && !fixedRows) {
        // scroll 모드에서 column만 고정된 경우: 원본 텍스트 유지, 화면 너비만 제한
        finalPattern = textPattern;
    } else if (animationMode === 'waterfall' && fixedRows && !fixedCols) {
        // waterfall 모드에서 row만 고정된 경우: 원본 텍스트 유지, 화면 높이만 제한
        finalPattern = textPattern;
    } else if (animationMode === 'waterfall') {
        // waterfall 모드에서는 항상 원본 텍스트 유지 (위에서 아래로 스크롤하기 위해)
        finalPattern = textPattern;
    } else {
        // 일반적인 경우: 고정 크기에 맞춰 자르거나 패딩
        finalPattern = fixedRows || fixedCols ? 
            cropOrPadPattern(textPattern, fixedRows, fixedCols) : 
            textPattern;
    }
    
    // SVG 생성
    const svg = generateFlipDotSVG(finalPattern, {
        style,
        dotSize,
        spacing,
        customColors,
        animationMode,
        text,
        speed,
        fixedCols,
        fixedRows,
        direction
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
    
    // URL 디코딩된 특수문자 처리를 위한 매핑
    const urlDecodedMap = {
        '%21': '!',
        '%3F': '?',
        '%40': '@',
        '%23': '#',
        '%24': '$',
        '%25': '%',
        '%26': '&',
        '%2A': '*',
        '%2B': '+',
        '%2D': '-',
        '%3D': '=',
        '%2F': '/',
        '%5C': '\\',
        '%28': '(',
        '%29': ')',
        '%5B': '[',
        '%5D': ']',
        '%3A': ':',
        '%3B': ';',
        '%2C': ',',
        '%2E': '.'
    };
    
    // URL 인코딩된 특수문자 디코딩
    let decodedText = text;
    for (const [encoded, decoded] of Object.entries(urlDecodedMap)) {
        decodedText = decodedText.replace(new RegExp(encoded, 'gi'), decoded);
    }
    
    // 각 문자의 패턴을 가져와서 연결
    for (let i = 0; i < decodedText.length; i++) {
        const char = decodedText[i];
        let pattern = null;
        
        if (char === ' ' || char === '_') {
            // 공백 및 언더스코어(_)를 띄어쓰기로 처리 (3 column)
            pattern = {
                size: [7, 3],
                data: Array(7).fill().map(() => Array(3).fill(0))
            };
        } else if (FD_TEXT_MAP_ENG[char]) {
            // 대문자 처리
            pattern = FD_TEXT_MAP_ENG[char];
        } else if (FD_TEXT_MAP_ENG_LOWER[char]) {
            // 소문자 처리
            pattern = FD_TEXT_MAP_ENG_LOWER[char];
        } else if (FD_TEXT_MAP_NUM[char]) {
            // 숫자 처리
            pattern = FD_TEXT_MAP_NUM[char];
        } else if (FD_TEXT_MAP_SPECIAL[char]) {
            // 특수문자 처리
            pattern = FD_TEXT_MAP_SPECIAL[char];
        }
        
        if (pattern) {
            patterns.push(pattern);
            totalWidth += pattern.size[1];
            maxHeight = Math.max(maxHeight, pattern.size[0]);
            
            // 문자 간 간격 (마지막 문자가 아닌 경우)
            if (i < decodedText.length - 1) {
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

function customDotsToPattern(customDots) {
    // customdots 파라미터를 파싱하여 dot 패턴 생성
    // 예: "10110,01001,10110" -> 3x5 패턴
    
    if (!customDots || typeof customDots !== 'string') {
        // 기본 패턴 반환 (빈 패턴)
        return {
            width: 1,
            height: 1,
            data: [[0]]
        };
    }
    
    // 콤마로 구분된 행들을 분리
    const rows = customDots.split(',');
    
    if (rows.length === 0) {
        return {
            width: 1,
            height: 1,
            data: [[0]]
        };
    }
    
    // 각 행을 0/1 배열로 변환
    const patternData = [];
    let maxWidth = 0;
    
    for (const row of rows) {
        const rowData = [];
        for (const char of row.trim()) {
            if (char === '1') {
                rowData.push(1);
            } else if (char === '0') {
                rowData.push(0);
            }
            // 다른 문자는 무시
        }
        
        if (rowData.length > 0) {
            patternData.push(rowData);
            maxWidth = Math.max(maxWidth, rowData.length);
        }
    }
    
    // 모든 행의 길이를 maxWidth로 맞춤 (짧은 행은 0으로 패딩)
    for (const row of patternData) {
        while (row.length < maxWidth) {
            row.push(0);
        }
    }
    
    return {
        width: maxWidth,
        height: patternData.length,
        data: patternData
    };
}

function cropOrPadPattern(pattern, fixedRows, fixedCols) {
    // 기본값 설정: 지정되지 않은 경우 원본 크기 사용
    const targetRows = fixedRows || pattern.height;
    const targetCols = fixedCols || pattern.width;
    
    // 새로운 패턴 배열 생성 (모든 값을 0으로 초기화)
    const newPattern = Array(targetRows).fill().map(() => Array(targetCols).fill(0));
    
    // 원본 패턴을 새 패턴에 복사 (범위를 벗어나는 부분은 자동으로 잘림)
    for (let y = 0; y < Math.min(targetRows, pattern.height); y++) {
        for (let x = 0; x < Math.min(targetCols, pattern.width); x++) {
            if (y < pattern.data.length && x < pattern.data[y].length) {
                newPattern[y][x] = pattern.data[y][x];
            }
        }
    }
    
    return {
        width: targetCols,
        height: targetRows,
        data: newPattern
    };
}

function generateFlipDotSVG(pattern, options) {
    const { dotSize, spacing, style, customColors, animationMode = 'static', text = '', speed = 1.0, fixedCols = null, fixedRows = null, direction = 'normal' } = options;
    const dotRadius = dotSize / 2 - 1;
    const totalDotSize = dotSize + spacing;
    
    // scroll/waterfall 모드일 때는 더 넓은/높은 캔버스 사용
    let svgWidth, svgHeight, displayWidth, displayHeight;
    const padding = 4; // 패딩 크기
    const borderWidth = 4; // 테두리 크기
    const borderRadius = 4; // 모서리 둥글기
    const totalPadding = padding + borderWidth; // 총 여백
    
    if (animationMode === 'scroll') {
        // fixedCols가 지정된 경우 해당 값 사용, 아니면 기본 로직
        if (fixedCols) {
            displayWidth = fixedCols;
        } else {
            displayWidth = Math.max(pattern.width, 20); // 텍스트 길이나 최소 20개 중 더 큰 값
        }
        svgWidth = displayWidth * totalDotSize + totalPadding * 2;
        svgHeight = pattern.height * totalDotSize + totalPadding * 2;
        displayHeight = pattern.height;
    } else if (animationMode === 'waterfall') {
        // fixedRows가 지정된 경우 해당 값 사용, 아니면 텍스트 높이 사용
        if (fixedRows) {
            displayHeight = fixedRows;
        } else {
            displayHeight = pattern.height; // 텍스트 높이 그대로 사용
        }
        // fixedCols가 지정된 경우 해당 값 사용, 아니면 텍스트 너비 사용
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
    
    // 스타일 설정 (기본 스타일 먼저 적용, 그 다음 커스텀 색상으로 덮어쓰기)
    const colors = getStyleColors(style, customColors);
    
    let dots = '';
    
    // dotOn이 여러 색상인 경우 처리
    const dotOnColors = colors.dotOn.split(',').map(color => color.trim());
    
    if (animationMode === 'scroll') {
        // scroll 모드: 고정된 화면 크기에 스크롤링 텍스트
        for (let y = 0; y < pattern.height; y++) {
            for (let x = 0; x < displayWidth; x++) {
                const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
                const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
                
                // 배경 사각형 (dot holder)
                dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
                
                // 왼쪽 위 삼각형 (포인트 효과)
                dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
                
                // 중앙 원 (실제 flip dot) - scroll 애니메이션 적용
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
    } else if (animationMode === 'waterfall') {
        // waterfall 모드: 고정된 화면 크기에 위에서 아래로 스크롤링 텍스트
        for (let y = 0; y < displayHeight; y++) {
            for (let x = 0; x < displayWidth; x++) {
                const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
                const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
                
                // 배경 사각형 (dot holder)
                dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
                
                // 왼쪽 위 삼각형 (포인트 효과)
                dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
                
                // 중앙 원 (실제 flip dot) - waterfall 애니메이션 적용
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
    } else {
        // 기존 static/sequential 모드
        for (let y = 0; y < pattern.height; y++) {
            for (let x = 0; x < pattern.width; x++) {
                const centerX = x * totalDotSize + dotSize / 2 + totalPadding;
                const centerY = y * totalDotSize + dotSize / 2 + totalPadding;
                
                const shouldFlip = pattern.data[y] && pattern.data[y][x] === 1;
                
                // 배경 사각형 (dot holder) - 테두리 제거
                dots += `<rect x="${x * totalDotSize + totalPadding}" y="${y * totalDotSize + totalPadding}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
                
                // 왼쪽 위 삼각형만 남김 (포인트 효과)
                dots += `<polygon points="${x * totalDotSize + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + 4 + totalPadding},${y * totalDotSize + totalPadding} ${x * totalDotSize + totalPadding},${y * totalDotSize + 4 + totalPadding}" fill="${colors.shadow}"/>`;
                
                // 중앙 원 (실제 flip dot)
                let dotColor;
                if (shouldFlip && dotOnColors.length > 1) {
                    // 전체 panel에서 해당 위치의 그라디언트 색상 계산
                    dotColor = calculateGradientColor(dotOnColors, x, pattern.width);
                } else {
                    dotColor = shouldFlip ? colors.dotOn : colors.dotOff;
                }
                
                // 애니메이션 지연 계산 (대각선 순서)
                const animationDelay = (x + y) * 0.08; // 80ms씩 지연
                const animationClass = shouldFlip ? 'dot-on' : 'dot-off';
                
                // 각 dot를 개별적으로 배치하고 transform-origin을 명시적으로 설정
                dots += `<circle cx="${centerX}" cy="${centerY}" r="${dotRadius}" fill="${dotColor}" class="${animationClass}" 
                           style="animation-delay: ${animationDelay}s; "/>`;
            }
        }
    }
    
    const scrollAnimationCSS = animationMode === 'scroll' ? generateScrollAnimation(pattern, displayWidth, colors, text, speed, direction) : '';
    const waterfallAnimationCSS = animationMode === 'waterfall' ? generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, text, speed, fixedRows, direction) : '';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        .flip-dot-display { 
            font-family: monospace; 
        }
        
        ${animationMode === 'scroll' ? `
        /* 스크롤 모드 애니메이션 */
        .scroll-dot {
            animation-fill-mode: forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
        
        ${scrollAnimationCSS}
        ` : animationMode === 'waterfall' ? `
        /* 워터폴 모드 애니메이션 */
        .waterfall-dot {
            animation-fill-mode: forwards;
            transform-box: content-box;
            transform-origin: center center;
        }
        
        ${waterfallAnimationCSS}
        ` : animationMode === 'sequential' ? `
        /* Sequential 모드: 순차적 반복 애니메이션 */
        .dot-on {
            animation: sequentialFlip ${5 / speed}s ease-in-out infinite;
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
        ` : `
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
        `}
    </style>
    <!-- 패딩과 테두리 영역 (패널 배경과 동일한 색상) -->
    <rect width="100%" height="100%" fill="${colors.panelBackground}" rx="${borderRadius}" ry="${borderRadius}"/>
    ${dots}
</svg>`;
}

function getStyleColors(style, customColors = {}) {
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
    
    // 기본 스타일 적용
    let colors = { ...styles[style] || styles.dark };
    
    // 커스텀 색상 덮어쓰기
    if (customColors.dotOn) {
        colors.dotOn = customColors.dotOn;
    }
    if (customColors.dotOff) {
        colors.dotOff = customColors.dotOff;
    }
    if (customColors.background) {
        // background를 기준으로 다른 색상들 자동 생성
        colors.background = customColors.background;
        colors.panelBackground = adjustBrightness(customColors.background, -20);
        colors.border = adjustBrightness(customColors.background, 10);
        colors.shadow = adjustBrightness(customColors.background, -30);
    }
    
    return colors;
}

// 스크롤 애니메이션 CSS 생성
function generateScrollAnimation(pattern, displayWidth, colors, text, speed = 1.0, direction = 'normal') {
    const totalTextWidth = pattern.width;
    const scrollSteps = totalTextWidth + displayWidth; // 전체 스크롤 단계
    const flipDuration = 0.3 / speed; // flip 애니메이션 시간 (speed 적용)
    const holdDuration = 0.5 / speed; // 읽을 시간 (speed 적용)
    const stepInterval = 0.3 / speed; // 각 스텝 간격 (speed 적용)
    const totalScrollTime = scrollSteps * stepInterval;
    const pauseTime = 2 / speed; // 반복 전 대기 시간 (speed 적용)
    const totalCycleDuration = totalScrollTime + pauseTime;
    
    let animationCSS = '';
    
    // 각 display 위치의 dot별로 애니메이션 생성
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < displayWidth; x++) {
            let keyframes = `@keyframes scroll-${x}-${y} {\n  0% { fill: ${colors.dotOff}; }\n`;
            
            // 이 dot가 켜져야 하는 모든 스텝을 찾기
            let activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                let textPosition;
                if (direction === 'reverse') {
                    // 왼쪽에서 오른쪽으로 스크롤 (교환됨)
                    textPosition = totalTextWidth - 1 - (step - x);
                } else {
                    // 오른쪽에서 왼쪽으로 스크롤 (교환됨, 기존 normal)
                    textPosition = step - displayWidth + x + 1;
                }
                if (textPosition >= 0 && textPosition < totalTextWidth) {
                    const shouldFlip = pattern.data[y] && pattern.data[y][textPosition] === 1;
                    if (shouldFlip) {
                        activeSteps.push(step);
                    }
                }
            }
            
            // 각 활성 스텝에 대해 애니메이션 생성
            for (let i = 0; i < activeSteps.length; i++) {
                const step = activeSteps[i];
                const stepStartTime = step * stepInterval;
                const stepStartPercent = (stepStartTime / totalCycleDuration) * 100;
                
                // 다음 스텝이 연속인지 확인
                const isNextConsecutive = i < activeSteps.length - 1 && activeSteps[i + 1] === step + 1;
                const isPrevConsecutive = i > 0 && activeSteps[i - 1] === step - 1;
                
                if (isPrevConsecutive) {
                    // 이전 스텝과 연속이면 계속 켜진 상태 유지
                    continue;
                }
                
                // 켜지는 애니메이션 시작
                const flipOnStart = stepStartPercent;
                const flipOnMid = stepStartPercent + (flipDuration / 2 / totalCycleDuration) * 100;
                const flipOnEnd = stepStartPercent + (flipDuration / totalCycleDuration) * 100;
                
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
                
                // 연속 구간의 끝을 찾기
                let lastConsecutiveStep = step;
                while (i < activeSteps.length - 1 && activeSteps[i + 1] === lastConsecutiveStep + 1) {
                    i++;
                    lastConsecutiveStep = activeSteps[i];
                }
                
                // 꺼지는 애니메이션 (연속 구간의 마지막에서)
                const lastStepTime = lastConsecutiveStep * stepInterval;
                const holdEndTime = lastStepTime + holdDuration;
                const flipOffEndTime = holdEndTime + flipDuration;
                
                const holdEndPercent = (holdEndTime / totalCycleDuration) * 100;
                const flipOffMidPercent = ((holdEndTime + flipDuration / 2) / totalCycleDuration) * 100;
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
            
            // dot에 애니메이션 적용
            animationCSS += `.scroll-dot[data-x="${x}"][data-y="${y}"] {\n`;
            animationCSS += `  animation: scroll-${x}-${y} ${totalCycleDuration}s infinite ease-in-out;\n`;
            animationCSS += `  transform-box: content-box;\n`;
            animationCSS += `  transform-origin: center center;\n`;
            animationCSS += `}\n\n`;
        }
    }
    
    return animationCSS;
}

// 워터폴 애니메이션 CSS 생성 (위에서 아래로 스크롤)
function generateWaterfallAnimation(pattern, displayHeight, displayWidth, colors, text, speed = 1.0, fixedRows = null, direction = 'normal') {
    const totalTextHeight = pattern.height;
    const scrollSteps = totalTextHeight + displayHeight; // 전체 스크롤 단계
    const flipDuration = 0.3 / speed; // flip 애니메이션 시간 (speed 적용)
    const holdDuration = 0.5 / speed; // 읽을 시간 (speed 적용)
    const stepInterval = 0.3 / speed; // 각 스텝 간격 (speed 적용)
    const totalScrollTime = scrollSteps * stepInterval;
    const pauseTime = 2 / speed; // 반복 전 대기 시간 (speed 적용)
    const totalCycleDuration = totalScrollTime + pauseTime;
    
    let animationCSS = '';
    
    // 각 display 위치의 dot별로 애니메이션 생성
    for (let y = 0; y < displayHeight; y++) {
        for (let x = 0; x < displayWidth; x++) {
            let keyframes = `@keyframes waterfall-${x}-${y} {\n  0% { fill: ${colors.dotOff}; }\n`;
            
            // 이 dot가 켜져야 하는 모든 스텝을 찾기
            let activeSteps = [];
            for (let step = 0; step < scrollSteps; step++) {
                let textPosition;
                if (direction === 'reverse') {
                    // 위에서 아래로 스크롤 (교환됨)
                    textPosition = step - displayHeight + y + 1;
                } else {
                    // 아래에서 위로 스크롤 (교환됨, 기존 normal)
                    textPosition = totalTextHeight - 1 - (step - y);
                }
                if (textPosition >= 0 && textPosition < totalTextHeight && x < pattern.width) {
                    const shouldFlip = pattern.data[textPosition] && pattern.data[textPosition][x] === 1;
                    if (shouldFlip) {
                        activeSteps.push(step);
                    }
                }
            }
            
            // 각 활성 스텝에 대해 애니메이션 생성
            for (let i = 0; i < activeSteps.length; i++) {
                const step = activeSteps[i];
                const stepStartTime = step * stepInterval;
                const stepStartPercent = (stepStartTime / totalCycleDuration) * 100;
                
                // 다음 스텝이 연속인지 확인
                const isNextConsecutive = i < activeSteps.length - 1 && activeSteps[i + 1] === step + 1;
                const isPrevConsecutive = i > 0 && activeSteps[i - 1] === step - 1;
                
                if (isPrevConsecutive) {
                    // 이전 스텝과 연속이면 계속 켜진 상태 유지
                    continue;
                }
                
                // 켜지는 애니메이션 시작
                const flipOnStart = stepStartPercent;
                const flipOnMid = stepStartPercent + (flipDuration / 2 / totalCycleDuration) * 100;
                const flipOnEnd = stepStartPercent + (flipDuration / totalCycleDuration) * 100;
                
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
                
                // 연속 구간의 끝을 찾기
                let lastConsecutiveStep = step;
                while (i < activeSteps.length - 1 && activeSteps[i + 1] === lastConsecutiveStep + 1) {
                    i++;
                    lastConsecutiveStep = activeSteps[i];
                }
                
                // 꺼지는 애니메이션 (연속 구간의 마지막에서)
                const lastStepTime = lastConsecutiveStep * stepInterval;
                const holdEndTime = lastStepTime + holdDuration;
                const flipOffEndTime = holdEndTime + flipDuration;
                
                const holdEndPercent = (holdEndTime / totalCycleDuration) * 100;
                const flipOffMidPercent = ((holdEndTime + flipDuration / 2) / totalCycleDuration) * 100;
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
            
            // dot에 애니메이션 적용
            animationCSS += `.waterfall-dot[data-x="${x}"][data-y="${y}"] {\n`;
            animationCSS += `  animation: waterfall-${x}-${y} ${totalCycleDuration}s infinite ease-in-out;\n`;
            animationCSS += `  transform-box: content-box;\n`;
            animationCSS += `  transform-origin: center center;\n`;
            animationCSS += `}\n\n`;
        }
    }
    
    return animationCSS;
}

// 전체 panel에서 해당 위치의 그라디언트 색상 계산
function calculateGradientColor(colors, x, totalWidth) {
    if (colors.length < 2) return colors[0];
    
    // 현재 위치의 비율 계산 (0 ~ 1)
    const position = x / (totalWidth - 1);
    
    // 색상 구간 찾기
    const segmentSize = 1 / (colors.length - 1);
    const segmentIndex = Math.floor(position / segmentSize);
    const segmentPosition = (position % segmentSize) / segmentSize;
    
    // 경계값 처리
    if (segmentIndex >= colors.length - 1) {
        return colors[colors.length - 1];
    }
    
    // 두 색상 사이의 보간
    const color1 = colors[segmentIndex];
    const color2 = colors[segmentIndex + 1];
    
    return interpolateColor(color1, color2, segmentPosition);
}

// 두 색상 사이의 선형 보간
function interpolateColor(color1, color2, ratio) {
    // # 제거
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    // RGB로 변환
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    // 보간 계산
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    // 다시 hex로 변환
    const newR = r.toString(16).padStart(2, '0');
    const newG = g.toString(16).padStart(2, '0');
    const newB = b.toString(16).padStart(2, '0');
    
    return `#${newR}${newG}${newB}`;
}

// 색상 밝기 조정 함수
function adjustBrightness(hexColor, percent) {
    // # 제거
    const hex = hexColor.replace('#', '');
    
    // RGB로 변환
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // 밝기 조정
    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // 다시 hex로 변환
    const newR = Math.round(adjustedR).toString(16).padStart(2, '0');
    const newG = Math.round(adjustedG).toString(16).padStart(2, '0');
    const newB = Math.round(adjustedB).toString(16).padStart(2, '0');
    
    return `#${newR}${newG}${newB}`;
}

// 색상에 # 기호 추가 함수
function addHashToColor(colorString) {
    if (!colorString) return null;
    
    // 콤마로 구분된 여러 색상 처리
    return colorString.split(',').map(color => {
        const trimmed = color.trim();
        return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    }).join(',');
}
