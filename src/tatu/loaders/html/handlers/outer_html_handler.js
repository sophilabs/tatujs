goog.provide('tatu.loaders.html.handlers.OuterHTMLHandler');


/**
 * Outer content handler.
 * @param {Element} container Container element.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.OuterHTMLHandler = function(container) {
    this.container_ = container;
};


tatu.loaders.html.handlers.OuterHTMLHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'outer', new tatu.loaders.html.handlers.OuterHTMLHandler(goog.global['document']['body']));
