goog.provide('tatu.loaders.video.VideoLoader');

goog.require('tatu.loaders.BaseLoader');
goog.require('tatu.loaders.video.VideoResource');
goog.require('goog.dom');
goog.require('goog.array');


/**
 * Video loader.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @constructor
 * @extends {tatu.loaders.BaseLoader}
 */
tatu.loaders.video.VideoLoader = function(settings) {
    tatu.loaders.BaseLoader.call(this, settings);
};

goog.inherits(tatu.loaders.video.VideoLoader, tatu.loaders.BaseLoader);


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element
 * @return {string} Resource ID
 */
tatu.loaders.video.VideoLoader.prototype.identify = function(element) {
    return goog.dom.query('source', element)[0].getAttribute('src');
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.queue.Entry} Queue entry
 */
tatu.loaders.video.VideoLoader.prototype.setup = function(element) {
    var id = this.identify(element);
    var settings = new tatu.conf.ElementSettings(element, this.settings_);

    var sources = {};

    goog.array.forEach(goog.dom.query('source', element), function(element) {
        var settings = new tatu.conf.ElementSettings(element);
        sources[settings.get('type')] = settings.get('src');
    });

    /*
     * Create resource and entry.
     */
    var resource = this.resources_.get(id);
    if (!goog.isDef(resource)) {
        resource = new tatu.loaders.video.VideoResource(sources, settings.get('minBuffered'));
        this.resources_.register(id, resource);
    }

    return new tatu.queue.Entry(this, id, settings.get('priority'));
};