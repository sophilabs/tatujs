goog.provide('tatu.loaders.BaseLoader');

goog.require('tatu.loaders.ILoader');


/**
 * Base loader..
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @implements {tatu.loaders.ILoader}
 * @constructor
 */
tatu.loaders.BaseLoader = function(settings) {
    /**
     * Settings.
     * @type {tatu.conf.LoaderSettings}
     * @private
     */
    this.settings_ = settings;

    /**
     * Nested loader manager.
     * @type {tatu.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.LoaderManager(this.settings_);

    /**
     * Resources
     * @type {Object.<string, tatu.loaders.IResource>}
     * @private
     */
    this.resources_ = {};
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
 * @return {tatu.queue.Entry} Queue Entry.
 */
tatu.loaders.BaseLoader.prototype.setup = function(element) {
    throw Error('Not Implemented');
};


/**
 * Load a resource.
 * @param {string} id Resource ID.
 * @param {Function} resolve Resolution callback.
 */
tatu.loaders.BaseLoader.prototype.load = function(id, resolve) {
    var resource = this.resources_[id];
    resource.load(resolve);
};


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 * @return {void} Nothing.
 */
tatu.loaders.BaseLoader.prototype.abort = function(id) {
    var resource = this.resources_[id];
    resource.abort();
};