goog.provide('tatu.loaders.dummy.DummyLoader');

goog.require('tatu.conf.Settings');
goog.require('tatu.conf.ElementSettings');
goog.require('tatu.queue.Entry');
goog.require('tatu.queue.EntryEvent');
goog.require('tatu.utils');
goog.require('tatu.loaders.BaseLoader');
goog.require('tatu.loaders.dummy.DummyResource');
goog.require('goog.math');
goog.require('goog.style');
goog.require('goog.events');


/**
 * Dummy loader.
 * @param {tatu.Registry.<Function>} loaders Loader classes.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @constructor
 * @inherits {tatu.loaders.ILoader}
 */
tatu.loaders.dummy.DummyLoader = function(loaders, settings) {
    tatu.loaders.BaseLoader.call(this, loaders, settings);

    /**
     * Resources
     * @type {Object.<string, *>}
     * @private
     */
    this.resources_ = {};

    /**
     * Nested loader manager.
     * @type {tatu.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.LoaderManager(this.loaders_, this.settings_);
};
goog.inherits(tatu.loaders.dummy.DummyLoader, tatu.loaders.BaseLoader);


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element
 * @return {string} Resource ID
 */
tatu.loaders.dummy.DummyLoader.prototype.identify = function(element) {
    return 'dummy' + goog.math.randomInt(this.settings_.get('count'));
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.queue.Entry} Queue entry
 */
tatu.loaders.dummy.DummyLoader.prototype.setup = function(element) {

    var id = this.identify(element);
    var settings = new tatu.conf.ElementSettings(element, this.settings_);

    /*
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.dummy.DummyResource();
        this.resources_[id] = resource;
    }
    */

    // Create entry
    var entry = new tatu.queue.Entry(this, id, goog.math.randomInt(settings.get('max_priority')),
                                     goog.math.randomInt(settings.get('max_timeout')));

    // Setup state visualization
    goog.style.setStyle(element, {
        'background-color': 'gray'
    });
    goog.events.listen(entry, tatu.queue.EntryEvent.LOAD, function(event) {
        goog.style.setStyle(element, {
            'background-color': 'yellow'
        });
    });
    goog.events.listen(entry, tatu.queue.EntryEvent.ABORT, function(event) {
        goog.style.setStyle(element, {
            'background-color': 'red'
        });
    });
    goog.events.listen(entry, tatu.queue.EntryEvent.RESOLVE, function(event) {
        goog.style.setStyle(element, {
            'background-color': 'green'
        });
    });

    // Return entry
    return entry;
};


tatu.loaders.dummy.DummyLoader.prototype.load = function(id, resolve, timeout) {
    // var resource = this.resources_[id];

    setTimeout(function() {
        resolve();
    }, timeout);
};


tatu.loaders.dummy.DummyLoader.prototype.abort = function(id) {

};