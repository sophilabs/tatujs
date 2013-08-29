goog.provide('tatu.loaders.plain.handlers.OuterHTMLHandler');


/**
 * Outer content handler.
 * @param {Element} container Container element.
 * @implements {tatu.loaders.plain.handlers.IHandler}
 * @constructor
 */
tatu.loaders.plain.handlers.OuterHTMLHandler = function(container) {
    this.container_ = container;
};


tatu.loaders.plain.handlers.OuterHTMLHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry().register(
    'outer', new tatu.loaders.plain.handlers.OuterHTMLHandler(goog.global['document']['body']));
