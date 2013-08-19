goog.provide("tatu.loaders.BaseLoader");

goog.require('tatu.loaders.ILoader');

/**
 * @constructor
 * @implements {tatu.loaders.ILoader}
 */
tatu.loaders.BaseLoader = function() {

    this.resources_ = {}; //TODO: use localStorage
};


/**
 *
 * @param {tatu.loaders.IResource} resource
 * @private
 */
tatu.loaders.BaseLoader.prototype.getResource_ = function(resource) {

};


/**
 *
 * @param {tatu.loaders.IResource} resource
 * @private
 */
tatu.loaders.BaseLoader.prototype.setResource_ = function(resource) {

};


tatu.loaders.prototype.setup = function(element) {
    //TODO: use goog exception
    throw new Exception('ERROR!');
};


tatu.loaders.prototype.load = function() {

};


tatu.loaders.prototype.abort = function() {

};

goog.exportSymbol('tatu.loaders.BaseLoader', tatu.loaders.BaseLoader);