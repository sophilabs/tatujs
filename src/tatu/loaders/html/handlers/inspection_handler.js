goog.provide('tatu.loaders.html.handlers.InspectionHandler');


/**
 * Inspection handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.InspectionHandler = function() {
};


tatu.loaders.html.handlers.InspectionHandler.prototype.handle = function(selectors, contents, href, handlers) {
    tatu.Manager.getInstance().inspect();
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'inspection', new tatu.loaders.html.handlers.InspectionHandler());

