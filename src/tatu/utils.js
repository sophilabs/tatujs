goog.provide('tatu.utils');

goog.require('goog.Uri')


/**
 * Build absolute Uri using the window location as base Uri.
 * @param uri Relative Uri.
 * @return {string} Absolute Uri.
 */
tatu.utils.buildAbsoluteUri = function(uri) {
    return goog.Uri.resolve(goog.Uri.parse(window.location), goog.Uri.parse(uri)).toString();
};