goog.provide('tatu.queue.EntryEvent');

goog.require('goog.events.Event');


/**
 * Entry event.
 * @param {string} resourceId Resource ID.
 * @param {string} type Event type.
 * @constructor
 */
tatu.queue.EntryEvent = function(resourceId, type) {
    goog.events.Event.call(this, type);
    this.resourceId_ = resourceId;
};
goog.inherits(tatu.queue.EntryEvent, goog.events.Event);


/**
 * Get Resource ID.
 * @returns {string} Resource ID.
 */
tatu.queue.EntryEvent.prototype.getResourceId = function() {
    return this.resourceId_;
};


/**
 * LOAD event type.
 * @type {string}
 */
tatu.queue.EntryEvent.LOAD = 'LOAD';


/**
 * ABORT event type.
 * @type {string}
 */
tatu.queue.EntryEvent.ABORT = 'ABORT';


/**
 * RESOLVE event type.
 * @type {string}
 */
tatu.queue.EntryEvent.RESOLVE = 'RESOLVE';
