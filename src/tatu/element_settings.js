goog.provide('tatu.ElementSettings');

goog.require('tatu.Settings');


/**
 * Element settings manager.
 * @param {Element} element Element settings.
 * @param {tatu.Settings=} parent Parent settings.
 * @extends {tatu.Settings}
 * @constructor
 */
tatu.ElementSettings = function(element, parent) {
    tatu.Settings.call(this, {}, parent);
    this.element_ = element;
};
goog.inherits(tatu.ElementSettings, tatu.Settings);


/**
 * Prefix for data attributes.
 * @define {string}
 * @private
 */
tatu.ElementSettings.prototype.DATA_PREFIX_ = 'data-tatu-';


/**
 * Get a setting value.
 * @param {string} name Setting name.
 * @param {*=} def Default value.
 * @return {*}
 */
tatu.ElementSettings.prototype.get = function(name, def) {
    var value = undefined;
    if (this.element_ && goog.isDef(value = this.element_[name])) {
        return value;
    } else if (this.element_ && goog.isDef(value = this.element_[name])) {
        return value;
    }
    return tatu.Settings.superClass_.get.call(this, name, def);
};
