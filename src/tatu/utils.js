goog.provide('tatu.utils');

goog.require('goog.Uri');


/**
 * Build absolute Uri using the window location as base Uri.
 * @param uri Relative Uri.
 * @return {string} Absolute Uri.
 */
tatu.utils.buildAbsoluteUri = function(uri) {
    return goog.Uri.resolve(window.location, uri).toString();
};


/**
 * Strip HTML tags.
 * @param html HTML string.
 * @return {string} HTML with stripped tags.
 */
tatu.utils.stripTags = function(html) {
    return html.replace(/(<([^>]+)>)/ig, '');
};


/**
 * Create fragment from an HTML string.
 */
tatu.utils.createFragment = function(html) {
    var fragment = goog.global['document']['implementation']['createHTMLDocument']('');
    fragment['documentElement'].innerHTML = html;
    return fragment;
};


/**
 * Replace all.
 * @param {string} text String.
 * @return {string} String.
 */
tatu.utils.replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};