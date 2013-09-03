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
goog.require('tatu.loaders.html.handlers.EventHandler');

// Extractors
goog.require('tatu.loaders.html.extractors.ExtractorManager');
goog.require('tatu.loaders.html.extractors.DojoExtractor');
goog.require('tatu.loaders.html.extractors.SilentDojoExtractor');

// Cache
goog.require('tatu.loaders.html.cache.CacheManager');
goog.require('tatu.loaders.html.cache.ObjectCache');
goog.require('tatu.loaders.html.cache.LocalStorageCache');

// Loaders
goog.require('tatu.loaders.dummy.DummyLoader');
goog.require('tatu.loaders.html.HTMLLoader');
goog.require('tatu.loaders.image.ImageLoader');
goog.require('tatu.loaders.video.VideoLoader');

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
};

goog.addSingletonGetter(tatu.Manager);


/**
 * Initialize the manager.
 * @return {void} Nothing.
 * @private
 */
tatu.Manager.prototype.init_ = function() {
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

    // Register handlers
    var handlers_ = tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry();
    var handlers = this.settings_.get('handlers', {});
    for (var name in handlers) {
        handlers_.register(name, handlers[name]);
    }

    // Register extractors
    var extractors_ = tatu.loaders.html.extractors.ExtractorManager.getInstance().getRegistry();
    var extractors = this.settings_.get('extractors', {});
    for (var name in extractors) {
        extractors_.register(name, extractors[name]);
    }

    // Register cache
    var cache_ = tatu.loaders.html.cache.CacheManager.getInstance().getRegistry();
    var cache = this.settings_.get('cache', {});
    for (var name in cache) {
        cache_.register(name, cache[name]);
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
        'html': tatu.loaders.html.HTMLLoader,
        'image': tatu.loaders.image.ImageLoader,
        'video': tatu.loaders.video.VideoLoader
    },

    // Handlers
    'handlers': {
        'inner': new tatu.loaders.html.handlers.InnerHTMLHandler(),
        'outer': new tatu.loaders.html.handlers.OuterHTMLHandler(),
        'title': new tatu.loaders.html.handlers.TitleHandler(),
        'inspect': new tatu.loaders.html.handlers.InspectHandler(),
        'history': new tatu.loaders.html.handlers.HistoryHandler(),
        'event': new tatu.loaders.html.handlers.EventHandler()
    },

    // Extractors
    'extractors': {
        'dojo': new tatu.loaders.html.extractors.DojoExtractor(),
        'silent': new tatu.loaders.html.extractors.SilentDojoExtractor()
    },

    // Cache
    'cache': {
        'object': new tatu.loaders.html.cache.ObjectCache(),
        'local': new tatu.loaders.html.cache.LocalStorageCache('cache')
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
            'handlers': 'title,outer,history,inspect,event',
            'extractor': 'silent',
            'timeout': 1000,
            'reload': false,

            'targetSymbol': '>>',

            'cache': 'local',

            /*
            'method': 'GET',
            'headerName': 'X-Source',
            'parameterName': 'source'
            */

            'sources': {
                'img': {
                    'loader': 'image'
                },
                'video': {
                    'loader': 'video'
                }
            }
        }
    },

    // Concurrent requests
    'concurrency': 2,

    // Default priority
    'priority': 1,

    // Default timeout
    'timeout': 10000
};


/**
 * Add a handle event listener.
 * @param {function} callback Event callback.
 */
tatu.Manager.prototype.onHandle = function(callback) {
    var handler = tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().get('event');
    goog.events.listen(handler, tatu.loaders.html.handlers.HandleEvent.HANDLE, callback);
};


goog.exportSymbol('tatu.configuration', tatu.configuration);
goog.exportSymbol('tatu.Manager', tatu.Manager);


// Export onHandle shortcut
goog.exportSymbol('tatu.onHandle', tatu.Manager.getInstance().onHandle);


/*
 * Initialize
 */
if (document.readyState == "complete") {
    tatu.Manager.getInstance().init_();
} else {
    tatu.utils.onDOMLoaded(function() {
        tatu.Manager.getInstance().init_();
    });
}
