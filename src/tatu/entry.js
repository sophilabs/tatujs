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

    /**
     * Whether the entry is loading.
     * @type {boolean}
     * @private
     */
    this.loading_ = false;
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


/**
 * Load the associated Resource ID.
 * @param {function} resolve Resolution callback.
 */
tatu.Entry.prototype.load = function(resolve) {
    this.loader_.load(this.id_, resolve, this.timeout_);
    this.loading_ = true;
};


/**
 * Abort the associated Resource ID.
 */
tatu.Entry.prototype.abort = function() {
    this.loader_.abort(this.id_);
    this.loading_ = false;
};


/**
 * Get whether the entry is loading.
 * @return {bool} Whether the entry is loading.
 */
tatu.Entry.prototype.isLoading = function() {
    return this.loading_;
};
