goog.provide('tatu.loaders.html.cache.LocalStorageCache');

goog.require('tatu.loaders.html.cache.ObjectCache');


/**
 * Cache using local storage.
 * @param {string} name Name for local storage.
 * @constructor
 */
tatu.loaders.html.cache.LocalStorageCache = function(name) {
    this.name_ = name;
};


/**
 * Create an object cache from local storage.
 * @return {tatu.loaders.html.cache.ObjectCache} Object cache.
 */
tatu.loaders.html.cache.LocalStorageCache.prototype.asObjectCache = function() {
    var data;

    try {
        data = JSON.parse(localStorage[this.name_]);
    } catch (e) {
        localStorage[this.name_] = '{}';
        data = {};
    }

    return new tatu.loaders.html.cache.ObjectCache(data);
};


tatu.loaders.html.cache.LocalStorageCache.prototype.hasContentsFor = function(href, source) {
    return this.asObjectCache().hasContentsFor(href, source);
};


tatu.loaders.html.cache.LocalStorageCache.prototype.getContentsFor = function(href, sources) {
    return this.asObjectCache().getContentsFor(href, sources);
};


tatu.loaders.html.cache.LocalStorageCache.prototype.store = function(href, source, contents) {
    var cache = this.asObjectCache();
    cache.store(href, source, contents);
    localStorage[this.name_] = JSON.stringify(cache.getCache());
};


tatu.loaders.html.cache.LocalStorageCache.prototype.obtain = function(href, source) {
    return this.asObjectCache().obtain(href, source);
};