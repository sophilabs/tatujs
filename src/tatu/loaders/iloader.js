goog.provide('tatu.loaders.ILoader');


/**
 * Loader interface.
 * @param {tatu.Registry.<Function>} loaders Loader classes.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @interface
 */
tatu.loaders.ILoader = function(loaders, settings) {};


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element DOM element.
 * @return {string} Resource ID
 */
tatu.loaders.ILoader.prototype.identify;


/**
 * Setup a resource for the specified element.
 * @param {Element} element DOM element.
 * @return {tatu.queue.Entry} Queue entry.
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