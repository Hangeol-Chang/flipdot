# 🛠️ FlipDot Development Guide

개발자를 위한 FlipDot 프로젝트 가이드입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [핵심 모듈 설명](#핵심-모듈-설명)
- [API 흐름](#api-흐름)
- [확장 가이드](#확장-가이드)
- [기여 방법](#기여-방법)

---

## 프로젝트 개요

FlipDot은 GitHub README.md에 임베드할 수 있는 **애니메이션 SVG 플립닷 디스플레이**를 생성하는 Next.js 기반 API입니다.

### 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14.2.5 | 프레임워크 |
| React | 18.3.1 | UI 라이브러리 |
| styled-components | 6.1.11 | 스타일링 |
| Recoil | 0.7.7 | 상태 관리 |

---

## 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/Hangeol-Chang/flipdot.git
cd flipdot
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 4. 빌드 및 배포

```bash
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # 코드 린트
```

---

## 프로젝트 구조

```
flipdot/
├── components/           # 핵심 모듈 (모듈화된 비즈니스 로직)
│   ├── animation/        # 애니메이션 CSS 생성
│   ├── config/           # 설정값 및 상수
│   ├── fonts/            # 폰트 패턴 정의
│   ├── pattern/          # 텍스트→패턴 변환
│   ├── styles/           # 스타일 테마
│   ├── svg/              # SVG 생성
│   ├── utils/            # 유틸리티 함수
│   ├── flipdot/          # 프론트엔드 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── model/            # 데이터 모델
│   └── types/            # 레거시 타입 정의
│
├── src/app/              # Next.js App Router
│   ├── api/              # API 라우트
│   │   ├── svg/          # 메인 SVG API
│   │   └── test/         # 테스트 API
│   ├── example/          # 예제 페이지
│   └── v2/               # v2 페이지
│
├── public/               # 정적 파일
├── docs/                 # 문서
└── readme/               # 다국어 README
```

---

## 핵심 모듈 설명

### 📁 `components/config/`
**설정값 및 상수 관리**

```javascript
// defaults.js
export const DEFAULTS = {
    text: 'HELLO',
    style: 'dark',
    dotSize: 20,
    spacing: 2,
    animationMode: 'static',
    speed: 1.0,
    // ...
};

export const ANIMATION_CONFIG = { ... };
export const ANIMATION_MODES = ['static', 'sequential', 'scroll', 'waterfall'];
export const DIRECTIONS = ['normal', 'reverse'];
export const ALIGNMENTS = ['start', 'center', 'end'];
```

### 📁 `components/fonts/`
**폰트 레지스트리 시스템**

문자 → 도트 패턴 매핑을 관리합니다.

```
fonts/
├── index.js              # 폰트 레지스트리 (통합 관리)
└── latin/
    ├── uppercase.js      # A-Z 대문자
    ├── numbers.js        # 0-9 숫자
    └── special.js        # 특수문자
```

**폰트 패턴 구조:**
```javascript
{
    'A': {
        size: [7, 5],  // [높이, 너비]
        data: [
            [0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1],
            // ... 7x5 매트릭스
        ]
    }
}
```

**새 문자 추가 방법:**
```javascript
// fonts/latin/special.js에 추가
export const FD_TEXT_MAP_SPECIAL = {
    // 기존 문자들...
    '★': {
        size: [7, 5],
        data: [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            // ...
        ]
    }
};
```

### 📁 `components/pattern/`
**텍스트 → 도트 패턴 변환**

```javascript
// converter.js 주요 함수
textToPattern(text, justify)       // 멀티라인 텍스트 → 패턴
processSingleLine(text)            // 단일 라인 처리
customDotsToPattern(customDots)    // 커스텀 도트 문자열 → 패턴
cropOrPadPattern(pattern, ...)     // 패턴 크기 조정
```

### 📁 `components/styles/`
**스타일 테마 레지스트리**

```javascript
// index.js
const styles = {
    dark: {
        panelBackground: '#000000',
        background: '#0A0A0A',
        border: '#1A1A1A',
        shadow: '#000000',
        dotOn: '#FFFFFF',
        dotOff: '#0F0F0F'
    },
    light: { ... },
    retro: { ... },
    modern: { ... },
    neon: { ... },
    ocean: { ... },
    sunset: { ... }
};

// 사용법
styleRegistry.getColors('dark', customColors);
styleRegistry.register('mytheme', { ... });  // 새 테마 등록
styleRegistry.getAvailableStyles();          // 사용 가능 테마 목록
```

### 📁 `components/animation/`
**애니메이션 CSS 생성**

```javascript
// generator.js
generateStaticAnimation(colors)              // 정적 플립 애니메이션
generateSequentialAnimation(colors, speed)   // 순차 반복 애니메이션
generateScrollAnimation(pattern, ...)        // 좌우 스크롤 애니메이션
generateWaterfallAnimation(pattern, ...)     // 상하 워터폴 애니메이션
generateAnimationCSS(mode, options)          // 통합 생성 함수
```

### 📁 `components/svg/`
**SVG 이미지 생성**

```javascript
// generator.js
calculateSvgDimensions(pattern, options)  // SVG 크기 계산
generateDots(pattern, options, dimensions) // 도트 요소 생성
generateFlipDotSVG(pattern, options)       // 최종 SVG 생성 (메인 함수)
```

### 📁 `components/utils/`
**유틸리티 함수**

```javascript
// colors.js
addHashToColor(colorString)                    // 색상에 # 추가
interpolateColor(color1, color2, ratio)        // 색상 보간
calculateGradientColor(colors, x, totalWidth)  // 그라디언트 계산
adjustBrightness(hexColor, percent)            // 밝기 조정
hexToRgb(hexColor)                             // Hex → RGB
rgbToHex(r, g, b)                              // RGB → Hex
parseColors(colorString)                       // 색상 문자열 파싱
```

---

## API 흐름

### `/api/svg` 요청 처리 흐름

```
1. HTTP GET 요청
   ↓
2. parseRequestParams()     # URL 파라미터 파싱
   ↓
3. textToPattern()          # 텍스트 → 도트 패턴 변환
   또는 customDotsToPattern()
   ↓
4. determineFinalPattern()  # 애니메이션 모드에 따른 패턴 조정
   ↓
5. styleRegistry.getColors() # 스타일 색상 조회
   ↓
6. generateFlipDotSVG()     # SVG 생성
   ├── calculateSvgDimensions()
   ├── generateDots()
   └── generateAnimationCSS()
   ↓
7. NextResponse (SVG)       # 응답 반환
```

### 코드 예시 (route.js)

```javascript
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    
    // 1. 파라미터 파싱
    const params = parseRequestParams(searchParams);
    
    // 2. 패턴 생성
    let textPattern = params.customDots 
        ? customDotsToPattern(params.customDots)
        : textToPattern(params.text, params.justify);
    
    // 3. 최종 패턴 결정
    const finalPattern = determineFinalPattern(textPattern, params);
    
    // 4. 색상 가져오기
    const colors = styleRegistry.getColors(params.style, params.customColors);
    
    // 5. SVG 생성 및 응답
    const svg = generateFlipDotSVG(finalPattern, { ...params, colors });
    
    return new NextResponse(svg, {
        headers: { 'Content-Type': 'image/svg+xml' }
    });
}
```

---

## 확장 가이드

### 🎨 새로운 스타일 테마 추가

```javascript
// components/styles/index.js

const styles = {
    // 기존 스타일들...
    
    // 새 스타일 추가
    cyberpunk: {
        panelBackground: '#0a0a0a',
        background: '#1a0a2e',
        border: '#ff00ff',
        shadow: '#000000',
        dotOn: '#00ffff',
        dotOff: '#1a0a2e'
    }
};
```

### 🔤 새로운 언어/폰트 추가

1. `components/fonts/` 아래에 새 폴더 생성 (예: `korean/`)
2. 문자 패턴 정의

```javascript
// components/fonts/korean/hangul.js
export const FD_TEXT_MAP_KOREAN = {
    '가': {
        size: [7, 7],
        data: [
            // 7x7 매트릭스
        ]
    },
    // ...
};
```

3. `components/fonts/index.js`에 등록

```javascript
import { FD_TEXT_MAP_KOREAN } from './korean/hangul.js';

const fontRegistry = {
    maps: [
        { name: 'special', map: FD_TEXT_MAP_SPECIAL },
        { name: 'numbers', map: FD_TEXT_MAP_NUM },
        { name: 'uppercase', map: FD_TEXT_MAP_ENG },
        { name: 'lowercase', map: FD_TEXT_MAP_ENG_LOWER },
        { name: 'korean', map: FD_TEXT_MAP_KOREAN },  // 추가
    ],
    // ...
};
```

### 🎬 새로운 애니메이션 모드 추가

1. `components/config/defaults.js`에 모드 추가

```javascript
export const ANIMATION_MODES = ['static', 'sequential', 'scroll', 'waterfall', 'blink'];
```

2. `components/animation/generator.js`에 생성 함수 추가

```javascript
export function generateBlinkAnimation(colors, speed = 1.0) {
    const timing = calculateTiming(speed);
    return `
        .dot-on {
            animation: blink ${timing.flipDuration}s infinite;
        }
        @keyframes blink {
            0%, 100% { fill: ${colors.dotOn}; }
            50% { fill: ${colors.dotOff}; }
        }
    `;
}

// generateAnimationCSS에 case 추가
export function generateAnimationCSS(animationMode, options) {
    switch (animationMode) {
        case 'blink':
            return generateBlinkAnimation(options.colors, options.speed);
        // ...
    }
}
```

3. `components/svg/generator.js`에 도트 생성 로직 추가 (필요시)

---

## 기여 방법

### 1. 이슈 확인
기여 전 [Issues](https://github.com/Hangeol-Chang/flipdot/issues)에서 관련 이슈를 확인하세요.

### 2. 브랜치 생성
```bash
git checkout -b feature/your-feature-name
```

### 3. 개발 및 테스트
```bash
npm run dev
# http://localhost:3000/api/svg?text=TEST 로 테스트
```

### 4. 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드/설정 변경
```

### 5. Pull Request
- 변경사항을 명확히 설명
- 스크린샷 첨부 (UI 변경 시)

---

## 📚 참고 자료

- [Next.js App Router 문서](https://nextjs.org/docs/app)
- [SVG 애니메이션 가이드](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [플립닷 디스플레이 원리](https://en.wikipedia.org/wiki/Flip-disc_display)

---

## 📞 문의

- **GitHub Issues**: 버그 리포트, 기능 요청
- **Pull Requests**: 코드 기여

Happy Coding! 💿
