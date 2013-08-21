goog.provide('tatu.loaders.ILoader');


/**
 * Loader interface.
 * @param settings Settings taken from global configuration.
 * @interface
 */
tatu.loaders.ILoader = function(settings) {};


/**
 * Setup a resource for the specified element.
 * @param {Element} element DOM element.
 * @return {tatu.Entry} Queue entry.
 */
tatu.loaders.ILoader.prototype.setup;


/**
 * Load a resource.
 * @param {string} id Resource ID.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.ILoader.prototype.load;


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 */
tatu.loaders.ILoader.prototype.abort;


goog.exportSymbol('tatu.loaders.ILoader', tatu.loaders.ILoader);