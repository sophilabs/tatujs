goog.provide('tatu.queue.Queue');

goog.require('tatu.queue.Entry');
goog.require('goog.array');


/**
 * Queue.
 * @constructor
 */
tatu.queue.Queue = function(concurrency) {
    /**
     * Concurrency;
     * @type {number}
     * @private
     */
    this.concurrency_ = concurrency;

    /**
     * Internal queue.
     * @type {Array.<tatu.queue.Entry>}
     * @private
     */
    this.queue_ = [];
};


/**
 * Enqueue entry.
 * @param {tatu.queue.Entry} entry Queue entry.
 * @private
 */
tatu.queue.Queue.prototype.enqueue = function(entry) {
    /*
     * Get insertion index.
     */
    var index = goog.array.binarySearch(this.queue_, entry, function(a, b) {
        return goog.array.defaultCompare(a.getPriority(), b.getPriority()) == -1 ? -1 : 1;
    });

    /*
     * Check whether the enqueued entry must displace a currently loading entry.
     */
    index = -(index + 1);
    if (index < this.concurrency_) {
        var displaced = this.queue_[index];
        if (displaced && displaced.isLoading()) {
            displaced.abort();
        }
    }
    goog.array.insertAt(this.queue_, entry, index);
    this.run();
};


/**
 * Enqueue an array of entries.
 * @param {Array.<Entry>} entries Entries.
 * @return {void} Nothing.
 */
tatu.queue.Queue.prototype.enqueueMany = function(entries) {
    goog.array.forEach(entries, goog.bind(this.enqueue, this));
};


/**
 * Get whether the queue is idle.
 * @returns {boolean} Whether the queue is idle.
 */
tatu.queue.Queue.prototype.isIdle = function() {
    return goog.array.slice(this.queue_, 0, this.concurrency_).some(function(entry) {
        return !entry.isLoading();
    });
};


/**
 * Remove an entry from the queue.
 * @param {number} index Index of the entry.
 */
tatu.queue.Queue.prototype.removeAt = function(index) {
    goog.array.removeAt(this.queue_, index);
};


/**
 * Run queue.
 */
tatu.queue.Queue.prototype.run = function() {
    if (this.isIdle()) {
        goog.array.slice(this.queue_, 0, this.concurrency_).forEach(function(entry, index) {
            if (!entry.isLoading()) {
                entry.load(goog.bind(function() {
                    this.removeAt(index);
                    this.run();
                }, this));
            }
        }, this);
    }
};
