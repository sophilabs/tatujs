goog.provide('tatu.Registry');

goog.require('goog.object');


/**
 * Generic registry.
 * @constructor
 * @template T
 */
tatu.Registry = function() {
    /**
     * Registry dictionary
     * @type {Object.<string, T>}
     * @private
     */
    this.registry_ = {};
};


/**
 * Register an object.
 * @param {string} key Key
 * @param {T} object Object
 * @return {void} Nothing
 */
tatu.Registry.prototype.register = function(key, object) {
    this.registry_[key] = object;
};


/**
 * Unregister an object.
 * @param {string} key Key
 * @return {void} Nothing
 */
tatu.Registry.prototype.unregister = function(key) {
    delete this.registry_[key];
};


/**
 * Get an object by its key.
 * @param {string} key Key
 * @return {T} Object.
 */
tatu.Registry.prototype.get = function(key) {
    return this.registry_[key];
};


/**
 * Get registry object.
 * @return {Object.<string, T>} Registry object.
 */
tatu.Registry.prototype.all = function() {
    return this.registry_;
};


/**
 * Get count.
 * @return {number} Count.
 */
tatu.Registry.prototype.count = function() {
    return goog.object.getCount(this.registry_);
};
