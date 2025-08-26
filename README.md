# 💿 Flip Dot Display

<div align="center">
    <a href="https://flipdots.vercel.app/example"
        style="
            background-color : #222222;
            border : 3px solid black;
            color : white;
            width : 200px;
            border-radius : 40px;
            padding : 5px;
            display : flex;
            flex-direction : column;
        "
    >
        try 💿 flip dot 💿 
    </a>         
</div>

<div align="center">
    
![Flip Dot Display](https://flipdots.vercel.app/api/svg?text=GITHUB%20README&style=dark&dotSize=16&spacing=2&animationMode=scroll)

</div>

<hr>
<div align="center">
    <h4> flip-dot display로 깃허브를 꾸며보세요! </h4>
    이제 GitHub README.md에서 바로 사용할 수 있는 애니메이션 SVG API를 제공합니다!
    <br>
    <a href="https://flipdots.vercel.app/example">📖 API 사용법 보기</a>
</div>
<br>

![](./docs/description_image1.gif)

## 🚀 새로운 SVG API 기능

GitHub README.md에 직접 임베드할 수 있는 flip dot 이미지를 생성하는 API입니다.
실제 flip-dot 하드웨어의 동작을 재현한 3가지 애니메이션 모드를 지원합니다.

### 기본 사용법

```markdown
![Flip Dot Display](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark)
<!-- https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark -->
```

### 애니메이션 사용법

```markdown
![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO%20WORLD&animationMode=scroll&style=retro)
<!-- https://flipdots.vercel.app/api/svg?text=HELLO%20WORLD&animationMode=scroll&style=retro -->
```

## 📋 파라미터

### 기본 파라미터
- **`text`**: 표시할 텍스트 (영문자, 숫자, 공백 지원)
- **`style`**: 스타일 테마 (`light`, `retro`, `modern`, `dark`) - 기본값: `dark`
- **`dotSize`**: 각 dot의 크기 (10-40px, 기본값: 20)
- **`spacing`**: dot 간의 간격 (1-10px, 기본값: 2)

### 🎬 애니메이션 파라미터
- **`animationMode`**: 애니메이션 모드
  - `static`: 정적 표시 (기본값)
  - `sequential`: 순차적 flip 애니메이션
  - `scroll`: 스크롤 텍스트 애니메이션

### 🎨 커스텀 색상 파라미터
- **`dotOn`**: 켜진 dot의 색상 (hex 코드, # 생략 가능)
  - 단일 색상: `ff0000` (빨간색)
  - 그라디언트: `ff0000,00ff00,0000ff` (빨강→초록→파랑)
- **`dotOff`**: 꺼진 dot의 색상 (hex 코드, # 생략 가능)
- **`background`**: 배경 색상 (hex 코드, # 생략 가능)

## 🎭 스타일 예제

### 기본 스타일들

![Light Style](https://flipdots.vercel.app/api/svg?text=LIGHT&style=light&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=LIGHT&style=light&dotSize=20&spacing=2 -->

![Retro Style](https://flipdots.vercel.app/api/svg?text=RETRO&style=retro&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=RETRO&style=retro&dotSize=20&spacing=2 -->
![Modern Style](https://flipdots.vercel.app/api/svg?text=MODERN&style=modern&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=MODERN&style=modern&dotSize=20&spacing=2 -->

![Dark Style](https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=20&spacing=2 -->

### 커스텀 색상

![Custom Red](https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000&dotSize=20&spacing=2 -->

![Rainbow Gradient](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0000ff,8000ff&background=000000&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0000ff,8000ff&background=000000&dotSize=18&spacing=2 -->

![Purple Theme](https://flipdots.vercel.app/api/svg?text=PURPLE&dotOn=ff00ff&dotOff=330033&background=1a0a1a&dotSize=22&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=PURPLE&dotOn=ff00ff&dotOff=330033&background=1a0a1a&dotSize=22&spacing=2 -->

## 🎬 애니메이션 예제

### Sequential Animation (순차 애니메이션)
실제 flip-dot처럼 각 dot가 순차적으로 뒤집히는 애니메이션

![Sequential Animation](https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro&dotSize=18&spacing=2 -->

```markdown
![Sequential Animation](https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro)
```

### Scroll Animation (스크롤 애니메이션)
텍스트가 오른쪽에서 왼쪽으로 스크롤되는 애니메이션

![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern&dotSize=16&spacing=1)
<!-- https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern&dotSize=16&spacing=1 -->

```markdown
![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern)
```

## ✨ 특수 기능

### 띄어쓰기 및 특수문자
- **띄어쓰기**: 공백 또는 `_` (언더스코어) 사용
- **특수문자**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &` 지원
- **URL 인코딩**: 특수문자가 URL에서 자동으로 인코딩되어도 정상 처리

![Special Characters](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark&dotSize=18&spacing=2 -->

![URL Example](https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern&dotSize=16&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern&dotSize=16&spacing=2 -->

![Score Example](https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro&dotSize=18&spacing=2 -->

```markdown
![Special Characters](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark)
![URL Example](https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern)
![Score Example](https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro)
```

*참고: URL에서 `%`는 `%25`로 인코딩됩니다.*

## 💡 사용 사례

### 프로필 헤더
```markdown
![Profile Header](https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_PROFILE&animationMode=scroll&style=dark&dotSize=14&spacing=1)
<!-- https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_PROFILE&animationMode=scroll&style=dark&dotSize=14&spacing=1 -->
```

### 프로젝트 제목
```markdown
![Project Title](https://flipdots.vercel.app/api/svg?text=MY_AWESOME_PROJECT&animationMode=sequential&style=retro&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=MY_AWESOME_PROJECT&animationMode=sequential&style=retro&dotSize=18&spacing=2 -->
```

### 상태 표시
```markdown
![Build Status](https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=16&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=16&spacing=2 -->

![Version](https://flipdots.vercel.app/api/svg?text=V2.0.1&style=modern&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=V2.0.1&style=modern&dotSize=20&spacing=2 -->
```

### 특수문자를 활용한 브랜딩
```markdown
![Personal Brand](https://flipdots.vercel.app/api/svg?text=@DEVELOPER&animationMode=scroll&dotOn=ff6b35,f7931e,ffcc02&background=2c3e50&dotSize=22&spacing=3)
<!-- https://flipdots.vercel.app/api/svg?text=@DEVELOPER&animationMode=scroll&dotOn=ff6b35,f7931e,ffcc02&background=2c3e50&dotSize=22&spacing=3 -->

![Contact Info](https://flipdots.vercel.app/api/svg?text=EMAIL@DOMAIN.COM&style=modern&dotSize=16&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=EMAIL@DOMAIN.COM&style=modern&dotSize=16&spacing=2 -->

![Achievement](https://flipdots.vercel.app/api/svg?text=100%25_COMPLETE!&style=retro&dotOn=00ff00&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=100%25_COMPLETE!&style=retro&dotOn=00ff00&dotSize=18&spacing=2 -->
```

## 🛠️ 고급 사용법

### 그라디언트 효과
여러 색상을 콤마로 구분하여 무지개 효과를 만들 수 있습니다:

![Rainbow Effect](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000&dotSize=20&spacing=2 -->

```markdown
![Rainbow](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000)
```

### 브랜드 색상 매칭
```markdown
<!-- GitHub 스타일 -->
![GitHub](https://flipdots.vercel.app/api/svg?text=GITHUB&dotOn=ffffff&background=24292e&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=GITHUB&dotOn=ffffff&background=24292e&dotSize=18&spacing=2 -->

<!-- VS Code 스타일 -->
![VS Code](https://flipdots.vercel.app/api/svg?text=VSCODE&dotOn=007acc&background=1e1e1e&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=VSCODE&dotOn=007acc&background=1e1e1e&dotSize=18&spacing=2 -->

<!-- React 스타일 -->
![React](https://flipdots.vercel.app/api/svg?text=REACT&dotOn=61dafb&background=20232a&dotSize=18&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=REACT&dotOn=61dafb&background=20232a&dotSize=18&spacing=2 -->
```

### 크기 조정
다양한 용도에 맞는 크기 설정:

```markdown
<!-- 작은 배지 스타일 -->
![Small Badge](https://flipdots.vercel.app/api/svg?text=API&style=modern&dotSize=12&spacing=1)
<!-- https://flipdots.vercel.app/api/svg?text=API&style=modern&dotSize=12&spacing=1 -->

<!-- 중간 제목 스타일 -->
![Medium Title](https://flipdots.vercel.app/api/svg?text=MEDIUM&style=retro&dotSize=20&spacing=2)
<!-- https://flipdots.vercel.app/api/svg?text=MEDIUM&style=retro&dotSize=20&spacing=2 -->

<!-- 큰 헤더 스타일 -->
![Large Header](https://flipdots.vercel.app/api/svg?text=LARGE&style=dark&dotSize=30&spacing=3)
<!-- https://flipdots.vercel.app/api/svg?text=LARGE&style=dark&dotSize=30&spacing=3 -->
```

## 📖 애니메이션 특징

### Sequential Mode
- 각 dot이 대각선 순서로 순차적으로 애니메이션
- 실제 flip-dot 하드웨어의 동작 재현
- 0.08초 간격으로 부드러운 전환

### Scroll Mode
- 텍스트가 오른쪽에서 왼쪽으로 자연스럽게 스크롤
- 각 문자별 0.5초 읽기 시간 제공
- 연속된 문자에서 불필요한 깜빡임 제거
- 사라지는/나타나는 애니메이션 동시 실행

## 🎨 디자인 특징

- **4px 패딩**: 내용물 주변 여백
- **4px 둥근 모서리**: 현대적이고 부드러운 외관
- **자연스러운 배경**: 테두리 없는 통합된 디자인
- **실제 하드웨어 재현**: 3D transform과 perspective 효과

## 🔧 개발자 도구

### API 테스트
[https://flipdots.vercel.app/example](https://flipdots.vercel.app/example)에서 실시간으로 파라미터를 조정하고 결과를 확인할 수 있습니다.

### 지원 문자
- **영문 대문자**: A-Z
- **숫자**: 0-9  
- **공백**: 단어 구분용
- **특수 문자**: 제한적 지원

## 🚀 성능 최적화

- **캐싱**: `Cache-Control: public, max-age=31536000, immutable`
- **경량화**: 최적화된 SVG 생성
- **응답성**: 빠른 이미지 생성과 전송

## 📝 라이센스

이 프로젝트는 오픈소스이며, GitHub README에서 자유롭게 사용할 수 있습니다.

---

<div align="center">

**🎉 GitHub README를 flip-dot으로 멋지게 꾸며보세요! 🎉**

버그 리포트와 아이디어 제안, 풀 리퀘스트는 언제나 환영합니다.
<br>
📧 hgchang1@naver.com

</div>
