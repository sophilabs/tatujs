goog.provide('tatu.loaders.html.handlers.TitleHandler');


/**
 * Title handler.
 * @param {Window} window Window.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.TitleHandler = function(window) {
    this.window_ = window;
};


tatu.loaders.html.handlers.TitleHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'title', new tatu.loaders.html.handlers.TitleHandler(goog.global['window']));
