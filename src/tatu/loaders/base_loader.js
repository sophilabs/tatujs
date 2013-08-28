goog.provide('tatu.loaders.BaseLoader');

goog.require('tatu.loaders.ILoader');
goog.require('tatu.Registry');


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
     * @type {tatu.Registry.<tatu.loaders.IResource>}
     * @private
     */
    this.resources_ = new tatu.Registry();
};


/**
 * Get or register a resource.
 * @param {string} id Resource ID.
 * @param {tatu.loaders.IResource} resource Resource instance.
 * @return {tatu.loaders.IResource} Resource for that ID.
 */
tatu.loaders.BaseLoader.prototype.getOrRegister = function(id, resource) {
    var resource_ = this.resources_.get(id);
    if (resource_ == undefined) {
        this.resources_.register(id, resource);
        return resource;
    } else {
        return resource_;
    }
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


goog.exportSymbol('tatu.loaders.BaseLoader', tatu.loaders.BaseLoader);
