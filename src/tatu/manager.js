goog.provide('tatu.Manager');

goog.require('goog.dom');
goog.require('goog.dom.query');

goog.require('tatu.queue.Queue');
goog.require('tatu.conf.Settings');
goog.require('tatu.Registry');
goog.require('tatu.utils');

// Handlers
goog.require('tatu.loaders.html.handlers.HandlerManager');
goog.require('tatu.loaders.html.handlers.InnerHTMLHandler');
goog.require('tatu.loaders.html.handlers.OuterHTMLHandler');
goog.require('tatu.loaders.html.handlers.TitleHandler');
goog.require('tatu.loaders.html.handlers.InspectHandler');
goog.require('tatu.loaders.html.handlers.HistoryHandler');

// Extractors
goog.require('tatu.loaders.html.extractors.ExtractorManager');
goog.require('tatu.loaders.html.extractors.DojoExtractor');
goog.require('tatu.loaders.html.extractors.SilentDojoExtractor');

// Loaders
goog.require('tatu.loaders.dummy.DummyLoader');
goog.require('tatu.loaders.html.HTMLLoader');

goog.require('tatu.loaders.LoaderManager');


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
     * @type {tatu.loaders.LoaderManager}
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
    /*
     * Register handlers.
     */

    var handlers = tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry();

    handlers.register('inner', new tatu.loaders.html.handlers.InnerHTMLHandler());
    handlers.register('outer', new tatu.loaders.html.handlers.OuterHTMLHandler());
    handlers.register('title', new tatu.loaders.html.handlers.TitleHandler());
    handlers.register('inspect', new tatu.loaders.html.handlers.InspectHandler());
    handlers.register('history', new tatu.loaders.html.handlers.HistoryHandler());


    /*
     * Register extractors.
     */

    var extractors = tatu.loaders.html.extractors.ExtractorManager.getInstance().getRegistry();

    extractors.register('dojo', new tatu.loaders.html.extractors.DojoExtractor());
    extractors.register('silent', new tatu.loaders.html.extractors.SilentDojoExtractor());


    /*
     * Initialize.
     */

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
     * @type {tatu.loaders.LoaderManager}
     * @private
     */
    this.loaderManager_ = new tatu.loaders.LoaderManager(this.settings_);

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
        'dummy': tatu.loaders.dummy.DummyLoader,
        'html': tatu.loaders.html.HTMLLoader
    },

    // Sources
    'sources': {
        /*
         * Dummy loader for Sample 01
         */
        'div.dummy': {
            'loader': 'dummy',
            'count': 10,
            'max_priority': 2,
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
        },

        /*
         * HTML loader for Sample 02
         */
        'a': {
            'loader': 'html',

            'selectors': 'body,title',
            'handlers': 'title,outer,history,inspect',
            'extractor': 'silent',
            'timeout': 1000,
            'reload': false,

            'targetSymbol': '>>'

            /*
            'method': 'GET',
            'headerName': 'X-Source',
            'parameterName': 'source'
            */

            /* Future
            'sources': {
                'img': {
                    'loader': 'image'
                },
                'video': {
                    'loader': 'video'
                }
            }
            */
        }
    },

    // Concurrent requests
    'concurrency': 2,

    // Default priority
    'priority': 1,

    // Default timeout
    'timeout': 10000
};


goog.exportSymbol('tatu.configuration', tatu.configuration);
goog.exportSymbol('tatu.Manager', tatu.Manager);


tatu.Manager.getInstance();
