goog.provide('tatu.Queue');

goog.require('tatu.Entry');

// TODO: Use Google Closure array.

/**
 * Queue.
 * @constructor
 */
tatu.Queue = function() {
    /**
     * Array of entries.
     * @type {Array}
     * @private
     */
    this.queue_ = [];
};


/**
 * Get the index of the last item matching the specified properties.
 * @param {Object} properties
 * @return {number|null}
 */
tatu.Queue.prototype.find = function(properties) {
    for (var i = this.queue_.length - 1; i >= 0; i--) {
        var complies = true;
        for (var name in properties) {
            complies &= this.queue_[i][name] == properties[name];
        }
        if (complies) {
            return i;
        }
    }
    return null;
};


/**
 * Enqueue entry.
 * @param {tatu.Entry} entry Queue entry.
 * @private
 */
tatu.Queue.prototype.enqueue_ = function(entry) {
    var index = this.find({'id': entry.id});
    console.info(index);
    if (index) {
        return;
    } else {
        this.queue_.push(entry);
    }
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

