goog.provide('tatu.loaders.plain.handlers.InnerHTMLHandler');


/**
 * Inner content handler.
 * @param {Element} container Container element.
 * @implements {tatu.loaders.plain.handlers.IHandler}
 * @constructor
 */
tatu.loaders.plain.handlers.InnerHTMLHandler = function(container) {
    this.container_ = container;
};


tatu.loaders.plain.handlers.InnerHTMLHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry().register(
    'inner', new tatu.loaders.plain.handlers.InnerHTMLHandler(goog.global['document']['body']));
