goog.provide('tatu.loaders.image.ImageResource');


/**
 * Image resource.
 * @param {number} timeout Timeout.
 * @param {string} source Image source.
 * @constructor
 */
tatu.loaders.image.ImageResource = function(timeout, source) {
    this.timeout_ = timeout;
    this.source_ = source;
};


/**
 * Load image
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.image.ImageResource.prototype.load = function(resolve) {
    this.image_ = document.createElement('img');
    this.image_.setAttribute('src', this.source_);
    this.image_.onload = function() {
        resolve();
    };
};


/**
 * Abort image load.
 */
tatu.loaders.image.ImageResource.prototype.abort = function() {
    this.image_.removeAttribute('src');
};
