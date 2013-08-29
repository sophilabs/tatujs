goog.provide('tatu.loaders.html.handlers.InnerHTMLHandler');

goog.require('goog.dom');


/**
 * Inner content handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.InnerHTMLHandler = function() {
};


tatu.loaders.html.handlers.InnerHTMLHandler.prototype.handle = function(selectors, contents, href, handlers) {
    for (var source in selectors) {
        var replacement = goog.dom.htmlToDocumentFragment(contents[source]);
        var original = goog.dom.query(selectors[source], goog.global['document']['body'])[0];

        original.innerHTML = replacement.innerHTML;
    }
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'inner', new tatu.loaders.html.handlers.InnerHTMLHandler());
