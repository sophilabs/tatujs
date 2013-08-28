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
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @constructor
 * @inherits {tatu.loaders.ILoader}
 */
tatu.loaders.dummy.DummyLoader = function(settings) {
    tatu.loaders.BaseLoader.call(this, settings);
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
     * Create resource and entry.
     */
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.dummy.DummyResource(goog.math.randomInt(settings.get('max_timeout')));
        this.resources_[id] = resource;
    }
    var entry = new tatu.queue.Entry(this, id, goog.math.randomInt(settings.get('max_priority')));

    /*
     * Setup styles.
     */
    goog.style.setStyle(element, settings.get('style'));
    goog.events.listen(entry, tatu.queue.EntryEvent.LOAD, function(event) {
        goog.style.setStyle(element, settings.get('onLoadStyle'));
    });
    goog.events.listen(entry, tatu.queue.EntryEvent.ABORT, function(event) {
        goog.style.setStyle(element, settings.get('onAbortStyle'));
    });
    goog.events.listen(entry, tatu.queue.EntryEvent.RESOLVE, function(event) {
        goog.style.setStyle(element, settings.get('onResolveStyle'));
    });

    /*
     * Return entry.
     */
    return entry;
};
