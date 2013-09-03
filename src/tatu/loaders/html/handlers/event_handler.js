goog.provide('tatu.loaders.html.handlers.EventHandler');

goog.require('goog.events');


/**
 * Handle event.
 * @param {Array.<Object.<string, string>>} selectors Selectors to handle.
 * @param {Object.<string, string>} contents Contents.
 * @param {string} href HREF.
 * @param {Array.<string>} handlers Handlers.
 * @param {string} type Event type.
 * @constructor
 */
tatu.loaders.html.handlers.HandleEvent = function(selectors, contents, href, handlers, type) {
    goog.events.Event.call(this, type);

    this['selectors'] = selectors;
    this['contents'] = contents;
    this['href'] = href;
    this['handlers'] = handlers;
};

goog.inherits(tatu.loaders.html.handlers.HandleEvent, goog.events.Event);


/**
 * Handle event type.
 * @type {string}
 */
tatu.loaders.html.handlers.HandleEvent.HANDLE = 'HANDLE';


/**
 * Event handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.EventHandler = function() {
    goog.events.EventTarget.call(this);
};

goog.inherits(tatu.loaders.html.handlers.EventHandler, goog.events.EventTarget);


tatu.loaders.html.handlers.EventHandler.prototype.handle = function(selectors, contents, href, handlers) {
    this.dispatchEvent(new tatu.loaders.html.handlers.HandleEvent(selectors, contents, href, handlers,
                                                                  tatu.loaders.html.handlers.HandleEvent.HANDLE));
};
