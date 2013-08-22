goog.provide('tatu.conf.ElementSettings');

goog.require('tatu.conf.Settings');


/**
 * Element settings manager.
 * @param {Element} element Element settings.
 * @param {tatu.conf.Settings=} parent Parent settings.
 * @extends {tatu.conf.Settings}
 * @constructor
 */
tatu.conf.ElementSettings = function(element, parent) {
    tatu.conf.Settings.call(this, {}, parent);
    this.element_ = element;
};
goog.inherits(tatu.conf.ElementSettings, tatu.conf.Settings);


/**
 * Prefix for data attributes.
 * @define {string}
 * @private
 */
tatu.conf.ElementSettings.DATA_PREFIX_ = 'data-tatu-';


/**
 * Get a setting value.
 * @param {string} name Setting name.
 * @param {*=} def Default value.
 * @return {*}
 */
tatu.conf.ElementSettings.prototype.get = function(name, def) {
    var value = undefined;
    if (this.element_ && goog.isDef(value = this.element_[name])) {
        return value;
    } else if (this.element_ && goog.isDef(value = this.element_[tatu.conf.ElementSettings.DATA_PREFIX_ + name])) {
        return value;
    }
    return tatu.conf.ElementSettings.superClass_.get.call(this, name, def);
};
