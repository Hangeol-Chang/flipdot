/**
 * Style Registry
 * 모든 스타일 테마를 통합 관리
 * 새로운 스타일 추가 시 이 파일만 수정하면 됨
 */

// 스타일 정의
const styles = {
    dark: {
        panelBackground: '#000000',
        background: '#0A0A0A',
        border: '#1A1A1A',
        shadow: '#000000',
        dotOn: '#FFFFFF',
        dotOff: '#0F0F0F'
    },
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
    neon: {
        panelBackground: '#0D0D0D',
        background: '#1A1A1A',
        border: '#333333',
        shadow: '#000000',
        dotOn: '#00FF00',
        dotOff: '#1A1A1A'
    },
    ocean: {
        panelBackground: '#0A2647',
        background: '#144272',
        border: '#205295',
        shadow: '#051B32',
        dotOn: '#2C74B3',
        dotOff: '#0A2647'
    },
    sunset: {
        panelBackground: '#2D132C',
        background: '#4A1942',
        border: '#6B2D5B',
        shadow: '#1A0A19',
        dotOn: '#F97B22',
        dotOff: '#2D132C'
    }
};

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
