goog.provide('tatu.loaders.image.ImageLoader');

goog.require('tatu.loaders.BaseLoader');
goog.require('tatu.loaders.image.ImageResource');


/**
 * Image loader.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @constructor
 * @extends {tatu.loaders.ILoader}
 */
tatu.loaders.image.ImageLoader = function(settings) {
    tatu.loaders.BaseLoader.call(this, settings);
};
goog.inherits(tatu.loaders.image.ImageLoader, tatu.loaders.BaseLoader);


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element
 * @return {string} Resource ID
 */
tatu.loaders.image.ImageLoader.prototype.identify = function(element) {
    var settings = new tatu.conf.ElementSettings(element, this.settings_);
    return settings.get('src');
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.queue.Entry} Queue entry
 */
tatu.loaders.image.ImageLoader.prototype.setup = function(element) {
    var id = this.identify(element);
    var settings = new tatu.conf.ElementSettings(element, this.settings_);

    /*
     * Create resource and entry.
     */
    var resource = this.resources_.get(id);
    if (!goog.isDef(resource)) {
        resource = new tatu.loaders.image.ImageResource(settings.get('timeout'), settings.get('src'));
        this.resources_.register(id, resource);
    }

    return new tatu.queue.Entry(this, id, settings.get('priority'));
};
