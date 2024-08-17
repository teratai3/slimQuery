# SlimQuery Events Module

## 概要
`slimquery-events.js`は、SlimQueryライブラリにおけるイベント関連のメソッドを提供します。これらのメソッドを使用して、要素にイベントリスナーを追加・削除したり、カスタムイベントをトリガーすることができます。

## メソッド

### `$.prototype.on(event, callback)`
- **説明:** 指定されたイベントに対してコールバック関数をバインドします。複数のイベントをスペース区切りで指定することもできます。

#### 使用例
```javascript
// クリックイベントとキーアップイベントをバインド
$('button').on('click keyup', function() {
    console.log('ボタンがクリックか、キーが離された');
});
```

### `$.prototype.off(event, callback)`
- **説明:** 指定されたイベントからコールバック関数のバインドを解除します。複数のイベントをスペース区切りで指定することもできます。


### `$.prototype.trigger(eventType, extraParameters)`
- **説明:** 指定されたイベントタイプのカスタムイベントをトリガーします。必要に応じて、追加のパラメータをイベントオブジェクトに含めることができます。

