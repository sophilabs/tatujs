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


/**
 * Get a video's buffered percent.
 * @param {element} video Video element.
 * @return {number} Buffered percent.
 */
tatu.utils.getBufferedPercent = function(video) {
    try {
        return (video.buffered.end(0) / video.duration) * 100;
    } catch (e) {
        return 0;
    }
};


/**
 * Add listener to DOM load.
 * @param {function} callback
 */
tatu.utils.onDOMLoaded = function(callback) {
    /*
     * Internet Explorer
     */
    /*@cc_on
    @if (@_win32 || @_win64)
        document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
        document.getElementById('ieScriptLoad').onreadystatechange = function() {
            if (this.readyState == 'complete') {
                callback();
            }
        };
    @end @*/

    /*
     * Mozilla, Chrome, Opera
     */
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback, false);

    /*
     * Safari, iCab, Konqueror
     */
    } else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
        var DOMLoadTimer = setInterval(function () {
            if (/loaded|complete/i.test(document.readyState)) {
                callback();
                clearInterval(DOMLoadTimer);
            }
        }, 10);

    /*
     * Other
     */
    } else {
        window.onload = callback;
    }
};
