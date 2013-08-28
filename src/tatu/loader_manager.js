goog.provide('tatu.LoaderManager');

goog.require('tatu.Registry');
goog.require('tatu.conf.LoaderSettings');
goog.require('goog.string');


/**
 * Loader manager.
 * @param {tatu.Registry.<Function>} loaders Loader classes.
 * @param {tatu.conf.Settings} settings Settings containing sources.
 * @constructor
 */
tatu.LoaderManager = function(loaders, settings) {
    /**
     * Loader classes.
     * @type {tatu.Registry.<Function>}
     * @private
     */
    this.loaders_ = loaders;

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
        var loaderClass = this.loaders_.get(loaderName);
        if (loaderClass == undefined) {
            throw new Error('Loader class for "' + loaderName + '" not found in registry.');
        }

        // Register
        this.sources_.register(source, new loaderClass(this.loaders_, loaderSettings));
    }
};


/**
 * Get loader instances registry.
 * @return {tatu.Registry.<tatu.loaders.ILoader>}
 */
tatu.LoaderManager.prototype.getSources = function() {
    return this.sources_;
};
