goog.provide('tatu.loaders.html.extractors.DojoExtractor');

goog.require('goog.array');
goog.require('goog.dom');


/**
 * Extractor using Dojo implementation.
 * @implements {tatu.loaders.html.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.html.extractors.DojoExtractor = function() {
};


tatu.loaders.html.extractors.DojoExtractor.prototype.extract = function(document, sources) {
    var contents = {};

    var fragment = goog.global['document']['implementation']['createHTMLDocument']('');
    fragment['documentElement'].innerHTML = document;

    goog.array.forEach(sources, function(query) {
        var element = goog.dom.query(query, fragment)[0];
        if (goog.isDef(element)) {
            contents[query] = goog.dom.getOuterHtml(element);
        }
    }, this);

    return contents;
};
