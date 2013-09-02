goog.provide('tatu.loaders.html.handlers.InspectHandler');


/**
 * Inspection handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.InspectHandler = function() {
};


tatu.loaders.html.handlers.InspectHandler.prototype.handle = function(selectors, contents, href, handlers) {
    tatu.Manager.getInstance().inspect();
};
