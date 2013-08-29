goog.provide('tatu.loaders.html.handlers.InnerHTMLHandler');


/**
 * Inner content handler.
 * @param {Element} container Container element.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.InnerHTMLHandler = function(container) {
    this.container_ = container;
};


tatu.loaders.html.handlers.InnerHTMLHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'inner', new tatu.loaders.html.handlers.InnerHTMLHandler(goog.global['document']['body']));
