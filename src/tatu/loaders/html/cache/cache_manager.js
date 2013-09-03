goog.provide('tatu.loaders.html.cache.CacheManager');

goog.require('tatu.Registry');


/**
 * Cache manager.
 * @constructor
 */
tatu.loaders.html.cache.CacheManager = function() {
    /**
     * Cache registry.
     * @type {tatu.Registry.<tatu.loaders.html.cache.ICache>}
     * @private
     */
    this.registry_ = new tatu.Registry();
};

goog.addSingletonGetter(tatu.loaders.html.cache.CacheManager);


/**
 * Get cache registry.
 * @return {tatu.Registry.<tatu.loaders.html.cache.ICache>} Cache registry.
 */
tatu.loaders.html.cache.CacheManager.prototype.getRegistry = function() {
    return this.registry_;
};


goog.exportSymbol('tatu.loaders.html.cache.CacheManager', tatu.loaders.html.cache.CacheManager);
tatu.loaders.html.cache.CacheManager.getInstance();
