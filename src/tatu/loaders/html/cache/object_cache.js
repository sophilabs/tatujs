goog.provide('tatu.loaders.html.cache.ObjectCache');

goog.require('goog.array');


/**
 * Cache using an object as storage.
 * @param {(object)=} object Object to use as cache.
 * @implements {tatu.loaders.html.cache.ICache}
 * @constructor
 */
tatu.loaders.html.cache.ObjectCache = function(object) {
    if (goog.isDef(object)) {
        this.cache_ = object;
    } else {
        this.cache_ = {};
    }
};


/**
 * Get cache object.
 * @return {(object)=} Cache object.
 */
tatu.loaders.html.cache.ObjectCache.prototype.getCache = function() {
    return this.cache_;
};


tatu.loaders.html.cache.ObjectCache.prototype.hasContentsFor = function(href, source) {
    if (!goog.isDef(source)) {
        return goog.isDef(this.cache_[href]);
    } else {
        if (goog.isDef(this.cache_[href])) {
            return goog.isDef(this.cache_[href][source]);
        } else {
            return false;
        }
    }
};


tatu.loaders.html.cache.ObjectCache.prototype.getContentsFor = function(href, sources) {
    var contents = {};

    if (!goog.isDef(this.cache_[href])) {
        return contents;
    }

    goog.array.forEach(sources, function(source) {
        contents[source] = this.cache_[href][source];
    }, this);

    return contents;
};


tatu.loaders.html.cache.ObjectCache.prototype.store = function(href, source, contents) {
    if (!goog.isDef(this.cache_[href])) {
        this.cache_[href] = {};
    }

    this.cache_[href][source] = contents;
};


tatu.loaders.html.cache.ObjectCache.prototype.obtain = function(href, source) {
    return this.cache_[href][source];
};


tatu.loaders.html.cache.ObjectCache.prototype.clean = function() {
    for (var href in this.cache_) {
        delete this.cache_[href];
    }
};
