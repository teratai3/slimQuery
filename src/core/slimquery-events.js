const { SlimQuery: $ } = require('./slimquery-core.js');
// イベント関連のメソッド
$.prototype.on = function (event, callback) {
    //アロー演算子だとthisの参照ができなくなる
    const events = event.split(' ');  //区切ってイベントをループさせてjquery風の書き方ができるように
    return this.each(element => {
        events.forEach(e => {
            element.addEventListener(e, callback);
        });
    });
};

$.prototype.off = function (event, callback) {
    const events = event.split(' '); // イベントをスペースで区切って複数のイベントに対応
    return this.each(element => {
        events.forEach(e => {
            element.removeEventListener(e, callback);
        });
    });
};

$.prototype.trigger = function(eventType, extraParameters) {
    return this.each(element => {
        let event = new Event(eventType, {
            bubbles: true,
            cancelable: true
        });

        // extraParametersが存在する場合、そのパラメータをイベントに追加
        if (extraParameters) {
            for (let key in extraParameters) {
                if (extraParameters.hasOwnProperty(key)) {
                    event[key] = extraParameters[key];
                }
            }
        }

        element.dispatchEvent(event);
    });
};
