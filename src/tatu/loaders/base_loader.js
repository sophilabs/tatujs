goog.provide('tatu.loaders.BaseLoader');

goog.require('tatu.loaders.ILoader');


/**
 * Base loader..
 * @param {tatu.Registry.<Function>} loaders Loader classes.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @implements {tatu.loaders.ILoader}
 * @constructor
 */
tatu.loaders.BaseLoader = function(loaders, settings) {
    /**
     * Loader classes registry.
     * @type {tatu.Registry.<Function>}
     * @private
     */
    this.loaders_ = loaders;

    /**
     * Settings.
     * @type {tatu.conf.LoaderSettings}
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