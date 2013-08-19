goog.provide('tatu.Manager');

goog.require('tatu.Inspector');


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

    //TODO: add on ready -> init_
};

goog.addSingletonGetter(tatu.Manager);


/**
 * Initialize the library.
 * @private
 */
tatu.Manager.prototype.init_ = function() {
    /* tatu.configuration */
};


/**
 * Default configuration.
 */
tatu.configuration = {
    'loaders': {
        'a': 'plain',
        'img': 'image'
    }
};


goog.exportSymbol('tatu.configuration', tatu.configuration);