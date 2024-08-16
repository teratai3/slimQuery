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