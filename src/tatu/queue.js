goog.provide('tatu.Queue');

goog.require('tatu.Entry');
goog.require('goog.array');


/**
 * Queue.
 * @constructor
 */
tatu.Queue = function() {
    this.queue_ = [];
};


/**
 * Enqueue entry.
 * @param {tatu.Entry} entry Queue entry.
 * @private
 */
tatu.Queue.prototype.enqueue_ = function(entry) {
    goog.array.binaryInsert(this.queue_, entry, function(a, b) {
        a = a.getPriority();
        b = b.getPriority();
        return a > b ? 1 : a < b ? -1 : 0;
    });
};


/**
 * Enqueue entries.
 *
 * This method can take queue entries as arguments, an array of entries as single argument, an entry as single argument.
 */
tatu.Queue.prototype.enqueue = function() {
    var entries;
    if (arguments.length == 1 && typeof(arguments[0]) == 'array') {
        entries = arguments[0];
    } else {
        entries = arguments;
    }

    for (var i = 0; i < entries.length; i++) {
        this.enqueue_(entries[i]);
    }
};

