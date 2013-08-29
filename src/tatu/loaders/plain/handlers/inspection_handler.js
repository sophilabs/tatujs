goog.provide('tatu.loaders.plain.handlers.InspectionHandler');


/**
 * Inspection handler.
 * @implements {tatu.loaders.plain.handlers.IHandler}
 * @constructor
 */
tatu.loaders.plain.handlers.InspectionHandler = function() {
};


tatu.loaders.plain.handlers.InspectionHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {
};


tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry().register(
    'inspection', new tatu.loaders.plain.handlers.InspectionHandler());