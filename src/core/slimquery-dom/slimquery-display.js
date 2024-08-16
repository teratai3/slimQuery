const { SlimQuery } = require('../slimquery-core.js');
// 表示状態を操作するメソッド

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
