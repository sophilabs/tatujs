goog.provide('tatu.loaders.IResource');


/**
 * Resource interface.
 * @interface
 */
tatu.loaders.IResource = function() {};


/**
 * Perform requests related to the resource.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.IResource.prototype.load;


/**
 * Abort requests related to the resource.
 */
tatu.loaders.IResource.prototype.abort;


goog.exportSymbol('tatu.loaders.IResource', tatu.loaders.IResource);
