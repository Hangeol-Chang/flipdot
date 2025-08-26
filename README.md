# Flip Dot

<div align="center">
    <a href="https://flipdots.vercel.app"
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
    
![Flip Dot Display](https://flipdots.vercel.app/api/svg?text=GITHUB%20README&style=dark&dotSize=16&spacing=2)

</div>

<hr>
<div align="center">
    <h4> flip-dot display로 깃허브를 꾸며보세요! </h4>
    이제 GitHub README.md에서 바로 사용할 수 있는 SVG API를 제공합니다!
    <br>
    <a href="https://flipdots.vercel.app/example">📖 API 사용법 보기</a>
</div>
<br>

![](./docs/description_image1.gif)

## 🚀 새로운 SVG API 기능

GitHub README.md에 직접 임베드할 수 있는 flip dot 이미지를 생성하는 API입니다.

### 사용법

```markdown
![Flip Dot Display](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark)
```

### 파라미터

#### 기본 파라미터
- `text`: 표시할 텍스트 (영문자, 숫자, 공백 지원)
- `style`: 스타일 테마 (`light`, `retro`, `modern`, `dark`) - 기본값: `dark`
- `dotSize`: 각 dot의 크기 (10-40px, 기본값: 20)
- `spacing`: dot 간의 간격 (1-10px, 기본값: 2)

#### 커스텀 색상 파라미터
- `dotOn`: 켜진 dot의 색상 (hex 코드, # 생략 가능)
  - 단일 색상: `ff0000` (빨간색)
  - 그라디언트: `ff0000,00ff00,0000ff` (빨강→초록→파랑)
- `dotOff`: 꺼진 dot의 색상 (hex 코드, # 생략 가능)
- `background`: 배경 색상 (hex 코드, # 생략 가능)
  - 설정 시 panelBackground, border, shadow 자동 생성

### 예제

#### 기본 스타일
```markdown
![Light Style](https://flipdots.vercel.app/api/svg?text=HELLO&style=light&dotSize=20)
![Retro Style](https://flipdots.vercel.app/api/svg?text=WORLD&style=retro&dotSize=24)
![Modern Style](https://flipdots.vercel.app/api/svg?text=123&style=modern&dotSize=18)
![Dark Style](https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=22)
```

#### 커스텀 색상
```markdown
![Custom Red](https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000)
![Rainbow Gradient](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0000ff,8000ff)
![Style + Custom](https://flipdots.vercel.app/api/svg?text=HYBRID&style=retro&dotOn=ffff00)
```

## Usage guide
> 더 밑으로 내리면 example이 준비되어 있습니다.

### appearence

### custom text

### clicking mode

### utc timestamp


## Examples

### appearence

### custom text 

### clicking mode

### hovering mode

### utc timestamp

----
### Special Thanks
- Capsule-Render


<hr>
버그리포트와 아이디어 제안, 풀리퀘스트는 언제나 환영입니다.
<br>
hgchang1@naver.com