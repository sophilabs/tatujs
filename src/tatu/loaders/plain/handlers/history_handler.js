goog.provide('tatu.loaders.plain.handlers.HistoryHandler');


/**
 * History handler.
 * @implements {tatu.loaders.plain.handlers.IHandler}
 * @constructor
 */
tatu.loaders.plain.handlers.HistoryHandler = function(window) {
    this.window_ = window;
};


tatu.loaders.plain.handlers.HistoryHandler.prototype.handle = function(selectors, contents, href, handlers) {
};


tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry().register(
    'history', new tatu.loaders.plain.handlers.HistoryHandler(goog.global['window']));
