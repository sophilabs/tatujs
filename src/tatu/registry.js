goog.provide('tatu.Registry');


/**
 * Generic registry.
 * @constructor
 */
tatu.Registry = function() {
    this.registry_ = {};
};


/**
 * Register an object.
 * @param key Key
 * @param {*} object Object
 */
tatu.Registry.prototype.register = function(key, object) {
    this.registry_[key] = object;
};


/**
 * Unregister an object.
 * @param key Key
 */
tatu.Registry.prototype.unregister = function(key) {
    delete this.registry_[key];
};


/**
 * Get an object by its key.
 * @param key Key
 * @return {*} Object.
 */
tatu.Registry.prototype.get = function(key) {
    return this.registry_[key];
};


/**
 * Get registry object.
 * @return {object} Registry object.
 */
tatu.Registry.prototype.all = function() {
    return this.registry_;
};
