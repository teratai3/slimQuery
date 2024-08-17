// コア機能
require('./core/slimquery-core.js');

// css関連
require('./core/slimquery-css.js');

// イベント関連
require('./core/slimquery-events.js');

//dom関連
require('./core/slimquery-dom/slimquery-append.js');
require('./core/slimquery-dom/slimquery-display.js');
require('./core/slimquery-dom/slimquery-manipulation.js');
require('./core/slimquery-dom/slimquery-remove.js');
require('./core/slimquery-dom/slimquery-traversal.js');

// 拡張機能 必要に応じて(jqueryのプラグイン相当)
require('./extensions/animation.js');
require('./extensions/slide-transition.js');