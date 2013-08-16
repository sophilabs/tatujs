goog.provide('tatu.Entry');

/**
 * Queue entry.
 *
 * @param id        Number identifier
 * @param loader    Loader instance
 * @param name      Resource name
 * @param priority  Priority
 * @param timeout   Load timeout
 */
tatu.Entry = function (id, loader, name, priority, timeout) {
    this.id = id;
    this.loader = loader;
    this.name = name;
    this.priority = priority;
    this.timeout = timeout;
};

/**
 * Load the resource associated to this entry.
 *
 * @param resolve   Resolution callback
 */
tatu.Entry.prototype.load = function (resolve) {
    this.loader.load(this.name, resolve, this.timeout);
};

/**
 * Abort the resource associated to this entry.
 */
tatu.Entry.prototype.abort = function () {
    this.loader.abort(this.name);
};