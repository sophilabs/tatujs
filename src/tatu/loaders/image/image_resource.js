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

    // Resolution
    if (!goog.isDef(this.source_) || this.source_.length == 0) {
        resolve();
    }
    this.image_.onload = function() {
        resolve();
    };

    // Check with timeout
    setTimeout(goog.bind(function() {
        if (!this.image_.complete ||
            this.image_.naturalWidth === 'undefined' ||
            this.image_.naturalWidth === 0) {
            resolve();
        }
    }, this), this.timeout_);
};


/**
 * Abort image load.
 */
tatu.loaders.image.ImageResource.prototype.abort = function() {
    this.image_.removeAttribute('src');
    delete this.image_;
};
