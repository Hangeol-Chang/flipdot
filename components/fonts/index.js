/**
 * Font Registry
 * 모든 언어/폰트를 여기서 통합 관리
 * 새로운 언어 추가 시 이 파일만 수정하면 됨
 */

import { FD_TEXT_MAP_ENG, FD_TEXT_MAP_ENG_LOWER } from './latin/uppercase.js';
import { FD_TEXT_MAP_NUM } from './latin/numbers.js';
import { FD_TEXT_MAP_SPECIAL } from './latin/special.js';

// Font registry - 모든 문자 맵을 하나로 통합
const fontRegistry = {
    // 우선순위: 특수문자 > 숫자 > 대문자 > 소문자
    maps: [
        { name: 'special', map: FD_TEXT_MAP_SPECIAL, priority: 0 },
        { name: 'numbers', map: FD_TEXT_MAP_NUM, priority: 10 },
        { name: 'uppercase', map: FD_TEXT_MAP_ENG, priority: 20 },
        { name: 'lowercase', map: FD_TEXT_MAP_ENG_LOWER, priority: 30 },
    ],
    
    /**
     * 문자에 해당하는 패턴을 찾아 반환
     * @param {string} char - 단일 문자
     * @returns {Object|null} - { size: [height, width], data: number[][] } 또는 null
     */
    getPattern(char) {
        for (const { map } of this.maps) {
            if (map[char]) {
                return map[char];
            }
        }
        return null;
    },
    
    /**
     * 새로운 폰트 맵 등록
     * @param {string} name - 폰트 맵 이름
     * @param {Object} map - 문자 -> 패턴 매핑 객체
     * @param {number} priority - 우선순위 (낮을수록 먼저 검색)
     */
    register(name, map, priority = 100) {
        const insertIndex = this.maps.findIndex(m => m.priority > priority);
        const entry = { name, map, priority };
        
        if (insertIndex === -1) {
            this.maps.push(entry);
        } else {
            this.maps.splice(insertIndex, 0, entry);
        }
    },
    
    /**
     * 등록된 모든 폰트 맵 이름 반환
     */
    getRegisteredFonts() {
        return this.maps.map(m => m.name);
    }
};

export default fontRegistry;

// 개별 export도 유지 (하위 호환성)
export { FD_TEXT_MAP_ENG, FD_TEXT_MAP_ENG_LOWER } from './latin/uppercase.js';
export { FD_TEXT_MAP_NUM } from './latin/numbers.js';
export { FD_TEXT_MAP_SPECIAL } from './latin/special.js';
