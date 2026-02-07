/**
 * Pattern Converter
 * 텍스트/커스텀 패턴을 dot matrix로 변환
 */

import fontRegistry from '../fonts/index.js';
import { DEFAULTS, URL_DECODED_MAP } from '../config/defaults.js';

/**
 * URL 인코딩된 특수문자 디코딩
 */
export function decodeUrlChars(text) {
    let decodedText = text;
    for (const [encoded, decoded] of Object.entries(URL_DECODED_MAP)) {
        decodedText = decodedText.replace(new RegExp(encoded, 'gi'), decoded);
    }
    return decodedText;
}

/**
 * 공백 패턴 생성
 */
export function createSpacePattern(width = DEFAULTS.spaceWidth, height = 7) {
    return {
        size: [height, width],
        data: Array(height).fill().map(() => Array(width).fill(0))
    };
}

/**
 * 단일 라인 텍스트를 패턴으로 변환
 */
export function processSingleLine(text) {
    const patterns = [];
    let totalWidth = 0;
    let maxHeight = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let pattern = null;
        
        if (char === ' ' || char === '+') {
            // 공백 처리
            pattern = createSpacePattern();
        } else {
            // fontRegistry에서 패턴 검색
            pattern = fontRegistry.getPattern(char);
        }
        
        if (pattern) {
            patterns.push(pattern);
            totalWidth += pattern.size[1];
            maxHeight = Math.max(maxHeight, pattern.size[0]);
            
            // 문자 간 간격 (마지막 문자가 아닌 경우)
            if (i < text.length - 1) {
                totalWidth += DEFAULTS.charSpacing;
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
        currentX += pattern.size[1] + DEFAULTS.charSpacing;
    }
    
    return {
        width: totalWidth,
        height: maxHeight,
        data: fullPattern
    };
}

/**
 * 멀티라인 텍스트를 패턴으로 변환
 */
export function textToPattern(text, justify = 'start') {
    // URL 인코딩된 특수문자 디코딩
    const decodedText = decodeUrlChars(text);
    
    // %0A와 _을 구분자로 여러 줄 처리
    const lines = decodedText.split(/(%0A|_)/);
    const actualLines = lines.filter(line => line !== '%0A' && line !== '_' && line !== '');
    
    if (actualLines.length === 0) {
        return { width: 0, height: 0, data: [] };
    }
    
    // 각 줄을 처리하여 패턴 배열 생성
    const linePatterns = [];
    let maxWidth = 0;
    let totalHeight = 0;
    
    for (let i = 0; i < actualLines.length; i++) {
        const linePattern = processSingleLine(actualLines[i]);
        linePatterns.push(linePattern);
        maxWidth = Math.max(maxWidth, linePattern.width);
        totalHeight += linePattern.height;
        
        // 줄 간격 추가 (마지막 줄이 아닌 경우)
        if (i < actualLines.length - 1) {
            totalHeight += DEFAULTS.lineSpacing;
        }
    }
    
    // 전체 패턴 배열 생성
    const fullPattern = Array(totalHeight).fill().map(() => Array(maxWidth).fill(0));
    
    let currentY = 0;
    for (let lineIndex = 0; lineIndex < linePatterns.length; lineIndex++) {
        const linePattern = linePatterns[lineIndex];
        
        // justify 정렬을 위한 시작 X 위치 계산
        let startX = 0;
        if (linePattern.width < maxWidth) {
            switch (justify) {
                case 'center':
                    startX = Math.floor((maxWidth - linePattern.width) / 2);
                    break;
                case 'end':
                    startX = maxWidth - linePattern.width;
                    break;
                case 'start':
                default:
                    startX = 0;
                    break;
            }
        }
        
        // 각 줄의 패턴을 정렬된 위치에 복사
        for (let y = 0; y < linePattern.height; y++) {
            for (let x = 0; x < linePattern.width; x++) {
                if (y < linePattern.data.length && x < linePattern.data[y].length) {
                    fullPattern[currentY + y][startX + x] = linePattern.data[y][x];
                }
            }
        }
        
        currentY += linePattern.height;
        
        // 줄 간격 추가 (마지막 줄이 아닌 경우)
        if (lineIndex < linePatterns.length - 1) {
            currentY += DEFAULTS.lineSpacing;
        }
    }
    
    return {
        width: maxWidth,
        height: totalHeight,
        data: fullPattern
    };
}

/**
 * 커스텀 dot 패턴 문자열을 패턴 객체로 변환
 * 예: "10110,01001,10110" -> 3x5 패턴
 */
export function customDotsToPattern(customDots) {
    if (!customDots || typeof customDots !== 'string') {
        return { width: 1, height: 1, data: [[0]] };
    }
    
    const rows = customDots.split(',');
    
    if (rows.length === 0) {
        return { width: 1, height: 1, data: [[0]] };
    }
    
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
        }
        
        if (rowData.length > 0) {
            patternData.push(rowData);
            maxWidth = Math.max(maxWidth, rowData.length);
        }
    }
    
    // 모든 행의 길이를 maxWidth로 맞춤
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

/**
 * 패턴을 고정 크기로 자르거나 패딩 추가
 */
export function cropOrPadPattern(pattern, fixedRows, fixedCols, align = 'start', justify = 'start') {
    const targetRows = fixedRows || pattern.height;
    const targetCols = fixedCols || pattern.width;
    
    const newPattern = Array(targetRows).fill().map(() => Array(targetCols).fill(0));
    
    let startY = 0;
    let startX = 0;
    
    // 세로 정렬 (align)
    if (fixedRows && pattern.height < targetRows) {
        switch (align) {
            case 'center':
                startY = Math.floor((targetRows - pattern.height) / 2);
                break;
            case 'end':
                startY = targetRows - pattern.height;
                break;
            case 'start':
            default:
                startY = 0;
                break;
        }
    }
    
    // 가로 정렬 (justify)
    if (fixedCols && pattern.width < targetCols) {
        switch (justify) {
            case 'center':
                startX = Math.floor((targetCols - pattern.width) / 2);
                break;
            case 'end':
                startX = targetCols - pattern.width;
                break;
            case 'start':
            default:
                startX = 0;
                break;
        }
    }
    
    const copyRows = Math.min(targetRows - startY, pattern.height);
    const copyCols = Math.min(targetCols - startX, pattern.width);
    
    for (let y = 0; y < copyRows; y++) {
        for (let x = 0; x < copyCols; x++) {
            if (y < pattern.data.length && x < pattern.data[y].length) {
                newPattern[startY + y][startX + x] = pattern.data[y][x];
            }
        }
    }
    
    return {
        width: targetCols,
        height: targetRows,
        data: newPattern
    };
}
