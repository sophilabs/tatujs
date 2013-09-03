goog.provide('tatu.loaders.html.HTMLResource');

goog.require('tatu.loaders.IResource');
goog.require('tatu.loaders.html.handlers.HandlerManager');
goog.require('tatu.loaders.html.extractors.ExtractorManager');
goog.require('goog.net.XhrIo');
goog.require('goog.Uri');


/**
 * Plaintext resource.
 * @param {number} timeout Timeout.
 * @param {tatu.loaders.html.cache.ICache} cache Cache.
 * @param {string} href Anchor HREF.
 * @param {Array.<Object.<string, string>>} selectors Selectors to handle.
 * @param {boolean} reload Whether to reload.
 * @param {Array.<string>} handlers Handlers to use.
 * @param {string} extractor Extractor to use for client-side extraction.
 * @param {string} method HTTP method.
 * @param {string} headerName Header name.
 * @param {string} parameterName Parameter name.
 * @param {tatu.loaders.LoaderManager} loaderManager Nested loaders.
 * @constructor
 * @implements {tatu.loaders.IResource}
 */
tatu.loaders.html.HTMLResource = function(timeout, cache, href, selectors, reload, handlers, extractor, method,
                                          headerName, parameterName, loaderManager) {
    this.timeout_ = timeout;
    this.cache_ = cache;

    var href = href.split('#');
    this.href_ = href[0];
    this.goToId_ = href[1];

    this.selectors_ = selectors;
    this.reload_ = reload;
    this.handlers_ = handlers;
    this.extractor_ = extractor;
    this.method_ = method;
    this.headerName_ = headerName;
    this.parameterName_ = parameterName;
    this.loaderManager_ = loaderManager;
};


/**
 * Perform AJAX request to get the specified sources.
 * @param {Array.<string>} sources Sources to fetch.
 * @param {function} callback Callback for the XhrIo send.
 * @private
 */
tatu.loaders.html.HTMLResource.prototype.fetch_ = function(sources, callback) {
    var jsonSources = JSON.stringify(sources);

    var headers = {};
    if (this.headerName_) {
        headers[this.headerName_] = jsonSources;
    }

    var uri = goog.Uri.parse(this.href_);
    if (this.parameterName_) {
        uri.setParameterValue(this.parameterName_, jsonSources);
    }

    this.xhrio_ = new goog.net.XhrIo();
    goog.events.listen(this.xhrio_, goog.net.EventType.COMPLETE, function(e) {
        callback(e, sources);
    });
    this.xhrio_.setTimeoutInterval(this.timeout_);
    this.xhrio_.send(uri.toString(), this.method_, null, headers, this.timeout_);
};


/**
 * Load required contents.
 * @param {function} resolve Resolution callback.
 */
tatu.loaders.html.HTMLResource.prototype.load = function(resolve) {
    var toFetch;

    if (this.reload_) {
        toFetch = goog.object.getKeys(this.selectors_);
    } else {
        if (this.cache_.hasContentsFor(this.href_)) {
            toFetch = [];
            for (var source in this.selectors_) {
                if (!this.cache_.hasContentsFor(this.href_, source)) {
                    toFetch.push(source);
                }
            }
        } else {
            toFetch = goog.object.getKeys(this.selectors_);
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
        this.fetch_(toFetch, goog.bind(function(e, sources) {
            var xhr = e.target;
            var response = xhr.getResponseText();
            var fetchedContents;

            try {
                fetchedContents = JSON.parse(response);
            } catch (e) {
                var fetchedContents = tatu.loaders.html.extractors.ExtractorManager.getInstance().getRegistry().get(
                    this.extractor_).extract(response, sources);
            }

            // Inspect content
            for (var source in fetchedContents) {
                this.loaderManager_.inspect(fetchedContents[source]);
                this.cache_.store(this.href_, source, fetchedContents[source]);
            }

            resolve();
        }, this));
    }
};


/**
 * Abort AJAX request.
 */
tatu.loaders.html.HTMLResource.prototype.abort = function() {
    this.xhrio_.abort();
};


/**
 * Call handlers.
 */
tatu.loaders.html.HTMLResource.prototype.handle = function() {
    var handlers = tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry();

    this.load(goog.bind(function() {
        goog.array.forEach(this.handlers_, function(handler) {
            handlers.get(handler).handle(
                this.selectors_, this.cache_.getContentsFor(this.href_, goog.object.getKeys(this.selectors_)),
                this.href_, this.handlers_);
        }, this);
    }, this));

    if (goog.isDef(this.goToId_)) {
        location.href = '#' + this.goToId_;
    }
};
