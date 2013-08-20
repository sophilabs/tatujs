goog.provide('tatu.loaders.DummyLoader');

goog.require('tatu.loaders.DummyResource');
goog.require('tatu.loaders.ILoader');
goog.require('tatu.Settings');


/**
 * Dummy loader.
 * @constructor
 * @implements {tatu.loaders.ILoader}
 */
tatu.loaders.DummyLoader = function(settings) {
    this.settings_ = settings;
    this.resources_ = {};
};


tatu.loaders.DummyLoader.prototype.getSetting = function(name) {
    return this.settings_[name];
};


tatu.loaders.DummyLoader.prototype.setSetting = function(name, value) {
    this.settings_[name] = value;
};


tatu.loaders.DummyLoader.prototype.identify = function(element) {
    return 'dummy';
};


tatu.loaders.DummyLoader.prototype.setup = function(element) {
    var id = this.identify(element);
    // var settings = new tatu.Settings(this, element);
    // Get additional settings using settings.get(<setting name>)
    var resource = this.resources_[id];
    if (resource == undefined) {
        resource = new tatu.loaders.DummyResource();
        this.resources_[id] = resource;
    }
    return id;
};


tatu.loaders.DummyLoader.prototype.load = function(id, resolve, timeout) {
    var resource = this.resources_[id];
    setTimeout(function() {
        resolve(resource);
    }, timeout);
};


tatu.loaders.DummyLoader.prototype.abort = function(id) {
};

