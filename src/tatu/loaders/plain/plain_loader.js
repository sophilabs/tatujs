goog.provide('tatu.loaders.plain.PlainLoader');

goog.require('tatu.conf.ElementSettings');
goog.require('tatu.utils');


/**
 * Plaintext loader.
 * @param {tatu.conf.LoaderSettings} settings Loader settings.
 * @constructor
 * @extends {tatu.loaders.ILoader}
 */
tatu.loaders.plain.PlainLoader = function(settings) {
    tatu.loaders.BaseLoader.call(this, settings);

    this.cache_ = {};
};
goog.inherits(tatu.loaders.plain.PlainLoader, tatu.loaders.BaseLoader);


/**
 * Get a Resource ID for the specified element.
 * @param {Element} element
 * @return {string} Resource ID
 */
tatu.loaders.plain.PlainLoader.prototype.identify = function(element) {
    var settings = new tatu.conf.ElementSettings(element, this.settings_);
    return tatu.utils.buildAbsoluteUri(settings.get('href')) + settings.get('selectors');
};


/**
 * Setup a resource for the specified element.
 * @param {Element} element
 * @return {tatu.queue.Entry} Queue entry
 */
tatu.loaders.plain.PlainLoader.prototype.setup = function(element) {
    var id = this.identify(element);
    var settings = new tatu.conf.ElementSettings(element, this.settings_);

    // Get selectors
    var selectors = settings.get('selectors');
    if (typeof(selectors) == 'string') {
        var _selectors = selectors.split(',');
        selectors = {};

        for (var i = 0; i < _selectors.length; i++) {
            var pair = _selectors[i].split(settings.get('targetSymbol'));

            var source = pair[0];
            var target = pair[1];
            if (target == undefined) {
                target = source;
            }

            selectors[source] = target;
        }
    }

    // Get handlers
    var handlers = settings.get('handlers');
    if (typeof(handlers) == 'string') {
        handlers = handlers.split(',');
    }

    /*
     * Create resource and entry.
     */
    var resource = this.getOrRegister(id, new tatu.loaders.plain.PlainResource(
        settings.get('timeout'), this.cache_, tatu.utils.buildAbsoluteUri(settings.get('href')),
        selectors, settings.get('reload'), handlers, settings.get('method'),
        settings.get('headerName'), settings.get('parameterName')));
    var entry = new tatu.queue.Entry(this, id, goog.math.randomInt(settings.get('max_priority')));
};