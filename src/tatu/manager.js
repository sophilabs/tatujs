goog.provide('tatu.Manager');

goog.require('goog.dom');

goog.require('tatu.Inspector');
goog.require('tatu.loaders.DummyLoader');
goog.require('tatu.loaders.PlainLoader');
goog.require('tatu.loaders.ImageLoader');


/**
 * Entry point.
 * @constructor
 */
tatu.Manager = function() {
    /**
     * Main inspector.
     * @type {tatu.Inspector}
     * @private
     */
    this.inspector_ = new tatu.Inspector();

    /**
     * Loader classes registry.
     * @type {tatu.Registry}
     */
    this.classes = new tatu.Registry();

    /**
     * Loader instances registry.
     * @type {tatu.Registry}
     */
    this.loaders = new tatu.Registry();

    /*
     * Initialize.
     */
    window.onload = function() {
        tatu.Manager.init_();
    };
};

goog.addSingletonGetter(tatu.Manager);


/**
 * Setup loaders from a configuration object.
 * @param configuration Configuration.
 * @private
 */
tatu.Manager.prototype.configure_ = function(configuration) {
    /*
     * Register classes.
     */
    var classes = configuration['classes'];
    for (var name in classes) {
        this.classes.register(name, classes[name]);
    }

    /*
     * Register loaders.
     */
    var loaders = configuration['loaders'];
    for (var query in loaders) {
        var settings = loaders[query];
        var instance;
        if (typeof(settings) == 'string') {
            instance = new this.classes.get(settings)();
        } else {
            instance = new this.classes.get(settings['name'])(settings);
        }
        this.loaders.register(query, instance);
    }
};


/**
 * Perform inspection using the registered loaders.
 * @param {Node} node Node to inspect.
 */
tatu.Manager.prototype.inspect = function(node) {
    this.inspector_.inspect(this.loaders, node);
};


/**
 * Initialize the manager.
 * @private
 */
tatu.Manager.prototype.init_ = function() {
    // Configure for the first time
    this.configure_(tatu.configuration);

    // Perform first inspection
    this.inspect(document.body);
};


/**
 * Default configuration.
 */
tatu.configuration = {
    // Classes
    'classes': {
        'dummy': tatu.loaders.DummyLoader
    },

    // Loaders
    'loaders': {
        'div': {
            'name': 'dummy'
        },
        'a': 'plain',
        'img': 'image'
    },

    // Concurrent requests
    'concurrency': 4,

    // Default priority
    'priority': 1,

    // Default timeout
    'timeout': 10000
};


goog.exportSymbol('tatu.configuration', tatu.configuration);