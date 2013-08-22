goog.provide('tatu.Manager');

goog.require('goog.dom');
goog.require('goog.dom.query');

goog.require('tatu.Queue');
goog.require('tatu.Settings');
goog.require('tatu.Registry');
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
 * Initialize the manager.
 * @return {void} Nothing.
 * @private
 */
tatu.Manager.prototype.init_ = function() {

    this.settings_ = new tatu.Settings(tatu.configuration);

    var classes = this.settings_.get('loaders', {});
    for (var name in classes) {
        this.loaders_.register(name, classes[name]);
    }

    var sources = this.settings_.get('sources', []);
    for (var source in sources) {
        if (typeof(sources[source]) == 'string') {
            sources[source] = {'loader': sources[source]};
        }
        var settings = new tatu.Settings(sources[source], this.settings_);
        this.sources_.register(source, new (this.loaders_.get(sources[source]['loader']))(settings));
    }

    // Perform first inspection
    this.inspect(goog.global['document']['body']);
};


/**
 * Perform inspection using the registered loaders and enqueue.
 * @param {Element} container Element to inspect.
 * @return {void} Nothing.
 */
tatu.Manager.prototype.inspect = function(container) {
    for (var query in this.sources_.all()) {
        var loader = this.sources_.get(query);
        goog.array.forEach(goog.dom.query(query, container), function(element) {
            this.queue_.enqueue(loader.setup(element));
        }, this);
    }
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
