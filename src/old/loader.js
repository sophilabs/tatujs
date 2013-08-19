goog.require('tatu.Registry');
goog.require('tatu.Resource');

goog.provide('tatu.Loader');

/**
 * Base loader.
 */
tatu.Loader = function (settings) {
    this.resources = new tatu.Registry();
    this.settings = settings;
    this.init();
};

/**
 * Initialize loader.
 */
tatu.Loader.prototype.init = function () {};

/**
 * Identify an element.
 *
 * @param element   DOM element
 */
tatu.Loader.prototype.identify = function (element) {};

/**
 * Wrap the provide method with additional setup.
 *
 * @param element   DOM element
 */
tatu.Loader.prototype.setup = function (element) {};

/**
 * Load a resource.
 *
 * @param name      Resource name
 * @param resolve   Resolution callback
 * @param timeout   Load timeout.
 */
tatu.Loader.prototype.load = function (name, resolve, timeout) {};

/**
 * Abort a resource.
 *
 * @param name      Resource name
 */
tatu.Loader.prototype.abort = function (name) {};

/**
 * Create a resource if required and then provide an element with
 * that resource.
 *
 * @param element   DOM element
 */
tatu.Loader.prototype.provide = function (element) {
    var name = this.identify(element);

    var resource = this.resources.get(name);
    if (resource == undefined) {
        resource = new Resource();
        this.resources.register(name, resource);
    }

    return name;
};

/**
 * Loader registry.
 */
tatu.LoaderRegistry = function () {};

/**
 * Get a loader setting.
 *
 * @param loader    Loader selector or instance
 * @param setting   Setting name
 * @param none      Default value if none found
 * @returns         Setting value
 */    
tatu.LoaderRegistry.prototype.setting = function (loader, setting, none) {
    if (typeof(loader) == 'string') {
        loader = this.get(loader);
    }

    if (loader) {
        var value = loader.settings[setting];
        if (value != undefined) {
            return value;
        }
    }

    return none;
}

goog.inherits(tatu.LoaderRegistry, tatu.Registry);

tatu.loaders = new tatu.LoaderRegistry();

/**
 * Settings manager.
 *
 * @param element   DOM element
 * @param loader    Loader instance
 */
tatu.Settings = function (element, loader) {
    this.element = element;
    this.loader = loader;
};

/**
 * Get the value of a setting.
 *
 * @param name      Setting name
 * @param none      Default value
 */
tatu.Settings.prototype.get = function (name, none) {
    // Value from attribute
    var value = this.element.getAttribute(name);
    if (value != undefined) {
        return value;
    }

    // Value from data attribute
    value = this.element.getAttribute('data-' + name);
    if (value != undefined) {
        return value;
    }

    // Value from loader
    value = this.loader.settings[name];
    if (value != undefined) {
        return value;
    }

    // None value
    return none;
}
