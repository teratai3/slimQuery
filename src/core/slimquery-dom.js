const { SlimQuery, createSlimQuery } = require('./slimquery-core.js');
// DOM操作関連のメソッド
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

SlimQuery.prototype.hide = function () {
    return this.css('display', 'none');
};

SlimQuery.prototype.show = function () {
    return this.css('display', '');
};

SlimQuery.prototype.toggle = function () {
    return this.each(element => {
        const changeDisplay = window.getComputedStyle(element).display === 'none' ? 'block' : 'none';
        element.style.display = changeDisplay;
    });
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


SlimQuery.prototype.attr = function (name, value) {
    if (value === undefined) {
        const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;
        return element ? element.getAttribute(name) : undefined;
    } else {
        return this.each(element => {
            element.setAttribute(name, value);
        });
    }
};


SlimQuery.prototype.data = function (name, value) {
    if (value === undefined) {
        const element = this._getElements()[0];
        if (element) {
            return element.dataset[name];
        }
        return undefined;
    } else {
        return this.each(element => {
            element.dataset[name] = value;
        });
    }
};

SlimQuery.prototype.removeAttr = function (name) {
    return this.each(element => {
        element.removeAttribute(name);
    });
};

SlimQuery.prototype.prop = function (name, value) {
    if (value === undefined) {
        // 値が指定されていない場合、最初の要素のプロパティを取得して返す
        const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;
        if (element) {
            return element[name];
        }
        return undefined;
    } else {
        // 値が指定されている場合、各要素にプロパティを設定する
        return this.each(element => {
            element[name] = value;
        });
    }
};

SlimQuery.prototype.removeProp = function (name) {
    //jquery互換性のためremoveProp実装
    return this.removeAttr(name);
};


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


SlimQuery.prototype.remove = function () {
    return this.each(element => {
        element.remove();
    });
};

SlimQuery.prototype.scrollTop = function (value) {
    const element = this._getElements()[0];
    if (value === undefined) {
        // スクロール位置を取得
        return element.scrollTop || document.documentElement.scrollTop;
    } else {
        // スクロール位置を設定
        if (element.scrollTop !== undefined) {
            element.scrollTop = value;
        } else {
            document.documentElement.scrollTop = value;
        }
        return this;
    }
};

SlimQuery.prototype.scrollLeft = function (value) {
    const element = this._getElements()[0];

    if (value === undefined) {
        // スクロール位置を取得
        return element.scrollLeft || document.documentElement.scrollLeft;
    } else {
        // スクロール位置を設定
        if (element.scrollLeft !== undefined) {
            element.scrollLeft = value;
        } else {
            document.documentElement.scrollLeft = value;
        }
        return this;
    }
};


SlimQuery.prototype.text = function (value) {
    if (value === undefined) {
        return this.elements[0]?.textContent;
    } else {
        return this.each(element => {
            element.textContent = value;
        });
    }
};

SlimQuery.prototype.html = function (value) {
    if (value === undefined) {
        return this.elements[0]?.innerHTML;
    } else {
        return this.each(element => {
            element.innerHTML = value;
        });
    }
};

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


SlimQuery.prototype.val = function (selector) {
    if (value === undefined) {
        return element.elements[0]?.value ? element.elements[0].value : "";
    } else {
        return this.each(element => {
            element.value = value;
        });
    }
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


SlimQuery.prototype.wrap = function(wrapper) {
    return this.each(element => {
        let wrapperElement;
        
        if (typeof wrapper === 'string') {
            // HTML文字列から要素を作成
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = wrapper.trim();
            wrapperElement = tempDiv.firstChild;
        } else if (wrapper instanceof Element) {
            // DOM要素が渡された場合
            wrapperElement = wrapper.cloneNode(true);
        } else if (wrapper instanceof SlimQuery) {
            // SlimQueryオブジェクトが渡された場合
            wrapperElement = wrapper._getElements()[0].cloneNode(true);
        }

        // 元の要素をラップする
        const parent = element.parentNode;
        if (parent) {
            parent.insertBefore(wrapperElement, element);
        }
        wrapperElement.appendChild(element);
    });
};


SlimQuery.prototype.height = function(value) {
    if (value === undefined) {
        // 値が指定されていない場合、高さを取得
        const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;
        if (element) {
            return element.clientHeight; // paddingを含む高さ
        }
        return undefined;
    } else {
        // 値が指定されている場合、高さを設定
        return this.each(element => {
            element.style.height = typeof value === 'number' ? `${value}px` : value;
        });
    }
};


SlimQuery.prototype.width = function(value) {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (value === undefined) {
        // 値が指定されていない場合、幅を取得
        if (element === window) {
            return window.innerWidth; // windowオブジェクトの場合
        } else if (element) {
            return element.clientWidth; // paddingを含む幅
        }
        return undefined;
    } else {
        // 値が指定されている場合、幅を設定
        return this.each(element => {
            if (element !== window) { // windowには幅を設定できないので除外
                element.style.width = typeof value === 'number' ? `${value}px` : value;
            }
        });
    }
};


SlimQuery.prototype.height = function(value) {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (value === undefined) {
        // 高さを取得
        if (element === window) {
            return window.innerHeight; // windowオブジェクトの場合
        } else if (element) {
            return element.clientHeight; // paddingを含む高さ
        }
        return undefined;
    } else {
        // 高さを設定
        return this.each(element => {
            if (element !== window) { // windowには高さを設定できないので除外
                element.style.height = typeof value === 'number' ? `${value}px` : value;
            }
        });
    }
};


SlimQuery.prototype.innerHeight = function() {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (element === window) {
        return window.innerHeight; // windowオブジェクトの場合
    } else if (element) {
        return element.clientHeight; // paddingを含む高さ
    }
    return undefined;
};


SlimQuery.prototype.innerWidth = function() {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (element === window) {
        return window.innerWidth; // windowオブジェクトの場合
    } else if (element) {
        return element.clientWidth; // paddingを含む幅
    }
    return undefined;
};

SlimQuery.prototype.outerHeight = function(includeMargin) {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (element === window) {
        return window.outerHeight; // windowオブジェクトの場合
    } else if (element) {
        let height = element.offsetHeight; // paddingとborderを含む高さ
        if (includeMargin) {
            const style = getComputedStyle(element);
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        }
        return height;
    }
    return undefined;
};


SlimQuery.prototype.outerWidth = function(includeMargin) {
    const element = this._getElements() && this._getElements().length > 0 ? this._getElements()[0] : undefined;

    if (element === window) {
        return window.outerWidth; // windowオブジェクトの場合
    } else if (element) {
        let width = element.offsetWidth; // paddingとborderを含む幅
        if (includeMargin) {
            const style = getComputedStyle(element);
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        }
        return width;
    }
    return undefined;
};



//静的メソッド
Object.defineProperty(SlimQuery.prototype, 'length', {
    get: function () {
        return this._getElements().length;
    }
});