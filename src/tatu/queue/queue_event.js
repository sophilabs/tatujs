goog.provide('tatu.queue.QueueEvent');

goog.require('goog.events.Event');


/**
 * Queue event.
 * @param {string} type Event type.
 * @constructor
 */
tatu.queue.QueueEvent = function(type, entry) {
    goog.events.Event.call(this, type);
    this.entry_ = entry;
};

goog.inherits(tatu.queue.QueueEvent, goog.events.Event);


/**
 * Get entry.
 * @return {tatu.queue.Entry} Entry.
 */
tatu.queue.QueueEvent.prototype.getEntry = function() {
    return this.entry_;
};


/**
 * ENQUEUE event type.
 * @type {string}
 */
tatu.queue.QueueEvent.ENQUEUE = 'ENQUEUE';


/**
 * DEQUEUE event type.
 * @type {string}
 */
tatu.queue.QueueEvent.DEQUEUE = 'DEQUEUE';
