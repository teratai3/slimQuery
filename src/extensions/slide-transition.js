(function ($) {
    $.extend('slideDown', function (duration, ease, callback, delay) {
        const target = this;
        const position = target.css('position');

        target.show().css({
            position: 'absolute',
            visibility: 'hidden',
            height:'auto', //高さを初期化
            display:'block'
        });

        const marginTop = target.css('margin-top');
        const marginBottom = target.css('margin-bottom');
        const paddingTop = target.css('padding-top');
        const paddingBottom = target.css('padding-bottom');
        const height = target.css('height');
       
        target.css({
            position: position,
            visibility: 'visible',
            overflow: 'hidden',
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0
        }).animate({
            height: height,
            marginTop: marginTop,
            marginBottom: marginBottom,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
        }, duration, ease, callback, delay);
    });

    $.extend('slideUp', function (duration, ease, callback, delay) {
        if (this.height() > 0) {
            const target = this;
            const height = target.css('height');
            const marginTop = target.css('margin-top');
            const marginBottom = target.css('margin-bottom');
            const paddingTop = target.css('padding-top');
            const paddingBottom = target.css('padding-bottom');

            console.log(paddingTop);

            //最初に高さなどを固定化してアニメーション実行
            target.css({
                visibility: 'visible',
                overflow: 'hidden',
                height: height,
                marginTop: marginTop,
                marginBottom: marginBottom,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
            }).animate({
                height: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0
            }, duration, ease, function () {
                //終了後コールバックを呼び出す
                target.hide().css({
                    visibility: 'visible',
                    overflow: 'hidden',
                    height: height,
                    marginTop: marginTop,
                    marginBottom: marginBottom,
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom
                });

                if (typeof callback === 'function') {
                    callback.call(target); // コールバックを呼び出す
                }
            }, delay);
        }
    });

    $.extend('slideToggle', function (duration, ease, callback, delay) {
        this.height() == 0 ? this.slideDown(duration, ease, callback, delay) : this.slideUp(duration, ease, callback, delay);
    });
})(slimQuery);