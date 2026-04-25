/**
 * Style Registry
 * 모든 스타일 테마를 통합 관리
 * 새로운 스타일 추가 시 이 파일만 수정하면 됨
 */

import themes from './themes.json' assert { type: 'json' };

const styles = themes;

const styleRegistry = {
    /**
     * 스타일 색상 가져오기
     * @param {string} styleName - 스타일 이름
     * @param {Object} customColors - 커스텀 색상 오버라이드
     * @returns {Object} - 색상 객체
     */
    getColors(styleName, customColors = {}) {
        const baseStyle = styles[styleName] || styles.dark;
        const colors = { ...baseStyle };
        
        // 커스텀 색상 덮어쓰기
        if (customColors.dotOn) {
            colors.dotOn = customColors.dotOn;
        }
        if (customColors.dotOff) {
            colors.dotOff = customColors.dotOff;
        }
        if (customColors.background) {
            colors.background = customColors.background;
            colors.panelBackground = this.adjustBrightness(customColors.background, -20);
            colors.border = this.adjustBrightness(customColors.background, 10);
            colors.shadow = this.adjustBrightness(customColors.background, -30);
        }
        
        return colors;
    },
    
    /**
     * 새로운 스타일 등록
     * @param {string} name - 스타일 이름
     * @param {Object} colorScheme - 색상 정의
     */
    register(name, colorScheme) {
        styles[name] = colorScheme;
    },
    
    /**
     * 등록된 모든 스타일 이름 반환
     */
    getAvailableStyles() {
        return Object.keys(styles);
    },
    
    /**
     * 스타일 존재 여부 확인
     */
    hasStyle(name) {
        return name in styles;
    },
    
    /**
     * 색상 밝기 조정
     */
    adjustBrightness(hexColor, percent) {
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
};

export default styleRegistry;

// 개별 스타일 export (하위 호환성)
export { styles };
