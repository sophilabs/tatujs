goog.provide('tatu.loaders.html.extractors.ExtractorManager');

goog.require('tatu.Registry');


/**
 * Extractor manager.
 * @constructor
 */
tatu.loaders.html.extractors.ExtractorManager = function() {
    /**
     * Extractor registry.
     * @type {tatu.Registry.<tatu.loaders.html.extractors.IExtractor>}
     * @private
     */
    this.registry_ = new tatu.Registry();
};

goog.addSingletonGetter(tatu.loaders.html.extractors.ExtractorManager);


/**
 * Get extractor registry.
 * @return {tatu.Registry.<tatu.loaders.html.handlers.IExtractor>} Extractor registry.
 */
tatu.loaders.html.extractors.ExtractorManager.prototype.getRegistry = function() {
    return this.registry_;
};


goog.exportSymbol('tatu.loaders.html.extractors.ExtractorManager', tatu.loaders.html.extractors.ExtractorManager);
tatu.loaders.html.extractors.ExtractorManager.getInstance();