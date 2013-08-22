goog.provide('tatu.Manager');

goog.require('goog.dom');
goog.require('goog.dom.query');

goog.require('tatu.Queue');
goog.require('tatu.conf.Settings');
goog.require('tatu.Registry');
goog.require('tatu.utils');
goog.require('tatu.loaders.DummyLoader');
goog.require('tatu.LoaderManager');


/**
 * Main entry point.
 * @constructor
 */
tatu.Manager = function() {
    /**
     * Global configuration
     * @type {tatu.conf.Settings}
     * @private
     */
    this.settings_ = null;

    /**
     * Loader classes registry.
     * @type {tatu.Registry.<Function>}
     * @private
     */
    this.loaders_ = null;

    /**
     * Queue.
     * @type {tatu.Queue}
     * @private
     */
    this.queue_ = null;

    /**
     * Loader manager;
     * @type {tatu.LoaderManager}
     * @private
     */
    this.loaderManager_ = null;

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
    // Create settings
    this.settings_ = new tatu.conf.Settings(tatu.configuration);

    // Create loader class registry
    this.loaders_ = new tatu.Registry();
    var loaders = this.settings_.get('loaders', {});
    for (var name in loaders) {
        this.loaders_.register(name, loaders[name]);
    }

    // Create queue
    this.queue_ = new tatu.Queue();

    /**
     * Primary loader manager.
     * @type {tatu.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.LoaderManager(this.loaders_, this.settings_);
    //this.loaderManager_.inspect(goog.global['document']['body']);
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
            'loader': 'dummy',
            'count': 2,
            'max_priority': 10,
            'max_timeout': 4000,

            'sources': {
                '1nested1': 'dummy',
                '1nested2': 'dummy'
            }
        },

        'div': {
            'loader': 'dummy',
            'sources': {
                '2nested1': 'dummy',
                '2nested2': 'dummy'
            }
        }

        /* Future
        'a': {
            'loader': 'plain',
            'selectors': '.container',

            'sources': {
                'img': {
                    'loader': 'image'
                },
                'video': {
                    'loader': 'video'
                }
            }
        }
        */
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
