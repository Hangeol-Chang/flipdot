/**
 * Color Utilities
 * 색상 처리 관련 유틸리티 함수들
 */

/**
 * 색상에 # 기호 추가 (여러 색상 지원)
 * @param {string} colorString - 색상 문자열 (예: "ff0000" 또는 "ff0000,00ff00")
 * @returns {string|null} - # 추가된 색상 문자열
 */
export function addHashToColor(colorString) {
    if (!colorString) return null;
    
    return colorString.split(',').map(color => {
        const trimmed = color.trim();
        return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    }).join(',');
}

/**
 * 두 색상 사이의 선형 보간
 * @param {string} color1 - 시작 색상 (hex)
 * @param {string} color2 - 끝 색상 (hex)
 * @param {number} ratio - 보간 비율 (0~1)
 * @returns {string} - 보간된 색상 (hex)
 */
export function interpolateColor(color1, color2, ratio) {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    const newR = r.toString(16).padStart(2, '0');
    const newG = g.toString(16).padStart(2, '0');
    const newB = b.toString(16).padStart(2, '0');
    
    return `#${newR}${newG}${newB}`;
}

/**
 * 그라디언트 색상 계산 (여러 색상 지원)
 * @param {string[]} colors - 색상 배열
 * @param {number} x - 현재 위치
 * @param {number} totalWidth - 전체 너비
 * @returns {string} - 해당 위치의 색상
 */
export function calculateGradientColor(colors, x, totalWidth) {
    if (colors.length < 2) return colors[0];
    
    const position = x / (totalWidth - 1);
    const segmentSize = 1 / (colors.length - 1);
    const segmentIndex = Math.floor(position / segmentSize);
    const segmentPosition = (position % segmentSize) / segmentSize;
    
    if (segmentIndex >= colors.length - 1) {
        return colors[colors.length - 1];
    }
    
    const color1 = colors[segmentIndex];
    const color2 = colors[segmentIndex + 1];
    
    return interpolateColor(color1, color2, segmentPosition);
}

/**
 * 색상 밝기 조정
 * @param {string} hexColor - 원본 색상 (hex)
 * @param {number} percent - 밝기 변화 (-100 ~ 100)
 * @returns {string} - 조정된 색상 (hex)
 */
export function adjustBrightness(hexColor, percent) {
    const hex = hexColor.replace('#', '');
    
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    const newR = Math.round(adjustedR).toString(16).padStart(2, '0');
    const newG = Math.round(adjustedG).toString(16).padStart(2, '0');
    const newB = Math.round(adjustedB).toString(16).padStart(2, '0');
    
    return `#${newR}${newG}${newB}`;
}

/**
 * Hex 색상을 RGB 객체로 변환
 * @param {string} hexColor - hex 색상
 * @returns {Object} - { r, g, b }
 */
export function hexToRgb(hexColor) {
    const hex = hexColor.replace('#', '');
    return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
    };
}

/**
 * RGB를 Hex 색상으로 변환
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} - hex 색상
 */
export function rgbToHex(r, g, b) {
    const toHex = (c) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 색상 문자열에서 색상 배열 추출
 * @param {string} colorString - 콤마로 구분된 색상 문자열
 * @returns {string[]} - 색상 배열
 */
export function parseColors(colorString) {
    if (!colorString) return [];
    return colorString.split(',').map(color => color.trim());
}
