const { SlimQuery } = require('../slimquery-core.js');

SlimQuery.prototype.remove = function () {
    return this.each(element => {
        element.remove();
    });
};