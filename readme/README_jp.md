# 💿 Flip Dot Display

## 🌐 Other Languages
- [🇺🇸 English](../README.md)
- [🇰🇷 한국어 (Korean)](./README_kr.md)
- [🇨🇳 中文 (Chinese)](./README_cn.md)

## 📑 目次
- [🚀 主な機能](#主な機能)
- [🔷 ドット形状](#ドット形状)
- [📋 パラメータ](#パラメータ)
- [🎭 スタイル例](#スタイル例)
- [🎬 アニメーション例](#アニメーション例)
- [📝 複数行テキスト](#複数行テキスト)
- [📐 サイズ制限と配置](#サイズ制限と配置)
- [🎨 カスタムドットパターン](#カスタムドットパターン)
- [✨ 特殊機能](#特殊機能)
- [💡 実用的な使用例](#実用的な使用例)
- [🛠️ 高度な使用法](#高度な使用法)
- [💡 プロのヒント](#プロのヒント)
- [🎯 パフォーマンス最適化](#パフォーマンス最適化)
- [📖 技術仕様](#技術仕様)
- [🔧 開発者情報](#開発者情報)
- [🤝 コントリビュート](#コントリビュート)
- [📄 ライセンス](#ライセンス)

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
    <h4> flip-dot displayでGitHubを飾ってみましょう！ </h4>
    GitHub README.mdで直接使用できるアニメーションSVG APIを提供しています！
    <br>
    <a href="https://flipdots.vercel.app/example">📖 API使用方法を見る</a>
</div>
<br>

<!-- ![](./docs/description_image1.gif) -->
<div align="center" style="maxWidth:400px">
 <img src="../docs/examplePage.png" />
</div>

## 🚀 主な機能

GitHub README.mdに直接埋め込むことができるflip dotイメージを生成するAPIです。
実際のflip-dotハードウェアの動作を再現します。

✨ **新機能**
- 🔤 **複数行テキスト**: `_`で改行
- 🔷 **ドット形状**: 4つのユニークなビジュアルスタイル — `circle`、`rect`、`rounded`、`diamond` — それぞれ独自のフリップアニメーション付き
- 🎬 **4つのアニメーションモード**: static、sequential、scroll、waterfall
- 🎨 **カスタムパターン**: 独自のドットパターンを設計（binaryまたはhex形式）
- 🌈 **グラデーション**: 複数の色で虹効果
- 📐 **配置オプション**: 縦/横配置オプション

### 基本的な使用法
![BASIC](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```markdown
![Flip Dot](https://flipdots.vercel.app/api/svg?text=YOUR_TEXT&style=dark&animationMode=sequential)
```

### 複数行テキスト
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential)
```markdown
![Multi-line](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=modern&dotSize=18&spacing=2&animationMode=sequential)
```

### アニメーション
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL_TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```markdown
![Animation](https://flipdots.vercel.app/api/svg?text=SCROLL_TEXT&animationMode=scroll&style=retro&dotSize=16&spacing=2)
```

## 📋 パラメータ

| パラメータ | 説明 | デフォルト | 例 |
|-----------|------|----------|---|
| **`text`** | 表示するテキスト（複数行：`_`で区切り） | `HELLO` | `HELLO_WORLD` |
| **`customdots`** | カスタムドットパターン — binary（`10110`）またはhex（`16`）形式 | - | `10110,01001` または `16,09,16` |
| **`style`** | スタイルテーマ | `dark` | `dark`, `light`, `retro`, `modern`, `neon`, `ocean`, `sunset` |
| **`dotSize`** | ドットサイズ（px） | `20` | `10-40` |
| **`spacing`** | ドット間隔（px） | `2` | `1-10` |
| **`dotShape`** | ドット形状 | `circle` | `circle`, `rect`, `rounded`, `diamond` |
| **`row`** | 行数制限 | - | `10` |
| **`column`** | 列数制限 | - | `20` |
| **`align`** | 縦配置 | `start` | `start`, `center`, `end` |
| **`justify`** | 横配置 | `start` | `start`, `center`, `end` |
| **`animationMode`** | アニメーションモード | `static` | `sequential`, `scroll`, `waterfall` |
| **`speed`** | アニメーション速度 | `1.0` | `0.5-3.0` |
| **`direction`** | アニメーション方向 | `normal` | `normal`, `reverse` |
| **`dotOn`** | オンドットの色（グラデーション：カンマ区切り） | - | `ff0000` または `ff0000,00ff00,0000ff` |
| **`dotOff`** | オフドットの色 | - | `333333` |
| **`background`** | 背景色 | - | `000000` |

## 🎭 スタイル例

### 基本スタイル

![Light Style](https://flipdots.vercel.app/api/svg?text=LIGHT&style=light&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Dark Style](https://flipdots.vercel.app/api/svg?text=DARK&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Retro Style](https://flipdots.vercel.app/api/svg?text=RETRO&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Modern Style](https://flipdots.vercel.app/api/svg?text=MODERN&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Neon Style](https://flipdots.vercel.app/api/svg?text=NEON&style=neon&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Ocean Style](https://flipdots.vercel.app/api/svg?text=OCEAN&style=ocean&dotSize=20&spacing=2&animationMode=sequential&v=1)
![Sunset Style](https://flipdots.vercel.app/api/svg?text=SUNSET&style=sunset&dotSize=20&spacing=2&animationMode=sequential&v=1)

### カスタムカラー

![Custom Red](https://flipdots.vercel.app/api/svg?text=CUSTOM&dotOn=ff0000&background=000000&dotSize=20&spacing=2&v=1)
![Gradient](https://flipdots.vercel.app/api/svg?text=GRADIENT&dotOn=6F04D9,1B0273,0597F2,05C7F2&background=CCCCCC&dotOff=DDDDDD&dotSize=18&spacing=2&v=1)
![Purple Theme](https://flipdots.vercel.app/api/svg?text=PURPLE&dotOn=ff00ff&dotOff=330033&background=1a0a1a&dotSize=22&spacing=2&v=1)

## 🎬 アニメーション例

### Sequential Animation
実際のflip-dotハードウェアのように各ドットが順次反転

![Sequential Animation](https://flipdots.vercel.app/api/svg?text=SEQUENTIAL&animationMode=sequential&style=retro&dotSize=18&spacing=2&v=2)

### Scroll Animation
テキストが右から左にスクロール

![Scroll Animation](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&animationMode=scroll&style=modern&dotSize=16&spacing=1&v=1)

### Waterfall Animation
テキストが上から下に落下

![Waterfall Animation](https://flipdots.vercel.app/api/svg?text=FALLING&animationMode=waterfall&style=dark&dotSize=18&spacing=2&v=1)

## 📝 複数行テキスト

`_`を区切り文字として使用して複数行テキストを作成できます。各行の間には1ドットの間隔が自動的に追加されます。

### 基本的な複数行
![Multi-line Basic](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD&style=dark&dotSize=18&spacing=2&v=2)

### 3行テキスト
![Three Lines](https://flipdots.vercel.app/api/svg?text=LINE1_LINE2_LINE3&style=modern&dotSize=16&spacing=2&v=1)

### 複数行 + アニメーション
![Multi-line Animation](https://flipdots.vercel.app/api/svg?text=GITHUB_PROFILE_VISITOR&animationMode=sequential&style=retro&dotSize=16&spacing=2&v=1)

## 📐 サイズ制限と配置

### 固定サイズマトリックス
行と列を制限して固定サイズのディスプレイを作成できます。

![Fixed Size](https://flipdots.vercel.app/api/svg?text=FIXED&row=10&column=25&style=dark&dotSize=16&spacing=2&v=1)

### 中央配置
![Center Align](https://flipdots.vercel.app/api/svg?text=CENTER&row=12&column=45&align=center&justify=center&style=modern&dotSize=18&spacing=2&animationMode=sequential&v=1)

### 複数行配置
![Multi-line Align](https://flipdots.vercel.app/api/svg?text=ALIGN_BOTTOM_RIGHT&row=25&column=45&align=end&justify=end&style=retro&dotSize=16&spacing=2&v=1)

## 🎨 カスタムドットパターン

テキストの代わりにドットパターンを直接定義できます。`1`はオンドット、`0`はオフドットを意味し、行はカンマで区切ります。

**2つの入力形式に対応しています:**

| 形式 | 例 | 説明 |
|------|-----|------|
| Binary | `00100000100` | 各文字が1ドット（0=オフ、1=オン） |
| Hex | `104` | hex1桁 = 4ビット — URLを約3倍短縮 |

> **自動検出**: `0`と`1`以外の文字（`2〜9`、`a〜f`）があればhexとして処理します。既存のbinary形式は引き続き使用できます。

**Hex変換例**（星形パターン、11列 → 3桁hex）:
```
Binary: 00100000100,00010001000,00111111100,01101110110,11111111111,10111111101,10100000101,00011011000
Hex:       104,     088,         0fc,         1b6,         7ff,         77d,         505,         0d8
```

### ハート形
![Heart Pattern](https://flipdots.vercel.app/api/svg?customdots=0110110,1111111,1111111,0111110,0011100,0001000&style=dark&dotOn=ff69b4&dotSize=20&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=36,7f,7f,3e,1c,08&style=dark&dotOn=ff69b4&dotSize=20&spacing=2
```

### チェックマーク
![Check Pattern](https://flipdots.vercel.app/api/svg?customdots=0000001,0000011,0000110,1001100,1111000,0110000&style=modern&dotOn=00ff00&dotSize=18&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=01,03,06,4c,78,30&style=modern&dotOn=00ff00&dotSize=18&spacing=2
```

### 星形
![Star Pattern](https://flipdots.vercel.app/api/svg?customdots=00100000100,00010001000,00111111100,01101110110,11111111111,10111111101,10100000101,00011011000&style=dark&dotOn=ffff00&dotSize=16&spacing=2&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=104,088,0fc,1b6,7ff,77d,505,0d8&style=dark&dotOn=ffff00&dotSize=16&spacing=2
```

### カスタムパターン + アニメーション
![Custom Animation](https://flipdots.vercel.app/api/svg?customdots=10110,01001,10110&animationMode=scroll&style=retro&dotSize=22&spacing=3&v=1)
```markdown
https://flipdots.vercel.app/api/svg?customdots=16,09,16&animationMode=sequential&style=retro&dotSize=22&spacing=3
```

## 🔷 ドット形状

`dotShape`パラメータで4つのビジュアルスタイルから選べます。各形状は独自のフリップアニメーションを持っています。

| 値 | 説明 |
|----|------|
| `circle` | 円形ドット（デフォルト） — 回転フリップ |
| `rect` | 四角形ドット — 対角軸フリップ、実際のflip-dotハードウェアの質感を再現 |
| `rounded` | 角丸四角形 — `rect`と同じフリップ、柔らかいエッジ |
| `diamond` | ひし形ドット — 回転フリップ |

### Circle（デフォルト）
![Circle Shape](https://flipdots.vercel.app/api/svg?text=CIRCLE&dotShape=circle&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rect
四角形ドット。対角線を軸にフリップし、機械的なflip-dotの質感をそのまま再現します。

![Rect Shape](https://flipdots.vercel.app/api/svg?text=RECT&dotShape=rect&style=dark&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Rounded
`rect`と同じフリップ動作ですが、角が丸くよりソフトでモダンな外観です。

![Rounded Shape](https://flipdots.vercel.app/api/svg?text=ROUND&dotShape=rounded&style=retro&dotSize=20&spacing=2&animationMode=sequential&v=2)

### Diamond
![Diamond Shape](https://flipdots.vercel.app/api/svg?text=DIAMOND&dotShape=diamond&style=modern&dotSize=20&spacing=2&animationMode=sequential&v=2)

```markdown
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rect&style=dark
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=rounded&style=retro
https://flipdots.vercel.app/api/svg?text=HELLO&dotShape=diamond&style=modern
```

## ✨ 特殊機能

### スペースと特殊文字
- **スペース**: 空白または`_`（アンダースコア）を使用
- **特殊文字**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &`をサポート
- **URLエンコーディング**: URLで自動エンコードされた特殊文字も正常に処理

![Special Characters](https://flipdots.vercel.app/api/svg?text=HELLO_WORLD!&style=dark&dotSize=18&spacing=2&v=1)
![URL Example](https://flipdots.vercel.app/api/svg?text=GITHUB.COM/USER&style=modern&dotSize=16&spacing=2&v=1)
![Score Example](https://flipdots.vercel.app/api/svg?text=SCORE:_100%25&style=retro&dotSize=18&spacing=2&v=1)

*注意: URLでは`%`は`%25`としてエンコードされます。*

## 💡 実用的な使用例

### GitHubプロフィール装飾

#### 訪問者歓迎メッセージ
![Welcome Message](https://flipdots.vercel.app/api/svg?text=WELCOME_TO_MY_GITHUB&animationMode=sequential&style=dark&dotSize=16&spacing=2&justify=center&v=1)

#### 現在のステータス表示
![Current Status](https://flipdots.vercel.app/api/svg?text=CURRENTLY_CODING&animationMode=scroll&style=modern&dotSize=18&spacing=2&v=1&speed=3)

### プロジェクトREADMEヘッダー

#### プロジェクトタイトル
![Project Title](https://flipdots.vercel.app/api/svg?text=MY+AWESOME_PROJECT&animationMode=waterfall&style=modern&dotSize=20&spacing=2&justify=center&v=1)

### ステータスバッジスタイル

#### ビルドステータス
![Build Success](https://flipdots.vercel.app/api/svg?text=BUILD_PASSING&dotOn=00ff00&background=000000&dotSize=14&spacing=1&v=1)
![Build Failed](https://flipdots.vercel.app/api/svg?text=BUILD_FAILED&dotOn=ff0000&background=000000&dotSize=14&spacing=1&v=1)

#### バージョン情報
![Version](https://flipdots.vercel.app/api/svg?text=VERSION_V2%2E1%2E0&style=modern&dotSize=16&spacing=2&v=1)

#### 進捗表示
![Progress](https://flipdots.vercel.app/api/svg?text=PROGRESS_95%25&dotOn=00ff00,ffff00,ff8000&style=dark&dotSize=16&spacing=2&v=1)

## 🛠️ 高度な使用法

### 配置の組み合わせ
さまざまな配置オプションを組み合わせて目的のレイアウトを作成できます：

```markdown
<!-- 左上 -->
?align=start&justify=start

<!-- 上中央 -->
?align=start&justify=center

<!-- 右上 -->
?align=start&justify=end

<!-- 左中央 -->
?align=center&justify=start

<!-- 中央 -->
?align=center&justify=center

<!-- 右中央 -->
?align=center&justify=end

<!-- 左下 -->
?align=end&justify=start

<!-- 下中央 -->
?align=end&justify=center

<!-- 右下 -->
?align=end&justify=end
```

### グラデーション効果
複数の色をカンマで区切って虹効果を作成：

![Rainbow Effect](https://flipdots.vercel.app/api/svg?text=RAINBOW&dotOn=ff0000,ff8000,ffff00,00ff00,0080ff,0000ff,8000ff&background=000000&dotSize=20&spacing=2&v=1)

### アニメーション速度制御
speedパラメータでアニメーション速度を制御：
```markdown
<!-- 遅いアニメーション -->
&speed=0.5

<!-- 通常速度（デフォルト） -->
&speed=1.0

<!-- 速いアニメーション -->
&speed=2.0

<!-- 非常に速いアニメーション -->
&speed=3.0
```

## 🎯 パフォーマンス最適化

### 推奨設定
- **dotSize**: 12-24px（大きすぎると読み込み時間が増加）
- **spacing**: 1-3px（適切な可読性を維持）
- **アニメーション**: 複雑なテキストにはstaticモードを推奨
- **色**: 6桁のhexコードを推奨（3桁もサポート）

### 読み込み速度の改善
```markdown
<!-- シンプルなテキストを使用 -->
text=HELLO  （良い）
text=VERY_LONG_COMPLEX_TEXT_WITH_MANY_CHARACTERS  （遅い）

<!-- 適切なサイズ設定 -->
&dotSize=16&spacing=2  （良い）
&dotSize=40&spacing=10  （遅い）
```

## 📖 技術仕様

### サポート文字
- **英大文字**: A-Z
- **英小文字**: a-z  
- **数字**: 0-9
- **特殊文字**: `! ? . , : ; - + = * / \ ( ) [ ] @ # $ % &`
- **スペース**: 空白、アンダースコア(_)
- **複数行**: _区切り文字

### アニメーション機能
- **Sequential**: 対角線順序で順次アニメーション（0.08秒間隔）
- **Scroll**: 右→左スクロール、文字ごと0.5秒読み取り時間
- **Waterfall**: 上→下の滝効果、行ごと順次表示
- **Speed**: 0.5x〜3.0x速度調整可能
- **Direction**: normal/reverse方向切り替え

### カラーシステム
- **Hexコード**: 6桁（#ffffff）または3桁（#fff）サポート
- **自動#追加**: URLで#記号を省略可能
- **グラデーション**: カンマ区切りの複数色サポート
- **透明度**: rgbaは未サポート、hexのみ

### サイズ制限
- **dotSize**: 10-40px
- **spacing**: 1-10px  
- **row/column**: 制限なし（パフォーマンス上100x100推奨）
- **テキスト長**: 制限なし（可読性上50文字以内推奨）

### ブラウザ互換性
- **SVGサポート**: すべての現代ブラウザ
- **アニメーション**: CSS3サポートブラウザ
- **キャッシュ**: CDNによる高速読み込み
- **レスポンシブ**: さまざまな画面サイズサポート

## 🔧 開発者情報

### APIエンドポイント
```
GET https://flipdots.vercel.app/api/svg
```

### レスポンス形式
- **Content-Type**: `image/svg+xml`
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Encoding**: UTF-8

### 例ツール
[https://flipdots.vercel.app/example](https://flipdots.vercel.app/example)でリアルタイムでパラメータを調整し、結果を確認できます。

### GitHubリポジトリ
[https://github.com/Hangeol-Chang/flipdot](https://github.com/Hangeol-Chang/flipdot)

### 技術スタック
- **Frontend**: Next.js 15, React 18
- **Styling**: CSS3 Animations, SVG
- **Deployment**: Vercel
- **Font Mapping**: カスタムビットマップフォント

----
----

## 🤝 貢献

このプロジェクトはオープンソースで、皆様の貢献を歓迎します！

### 貢献方法
1. このリポジトリをForkしてください
2. 新しい機能ブランチを作成してください（`git checkout -b feature/amazing-feature`）
3. 変更をコミットしてください（`git commit -m 'Add amazing feature'`）
4. ブランチにプッシュしてください（`git push origin feature/amazing-feature`）
5. Pull Requestを開いてください

### 改善アイデア
- [ ] 日本語フォントサポート
- [ ] より多くのアニメーションモード
- [ ] カスタムフォントアップロード
- [ ] QRコード生成
- [ ] 画像をドットパターンに変換
- [ ] リアルタイム時計表示
- [ ] 天気情報連携

### バグレポート
バグを発見しましたか？[Issues](https://github.com/Hangeol-Chang/flipdot/issues)でレポートしてください！

## 📄 ライセンス

このプロジェクトはMITライセンスの下で配布されています。詳細は[LICENSE](../LICENSE)ファイルを参照してください。

### 使用条件
- ✅ 商用利用可能
- ✅ 修正および配布可能  
- ✅ 個人プロジェクト使用可能
- ✅ GitHub READMEで自由に使用可能

---

<div align="center">

**🎉 flip-dotでGitHub READMEを素晴らしく！🎉**

[![Flip Dot Example](https://flipdots.vercel.app/api/svg?text=MADE+WITH_FLIP_DOT_&animationMode=sequential&style=retro&dotSize=16&spacing=2&justify=center&v=1)](https://flipdots.vercel.app/example)

バグレポート、アイデア、プルリクエストはいつでも歓迎です。
<br>
📧 hgchang1@naver.com | 🐙 [@Hangeol-Chang](https://github.com/Hangeol-Chang)

⭐ このプロジェクトが役に立ったら、スターをお願いします！

</div>
