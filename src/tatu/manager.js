goog.provide('tatu.Manager');

goog.require('tatu.Inspector');

/**
 *
 * @constructor
 */
tatu.Manager = function(){
    /**
     *
     * @type {tatu.Inspector}
     * @private
     */
    this.inspector_ = new tatu.Inspector();

    //TODO: add on ready -> init_
};
goog.addSingletonGetter(tatu.Manager);


/**
 *
 * @private
 */
tatu.Manager.prototype.init_ = function() {
    /* tatu.configuration */
};


tatu.configuration = {
    'loaders': {
        'a': 'plain',
        'img': 'image'
    }
};


goog.exportSymbol('tatu.configuration', tatu.configuration);