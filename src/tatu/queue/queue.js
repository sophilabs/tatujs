goog.provide('tatu.queue.Queue');

goog.require('tatu.queue.Entry');
goog.require('goog.array');
goog.require('goog.events.EventTarget');


/**
 * Queue.
 * @constructor
 */
tatu.queue.Queue = function(concurrency) {
    goog.events.EventTarget.call(this);

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

goog.inherits(tatu.queue.Queue, goog.events.EventTarget);


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

    /*
     * Dispatch event.
     */
    this.dispatchEvent(new tatu.queue.QueueEvent(tatu.queue.QueueEvent.ENQUEUE, entry));

    /*
     * Run queue.
     */
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
 * Get the concurrent slice of the queue.
 * @return {Array.<tatu.queue.Entry>} Concurrent slice.
 */
tatu.queue.Queue.prototype.getConcurrentSlice = function() {
    return goog.array.slice(this.queue_, 0, this.concurrency_);
};


/**
 * Get whether the queue is idle.
 * @return {boolean} Whether the queue is idle.
 */
tatu.queue.Queue.prototype.isIdle = function() {
    return this.getConcurrentSlice().some(function(entry) {
        return !entry.isLoading();
    });
};


/**
 * Run queue.
 */
tatu.queue.Queue.prototype.run = function() {
    if (this.isIdle()) {
        this.getConcurrentSlice().forEach(function(entry, index) {
            if (!entry.isLoading()) {
                entry.load(goog.bind(function() {
                    goog.array.remove(this.queue_, entry);
                    this.dispatchEvent(new tatu.queue.QueueEvent(tatu.queue.QueueEvent.DEQUEUE, entry));
                    this.run();
                }, this));
            }
        }, this);
    }
};


/**
 * Get entry count.
 * @return {number} Entry count.
 */
tatu.queue.Queue.prototype.getEntryCount = function() {
    return this.queue_.length;
};
