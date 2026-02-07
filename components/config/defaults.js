/**
 * Default configuration values for FlipDot API
 * 모든 기본값과 상수를 한 곳에서 관리
 */

export const DEFAULTS = {
    // Display defaults
    text: 'HELLO',
    style: 'dark',
    dotSize: 20,
    spacing: 2,
    
    // Animation defaults
    animationMode: 'static',
    speed: 1.0,
    direction: 'normal',
    
    // Alignment defaults
    align: 'start',     // vertical: 'start', 'center', 'end'
    justify: 'start',   // horizontal: 'start', 'center', 'end'
    
    // Layout defaults
    padding: 4,
    borderWidth: 4,
    borderRadius: 4,
    
    // Space character width
    spaceWidth: 3,
    
    // Character spacing
    charSpacing: 1,
    
    // Line spacing (for multi-line text)
    lineSpacing: 1,
};

export const ANIMATION_CONFIG = {
    // Timing (base values, will be divided by speed)
    flipDuration: 0.3,      // flip 애니메이션 시간
    holdDuration: 0.5,      // 읽을 시간
    stepInterval: 0.3,      // 각 스텝 간격
    pauseTime: 2,           // 반복 전 대기 시간
    
    // Sequential mode
    sequentialCycleDuration: 5,
    
    // Static mode
    staticFlipDuration: 0.8,
    
    // Delay multiplier for diagonal animation
    diagonalDelayMultiplier: 0.08,
};

export const ANIMATION_MODES = ['static', 'sequential', 'scroll', 'waterfall'];

export const DIRECTIONS = ['normal', 'reverse'];

export const ALIGNMENTS = ['start', 'center', 'end'];

// URL 디코딩 맵
export const URL_DECODED_MAP = {
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
