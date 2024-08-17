const { SlimQuery: $ } = require('../slimquery-core.js');

$.prototype.remove = function () {
    return this.each(element => {
        element.remove();
    });
};

$.prototype.empty = function () {
    return this.each(element => {
        element.textContent = '';
    });
};