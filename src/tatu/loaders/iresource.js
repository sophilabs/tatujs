goog.provide("tatu.loaders.IResource");

/**
 * IResource
 * @interface
 */
tatu.loaders.IResource = function() {};


/**
 *
 * @return {string}
 */
tatu.loaders.IResource.prototype.getId = function() {};

goog.exportSymbol('tatu.loaders.IResource', tatu.loaders.IResource);