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
        var target = selectors[source];

        if (target == 'body') {
            goog.global['document']['body'].innerHTML = contents[source];

        } else {
            var replacement = goog.dom.htmlToDocumentFragment(contents[source]);
            var original = goog.dom.query(target)[0];

            goog.dom.replaceNode(replacement, original);
        }
    }
};
