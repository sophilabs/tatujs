goog.provide('tatu.loaders.video.VideoResource');

goog.require('tatu.utils');


/**
 * Video resource.
 * @param {object.<string, string>} sources Sources
 * @param {number} minBuffered Minimum buffered percent to consider the video loaded.
 * @constructor
 */
tatu.loaders.video.VideoResource = function(sources, minBuffered) {
    this.sources_ = sources;
    this.minBuffered_ = minBuffered;

    this.INTERVAL = 100;
};


/**
 * Load video.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.video.VideoResource.prototype.load = function(resolve) {
    this.video_ = document.createElement('video');
    this.video_['preload'] = 'auto';

    for (var contentType in this.sources_) {
        var src = this.sources_[contentType];

        var source = document.createElement('source');
        source['src'] = src;
        source['type'] = contentType;

        this.video_.appendChild(source);
    }

    this.video_.volume = 0;
    this.video_.load();

    var step = goog.bind(function() {
        var buffered = tatu.utils.getBufferedPercent(this.video_);
        if (buffered >= this.minBuffered_) {
            resolve();
        } else {
            setTimeout(goog.bind(step, this), this.INTERVAL);
        }
    }, this);
    step();
};


/**
 * Abort video load.
 */
tatu.loaders.video.VideoResource.prototype.abort = function() {
    this.video_.innerHTML = '';
    delete this.video_;
};
