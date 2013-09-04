goog.provide('tatu.loaders.html.extractors.DojoExtractor');

goog.require('tatu.utils');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.query');


/**
 * Extractor using Dojo implementation.
 * @implements {tatu.loaders.html.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.html.extractors.DojoExtractor = function() {
};


tatu.loaders.html.extractors.DojoExtractor.prototype.extract = function(document, sources) {
    var contents = {};

    var fragment = tatu.utils.createFragment(document);

    goog.array.forEach(sources, function(query) {
        var element = goog.dom.query(query, fragment)[0];
        if (goog.isDef(element)) {
            contents[query] = goog.dom.getOuterHtml(element);
        }
    }, this);

    return contents;
};
