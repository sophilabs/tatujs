goog.provide('tatu.loaders.DummyLoader');

goog.require('tatu.conf.Settings');
goog.require('tatu.conf.ElementSettings');
goog.require('tatu.Entry');
goog.require('tatu.utils');
goog.require('tatu.loaders.BaseLoader');
goog.require('tatu.loaders.DummyResource');
goog.require('goog.math');


/**
 * Dummy loader.
 * @param {tatu.conf.Settings} settings Loader Settings
 * @constructor
 * @inherits {tatu.loaders.ILoader}
 */
tatu.loaders.DummyLoader = function(settings) {
    tatu.loaders.BaseLoader.call(this, settings);

    /**
     * Resources
     * @type {Object.<string, *>}
     * @private
     */
    this.resources_ = {};
};
goog.inherits(tatu.loaders.DummyLoader, tatu.loaders.BaseLoader);


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element
 * @return {string} Resource ID
 */
tatu.loaders.DummyLoader.prototype.identify = function(element) {
    return 'dummy' + goog.math.randomInt(this.settings_.get('count'));
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.Entry} Queue entry
 */
tatu.loaders.DummyLoader.prototype.setup = function(element) {

    var id = this.identify(element);
    var settings = new tatu.conf.ElementSettings(element, this.settings_);

    /*
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.DummyResource();
        this.resources_[id] = resource;
    }
    */

    return new tatu.Entry(this, id, goog.math.randomInt(settings.get('max_priority')),
                          goog.math.randomInt(settings.get('max_timeout')));
};


tatu.loaders.DummyLoader.prototype.load = function(id, resolve, timeout) {
    var resource = this.resources_[id];
    setTimeout(function() {
        resolve();
    }, timeout);
};


tatu.loaders.DummyLoader.prototype.abort = function(id) {

};