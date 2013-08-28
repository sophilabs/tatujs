goog.provide('tatu.Manager');

goog.require('goog.dom');
goog.require('goog.dom.query');

goog.require('tatu.queue.Queue');
goog.require('tatu.conf.Settings');
goog.require('tatu.Registry');
goog.require('tatu.utils');
goog.require('tatu.loaders.dummy.DummyLoader');
//goog.require('tatu.loaders.plain.PlainLoader');
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
     * @type {tatu.queue.Queue}
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
    this.queue_ = new tatu.queue.Queue(this.settings_.get('concurrency'));

    /**
     * Primary loader manager.
     * @type {tatu.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.LoaderManager(this.settings_);

    // Perform inspection
    this.inspect(goog.global['document']['body']);
};


/**
 * Get loaders classes.
 */
tatu.Manager.prototype.getLoaders = function() {
    return this.loaders_;
};


/**
 * Get queue.
 */
tatu.Manager.prototype.getQueue = function() {
    return this.queue_;
};


/**
 * Perform inspection using the registered loaders and enqueue.
 * @param {Element} container Element to inspect.
 * @return {void} Nothing.
 */
tatu.Manager.prototype.inspect = function(container) {
    this.loaderManager_.inspect(container);
};


/**
 * Default configuration.
 */
tatu.configuration = {
    // Loaders
    'loaders': {
        'dummy': tatu.loaders.dummy.DummyLoader
        //'plain': tatu.loaders.plain.PlainLoader
    },

    // Sources
    'sources': {
        'div': {
            'loader': 'dummy',
            'count': 10,
            'max_priority': 1,
            'max_timeout': 1000,

            'style': {
                'background-color': 'gray'
            },
            'onLoadStyle': {
                'background-color': 'yellow'
            },
            'onAbortStyle': {
                'background-color': 'red'
            },
            'onResolveStyle': {
                'background-color': 'green'
            },

            'sources': {
                '1nested1': 'dummy',
                '1nested2': {
                    'loader': 'dummy',
                    'sources': {
                        '1nested2nested1': 'dummy',
                        '1nested2nested2': 'dummy'
                    }
                }
            }
        }

        /*
        'div': {
            'loader': 'dummy',
            'sources': {
                '2nested1': 'dummy',
                '2nested2': 'dummy'
            }
        }
        */

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
