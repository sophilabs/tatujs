goog.provide('tatu.loaders.html.extractors.IExtractor');


/**
 * Content extractor.
 * @interface
 */
tatu.loaders.html.extractors.IExtractor = function() {};


/**
 * Extract content.
 * @param {string} document Whole HTML document.
 * @param {Array.<string>} sources Sources to extract.
 * @return {Object.<string, string>} Object containing outer HTML for each source.
 */
tatu.loaders.html.extractors.IExtractor.prototype.extract;
