goog.provide('tatu.loaders.html.cache.ICache');


/**
 * Cache
 * @interface
 */
tatu.loaders.html.cache.ICache = function() {};


/**
 * Get whether the cache contains contents for the specified HREF and source.
 * @param {string} href HREF.
 * @param {(string)=} source Source query.
 * @return {boolean} Whether the cache has contents.
 */
tatu.loaders.html.cache.ICache.prototype.hasContentsFor;


/**
 * Get the specified sources contents as an object.
 * @param {string} href HREF.
 * @param {array.<string>} sources Array of sources.
 */
tatu.loaders.html.cache.ICache.prototype.getContentsFor;


/**
 * Store the specified content.
 * @param {string} href HREF.
 * @param {string} source Source query.
 * @param {string} contents HTML contents.
 */
tatu.loaders.html.cache.ICache.prototype.store;


/**
 * Obtain the specified content.
 * @param {string} href HREF.
 * @param {string} source Source query.
 * @return {string} Contents.
 */
tatu.loaders.html.cache.ICache.prototype.obtain;
