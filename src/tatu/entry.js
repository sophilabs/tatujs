goog.provide('tatu.queue.Entry');


/**
 * Queue entry.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {Element} element Element.
 * @constructor
 */
tatu.queue.Entry = function(loader, element) {
    this.loader = loader;
    this.settings = tatu.Settings(loader, element);
    this.id = loader.setup(element, this.settings);
};


/**
 * Load the associated resource.
 * @param resolve Resolution callback.
 */
tatu.queue.Entry.prototype.load = function(resolve) {
    this.loader.load(this.id, resolve);
};


/**
 * Abort the associated resource.
 */
tatu.queue.Entry.prototype.abort = function() {
    this.loader.abort(this.id);
};
