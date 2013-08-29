goog.provide('tatu.loaders.plain.extractors.DojoExtractor');

goog.require('goog.array');
goog.require('goog.dom');


/**
 * Extractor using Dojo implementation.
 * @implements {tatu.loaders.plain.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.plain.extractors.DojoExtractor = function() {
};


tatu.loaders.plain.extractors.DojoExtractor.prototype.extract = function(document, sources) {
    var contents = {};
    var fragment = goog.dom.htmlToDocumentFragment(document);

    goog.array.forEach(sources, function(query) {
        var element = goog.dom.query(query, fragment)[0];
        if (goog.isDef(element)) {
            contents[query] = goog.dom.getOuterHtml(element);
        }
    }, this);

    return contents;
};


tatu.loaders.plain.extractors.ExtractorManager.getInstance().getRegistry().register(
    'dojo', new tatu.loaders.plain.extractors.DojoExtractor());
