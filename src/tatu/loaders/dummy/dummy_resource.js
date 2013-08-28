goog.provide('tatu.loaders.dummy.DummyResource');

goog.require('tatu.loaders.IResource');


/**
 * Dummy resource.
 * @param {number} timeout Timeout.
 * @constructor
 * @implements {tatu.loaders.IResource}
 */
tatu.loaders.dummy.DummyResource = function(timeout) {
    this.timeout_ = timeout;
};


tatu.loaders.dummy.DummyResource.prototype.load = function(resolve) {
    setTimeout(function() {
        resolve();
    }, this.timeout_);
};


tatu.loaders.dummy.DummyResource.prototype.abort = function() {
};
