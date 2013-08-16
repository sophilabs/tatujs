goog.provide('tatu.Registry')

/**
 * Generic registry.
 */
tatu.Registry = function () {
    this._registry = {};
};

/**
 * Register an object.
 */
tatu.Registry.prototype.register = function (key, object) {
    this._registry[key] = object;
};

/**
 * Unregister an object.
 */
tatu.Registry.prototype.unregister = function (key) {
    delete this._registry[key];
};

/**
 * Get an object.
 */
tatu.Registry.prototype.get = function (key) {
    return this._registry[key];
};

/**
 * Get all objects.
 */
tatu.Registry.prototype.all = function (key) {
    return this._registry;
};