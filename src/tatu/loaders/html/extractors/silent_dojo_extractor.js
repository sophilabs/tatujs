goog.provide('tatu.loaders.html.extractors.SilentDojoExtractor');

goog.require('tatu.loaders.html.extractors.ExtractorManager');


/**
 * Dojo extractor with workaround to avoid transitory autoplay of video and audio tags.
 * @implements {tatu.loaders.html.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.html.extractors.SilentDojoExtractor = function() {
};


tatu.loaders.html.extractors.SilentDojoExtractor.prototype.extract = function(document, sources) {
    var contents = {};

    var ORIGINAL = 'autoplay';
    var TRANSITORY = '__x__autoplay__';

    document = document.replace(ORIGINAL, TRANSITORY);

    var fragment = goog.dom.htmlToDocumentFragment(document);

    goog.array.forEach(sources, function(query) {
        var element = goog.dom.query(query, fragment)[0];
        if (goog.isDef(element)) {
            contents[query] = goog.dom.getOuterHtml(element).replace(TRANSITORY, ORIGINAL);
        }
    }, this);

    return contents;
};


tatu.loaders.html.extractors.ExtractorManager.getInstance().getRegistry().register(
    'silentdojo', new tatu.loaders.html.extractors.SilentDojoExtractor());