goog.provide('tatu.loaders.html.handlers.HandlerManager');

goog.require('tatu.Registry');


/**
 * Handler manager.
 * @constructor
 */
tatu.loaders.html.handlers.HandlerManager = function() {
    /**
     * Handler registry.
     * @type {tatu.Registry.<tatu.loaders.html.handlers.IHandler>}
     * @private
     */
    this.registry_ = new tatu.Registry();
};

goog.addSingletonGetter(tatu.loaders.html.handlers.HandlerManager);


/**
 * Get handler registry.
 * @return {tatu.Registry.<tatu.loaders.html.handlers.IHandler>} Handler registry.
 */
tatu.loaders.html.handlers.HandlerManager.prototype.getRegistry = function() {
    return this.registry_;
};


goog.exportSymbol('tatu.loaders.html.handlers.HandlerManager', tatu.loaders.html.handlers.HandlerManager);
tatu.loaders.html.handlers.HandlerManager.getInstance();
