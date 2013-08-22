goog.provide('tatu.Queue');

goog.require('tatu.Entry');
goog.require('tatu.conf.Settings');
goog.require('goog.array');


/**
 * Queue.
 * @constructor
 */
tatu.Queue = function(concurrency) {
    this.concurrency_ = concurrency;

    /**
     * Internal queue.
     * @type {Array.<tatu.Entry>}
     * @private
     */
    this.queue_ = [];

    /**
     * Settings.
     * @type {tatu.conf.Settings} Settings.
     * @private
     */
    this.settings_ = null;
};


/**
 * Initialize queue.
 * @param {tatu.conf.Settings} settings Settings.
 */
tatu.Queue.prototype.init = function(settings) {
    this.settings_ = settings;
};


/**
 * Enqueue entry.
 * @param {tatu.Entry} entry Queue entry.
 * @private
 */
tatu.Queue.prototype.enqueue = function(entry) {
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
        if (displaced.isLoading()) {
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
tatu.Queue.prototype.enqueueMany = function(entries) {
    goog.array.forEach(entries, goog.bind(this.enqueue, this));
};


/**
 * Get whether the queue is idle.
 * @returns {bool} Whether the queue is idle.
 */
tatu.Queue.prototype.isIdle = function() {
    return goog.array.slice(this.queue_, 0, this.concurrency_).some(function(entry) {
        return !entry.isLoading();
    });
};


/**
 * Run queue.
 */
tatu.Queue.prototype.run = function() {
    if (this.isIdle()) {
        goog.array.forEach(this.queue_, function(entry, index, array) {
            var queue = this;
            if (!entry.isLoading()) {
                entry.load(function() {
                    goog.array.removeAt(array, index);
                    queue.run();
                });
            }
        }, this);
    }
};
