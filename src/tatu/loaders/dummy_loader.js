goog.provide('tatu.loaders.DummyLoader');

goog.require('tatu.loaders.ILoader');


/**
 * Dummy loader.
 * @constructor
 * @implements {tatu.loaders.ILoader}
 */
tatu.loaders.DummyLoader = function() {
    this.resources_ = {};
};


tatu.loaders.DummyLoader.prototype.identify = function(element) {
    return 'dummy' + element.id;
};


tatu.loaders.DummyLoader.prototype.setup = function(element) {
    var id = this.identify(element);
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.DummyResource();
        this.resources_[id] = resource;
    }
};


tatu.loaders.DummyLoader.prototype.load = function(id, resolve, timeout) {
    var resource = this.resources_[id];
    setTimeout(function() {
        resolve(resource);
    }, timeout);
};


tatu.loaders.DummyLoader.prototype.abort = function(id) {
};


goog.inherits(tatu.loaders.DummyLoader, tatu.loaders.BaseLoader);
