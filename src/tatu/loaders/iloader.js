goog.provide('tatu.loaders.ILoader');


/**
 * Loader interface.
 * @interface
 */
tatu.loaders.ILoader = function() {};


/**
 * Get a resource ID for the specified element.
 * @param {Element} element DOM element.
 * @return {string} Resource ID.
 */
tatu.loaders.ILoader.prototype.identify = function(element) {};


/**
 * Setup a resource for the specified element.
 * @param {Element} element DOM element.
 * @return {string} Resource ID.
 */
tatu.loaders.ILoader.prototype.setup = function(element) {};


/**
 * Load a resource.
 * @param {string} id Resource ID.
 * @param {function} resolve Resolution callback.
 * @param {int} timeout Timeout.
 */
tatu.loaders.ILoader.prototype.load = function(id, resolve, timeout) {};


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 */
tatu.loaders.ILoader.prototype.abort = function(id) {};


goog.exportSymbol('tatu.loaders.ILoader', tatu.loaders.ILoader);