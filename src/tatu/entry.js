goog.provide('tatu.Entry');


/**
 * Queue entry.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {string} id Resource ID.
 * @param {number} priority Priority.
 * @param {number} timeout Timeout
 * @constructor
 */
tatu.Entry = function(loader, id, priority, timeout) {
    this.loader_ = loader;
    this.id_ = id;
    this.priority_ = priority;
    this.timeout_ = timeout;
};


/**
 * Get loader
 * @return {tatu.loaders.ILoader}
 */
tatu.Entry.prototype.getLoader = function() {
    return this.loader_;
};


/**
 * Get id
 * @return {string}
 */
tatu.Entry.prototype.getId = function() {
    return this.id_;
};

/**
 * Get priority
 * @returns {number}
 */
tatu.Entry.prototype.getPriority = function() {
    return this.priority_;
};


/**
 * Get timeout
 * @returns {number}
 */
tatu.Entry.prototype.getTimeout = function() {
    return this.timeout_;
};