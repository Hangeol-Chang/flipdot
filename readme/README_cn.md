# 💿 Flip Dot Display

## 🌐 Other Languages
- [🇺🇸 English](../README.md)
- [🇰🇷 한국어 (Korean)](./README_kr.md)
- [🇯🇵 日本語 (Japanese)](./README_jp.md)

## 📑 目录
- [🚀 主要功能](#主要功能)
- [🔷 点形状](#点形状)
- [📋 参数](#参数)
- [🎭 样式示例](#样式示例)
- [🎬 动画示例](#动画示例)
- [📝 多行文本](#多行文本)
- [📐 尺寸限制与对齐](#尺寸限制与对齐)
- [🎨 自定义点阵图案](#自定义点阵图案)
- [✨ 特殊功能](#特殊功能)
- [💡 实用案例](#实用案例)
- [🛠️ 高级用法](#高级用法)
- [💡 专业技巧](#专业技巧)
- [🎯 性能优化](#性能优化)
- [📖 技术规格](#技术规格)
- [🔧 开发者信息](#开发者信息)
- [🤝 贡献](#贡献)
- [📄 许可证](#许可证)

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
    <h4> 用flip-dot显示屏装饰您的GitHub！ </h4>
    现在提供可直接在GitHub README.md中使用的动画SVG API！
    <br>
    <a href="https://flipdots.vercel.app/example">📖 查看API使用方法</a>
</div>
<br>

<!-- ![](./docs/description_image1.gif) -->
<div align="center" style="maxWidth:400px">
 <img src="../docs/examplePage.png" />
</div>

## 🚀 主要功能

生成可直接嵌入GitHub README.md的flip dot图像的API。
再现真实flip-dot硬件的操作。

✨ **新功能**
- 🔤 **多行文本**: 用`_`换行
- 🔷 **点形状**: 4种独特的视觉风格 — `circle`、`rect`、`rounded`、`diamond` — 各有独特的翻转动画
- 🎬 **4种动画模式**: static、sequential、scroll、waterfall
- 🎨 **自定义图案**: 设计您自己的点阵图案（支持二进制和十六进制格式）
- 🌈 **渐变**: 多种颜色的彩虹效果
- 📐 **对齐选项**: 垂直/水平对齐选项

### 基本用法
![BASIC](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```markdown
![Flip Dot](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```

### 多行文本
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential)
```markdown
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential)
```

### 动画
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL_TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```markdown
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL_TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```

## 📋 参数

| 参数 | 描述 | 默认值 | 示例 |
|------|------|--------|------|
| **`text`** | 要显示的文本（多行：用`_`分隔） | `HELLO` | `HELLO_WORLD` |
| **`customdots`** | 自定义点阵图案（二进制或十六进制，行用逗号分隔） | - | `10110,01001` 或 `16,09` |
| **`style`** | 样式主题 | `dark` | `light`, `retro`, `modern`, `dark`, `neon`, `ocean`, `sunset` |
| **`dotShape`** | 点的形状 | `circle` | `circle`, `rect`, `rounded`, `diamond` |
| **`dotSize`** | 点大小（px） | `20` | `10-40` |
| **`spacing`** | 点间距（px） | `2` | `1-10` |
| **`row`** | 行数限制 | - | `10` |
| **`column`** | 列数限制 | - | `20` |
| **`align`** | 垂直对齐 | `start` | `start`, `center`, `end` |
| **`justify`** | 水平对齐 | `start` | `start`, `center`, `end` |
| **`animationMode`** | 动画模式 | `static` | `sequential`, `scroll`, `waterfall` |
| **`speed`** | 动画速度 | `1.0` | `0.5-3.0` |
| **`direction`** | 动画方向 | `normal` | `normal`, `reverse` |
| **`dotOn`** | 开启点的颜色（渐变：逗号分隔） | - | `ff0000` 或 `ff0000,00ff00,0000ff` |
| **`dotOff`** | 关闭点的颜色 | - | `333333` |
| **`background`** | 背景颜色 | - | `000000` |

## 🎭 样式示例

### 基本样式

![Light Style](https://flipdots.vercel.app/api/svg?text=LIGHT&style=light&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Dark Style](https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Retro Style](https://flipdots.vercel.app/api/svg?text=RETRO&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Modern Style](https://flipdots.vercel.app/api/svg?text=MODERN&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=1)

### 新增样式

![Neon Style](https://flipdots.vercel.app/api/svg?text=NEON&style=neon&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Ocean Style](https://flipdots.vercel.app/api/svg?text=OCEAN&style=ocean&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Sunset Style](https://flipdots.vercel.app/api/svg?text=SUNSET&style=sunset&dotSize=20&spacing=2&animationMode=sequential&v=1)

### 自定义颜色

![Custom Red](https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000&dotSize=20&spacing=2&v=1)
![Gradient](https://flipdots.vercel.app/api/svg?text=GRADIENT&dotOn=6F04D9,1B0273,0597F2,05C7F2&background=CCCCCC&dotOff=DDDDDD&dotSize=18&spacing=2&v=1)
![Purple Theme](https://flipdots.vercel.app/api/svg?text=PURPLE&dotOn=ff00ff&dotOff=330033&background=1a0a1a&dotSize=22&spacing=2&v=1)

## 🎬 动画示例

### Sequential Animation（顺序动画）
像真实的flip-dot硬件一样，每个点顺序翻转

![Sequential Animation](https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro&dotSize=18&spacing=2&v=2)

### Scroll Animation（滚动动画）
文本从右向左滚动

![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern&dotSize=16&spacing=1&v=1)

### Waterfall Animation（瀑布动画）
文本从上往下落下

![Waterfall Animation](https://flipdots.vercel.app/api/svg?text=FALLING&animationMode=waterfall&style=dark&dotSize=18&spacing=2&v=1)

## 📝 多行文本

使用`_`作为分隔符创建多行文本。每行之间会自动添加1个点的间距。

### 基本多行
![Multi-line Basic](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=dark&dotSize=18&spacing=2&v=2)

### 3行文本
![Three Lines](https://flipdots.vercel.app/api/svg?text=LINE1_LINE2_LINE3&style=modern&dotSize=16&spacing=2&v=1)

### 多行 + 动画
![Multi-line Animation](https://flipdots.vercel.app/api/svg?text=GITHUB_PROFILE_VISITOR&animationMode=sequential&style=retro&dotSize=16&spacing=2&v=1)

## 📐 尺寸限制和对齐

### 固定尺寸矩阵
通过限制行和列创建固定大小的显示屏。

![Fixed Size](https://flipdots.vercel.app/api/svg?text=FIXED&row=10&column=25&style=dark&dotSize=16&spacing=2&v=1)

### 居中对齐
![Center Align](https://flipdots.vercel.app/api/svg?text=CENTER&row=12&column=45&align=center&justify=center&style=modern&dotSize=18&spacing=2&animationMode=sequential&v=1)

### 多行对齐
![Multi-line Align](https://flipdots.vercel.app/api/svg?text=ALIGN_BOTTOM_RIGHT&row=25&column=45&align=end&justify=end&style=retro&dotSize=16&spacing=2&v=1)

## 🎨 自定义点阵图案

您可以直接定义点阵图案而不是文本。行用逗号分隔，支持两种格式：

### 格式说明

| 格式 | 示例 | 说明 |
|------|------|------|
| **二进制** | `10110,01001` | 直接用`0`/`1`表示每个点（开/关） |
| **十六进制** | `16,09` | 十六进制值，每位数字代表4个点（更紧凑） |

**十六进制转换示例**（心形图案）：
```
二进制行:  0110110  →  十六进制: 36
           1111111  →          7f
           1111111  →          7f
           0111110  →          3e
           0011100  →          1c
           0001000  →          08
```

### 心形
![Heart Pattern](https://flipdots.vercel.app/api/svg?customdots=36,7f,7f,3e,1c,08&style=dark&dotOn=ff69b4&dotSize=20&spacing=2&v=1)

```markdown
<!-- 十六进制（推荐，更短的URL） -->
![Heart](https://flipdots.vercel.app/api/svg?customdots=36,7f,7f,3e,1c,08&style=dark&dotOn=ff69b4&dotSize=20&spacing=2)

<!-- 二进制（原始格式，同样有效） -->
![Heart](https://flipdots.vercel.app/api/svg?customdots=0110110,1111111,1111111,0111110,0011100,0001000&style=dark&dotOn=ff69b4&dotSize=20&spacing=2)
```

### 复选标记
![Check Pattern](https://flipdots.vercel.app/api/svg?customdots=01,03,06,4c,78,30&style=modern&dotOn=00ff00&dotSize=18&spacing=2&v=1)

### 星形
![Star Pattern](https://flipdots.vercel.app/api/svg?customdots=104,088,0fc,6f6,7ff,6fd,685,0d8&style=dark&dotOn=ffff00&dotSize=16&spacing=2&v=1)

### 自定义图案 + 动画
![Custom Animation](https://flipdots.vercel.app/api/svg?customdots=16,09,16&animationMode=scroll&style=retro&dotSize=22&spacing=3&v=1)

## 🔷 点形状

使用`dotShape`参数可从4种视觉风格中选择。每种形状都有其独特的翻转动画。

| 值 | 说明 |
|----|------|
| `circle` | 圆形（默认） — 旋转翻转 |
| `rect` | 矩形 — 对角轴翻转，还原真实flip-dot硬件的质感 |
| `rounded` | 圆角矩形 — 与`rect`相同的翻转，边缘更柔和 |
| `diamond` | 菱形 — 旋转翻转 |

### Circle（默认）
![Circle Shape](https://flipdots.vercel.app/api/svg?text=CIRCLE&dotShape=circle&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rect
矩形点。以对角线为轴翻转，完美再现机械式flip-dot硬件的质感。

![Rect Shape](https://flipdots.vercel.app/api/svg?text=RECT&dotShape=rect&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rounded
与`rect`相同的翻转动作，但边角圆润，外观更柔和现代。

![Rounded Shape](https://flipdots.vercel.app/api/svg?text=ROUND&dotShape=rounded&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Diamond
![Diamond Shape](https://flipdots.vercel.app/api/svg?text=DIAMOND&dotShape=diamond&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=2)

```markdown
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rect&style=dark
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rounded&style=retro
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=diamond&style=modern
```

## ✨ 特殊功能

### 空格和特殊字符
- **空格**: 使用空格或`_`（下划线）
- **特殊字符**: 支持`! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &`
- **URL编码**: 即使在URL中自动编码的特殊字符也能正常处理

![Special Characters](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark&dotSize=18&spacing=2&v=1)
![URL Example](https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern&dotSize=16&spacing=2&v=1)
![Score Example](https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro&dotSize=18&spacing=2&v=1)

*注意: 在URL中`%`被编码为`%25`。*

## 💡 实用案例

### GitHub个人资料装饰

#### 访客欢迎信息
![Welcome Message](https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_GITHUB&animationMode=sequential&style=dark&dotSize=16&spacing=2&justify=center&v=1)

#### 当前状态显示
![Current Status](https://flipdots.vercel.app/api/svg?text=CURRENTLY_CODING&animationMode=scroll&style=modern&dotSize=18&spacing=2&v=1&speed=3)

### 项目README标题

#### 项目标题
![Project Title](https://flipdots.vercel.app/api/svg?text=MY+AWESOME_PROJECT&animationMode=waterfall&style=modern&dotSize=20&spacing=2&justify=center&v=1)

### 状态徽章样式

#### 构建状态
![Build Success](https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=14&spacing=1&v=1)
![Build Failed](https://flipdots.vercel.app/api/svg?text=BUILD_FAILED&dotOn=ff0000&background=000000&dotSize=14&spacing=1&v=1)

#### 版本信息
![Version](https://flipdots.vercel.app/api/svg?text=VERSION_V2%2E1%2E0&style=modern&dotSize=16&spacing=2&v=1)

#### 进度显示
![Progress](https://flipdots.vercel.app/api/svg?text=PROGRESS_95%25&dotOn=00ff00,ffff00,ff8000&style=dark&dotSize=16&spacing=2&v=1)

## 🛠️ 高级用法

### 对齐组合
您可以组合各种对齐选项来创建所需的布局：

```markdown
<!-- 左上 -->
?align=start&justify=start

<!-- 上中 -->
?align=start&justify=center

<!-- 右上 -->
?align=start&justify=end

<!-- 左中 -->
?align=center&justify=start

<!-- 中心 -->
?align=center&justify=center

<!-- 右中 -->
?align=center&justify=end

<!-- 左下 -->
?align=end&justify=start

<!-- 下中 -->
?align=end&justify=center

<!-- 右下 -->
?align=end&justify=end
```

### 渐变效果
通过用逗号分隔多种颜色来创建彩虹效果：

![Rainbow Effect](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000&dotSize=20&spacing=2&v=1)

### 动画速度控制
使用speed参数控制动画速度：
```markdown
<!-- 慢动画 -->
&speed=0.5

<!-- 正常速度（默认） -->
&speed=1.0

<!-- 快动画 -->
&speed=2.0

<!-- 非常快的动画 -->
&speed=3.0
```

## 🎯 性能优化

### 推荐设置
- **dotSize**: 12-24px（太大会增加加载时间）
- **spacing**: 1-3px（保持适当的可读性）
- **动画**: 复杂文本推荐使用static模式
- **颜色**: 推荐使用6位hex代码（也支持3位）

### 加载速度改善
```markdown
<!-- 使用简单文本 -->
text=HELLO  （好）
text=VERY_LONG_COMPLEX_TEXT_WITH_MANY_CHARACTERS  （慢）

<!-- 适当的尺寸设置 -->
&dotSize=16&spacing=2  （好）
&dotSize=40&spacing=10  （慢）
```

## 📖 技术规格

### 支持的字符
- **大写字母**: A-Z
- **小写字母**: a-z  
- **数字**: 0-9
- **特殊字符**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &`
- **空格**: 空格，下划线(_)
- **多行**: _分隔符

### 动画特性
- **Sequential**: 对角线顺序的顺序动画（0.08秒间隔）
- **Scroll**: 右→左滚动，每个字符0.5秒读取时间
- **Waterfall**: 上→下瀑布效果，按行顺序显示
- **Speed**: 0.5x ~ 3.0x速度调节可用
- **Direction**: normal/reverse方向切换

### 颜色系统
- **Hex代码**: 支持6位（#ffffff）或3位（#fff）
- **自动#添加**: URL中可以省略#符号
- **渐变**: 支持逗号分隔的多色
- **透明度**: 不支持rgba，仅支持hex

### 尺寸限制
- **dotSize**: 10-40px
- **spacing**: 1-10px  
- **row/column**: 无限制（性能考虑推荐100x100）
- **文本长度**: 无限制（可读性考虑推荐50字符以内）

### 浏览器兼容性
- **SVG支持**: 所有现代浏览器
- **动画**: 支持CSS3的浏览器
- **缓存**: 通过CDN快速加载
- **响应式**: 支持各种屏幕尺寸

## 🔧 开发者信息

### API端点
```
GET https://flipdots.vercel.app/api/svg
```

### 响应格式
- **Content-Type**: `image/svg+xml`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Encoding**: UTF-8

### 示例工具
您可以在[https://flipdots.vercel.app/example](https://flipdots.vercel.app/example)实时调整参数并查看结果。

### GitHub仓库
[https://github.com/Hangeol-Chang/flipdot](https://github.com/Hangeol-Chang/flipdot)

### 技术栈
- **Frontend**: Next.js 15, React 18
- **Styling**: CSS3 Animations, SVG
- **Deployment**: Vercel
- **Font Mapping**: 自定义位图字体

----
----

## 🤝 贡献

这个项目是开源的，我们欢迎您的贡献！

### 如何贡献
1. Fork这个仓库
2. 创建新的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交您的更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开Pull Request

### 改进想法
- [ ] 中文字体支持
- [ ] 更多动画模式
- [ ] 自定义字体上传
- [ ] 二维码生成
- [ ] 图像转换为点阵图案
- [ ] 实时时钟显示
- [ ] 天气信息集成

### Bug报告
发现了bug？请在[Issues](https://github.com/Hangeol-Chang/flipdot/issues)中报告！

## 📄 许可证

此项目在MIT许可证下分发。详情请参见[LICENSE](../LICENSE)文件。

### 使用条件
- ✅ 允许商业使用
- ✅ 允许修改和分发  
- ✅ 允许个人项目使用
- ✅ 在GitHub README中自由使用

---

<div align="center">

**🎉 用flip-dot让您的GitHub README更精彩！🎉**

[![Flip Dot Example](https://flipdots.vercel.app/api/svg?text=MADE+WITH_FLIP_DOT_&animationMode=sequential&style=retro&dotSize=16&spacing=2&justify=center&v=1)](https://flipdots.vercel.app/example)

欢迎随时提交bug报告、想法和pull request。
<br>
📧 hgchang1@naver.com | 🐙 [@Hangeol-Chang](https://github.com/Hangeol-Chang)

⭐ 如果这个项目对您有帮助，请给我们一个星！

</div>
