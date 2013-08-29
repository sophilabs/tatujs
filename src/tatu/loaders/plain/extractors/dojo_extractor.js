goog.provide('tatu.loaders.plain.extractors.DojoExtractor');


/**
 * Extractor using Dojo implementation.
 * @implements {tatu.loaders.plain.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.plain.extractors.DojoExtractor = function() {
};


tatu.loaders.plain.extractors.DojoExtractor.prototype.extract = function(document, sources) {
};


tatu.loaders.plain.extractors.ExtractorManager.getInstance().getRegistry().register(
    'dojo', new tatu.loaders.plain.extractors.DojoExtractor());
