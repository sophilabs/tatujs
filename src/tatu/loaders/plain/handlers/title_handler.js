goog.provide('tatu.loaders.plain.handlers.TitleHandler');


/**
 * Title handler.
 * @implements {tatu.loaders.plain.handlers.IHandler}
 * @constructor
 */
tatu.loaders.plain.handlers.TitleHandler = function(window) {
    this.window_ = window;
};


tatu.loaders.plain.handlers.TitleHandler.prototype.handle = function(selectors, contents, href, handlers) {
};


tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry().register(
    'title', new tatu.loaders.plain.handlers.TitleHandler(goog.global['window']));
