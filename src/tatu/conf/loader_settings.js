goog.provide('tatu.conf.LoaderSettings');

goog.require('tatu.conf.Settings');


/**
 * Loader settings manager.
 * @param {object} options Base options.
 * @param {tatu.conf.Settings=} parent Parent settings.
 * @constructor
 */
tatu.conf.LoaderSettings = function(options, parent) {
    tatu.conf.Settings.call(this, options, parent);
};
goog.inherits(tatu.conf.LoaderSettings, tatu.conf.Settings);
