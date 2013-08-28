goog.provide('tatu.loaders.plain.handlers.HandlerManager');

goog.require('tatu.Registry');


/**
 * Handler manager.
 * @constructor
 */
tatu.loaders.plain.handlers.HandlerManager = function() {
    /**
     * Handler registry.
     * @type {tatu.Registry.<tatu.loaders.plain.handlers.IHandler>}
     * @private
     */
    this.registry_ = new tatu.Registry();
};

goog.addSingletonGetter(tatu.loaders.plain.handlers.HandlerManager);


/**
 * Get handler registry.
 * @returns {tatu.Registry.<tatu.loaders.plain.handlers.IHandler>} Handler registry.
 */
tatu.loaders.plain.handlers.HandlerManager.prototype.getRegistry = function() {
    return this.registry_;
};


goog.exportSymbol('tatu.loaders.plain.handlers.HandlerManager', tatu.loaders.plain.handlers.HandlerManager);
tatu.loaders.plain.handlers.HandlerManager.getInstance();
