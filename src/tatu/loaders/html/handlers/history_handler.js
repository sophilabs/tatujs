goog.provide('tatu.loaders.html.handlers.HistoryHandler');


/**
 * History handler.
 * @param {Window} window Window.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.HistoryHandler = function(window) {
    this.window_ = window;
};


tatu.loaders.html.handlers.HistoryHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'history', new tatu.loaders.html.handlers.HistoryHandler(goog.global));
