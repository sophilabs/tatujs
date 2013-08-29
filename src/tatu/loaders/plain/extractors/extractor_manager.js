goog.provide('tatu.loaders.plain.extractors.ExtractorManager');

goog.require('tatu.Registry');


/**
 * Extractor manager.
 * @constructor
 */
tatu.loaders.plain.extractors.ExtractorManager = function() {
    /**
     * Extractor registry.
     * @type {tatu.Registry.<tatu.loaders.plain.extractors.IExtractor>}
     * @private
     */
    this.registry_ = new tatu.Registry();
};

goog.addSingletonGetter(tatu.loaders.plain.extractors.ExtractorManager);


/**
 * Get extractor registry.
 * @returns {tatu.Registry.<tatu.loaders.plain.handlers.IExtractor>} Extractor registry.
 */
tatu.loaders.plain.extractors.ExtractorManager.prototype.getRegistry = function() {
    return this.registry_;
};


goog.exportSymbol('tatu.loaders.plain.extractors.ExtractorManager', tatu.loaders.plain.extractors.ExtractorManager);
tatu.loaders.plain.extractors.ExtractorManager.getInstance();