goog.provide('tatu.Queue');

goog.require('tatu.Entry');
goog.require('goog.array');


/**
 * Queue.
 * @constructor
 */
tatu.Queue = function() {
    /**
     * Internal queue
     * @type {Array.<tatu.Entry>}
     * @private
     */
    this.queue_ = [];
};


/**
 * Enqueue entry.
 * @param {tatu.Entry} entry Queue entry.
 * @private
 */
tatu.Queue.prototype.enqueue = function(entry) {
    goog.array.binaryInsert(this.queue_, entry, function(a, b) {
        return goog.array.defaultCompare(a.getPriority(), b.getPriority());
    });
};


/**
 * Enqueue entries.
 * This method can take queue entries as arguments, an array of entries as single argument, an entry as single argument.
 * @param {Array.<Entry>} entries Entries.
 * @return {void} Nothing.
 */
tatu.Queue.prototype.enqueueMany = function(entries) {
    goog.array.forEach(entries, goog.bind(this.enqueue, this));
};

