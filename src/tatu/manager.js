goog.provide('tatu.Manager');

goog.require('goog.dom');

goog.require('tatu.Queue');
goog.require('tatu.Settings');
goog.require('tatu.utils');

goog.require('tatu.loaders.DummyLoader');


/**
 * Main entry point.
 * @constructor
 */
tatu.Manager = function() {

    /**
     * Global configuration
     * @type {tatu.Settings}
     * @private
     */
    this.settings_ = null;

    /**
     * Loader classes registry.
     * @type {tatu.Registry.<Function>}
     * @private
     */
    this.loaders_ = new tatu.Registry();

    /**
     * Loader instances registry.
     * @type {tatu.Registry.<tatu.loaders.ILoader>}
     * @private
     */
    this.sources_ = new tatu.Registry();

    /**
     * Queue.
     * @type {tatu.Queue}
     * @private
     */
    this.queue_ = new tatu.Queue();

    //TODO: add event?
    goog.global['onload'] = goog.bind(this.init_, this);
};

goog.addSingletonGetter(tatu.Manager);


/**
 * Perform inspection using the registered loaders and enqueue.
 * @param {Element} node Node to inspect.
 */
tatu.Manager.prototype.inspect = function(node) {
    this.queue_.enqueue(tatu.utils.inspect(this.sources_, node));
};


/**
 * Initialize the manager.
 * @return {void} Nothing.
 * @private
 */
tatu.Manager.prototype.init_ = function() {

    this.settings_ = new tatu.Settings(tatu.configuration);

    var classes = this.settings_.get('loaders', []);
    for (var name in classes) {
        this.loaders_.register(name, classes[name]);
    }

    var sources = this.settings_.get('sources', []);
    for (var source in sources) {
        var options = sources[source];
        if (typeof(options) == 'string') {
            options = {'name': options};
        }
        var settings = new tatu.Settings(options, this.settings_);
        this.sources_.register(source, new (this.loaders_.get(options['name']))(settings));
    }

    // Perform first inspection
    this.inspect(goog.global['document']['body']);
};


/**
 * Default configuration.
 */
tatu.configuration = {
    // Loaders
    'loaders': {
        'dummy': tatu.loaders.DummyLoader
    },

    // Sources
    'sources': {
        'div': {
            'loader': 'dummy'
        }//,
        //'a': 'plain',
        //'img': 'image'
    },

    // Concurrent requests
    'concurrency': 4,

    // Default priority
    'priority': 1,

    // Default timeout
    'timeout': 10000
};
goog.exportSymbol('tatu.configuration', tatu.configuration);


tatu.Manager.getInstance();
