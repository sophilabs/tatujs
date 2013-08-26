goog.provide('tatu.queue.Entry');

goog.require('tatu.queue.EntryEvent');
goog.require('goog.events.EventTarget');


/**
 * Queue entry.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {string} id Resource ID.
 * @param {number} priority Priority.
 * @param {number} timeout Timeout
 * @constructor
 */
tatu.queue.Entry = function(loader, id, priority, timeout) {
    goog.events.EventTarget.call(this);

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
goog.inherits(tatu.queue.Entry, goog.events.EventTarget);


/**
 * Get loader
 * @return {tatu.loaders.ILoader}
 */
tatu.queue.Entry.prototype.getLoader = function() {
    return this.loader_;
};


/**
 * Get id
 * @return {string}
 */
tatu.queue.Entry.prototype.getId = function() {
    return this.id_;
};

/**
 * Get priority
 * @returns {number}
 */
tatu.queue.Entry.prototype.getPriority = function() {
    return this.priority_;
};


/**
 * Get timeout
 * @returns {number}
 */
tatu.queue.Entry.prototype.getTimeout = function() {
    return this.timeout_;
};


/**
 * Load the associated Resource ID.
 * @param {function} resolve Resolution callback.
 */
tatu.queue.Entry.prototype.load = function(resolve) {
    this.loader_.load(this.id_, goog.bind(function() {
        resolve();
        this.dispatchEvent(new tatu.queue.EntryEvent(this.id_, tatu.queue.EntryEvent.RESOLVE));
    }, this), this.timeout_);
    this.loading_ = true;
    this.dispatchEvent(new tatu.queue.EntryEvent(this.id_, tatu.queue.EntryEvent.LOAD));
};


/**
 * Abort the associated Resource ID.
 */
tatu.queue.Entry.prototype.abort = function() {
    this.loader_.abort(this.id_);
    this.loading_ = false;
    this.dispatchEvent(new tatu.queue.EntryEvent(this.id_, tatu.queue.EntryEvent.ABORT));
};


/**
 * Get whether the entry is loading.
 * @return {boolean} Whether the entry is loading.
 */
tatu.queue.Entry.prototype.isLoading = function() {
    return this.loading_;
};
