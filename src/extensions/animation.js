(function ($) {
    $.extend('animate', function (properties, duration = 400, ease = 'linear', callback, delay = 0) {
        return this.each(element => {
            const transitionValues = [];
            for (let prop in properties) {
                transitionValues.push(`${prop} ${duration}ms ${ease} ${delay}ms`);
            }

            element.style.transition = transitionValues.join(', ');

            // プロパティを適用して遷移をトリガーします
            setTimeout(() => {
                for (let prop in properties) {
                    element.style[prop] = properties[prop];
                }
            }, 0);

            const transitionEndHandler = function () {
                element.removeEventListener('transitionend', transitionEndHandler);
                // transitionプロパティをリセット
                element.style.transition = '';
                if (typeof callback === 'function') {
                    callback.call(element);
                }
            };

            element.addEventListener('transitionend', transitionEndHandler);
        });
    });

    $.extend('slideDown', function (duration, ease, callback, delay = 0) {
        const position = this.css('position');

        this.show().css({
            position: 'absolute',
            visibility: 'hidden'
        });


        const marginTop = this.css('margin-top');
        const marginBottom = this.css('margin-bottom');
        const paddingTop = this.css('padding-top');
        const paddingBottom = this.css('padding-bottom');
        const height = this.css('height');

        this.css({
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

})(slimQuery);