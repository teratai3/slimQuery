# SlimQuery Core Module

## 概要
`slimquery-core.js`は、SlimQueryライブラリのコア機能を提供するモジュールです。このモジュールでは、DOM要素の選択、初期化、反復処理、ドキュメントの準備イベントなど、基本的な操作が実行できます。

## メソッド

### `constructor(selector)`
- **説明:** SlimQueryのインスタンスを作成し、指定されたセレクタに基づいてDOM要素を選択します。

### `get elements`
- **説明:** 選択されたDOM要素の配列を返します。

### `each`
- **説明:** 選択された各DOM要素に対して、指定されたコールバック関数を適用します。

### `get length`
- **説明:** 選択されたDOM要素の数を返します。

### `#ready`
- **説明:** ドキュメントの読み込みが完了した時点で、指定されたコールバック関数を実行します。(private)
#### DOMの準備
```javascript
slimQuery(() => {
    console.log('DOM is ready!');
});
// または
(function ($) {
    $(function(){
    });
})(slimQuery);
```


### `static extend(name, method)`
- **説明:** `SlimQuery`プロトタイプに新しいメソッドを追加します。これにより、SlimQueryにカスタムメソッドを追加できます。


