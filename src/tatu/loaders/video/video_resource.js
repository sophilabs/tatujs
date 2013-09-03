goog.provide('tatu.loaders.video.VideoResource');


/**
 * Video resource.
 * @param {object.<string, string>} sources Sources
 * @constructor
 */
tatu.loaders.video.VideoResource = function(sources) {
    this.sources_ = sources;
};


/**
 * Load video.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.video.VideoResource.prototype.load = function(resolve) {
    this.video_ = document.createElement('video');

    for (var contentType in this.sources_) {
        var src = this.sources_[contentType];

        var source = document.createElement('source');
        source['src'] = src;
        source['type'] = contentType;

        this.video_.appendChild(source);
    }

    // TODO: Resolution
    resolve();
};


/**
 * Abort video load.
 */
tatu.loaders.video.VideoResource.prototype.abort = function() {
    this.video_.innerHTML = '';
};
