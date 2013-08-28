goog.provide('tatu.loaders.plain.PlainResource');

goog.require('tatu.loaders.IResource');
goog.require('tatu.loaders.plain.handlers.HandlerManager');
goog.require('goog.net.XhrIo');


/**
 * Plain resource.
 * @param {number} timeout Timeout.
 * @param {object} cache Cache.
 * @param {string} href Anchor HREF.
 * @param {Array.<Object.<string, string>>} selectors Selectors to handle.
 * @param {boolean} reload Whether to reload.
 * @param {Array.<string>} handlers Handlers to use.
 * @param {string} method HTTP method.
 * @param {string} headerName Header name.
 * @param {string} parameterName Parameter name.
 * @constructor
 * @implements {tatu.loaders.IResource}
 */
tatu.loaders.plain.PlainResource = function(timeout, cache, href, selectors, reload, handlers, method,
                                            headerName, parameterName) {
    this.timeout_ = timeout;

    this.cache_ = cache;

    this.href_ = href;
    this.selectors_ = selectors;
    this.reload_ = reload;
    this.handlers_ = handlers;
    this.method_ = method;
    this.headerName_ = headerName;
    this.parameterName_ = parameterName;
};


/**
 * Perform AJAX request to get the specified sources.
 * @param {Array.<string>} sources Sources to fetch.
 * @param {function} callback Callback for the XhrIo send.
 * @private
 */
tatu.loaders.plain.PlainResource.prototype.fetch_ = function(sources, callback) {
    sources = JSON.stringify(sources);

    var headers = {};
    var content = {};
    if (this.headerName_) {
        headers[this.headerName_] = sources;
    } else if (this.parameterName_) {
        content[this.parameterName_] = sources;
    }

    this.xhrio_ = goog.net.XhrIo();
    this.xhrio_.send(this.href_, callback, this.method_, content, headers, this.timeout_);
};


/**
 * Get cache contents for this resource's HREF.
 * @returns {*}
 * @private
 */
tatu.loaders.plain.PlainResource.prototype.getContents_ = function() {
    var contents = this.cache_[this.href_];
    if (contents == undefined) {
        contents = {};
    }
    return contents;
};


/**
 * Load required contents.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.plain.PlainResource.prototype.load = function(resolve) {
    var toFetch;
    var contents = this.getContents_();

    if (this.reload_) {
        toFetch = goog.object.getKeys(this.selectors_);
    } else {
        if (goog.object.isEmpty(contents)) {
            toFetch = goog.object.getKeys(this.selectors_);
        } else {
            toFetch = [];
            for (var source in this.selectors_) {
                if (!goog.object.containsKey(this.cache_[this.href_], source)) {
                    toFetch.push(source);
                }
            }
        }
    }

    /*
     * Nothing to fetch, resolve.
     */
    if (toFetch.length == 0) {
        resolve();

    /*
     * Contents to fetch, make request.
     */
    } else {
        this.fetch_(toFetch, function(e) {
            var xhr = e.target;

            var responseObj = xhr.getResponseJson();
            var responseRaw = xhr.getResponseText();

            if (responseObj) {
                for (var source in responseObj) {
                    contents[source] = responseObj[source];
                }
            }

            resolve();
        });
    }
};


/**
 * Abort AJAX request.
 */
tatu.loaders.plain.PlainResource.prototype.abort = function() {
    this.xhrio_.abort();
};


/**
 * Call handlers.
 */
tatu.loaders.plain.PlainResource.prototype.handle = function() {
    var handlers = tatu.loaders.plain.handlers.HandlerManager.getInstance().getRegistry();

    this.load(function() {
        goog.array.forEach(this.handlers_, function(handler) {
            handlers.get(handler).handle(this.selectors_, this.getContents_(), this.href_, this.handlers_);
        });
    });
};