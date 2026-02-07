/**
 * FlipDot SVG API Route
 * 리팩토링된 모듈 구조를 사용하여 깔끔하게 구성
 */

import { NextResponse } from 'next/server';

// Config
import { DEFAULTS, ANIMATION_MODES, DIRECTIONS, ALIGNMENTS } from '../../../../components/config/defaults.js';

// Styles
import styleRegistry from '../../../../components/styles/index.js';

// Pattern conversion
import { textToPattern, customDotsToPattern, cropOrPadPattern } from '../../../../components/pattern/converter.js';

// SVG generation
import { generateFlipDotSVG } from '../../../../components/svg/generator.js';

// Color utilities
import { addHashToColor } from '../../../../components/utils/colors.js';

/**
 * URL 파라미터 파싱 및 검증
 */
function parseRequestParams(searchParams) {
    return {
        // 텍스트
        text: searchParams.get('text') || DEFAULTS.text,
        customDots: searchParams.get('customdots'),
        
        // 스타일
        style: searchParams.get('style') || DEFAULTS.style,
        dotSize: parseInt(searchParams.get('dotSize')) || DEFAULTS.dotSize,
        spacing: parseInt(searchParams.get('spacing')) || DEFAULTS.spacing,
        
        // 애니메이션
        animationMode: validateEnum(searchParams.get('animationMode'), ANIMATION_MODES, DEFAULTS.animationMode),
        speed: parseFloat(searchParams.get('speed')) || DEFAULTS.speed,
        direction: validateEnum(searchParams.get('direction'), DIRECTIONS, DEFAULTS.direction),
        
        // 정렬
        align: validateEnum(searchParams.get('align'), ALIGNMENTS, DEFAULTS.align),
        justify: validateEnum(searchParams.get('justify'), ALIGNMENTS, DEFAULTS.justify),
        
        // 고정 크기
        fixedRows: searchParams.get('row') ? parseInt(searchParams.get('row')) : null,
        fixedCols: searchParams.get('column') ? parseInt(searchParams.get('column')) : null,
        
        // 커스텀 색상
        customColors: {
            dotOn: searchParams.get('dotOn') ? addHashToColor(searchParams.get('dotOn')) : null,
            dotOff: searchParams.get('dotOff') ? addHashToColor(searchParams.get('dotOff')) : null,
            background: searchParams.get('background') ? addHashToColor(searchParams.get('background')) : null
        }
    };
}

/**
 * 열거형 값 검증
 */
function validateEnum(value, allowedValues, defaultValue) {
    if (value && allowedValues.includes(value)) {
        return value;
    }
    return defaultValue;
}

/**
 * 패턴 크기 결정 (애니메이션 모드에 따라)
 */
function determineFinalPattern(textPattern, params) {
    const { animationMode, fixedRows, fixedCols, align, justify } = params;
    
    // scroll/waterfall 모드에서는 특정 조건에서 원본 패턴 유지
    if (animationMode === 'scroll' && fixedCols && !fixedRows) {
        return textPattern;
    }
    
    if (animationMode === 'waterfall' && fixedRows && !fixedCols) {
        return textPattern;
    }
    
    if (animationMode === 'waterfall') {
        return textPattern;
    }
    
    // 일반적인 경우: 고정 크기에 맞춰 자르거나 패딩
    if (fixedRows || fixedCols) {
        return cropOrPadPattern(textPattern, fixedRows, fixedCols, align, justify);
    }
    
    return textPattern;
}

/**
 * GET 요청 처리
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // 파라미터 파싱
    const params = parseRequestParams(searchParams);
    
    // 텍스트를 dot 패턴으로 변환
    let textPattern;
    if (params.customDots) {
        textPattern = customDotsToPattern(params.customDots);
    } else {
        textPattern = textToPattern(params.text, params.justify);
    }
    
    // 최종 패턴 결정
    const finalPattern = determineFinalPattern(textPattern, params);
    
    // 색상 가져오기
    const colors = styleRegistry.getColors(params.style, params.customColors);
    
    // SVG 생성
    const svg = generateFlipDotSVG(finalPattern, {
        style: params.style,
        dotSize: params.dotSize,
        spacing: params.spacing,
        animationMode: params.animationMode,
        speed: params.speed,
        direction: params.direction,
        fixedCols: params.fixedCols,
        fixedRows: params.fixedRows,
        align: params.align,
        justify: params.justify,
        colors
    });
    
    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
