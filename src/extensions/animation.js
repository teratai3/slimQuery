(function ($) {
    $.extend('animate', function (properties, duration = 400, ease = 'linear', callback, delay = 0) {
        return this.each(element => {
            const transitionValues = [];
            for (let prop in properties) {
                transitionValues.push(`${prop} ${duration}ms ${ease} ${delay}ms`);
            }

            element.style.transition = transitionValues.join(', ');

            // transitionを適用した後にアニメーションが開始されない可能性があるのでsetTimeout 0をいれるハック
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
})(slimQuery);