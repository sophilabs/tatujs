goog.provide('tatu.Entry');


/**
 * Queue entry.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {Element} element Element.
 * @param {number} priority Priority.
 * @param {number} timeout Timeout.
 * @constructor
 */
tatu.Entry = function(loader, element, priority, timeout) {
    this.loader = loader;
    this.id = loader.setup(element);

    this.priority = priority;
    this.timeout = timeout;
};


/**
 * Load the associated resource.
 * @param resolve Resolution callback.
 */
tatu.Entry.prototype.load = function(resolve) {
    this.loader.load(this.id, resolve);
};


/**
 * Abort the associated resource.
 */
tatu.Entry.prototype.abort = function() {
    this.loader.abort(this.id);
};
