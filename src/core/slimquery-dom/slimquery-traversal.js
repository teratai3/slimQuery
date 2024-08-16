const { SlimQuery, createSlimQuery } = require('../slimquery-core.js');
//親要素、子要素、兄弟要素などの移動に関連するメソッド

SlimQuery.prototype.siblings = function () {
    const siblingsArray = [];
    this.each(element => {
        // `sibling !== element` の条件により、現在の要素 (`element`) は兄弟リストから除外されます。
        let siblingElements = Array.from(element.parentNode.children).filter(sibling => sibling !== element);
        siblingsArray.push(...siblingElements);
    });

    return createSlimQuery(siblingsArray);
};


SlimQuery.prototype.children = function (selector) {
    const childrenElements = [];
    this.each(element => {
        let children = Array.from(element.children); // 子要素を配列に変換

        if (selector) {
            children = children.filter(child => child.matches(selector)); // セレクタでフィルタリング
        }

        childrenElements.push(...children); // フィルタリングした子要素を追加

    });

    return createSlimQuery(childrenElements);
};

SlimQuery.prototype.find = function (selector) {
    const findElements = [];
    this.each(element => {
        let nodeList = element.querySelectorAll(selector);
        findElements.push(...Array.from(nodeList));
    });

    return createSlimQuery(findElements);
};


SlimQuery.prototype.prev = function (selector) {
    const prevElements = [];

    this.each(element => {
        let prevElement = element.previousElementSibling;

        if (prevElement && (!selector || prevElement.matches(selector))) {
            prevElements.push(prevElement);
        }
    });

    return createSlimQuery(prevElements);
};


SlimQuery.prototype.next = function (selector) {
    const nextElements = [];

    this.each(element => {
        let nextElement = element.nextElementSibling;

        if (nextElement && (!selector || nextElement.matches(selector))) {
            nextElements.push(nextElement);
        }
    });

    return createSlimQuery(nextElements);
};

SlimQuery.prototype.first = function() {
    const elements = this._getElements();
    return createSlimQuery(elements.length > 0 ? [elements[0]] : []);
};

SlimQuery.prototype.last = function() {
    const elements = this._getElements();
    return createSlimQuery(elements.length > 0 ? [elements[elements.length - 1]] : []);
};

SlimQuery.prototype.eq = function(index) {
    const elements = this._getElements();
    return createSlimQuery(index >= 0 && index < elements.length ? [elements[index]] : []);
};


SlimQuery.prototype.parent = function (selector) {
    const parents = [];
    this.each(element => {
        const parent = element.parentElement;
        //セレクターが無い場合はparentのみで判定
        if (parent && (!selector || parent.matches(selector))) {
            parents.push(parent);
        }
    });

    return createSlimQuery(parents); //対象セレクタとする
};


SlimQuery.prototype.parents = function (selector) {
    const parents = [];

    this.each(element => {
        let parent = element.parentElement;
        while (parent) {
            if (!parents.includes(parent) && (!selector || parent.matches(selector))) {
                parents.push(parent);
                break;
            }
            parent = parent.parentElement;
        }
    });

    return createSlimQuery(parents);
};