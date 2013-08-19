goog.provide("tatu.loaders.ILoader");

/**
 * ILoader
 * @interface
 */
tatu.loaders.ILoader = function() {};


tatu.loaders.ILoader.prototype.setup = function(element) {};


tatu.loaders.ILoader.prototype.load = function(id) {};


tatu.loaders.ILoader.prototype.abort = function(id) {};

goog.exportSymbol('tatu.loaders.ILoader', tatu.loaders.ILoader);