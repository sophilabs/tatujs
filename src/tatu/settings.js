goog.provide('tatu.Settings');


/**
 * Settings manager.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {Element} element Element.
 * @constructor
 */
tatu.Settings = function(loader, element) {
    this.loader = loader;
    this.element = element;
};


/**
 * Prefix for data attributes.
 * @type {string}
 */
tatu.Settings.prototype.DATA_PREFIX = 'data-tatu-';


/**
 * Get a setting value.
 * @param {string} setting Setting name.
 * @param {*} none None value.
 * @returns {*}
 */
tatu.Settings.prototype.get = function(setting, none) {
    // Value from attribute
    var value = this.element[setting];
    if (value != undefined) {
        return value;
    }

    // Value from data attribute
    value = this.element[tatu.Settings.DATA_PREFIX + setting];
    if (value != undefined) {
        return value;
    }

    // Value from loader
    value = this.loader.getSetting(setting);
    if (value != undefined) {
        return value;
    }

    // Value from global configuration
    value = tatu.configuration[setting];
    if (value != undefined) {
        return value;
    }

    return none;
};