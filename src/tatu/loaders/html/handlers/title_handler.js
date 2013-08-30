goog.provide('tatu.loaders.html.handlers.TitleHandler');

goog.require('tatu.loaders.html.handlers.HandlerManager');


/**
 * Title handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.TitleHandler = function() {
};


tatu.loaders.html.handlers.TitleHandler.prototype.handle = function(selectors, contents, href, handlers) {
    document.title = contents['title'];
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'title', new tatu.loaders.html.handlers.TitleHandler());
