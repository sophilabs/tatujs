goog.provide('tatu.loaders.BaseLoader');

goog.require('tatu.loaders.ILoader');
goog.require('tatu.Registry');


/**
 * Base loader.
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
     * @type {tatu.loaders.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.loaders.LoaderManager(this.settings_);

    /**
     * Resources
     * @type {tatu.Registry.<tatu.loaders.IResource>}
     * @private
     */
    this.resources_ = new tatu.Registry();
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
    this.resources_.get(id).load(resolve);
};


/**
 * Abort a resource.
 * @param {string} id Resource ID.
 * @return {void} Nothing.
 */
tatu.loaders.BaseLoader.prototype.abort = function(id) {
    this.resources_.get(id).abort();
};


/**
 * Get resource count.
 * @return {number} Resource count.
 */
tatu.loaders.BaseLoader.prototype.getResourceCount = function() {
    return this.resources_.count();
};


goog.exportSymbol('tatu.loaders.BaseLoader', tatu.loaders.BaseLoader);
