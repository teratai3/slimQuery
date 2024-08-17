(function ($) {
    $.extend('scrollTo', function (scrollHeight, duration = 300) {
        const el = this.elements[0];
        const startPosition = el.scrollTop || document.documentElement.scrollTop;
        const delta = scrollHeight - startPosition;
        
        // アニメーション開始時刻を取得
        const startTime = Date.now();

        // イージング関数（easeInOutQuad）
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function scroll() {
            const fraction = Math.min(1, (Date.now() - startTime) / duration);
            // イージングを適用した割合を計算
            const easedFraction = easeInOutQuad(fraction);
            // スクロール位置を更新
            el.scrollTop = delta * fraction + startPosition;
            
            if (!el.scrollTop) {
                document.documentElement.scrollTop = delta * easedFraction + startPosition;
            }
            
            // まだスクロールが完了していない場合は、再度スクロール処理を呼び出す
            if (fraction < 1) {
                setTimeout(scroll, 10);
            }
        }
        scroll();
    });
})(slimQuery);