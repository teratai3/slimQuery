const { SlimQuery: $ } = require('./slimquery-core.js');
//cssクラス操作関連のメソッドを定義
$.prototype.addClass = function (className) {
    return this.each(element => {
        element.classList.add(className);
    });
};

$.prototype.removeClass = function (className) {
    return this.each(element => {
        element.classList.remove(className);
    });
};

$.prototype.toggleClass = function (className) {
    return this.each(element => {
        element.classList.toggle(className);
    });
};

$.prototype.hasClass = function (className) {
    const elements = Array.from(this._getElements());
    return elements.some(element => {
        return element.classList.contains(className);
    });
};

$.prototype.css = function (property, value) {
    if (typeof property === 'object') {
        // オブジェクト形式でプロパティが指定された場合、複数のプロパティを設定
        return this.each(element => {
            for (let key in property) {
                if (property.hasOwnProperty(key)) {
                    element.style[key] = property[key];
                }
            }
        });
    } else if (value === undefined) {
        // 値が指定されていない場合、最初の要素のスタイルプロパティを取得
        const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;
        if (element) {
            return window.getComputedStyle(element)[property];
        }
        return undefined;
    } else {
        // 単一のプロパティが指定された場合
        return this.each(element => {
            element.style[property] = value;
        });
    }
};