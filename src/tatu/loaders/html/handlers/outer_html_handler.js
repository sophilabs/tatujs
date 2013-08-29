goog.provide('tatu.loaders.html.handlers.OuterHTMLHandler');


/**
 * Outer content handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.OuterHTMLHandler = function() {
};


tatu.loaders.html.handlers.OuterHTMLHandler.prototype.handle = function(selectors, contents, href, handlers) {
    for (var source in selectors) {
        var replacement = goog.dom.htmlToDocumentFragment(contents[source]);
        var original = goog.dom.query(selectors[source])[0];

        goog.dom.replaceNode(replacement, original);
    }
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'outer', new tatu.loaders.html.handlers.OuterHTMLHandler());
