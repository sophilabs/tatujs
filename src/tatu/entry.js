goog.provide('tatu.Entry');


/**
 * Queue entry.
 * @param {tatu.loaders.ILoader} loader Loader.
 * @param {Element} element Element.
 * @constructor
 */
tatu.Entry = function(loader, element) {
    this.loader = loader;
    this.settings = tatu.Settings(loader, element);

    this.id = loader.setup(element, this.settings);
    this.priority = this.settings.get('priority');
};


/**
 * Load the associated resource.
 * @param resolve Resolution callback.
 */
tatu.Entry.prototype.load = function(resolve) {
    this.loader.load(this.id, resolve);
};


/**
 * Abort the associated resource.
 */
tatu.Entry.prototype.abort = function() {
    this.loader.abort(this.id);
};
