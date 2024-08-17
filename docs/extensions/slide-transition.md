### `$.prototype.slideDown(duration, ease, callback, delay)`
- **説明:** 要素の高さを徐々に増加させて、スライドダウン効果で表示します。
- **引数:**
  - `duration` (Number): アニメーションの持続時間（ミリ秒単位）。
  - `ease` (String, Optional): アニメーションのイージング関数。
  - `callback` (Function, Optional): アニメーションが完了した後に実行されるコールバック関数。
  - `delay` (Number, Optional): アニメーションが開始される前の遅延時間（ミリ秒単位）。

#### 使用例
```javascript
// 要素をスライドダウンして表示
$('.box').slideDown(400, 'ease-in-out', function() {
    console.log('アニメーション完了');
});
```

### `$.prototype.slideUp(duration, ease, callback, delay)`
- **説明:** 要素の高さを徐々に減少させて、スライドアップ効果で非表示にします。
- **引数:**
  - `duration` (Number): アニメーションの持続時間（ミリ秒単位）。
  - `ease` (String, Optional): アニメーションのイージング関数。
  - `callback` (Function, Optional): アニメーションが完了した後に実行されるコールバック関数。
  - `delay` (Number, Optional): アニメーションが開始される前の遅延時間（ミリ秒単位）。


### `$.prototype.slideToggle(duration, ease, callback, delay)`
- **説明:** 要素のスライドダウンとスライドアップをトグルします。現在の高さが0の場合はスライドダウンし、そうでない場合はスライドアップします。
- **引数:**
  - `duration` (Number): アニメーションの持続時間（ミリ秒単位）。
  - `ease` (String, Optional): アニメーションのイージング関数。
  - `callback` (Function, Optional): アニメーションが完了した後に実行されるコールバック関数。
  - `delay` (Number, Optional): アニメーションが開始される前の遅延時間（ミリ秒単位）。