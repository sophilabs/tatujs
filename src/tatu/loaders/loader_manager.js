goog.provide('tatu.loaders.LoaderManager');

goog.require('tatu.Registry');
goog.require('tatu.conf.LoaderSettings');
goog.require('goog.string');


/**
 * Loader manager.
 * @param {tatu.conf.Settings} settings Settings containing sources.
 * @constructor
 */
tatu.loaders.LoaderManager = function(settings) {
    /**
     * Settings.
     * @type {tatu.conf.Settings}
     * @private
     */
    this.settings_ = settings;

    /**
     * Loader instances registry.
     * @type {tatu.Registry.<tatu.loaders.ILoader>}
     * @private
     */
    this.sources_ = new tatu.Registry();

    /*
     * Create loader instances.
     */
    var sources = this.settings_.getOwn('sources');
    for (var source in sources) {
        // Get settings
        if (typeof(sources[source]) == 'string') {
            sources[source] = {'loader': sources[source]};
        }
        var loaderSettings = new tatu.conf.LoaderSettings(sources[source], this.settings_);

        // Get loader name
        var loaderName = loaderSettings.get('loader');
        if (typeof(loaderName) != 'string') {
            throw new Error('Must specify a loader for "' + source + '".');
        }

        // Get loader class
        var loaderClass = tatu.Manager.getInstance().getLoaders().get(loaderName);
        if (loaderClass == undefined) {
            throw new Error('Loader class for "' + loaderName + '" not found in registry.');
        }

        // Register
        this.sources_.register(source, new loaderClass(loaderSettings));
    }
};


/**
 * Perform inspection.
 * @param {Element} container Element to inspect.
 * @return {void} Nothing.
 */
tatu.loaders.LoaderManager.prototype.inspect = function(container) {
    var queue = tatu.Manager.getInstance().getQueue();
    for (var query in this.sources_.all()) {
        var loader = this.sources_.get(query);
        goog.array.forEach(goog.dom.query(query, container), function(element) {
            queue.enqueue(loader.setup(element));
        });
    }
};


/**
 * Get loader instances registry.
 * @return {tatu.Registry.<tatu.loaders.ILoader>}
 */
tatu.loaders.LoaderManager.prototype.getSources = function() {
    return this.sources_;
};