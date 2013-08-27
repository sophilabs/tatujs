goog.provide('tatu.loaders.plain.PlainResource');

goog.require('tatu.loaders.IResource');
goog.require('tatu.registry.Registry');
goog.require('goog.net.XhrIo');


/**
 * Plain resource.
 * @constructor
 * @implements {tatu.loaders.IResource}
 */
tatu.loaders.plain.PlainResource = function(href, timeout, method) {
    this.cache_ = new tatu.registry.Registry();

    this.headerName_ = null;
    this.parameterName_ = null;

    this.href_ = href;
    this.timeout_ = timeout;
    this.method_ = method;
};


/**
 * Set the name of the HTTP header.
 * @param {string} headerName Header name.
 */
tatu.loaders.plain.PlainResource.prototype.setHeaderName = function(headerName) {
    this.headerName_ = headerName;
};


/**
 * Set the HTTP parameter name.
 * @param {string} parameterName Parameter name.
 */
tatu.loaders.plain.PlainResource.prototype.setParameterName = function(parameterName) {
    this.parameterName_ = parameterName;
};


/**
 * Perform AJAX request to get the specified sources.
 * @param {Array.<string>} sources Sources to fetch.
 * @param {function} callback Callback for the XhrIo send.
 */
tatu.loaders.plain.PlainResource.prototype.fetch = function(sources, callback) {
    sources = JSON.stringify(sources);

    var headers = {};
    var content = {};
    if (this.headerName_) {
        headers[this.headerName_] = sources;
    } else if (this.parameterName_) {
        content[this.parameterName_] = sources;
    }

    var xhrio = goog.net.XhrIo();
    xhrio.send(this.href_, callback, this.method_, content, headers, this.timeout_);
};


/**
 * Obtain contents for the specified sources.
 * @param {Array.<strong>} sources Sources to obtain.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.plain.PlainResource.prototype.obtain = function(sources, resolve) {
};
