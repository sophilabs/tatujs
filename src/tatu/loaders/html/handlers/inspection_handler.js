goog.provide('tatu.loaders.html.handlers.InspectionHandler');

goog.require('tatu.Manager');

/**
 * Inspection handler.
 * @param {Element} container Container element.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.InspectionHandler = function(container) {
    this.container_ = container;
};


tatu.loaders.html.handlers.InspectionHandler.prototype.handle = function(
    selectors, contents, href, handlers, loaderManager) {

    // 1st level inspection
    tatu.Manager.getInstance().inspect(this.container_);

    // 2nd level inspection
    for (var source in selectors) {
        loaderManager.inspect(goog.dom.query(selectors[source], this.container_)[0]);
    }
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'inspection', new tatu.loaders.html.handlers.InspectionHandler(goog.global['document']['body']));

