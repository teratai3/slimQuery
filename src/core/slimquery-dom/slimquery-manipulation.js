const { SlimQuery: $ } = require('../slimquery-core.js');
// 属性やコンテンツの取得・設定に関連するメソッド

$.prototype.text = function (value) {
    if (value === undefined) {
        return this.elements[0]?.textContent;
    } else {
        return this.each(element => {
            element.textContent = value;
        });
    }
};

$.prototype.html = function (value) {
    if (value === undefined) {
        return this.elements[0]?.innerHTML;
    } else {
        return this.each(element => {
            element.innerHTML = value;
        });
    }
};



$.prototype.val = function (selector) {
    if (value === undefined) {
        return element.elements[0]?.value ? element.elements[0].value : "";
    } else {
        return this.each(element => {
            element.value = value;
        });
    }
};


$.prototype.attr = function (name, value) {
    if (value === undefined) {
        const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;
        return element ? element.getAttribute(name) : undefined;
    } else {
        return this.each(element => {
            element.setAttribute(name, value);
        });
    }
};


$.prototype.data = function (name, value) {
    if (value === undefined) {
        const element = this.elements[0];
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

$.prototype.removeAttr = function (name) {
    return this.each(element => {
        element.removeAttribute(name);
    });
};

$.prototype.prop = function (name, value) {
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

$.prototype.removeProp = function (name) {
    //jquery互換性のためremoveProp実装
    return this.removeAttr(name);
};

$.prototype.wrap = function (wrapper) {
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
            wrapperElement = wrapper.elements[0].cloneNode(true);
        }

        // 元の要素をラップする
        const parent = element.parentNode;
        if (parent) {
            parent.insertBefore(wrapperElement, element);
        }
        wrapperElement.appendChild(element);
    });
};


$.prototype.height = function (value) {
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


$.prototype.width = function (value) {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

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


$.prototype.height = function (value) {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

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


$.prototype.innerHeight = function () {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

    if (element === window) {
        return window.innerHeight; // windowオブジェクトの場合
    } else if (element) {
        return element.clientHeight; // paddingを含む高さ
    }
    return undefined;
};


$.prototype.innerWidth = function () {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

    if (element === window) {
        return window.innerWidth; // windowオブジェクトの場合
    } else if (element) {
        return element.clientWidth; // paddingを含む幅
    }
    return undefined;
};

$.prototype.outerHeight = function (includeMargin) {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

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


$.prototype.outerWidth = function (includeMargin) {
    const element = this.elements && this.elements.length > 0 ? this.elements[0] : undefined;

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


$.prototype.scrollTop = function (value) {
    const element = this.elements[0];
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

$.prototype.scrollLeft = function (value) {
    const element = this.elements[0];

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

$.prototype.offset = function () {
    // 位置情報を取得する場合
    const element = this.elements[0];

    if (!element.getClientRects().length) {
        // 非表示などの場合は、getClientRectsは0を返すので returnするように
        return { top: 0, left: 0 };
    }

    const rect = element.getBoundingClientRect();

    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
}