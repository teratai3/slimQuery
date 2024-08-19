(function (global) {
    "use strict";
    class SlimQuery {
        #elements; // 2022の新機能プライベート
        constructor(selector) {
            if (selector === window) {
                this.#elements = [window]; // windowオブジェクトが渡された場合
            } else {
                switch (typeof selector) {
                    case 'function':
                        this.#ready(selector);
                        break;
                    case 'object':
                        if (Array.isArray(selector)) {
                            this.#elements = selector; // 配列が渡された場合
                        } else if (selector instanceof Element) {
                            this.#elements = [selector]; // 単一のDOM要素が渡された場合 (thisなど)
                        } else {
                            console.error('不明な、オブジェクトでセレクタを指定しました');
                            this.#elements =  []; // 不明なオブジェクトの場合は空の配列
                        }
                        break;
                    default:
                        this.#elements = document.querySelectorAll(selector);
                }
            }
        }

        get elements() {
            //getのみを提供
            return this.#elements;
        }

        each(callback) {
            this.#elements.forEach((element, index) => {
                callback.call(element, element, index);
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

        get length(){
            return this.#elements.length;
        }

        // 静的メソッドで、プラグイン機能を追加
        static extend(name, method) {
            SlimQuery.prototype[name] = method;
        }
    }

    // //静的メソッド そのままプロパティで設定
    // Object.defineProperty(SlimQuery.prototype, 'length', {
    //     get: function () {
    //         return this.elements.length;
    //     }
    // });

    // SlimQueryクラスをインスタンス化するためのラッパー関数
    const createSlimQuery = selector => new SlimQuery(selector);
    // グローバルスコープにエクスポート
    global.slimQuery = createSlimQuery;
    global.slimQuery.extend = SlimQuery.extend;

    // エクスポート
    module.exports = { SlimQuery, createSlimQuery };
})(window);