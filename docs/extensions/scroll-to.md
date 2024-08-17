### `$.prototype.scrollTo(scrollHeight, duration = 300)`
- **説明:** 指定されたスクロール位置に対してスムーズにスクロールします。スクロールアニメーションは指定された期間にわたって実行され、`easeInOutQuad`イージング関数が適用されます。
- **引数:**
  - `scrollHeight` (Number): スクロールする目的地の垂直位置（ピクセル単位）。
  - `duration` (Number, Optional): アニメーションの持続時間（ミリ秒単位）。デフォルトは`300ms`。

- **戻り値:** `SlimQuery`インスタンス（チェーン可能）。

#### 使用例

```javascript
// 要素の特定の位置にスクロール
const hashOffset = $(this.hash).offset().top;
const scrPadding = $("html").css("scroll-padding-top") !== "auto" ? parseInt($("html").css("scroll-padding-top")) : 0;
$('body').scrollTo(hashOffset - scrPadding, 600);
```
