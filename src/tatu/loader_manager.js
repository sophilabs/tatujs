goog.provide('tatu.LoaderManager');

goog.require('tatu.Registry');
goog.require('tatu.conf.LoaderSettings');


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
    var sources = this.settings_.get('sources', {});
    for (var source in sources) {
        // Get settings
        if (typeof(sources[source]) == 'string') {
            sources[source] = {'loader': sources[source]};
        }
        var settings = new tatu.conf.LoaderSettings(sources[source]);

        // Get loader name
        var loader = settings.get('loader');
        if (typeof(loader) != 'string') {
            throw new Error('Must specify a loader.');
        }

        // Register
        this.sources_.register(source, new (this.loaders_.get(loader))(this.loaders_, settings));
    }
};
