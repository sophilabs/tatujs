goog.provide('tatu.loaders.html.cache.ObjectCache');


/**
 * Cache using an object as storage.
 * @constructor
 */
tatu.loaders.html.cache.ObjectCache = function() {
    this.cache_ = {};
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
