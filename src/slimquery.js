(function (global) {
    //即時関数を実行してなるべく、グローバル汚染をさける
    class SlimQuery {
        #elements; //2022の新機能プライベート
        constructor(selector) {
            if (typeof selector === 'function') {
                this.#ready(selector);
            }else if (typeof selector === 'object'){
                this.#elements = [selector]; //thisの場合
            } else {
                this.#elements = document.querySelectorAll(selector);
            }
        }

        each(callback) {
            this.#elements.forEach((element, index) => {
                callback.call(element, element, index);
            });
            return this;
        }

        css(property, value) {
            this.each(element => {
                element.style[property] = value;
            });
            return this;
        }

        on(event, callback) {
            //区切ってイベントをループさせる
            const events = event.split(' ');
            events.forEach(e => {
                this.each(element => {
                    element.addEventListener(e, callback);
                });
            });
            return this;
        }

        addClass(className) {
            this.each(element => {
                element.classList.add(className);
            });
            return this;
        }

        removeClass(className) {
            this.each(element => {
                element.classList.remove(className);
            });
            return this;
        }

        #ready(callback) {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                // ドキュメントが既に準備できている場合はすぐに実行
                callback();
            } else {
                // まだ準備ができていない場合はDOMContentLoadedを待つ
                document.addEventListener('DOMContentLoaded', callback);
            }
        }
    }

    // SlimQueryクラスをインスタンス化するためのラッパー関数
    const slimQuery = (selector) => new SlimQuery(selector);
    // グローバルスコープにエクスポート
    global.slimQuery = slimQuery;
})(window);
