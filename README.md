# 💿 Flip Dot Display

## 🌐 Other Languages
- [🇰🇷 한국어 (Korean)](./readme/README_kr.md)
- [🇯🇵 日本語 (Japanese)](./readme/README_jp.md)
- [🇨🇳 中文 (Chinese)](./readme/README_cn.md)

## 📑 Table of Contents
- [🚀 Key Features](#key-features)
- [🔷 Dot Shapes](#dot-shapes)
- [📋 Parameters](#parameters)
- [🎭 Style Examples](#style-examples)
- [🎬 Animation Examples](#animation-examples)
- [📝 Multi-line Text](#multi-line-text)
- [📐 Size Limits and Alignment](#size-limits-and-alignment)
- [🎨 Custom Dot Patterns](#custom-dot-patterns)
- [✨ Special Features](#special-features)
- [💡 Practical Use Cases](#practical-use-cases)
- [🛠️ Advanced Usage](#advanced-usage)
- [💡 Pro Tips](#pro-tips)
- [🎯 Performance Optimization](#performance-optimization)
- [📖 Technical Specifications](#technical-specifications)
- [🔧 Developer Information](#developer-information)
- [🤝 Contributing](#contributing)
- [📄 License](#license)

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
            margin: 10px;
        "
    >
        try 💿 flip dot 💿 
    </a>         
</div>

<div align="center">
	<a href="https://github.com/Hangeol-Chang/flipdot"><img src="https://flipdots.vercel.app/api/svg?column=32&customdots=00100000100%2C00010001000%2C00111111100%2C01101110110%2C11111111111%2C10111111101%2C10100000101%2C00011011000%2C&style=dark&dotSize=20&spacing=2&animationMode=scroll&dotOn=28f028&dotOff=f0f0f0&background=ffffff" /></a>
</div>

<div align="center">
    
![Flip Dot Display](https://flipdots.vercel.app/api/svg?text=FLIPDOT_README&style=dark&dotSize=16&spacing=2&animationMode=scroll&justify=center&v=1)

</div>

<hr>
<div align="center">
    <h4> Decorate your GitHub with flip-dot display! </h4>
    Now providing animated SVG API that can be used directly in GitHub README.md!
    <br>
    <a href="https://flipdots.vercel.app/example">📖 View API Documentation</a>
</div>
<br>

<!-- ![](./docs/description_image1.gif) -->
<div align="center" style="maxWidth:400px">
 <img src="./docs/examplePage.png" />
</div>

## 🚀 Key Features

An API that generates flip dot images that can be embedded directly into GitHub README.md.
Reproduces the operation of actual flip-dot hardware.

✨ **New Features**
- 🔤 **Multi-line Text**: Line breaks with `_`
- 🔷 **Dot Shapes**: 4 unique visual styles — `circle`, `rect`, `rounded`, `diamond` — each with its own flip animation
- 🎬 **4 Animation Modes**: static, sequential, scroll, waterfall
- 🎨 **Custom Patterns**: Design your own dot patterns (binary or hex)
- 🌈 **Gradients**: Rainbow effects with multiple colors
- 📐 **Alignment Options**: Vertical/horizontal alignment options

### Basic Usage
![BASIC](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```markdown
![Flip Dot](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```

### Multi-line Text
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential&v=2)
```markdown
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential)
```

### Animation
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL+TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```markdown
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL+TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```

## 📋 Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| **`text`** | Text to display (multi-line: separated by `_`, spaces: use `+`) | `HELLO` | `HELLO_WORLD` |
| **`customdots`** | Custom dot pattern — binary (`10110`) or hex (`16`) format | - | `10110,01001` or `16,09,16` |
| **`style`** | Style theme | `dark` | `dark`, `light`, `retro`, `modern`, `neon`, `ocean`, `sunset` |
| **`dotSize`** | Dot size (px) | `20` | `10-40` |
| **`spacing`** | Dot spacing (px) | `2` | `1-10` |
| **`dotShape`** | Dot shape | `circle` | `circle`, `rect`, `rounded`, `diamond` |
| **`row`** | Row count limit | - | `10` |
| **`column`** | Column count limit | - | `20` |
| **`align`** | Vertical alignment | `start` | `start`, `center`, `end` |
| **`justify`** | Horizontal alignment | `start` | `start`, `center`, `end` |
| **`animationMode`** | Animation mode | `static` | `sequential`, `scroll`, `waterfall` |
| **`speed`** | Animation speed | `1.0` | `0.5-3.0` |
| **`direction`** | Animation direction | `normal` | `normal`, `reverse` |
| **`dotOn`** | Color for on dots (gradient: comma-separated) | - | `ff0000` or `ff0000,00ff00,0000ff` |
| **`dotOff`** | Color for off dots | - | `333333` |
| **`background`** | Background color | - | `000000` |

## 🎭 Style Examples

### Basic Styles

![Light Style](https://flipdots.vercel.app/api/svg?text=LIGHT&style=light&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Dark Style](https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Retro Style](https://flipdots.vercel.app/api/svg?text=RETRO&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Modern Style](https://flipdots.vercel.app/api/svg?text=MODERN&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Neon Style](https://flipdots.vercel.app/api/svg?text=NEON&style=neon&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Ocean Style](https://flipdots.vercel.app/api/svg?text=OCEAN&style=ocean&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Sunset Style](https://flipdots.vercel.app/api/svg?text=SUNSET&style=sunset&dotSize=20&spacing=2&animationMode=sequential&v=1)

### Custom Colors

![Custom Red](https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000&dotSize=20&spacing=2&v=1)
![Gradient](https://flipdots.vercel.app/api/svg?text=GRADIENT&dotOn=6F04D9,1B0273,0597F2,05C7F2&background=CCCCCC&dotOff=DDDDDD&dotSize=18&spacing=2&v=1)
![Purple Theme](https://flipdots.vercel.app/api/svg?text=PURPLE&dotOn=ff00ff&dotOff=330033&background=1a0a1a&dotSize=22&spacing=2&v=1)

## 🎬 Animation Examples

### Sequential Animation
Each dot flips sequentially like real flip-dot hardware

![Sequential Animation](https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro&dotSize=18&spacing=2&v=2)

### Scroll Animation
Text scrolls from right to left

![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern&dotSize=16&spacing=1&v=1)

### Waterfall Animation
Text falls from top to bottom

![Waterfall Animation](https://flipdots.vercel.app/api/svg?text=FALLING&animationMode=waterfall&style=dark&dotSize=18&spacing=2&v=1)

## 📝 Multi-line Text

Use `_` as a delimiter to create multi-line text. A 1-dot spacing is automatically added between each line.

### Basic Multi-line
![Multi-line Basic](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=dark&dotSize=18&spacing=2&v=2)
```markdown
https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=dark&dotSize=18&spacing=2
```

### 3-line Text
![Three Lines](https://flipdots.vercel.app/api/svg?text=LINE1_LINE2_LINE3&style=modern&dotSize=16&spacing=2&v=1)
```
https://flipdots.vercel.app/api/svg?text=LINE1_LINE2_LINE3&style=modern&dotSize=16&spacing=2
```
```markdown
https://flipdots.vercel.app/api/svg?text=LINE1_LINE2_LINE3&style=modern&dotSize=16&spacing=2
```

### Multi-line + Animation
![Multi-line Animation](https://flipdots.vercel.app/api/svg?text=GITHUB_PROFILE_VISITOR&animationMode=sequential&style=retro&dotSize=16&spacing=2&v=1)
```
https://flipdots.vercel.app/api/svg?text=GITHUB_PROFILE_VISITOR&animationMode=sequential&style=retro&dotSize=16&spacing=2
```
```markdown
https://flipdots.vercel.app/api/svg?text=GITHUB_PROFILE_VISITOR&animationMode=sequential&style=retro&dotSize=16&spacing=2
```

## 📐 Size Limits and Alignment

### Fixed Size Matrix
You can create a fixed-size display by limiting rows and columns.

![Fixed Size](https://flipdots.vercel.app/api/svg?text=FIXED&row=10&column=25&style=dark&dotSize=16&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?text=FIXED&row=10&column=25&style=dark&dotSize=16&spacing=2
```

### Center Alignment
![Center Align](https://flipdots.vercel.app/api/svg?text=CENTER&row=12&column=45&align=center&justify=center&style=modern&dotSize=18&spacing=2&animationMode=sequential&v=1)
```markdown
https://flipdots.vercel.app/api/svg?text=CENTER&row=12&column=30&align=center&justify=center&style=modern&dotSize=18&spacing=2
```

### Multi-line Alignment
![Multi-line Align](https://flipdots.vercel.app/api/svg?text=ALIGN_BOTTOM_RIGHT&row=25&column=45&align=end&justify=end&style=retro&dotSize=16&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?text=ALIGN_BOTTOM_RIGHT&row=25&column=45&align=end&justify=end&style=retro&dotSize=16&spacing=2
```

## 🎨 Custom Dot Patterns

You can define dot patterns directly instead of text. `1` means on dot, `0` means off dot, and rows are separated by commas.

**Two formats are supported:**

| Format | Example | Description |
|--------|---------|-------------|
| Binary | `00100000100` | Each character is one dot (0=off, 1=on) |
| Hex | `104` | Each hex digit encodes 4 dots — ~3× shorter URL |

> **Format auto-detection**: any character outside `0` and `1` (e.g. `2–9`, `a–f`) triggers hex mode. Binary format is fully backward-compatible.

**Hex encoding example** (star pattern, 11 columns → 3 hex digits per row):
```
Binary: 00100000100,00010001000,00111111100,01101110110,11111111111,10111111101,10100000101,00011011000
Hex:       104,     088,         0fc,         1b6,         7ff,         77d,         505,         0d8
```

### Heart Shape
![Heart Pattern](https://flipdots.vercel.app/api/svg?customdots=0110110,1111111,1111111,0111110,0011100,0001000&style=dark&dotOn=ff69b4&dotSize=20&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=36,7f,7f,3e,1c,08&style=dark&dotOn=ff69b4&dotSize=20&spacing=2
```

### Check Mark
![Check Pattern](https://flipdots.vercel.app/api/svg?customdots=0000001,0000011,0000110,1001100,1111000,0110000&style=modern&dotOn=00ff00&dotSize=18&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=01,03,06,4c,78,30&style=modern&dotOn=00ff00&dotSize=18&spacing=2
```

### Star Shape
![Star Pattern](https://flipdots.vercel.app/api/svg?customdots=00100000100,00010001000,00111111100,01101110110,11111111111,10111111101,10100000101,00011011000&style=dark&dotOn=ffff00&dotSize=16&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=104,088,0fc,1b6,7ff,77d,505,0d8&style=dark&dotOn=ffff00&dotSize=16&spacing=2
```

### Custom Pattern + Animation
![Custom Animation](https://flipdots.vercel.app/api/svg?customdots=10110,01001,10110&animationMode=scroll&style=retro&dotSize=22&spacing=3&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=16,09,16&animationMode=sequential&style=retro&dotSize=22&spacing=3
```

## 🔷 Dot Shapes

Choose from 4 visual styles with the `dotShape` parameter. Each shape has its own unique flip animation.

| Value | Description |
|-------|-------------|
| `circle` | Round dot (default) — rotational flip |
| `rect` | Square dot — diagonal-axis flip that reveals the hardware feel |
| `rounded` | Rounded square — same flip as `rect`, softer edges |
| `diamond` | Diamond-shaped dot — rotational flip |

### Circle (default)
![Circle Shape](https://flipdots.vercel.app/api/svg?text=CIRCLE&dotShape=circle&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rect
Square dot with a diagonal flip — the geometry of the transition gives it a mechanical, hardware-authentic feel.

![Rect Shape](https://flipdots.vercel.app/api/svg?text=RECT&dotShape=rect&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rounded
Rounded square with the same flip as `rect`. Softer and more modern look.

![Rounded Shape](https://flipdots.vercel.app/api/svg?text=ROUND&dotShape=rounded&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Diamond
![Diamond Shape](https://flipdots.vercel.app/api/svg?text=DIAMOND&dotShape=diamond&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=2)

```markdown
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rect&style=dark
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rounded&style=retro
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=diamond&style=modern
```

## ✨ Special Features

### Spacing and Special Characters
- **Spacing**: Use space or `_` (underscore)
- **Special Characters**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &` supported
- **URL Encoding**: Special characters are properly handled even when automatically encoded in URLs

![Special Characters](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark&dotSize=18&spacing=2&v=1)
![URL Example](https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern&dotSize=16&spacing=2&v=1)
![Score Example](https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro&dotSize=18&spacing=2&v=1)

*Note: `%` is encoded as `%25` in URLs.*

## 💡 Practical Use Cases

### GitHub Profile Decoration

#### Visitor Welcome Message
![Welcome Message](https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_GITHUB&animationMode=sequential&style=dark&dotSize=16&spacing=2&justify=center&v=1)
```markdown
![Welcome](https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_GITHUB&animationMode=sequential&style=dark&dotSize=16&spacing=2&justify=center)
```

#### Current Status Display
![Current Status](https://flipdots.vercel.app/api/svg?text=CURRENTLY_CODING&animationMode=scroll&style=modern&dotSize=18&spacing=2&v=1&speed=3)
```markdown
![Status](https://flipdots.vercel.app/api/svg?text=CURRENTLY_CODING&animationMode=scroll&style=modern&dotSize=18&spacing=2&speed=3)
```

### Project README Headers

#### Project Title
![Project Title](https://flipdots.vercel.app/api/svg?text=MY+AWESOME_PROJECT&animationMode=waterfall&style=modern&dotSize=20&spacing=2&justify=center&v=1)
```markdown
![Project](https://flipdots.vercel.app/api/svg?text=MY+AWESOME_PROJECT&animationMode=waterfall&style=modern&dotSize=20&spacing=2&justify=center)
```

### Status Badge Style

#### Build Status
![Build Success](https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=14&spacing=1&v=1)
![Build Failed](https://flipdots.vercel.app/api/svg?text=BUILD_FAILED&dotOn=ff0000&background=000000&dotSize=14&spacing=1&v=1)
```markdown
![Build Status](https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=14&spacing=1)
![Build Failed](https://flipdots.vercel.app/api/svg?text=BUILD_FAILED&dotOn=ff0000&background=000000&dotSize=14&spacing=1)
```

#### Version Information
![Version](https://flipdots.vercel.app/api/svg?text=VERSION_V2%2E1%2E0&style=modern&dotSize=16&spacing=2&v=1)
```markdown
![Version](https://flipdots.vercel.app/api/svg?text=VERSION_V2.1.0&style=modern&dotSize=16&spacing=2)
```

#### Progress Display
![Progress](https://flipdots.vercel.app/api/svg?text=PROGRESS_95%25&dotOn=00ff00,ffff00,ff8000&style=dark&dotSize=16&spacing=2&v=1)
```markdown
![Progress](https://flipdots.vercel.app/api/svg?text=PROGRESS_95%25&dotOn=00ff00,ffff00,ff8000&style=dark&dotSize=16&spacing=2)
```

### Creative Uses

#### Social Media Links
![Social](https://flipdots.vercel.app/api/svg?text=FOLLOW_@USERNAME&animationMode=scroll&dotOn=1da1f2&background=000000&dotSize=16&spacing=2&v=1)
```markdown
![Social](https://flipdots.vercel.app/api/svg?text=FOLLOW_@USERNAME&animationMode=scroll&dotOn=1da1f2&background=000000&dotSize=16&spacing=2)
```

#### Email Address
![Email](https://flipdots.vercel.app/api/svg?text=CONTACTME_@DOMAIN%2ECOM&style=modern&dotSize=14&spacing=1&v=1&animationMode=sequential)
```markdown
![Email](https://flipdots.vercel.app/api/svg?text=CONTACTME_@DOMAIN%2ECOM&style=modern&dotSize=14&spacing=1&animationMode=sequential)
```

## 🛠️ Advanced Usage

### Alignment Combinations
You can combine various alignment options to create your desired layout:

```markdown
<!-- Top Left -->
?align=start&justify=start

<!-- Top Center -->
?align=start&justify=center

<!-- Top Right -->
?align=start&justify=end

<!-- Middle Left -->
?align=center&justify=start

<!-- Center -->
?align=center&justify=center

<!-- Middle Right -->
?align=center&justify=end

<!-- Bottom Left -->
?align=end&justify=start

<!-- Bottom Center -->
?align=end&justify=center

<!-- Bottom Right -->
?align=end&justify=end
```

### Gradient Effects
Create rainbow effects by separating multiple colors with commas:

![Rainbow Effect](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000&dotSize=20&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000
```

### Animation Speed Control
Control animation speed with the speed parameter:
```markdown
<!-- Slow animation -->
&speed=0.5

<!-- Normal speed (default) -->
&speed=1.0

<!-- Fast animation -->
&speed=2.0

<!-- Very fast animation -->
&speed=3.0
```

### Size Optimization by Purpose
Recommended size settings by use case:

```markdown
<!-- Small badges/icons -->
&dotSize=12&spacing=1

<!-- Regular text -->
&dotSize=16&spacing=2

<!-- Titles/headers -->
&dotSize=20&spacing=2

<!-- Large displays -->
&dotSize=24&spacing=3

<!-- Extra large headers -->
&dotSize=30&spacing=4
```

### Responsive Design Tips

#### Mobile-friendly Sizes
```markdown
<!-- Mobile-optimized size -->
&dotSize=14&spacing=1

<!-- Tablet-optimized -->
&dotSize=18&spacing=2
```

#### GitHub Theme Compatibility
```markdown
<!-- GitHub dark mode -->
&style=dark

<!-- GitHub light mode -->
&style=light&dotOn=333333&background=ffffff

<!-- GitHub color scheme harmony -->
&dotOn=0366d6&background=f6f8fa&dotOff=d0d7de
```

## 💡 Pro Tips

### 1. Caching Optimization
Add a version parameter at the end of URLs to control caching:
```markdown
&v=1  # Increase the number when content changes
```

### 2. Special Character Encoding
If special characters cause errors in URLs, use these substitutions:
- `%` → `%25`
- `@` → `%40`  
- `#` → `%23`
- `&` → `%26`

### 3. Multi-line Text Alignment Optimization
```markdown
<!-- Center alignment when each line has different lengths -->
text=SHORT_VERY_LONG_LINE_MID&justify=center

<!-- Title and subtitle style -->
text=MAIN_TITLE_SUBTITLE&justify=center&row=12&column=40
```

### 4. Animation Combinations
```markdown
<!-- Scroll + speed control -->
&animationMode=scroll&speed=0.8&direction=reverse

<!-- Waterfall + fixed size -->
&animationMode=waterfall&row=20&column=30&align=center
```

### 5. Color Combination Guide
```markdown
<!-- Neon effect -->
&dotOn=00ffff&background=000011&dotOff=001122

<!-- Pastel tones -->
&dotOn=ffb3ba&background=fff&dotOff=f0f0f0

<!-- High contrast -->
&dotOn=ffffff&background=000000&dotOff=333333

<!-- Brand color matching -->
&dotOn=1da1f2&background=15202b&dotOff=192734  # Twitter style
&dotOn=0366d6&background=f6f8fa&dotOff=d0d7de  # GitHub style
```

## 🎯 Performance Optimization

### Recommended Settings
- **dotSize**: 12-24px (too large increases loading time)
- **spacing**: 1-3px (maintains proper readability)
- **Animation**: static mode recommended for complex text
- **Colors**: 6-digit hex codes recommended (3-digit also supported)

### Loading Speed Improvement
```markdown
<!-- Use simple text -->
text=HELLO  (good)
text=VERY_LONG_COMPLEX_TEXT_WITH_MANY_CHARACTERS  (slow)

<!-- Appropriate size settings -->
&dotSize=16&spacing=2  (good)
&dotSize=40&spacing=10  (slow)
```

## 📖 Technical Specifications

### Supported Characters
- **Uppercase Letters**: A-Z
- **Lowercase Letters**: a-z  
- **Numbers**: 0-9
- **Special Characters**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &`
- **Spacing**: space, underscore(_)
- **Multi-line**: %0 delimiter

### Animation Features
- **Sequential**: Diagonal sequential animation (0.08s intervals)
- **Scroll**: Right→left scroll, 0.5s reading time per character
- **Waterfall**: Top→bottom waterfall effect, sequential row display
- **Speed**: 0.5x ~ 3.0x speed adjustment available
- **Direction**: normal/reverse direction switching

### Color System
- **Hex Codes**: 6-digit (#ffffff) or 3-digit (#fff) support
- **Auto # Addition**: # symbol can be omitted in URLs
- **Gradients**: Multi-color support with comma separation
- **Transparency**: rgba not supported, hex only

### Size Limits
- **dotSize**: 10-40px
- **spacing**: 1-10px  
- **row/column**: No limit (100x100 recommended for performance)
- **Text length**: No limit (50 characters or less recommended for readability)

### Browser Compatibility
- **SVG Support**: All modern browsers
- **Animations**: CSS3 supporting browsers
- **Caching**: Fast loading via CDN
- **Responsive**: Various screen size support

## 🔧 Developer Information

### API Endpoint
```
GET https://flipdots.vercel.app/api/svg
```

### Response Format
- **Content-Type**: `image/svg+xml`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Encoding**: UTF-8

### Example Tool
You can adjust parameters in real-time and check results at [https://flipdots.vercel.app/example](https://flipdots.vercel.app/example).

### GitHub Repository
[https://github.com/Hangeol-Chang/flipdot](https://github.com/Hangeol-Chang/flipdot)

### Tech Stack
- **Frontend**: Next.js 15, React 18
- **Styling**: CSS3 Animations, SVG
- **Deployment**: Vercel
- **Font Mapping**: Custom bitmap fonts

----
----

## 🤝 Contributing

This project is open source and we welcome your contributions!

### How to Contribute
1. Fork this repository
2. Create a new feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Improvement Ideas
- [ ] Korean font support
- [ ] More animation modes
- [ ] Custom font upload
- [ ] QR code generation
- [ ] Image to dot pattern conversion
- [ ] Real-time clock display
- [ ] Weather information integration

### Bug Reports
Found a bug? Please report it in [Issues](https://github.com/Hangeol-Chang/flipdot/issues)!

## 📄 License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Usage Terms
- ✅ Commercial use allowed
- ✅ Modification and distribution allowed  
- ✅ Personal project use allowed
- ✅ Free use in GitHub README

---

<div align="center">

**🎉 Make your GitHub README awesome with flip-dot! 🎉**

[![Flip Dot Example](https://flipdots.vercel.app/api/svg?text=MADE+WITH_FLIP+DOT&animationMode=sequential&style=retro&dotSize=16&spacing=2&justify=center&v=1)](https://flipdots.vercel.app/example)

Bug reports, ideas, and pull requests are always welcome.
<br>
📧 hgchang1@naver.com | 🐙 [@Hangeol-Chang](https://github.com/Hangeol-Chang)

⭐ If this project helped you, please give it a star!

</div>
