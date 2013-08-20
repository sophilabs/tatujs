goog.provide('tatu.loaders.ILoader');


/**
 * Loader interface.
 * @param settings Settings taken from global configuration.
 * @interface
 */
tatu.loaders.ILoader = function(settings) {};


/**
 * Get setting value.
 * @param {string} setting Setting name.
 */
tatu.loaders.ILoader.prototype.getSetting = function(name) {};


/**
 * Set setting value.
 * @param {string} setting Setting name.
 * @param {*} value Value.
 */
tatu.loaders.ILoader.prototype.setSetting = function(name, value) {};


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
 */
tatu.loaders.ILoader.prototype.load = function(id, resolve) {};


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 */
tatu.loaders.ILoader.prototype.abort = function(id) {};


goog.exportSymbol('tatu.loaders.ILoader', tatu.loaders.ILoader);