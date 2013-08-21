goog.provide('tatu.loaders.BaseLoader');

goog.require('tatu.loaders.ILoader');


/**
 * Loader interface.
 * @param settings Settings taken from global configuration.
 * @implements {tatu.loaders.ILoader}
 * @constructor
 */
tatu.loaders.BaseLoader = function(settings) {
    /**
     * Settings
     * @type {tatu.Settings}
     * @private
     */
    this.settings_ = settings;
};


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element DOM element.
 * @return {string} Resource ID
 */
tatu.loaders.BaseLoader.prototype.identify = function(element) {
    throw Error('Not Implemented');
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element DOM element.
 * @return {tatu.Entry} Queue Entry.
 */
tatu.loaders.BaseLoader.prototype.setup = function(element) {
    throw Error('Not Implemented');
};


/**
 * Load a resource.
 * @param {string} id Resource ID.
 * @param {Function} resolve Resolution callback.
 * @param {number} timeout Timeout.
 */
tatu.loaders.BaseLoader.prototype.load = function(id, resolve, timeout) {
    throw Error('Not Implemented');
};


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 * @return {void} Nothing.
 */
tatu.loaders.BaseLoader.prototype.abort = function(id) {
    throw Error('Not Implemented');
};