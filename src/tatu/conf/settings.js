goog.provide('tatu.conf.Settings');


/**
 * Settings manager.
 * @param {object} options Base options.
 * @param {tatu.conf.Settings=} parent Parent settings.
 * @constructor
 */
tatu.conf.Settings = function(options, parent) {
    this.options_ = options;
    this.parent_ = parent;
};


/**
 * Get a setting value.
 * @param {string} name Setting name.
 * @param {*=} def Default value
 * @return {*}
 */
tatu.conf.Settings.prototype.get = function(name, def) {
    var value = undefined;
    if (goog.isDef(value = this.options_[name])) {
        return value;
    } else if (this.parent_ && goog.isDef(value = this.parent_.get(name, def))) {
        return value;
    }
    return def;
};