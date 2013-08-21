goog.provide('tatu.loaders.DummyLoader');

goog.require('tatu.Settings');
goog.require('tatu.Entry');
goog.require('tatu.utils');
goog.require('tatu.loaders.BaseLoader');
goog.require('tatu.loaders.DummyResource');


/**
 * Dummy loader.
 * @param {tatu.Settings} settings Loader Settings
 * @constructor
 * @inherits {tatu.loaders.ILoader}
 */
tatu.loaders.DummyLoader = function(settings) {
    tatu.loaders.DummyLoader.call(this, settings);

    /**
     * Resources
     * @type {Object.<string, *>}
     * @private
     */
    this.resources_ = {};
};
goog.inherits(tatu.loaders.DummyLoader, tatu.loaders.BaseLoader);


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.Entry} Queue entry
 */
tatu.loaders.DummyLoader.prototype.setup = function(element) {

    var id = 'dummy';

    // var settings = new tatu.Settings(this, element);
    // Get additional settings using settings.get(<setting name>)
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.DummyResource();
        this.resources_[id] = resource;
    }
    return new tatu.Entry();
};


tatu.loaders.DummyLoader.prototype.load = function(id, resolve, timeout) {
    var resource = this.resources_[id];
    setTimeout(function() {
        resolve(resource);
    }, timeout);
};


tatu.loaders.DummyLoader.prototype.abort = function(id) {

};