goog.provide('tatu.queue.Entry');


/**
 * Queue entry.
 * @param loader Loader.
 * @param id Resource ID.
 * @param priority Entry priority.
 * @param timeout Timeout.
 * @constructor
 */
tatu.queue.Entry = function(loader, id, priority, timeout) {
    // Loader
    this.loader = loader;

    // Resource
    this.id = id;
    this.priority = priority;
    this.timeout = timeout;
};


/**
 * Load the associated resource.
 * @param resolve Resolution callback.
 */
tatu.queue.Entry.prototype.load = function(resolve) {
    this.loader.load(this.id, resolve, this.timeout);
};


/**
 * Abort the associated resource.
 */
tatu.queue.Entry.prototype.abort = function() {
    this.loader.abort(this.id);
};
