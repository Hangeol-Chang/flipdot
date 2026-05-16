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
    

};

export default styleRegistry;

// 개별 스타일 export (하위 호환성)
export { styles };
