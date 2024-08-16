const { SlimQuery } = require('../slimquery-core.js');
// 要素を追加する操作に関連するメソッド
SlimQuery.prototype.append = function (content) {
    return this.each(element => {
        if (typeof content === 'string') {
            element.insertAdjacentHTML('beforeend', content); // HTMLやテキストを追加
        } else if (content instanceof Element) {
            element.appendChild(content); // DOM要素を追加
        } else if (content instanceof SlimQuery) {
            // SlimQueryオブジェクトの場合、各要素を追加
            content.each(function (childElement) {
                element.appendChild(childElement);
            });
        }
    });
};

SlimQuery.prototype.prepend = function (content) {
    return this.each(element => {
        if (typeof content === 'string') {
            element.insertAdjacentHTML('afterbegin', content); // HTMLやテキストを先頭に挿入
        } else if (content instanceof Element) {
            element.insertBefore(content, element.firstChild); // 単一のDOM要素を先頭に挿入
        } else if (content instanceof SlimQuery) {
            content.each(childElement => {
                element.insertBefore(childElement, element.firstChild); // SlimQueryオブジェクトを先頭に挿入
            });
        }
    });
};

SlimQuery.prototype.before = function (content) {
    return this.each(element => {
        if (typeof content === 'string') {
            element.insertAdjacentHTML('beforebegin', content); // HTMLやテキストを追加
        } else if (content instanceof Element) {
            element.parentNode.insertBefore(content, element); // 単一のDOM要素を追加
        } else if (content instanceof SlimQuery) {
            content.each(childElement => {
                element.parentNode.insertBefore(childElement, element); // SlimQueryオブジェクトを追加
            });
        }
    });
};

SlimQuery.prototype.after = function (content) {
    return this.each(element => {
        if (typeof content === 'string') {
            element.insertAdjacentHTML('afterend', content); // HTMLやテキストを追加
        } else if (content instanceof Element) {
            element.parentNode.insertBefore(content, element.nextSibling); // 単一のDOM要素を追加
        } else if (content instanceof SlimQuery) {
            content.each(childElement => {
                element.parentNode.insertBefore(childElement, element.nextSibling); // SlimQueryオブジェクトを追加
            });
        }
    });
};