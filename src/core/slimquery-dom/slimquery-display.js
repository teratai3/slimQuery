const { SlimQuery: $ } = require('../slimquery-core.js');
// 表示状態を操作するメソッド
$.prototype.hide = function () {
    return this.css('display', 'none');
};

$.prototype.show = function () {
    return this.css('display', '');
};

$.prototype.toggle = function () {
    return this.each(element => {
        const changeDisplay = window.getComputedStyle(element).display === 'none' ? 'block' : 'none';
        element.style.display = changeDisplay;
    });
};