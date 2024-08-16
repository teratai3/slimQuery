const { SlimQuery } = require('./slimquery-core.js');
//cssクラス操作関連のメソッドを定義
SlimQuery.prototype.addClass = function(className) {
    return this.each(element => {
        element.classList.add(className);
    });
};

SlimQuery.prototype.removeClass = function(className) {
    return this.each(element => {
        element.classList.remove(className);
    });
};

SlimQuery.prototype.toggleClass = function(className) {
    return this.each(element => {
        element.classList.toggle(className);
    });
};

SlimQuery.prototype.hasClass = function(className) {
    const elements = Array.from(this._getElements()); 
    return elements.some(element => {
        return element.classList.contains(className);
    });
};

SlimQuery.prototype.css = function (property, value) {
    if (value === undefined) {
        // 値が指定されていない場合、最初の要素のスタイルプロパティを取得
        const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;
        if (element) {
            return window.getComputedStyle(element)[property];
        }
        return undefined;
    } else {
        // 値が指定されている場合、各要素のスタイルプロパティを設定
        return this.each(element => {
            element.style[property] = value;
        });
    }
};