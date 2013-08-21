goog.provide('tatu.utils');

goog.require('goog.Uri')


/**
 * Build absolute Uri using the window location as base Uri.
 * @param uri Relative Uri.
 * @return {string} Absolute Uri.
 */
tatu.utils.buildAbsoluteUri = function(uri) {
    return goog.Uri.resolve(window.location, uri).toString();
};


/**
 * Perform inspection.
 * @param {tatu.Registry} loaders Registry of loader instances.
 * @param {Element} node Node to inspect.
 * @return {Array.<tatu.Entry>} Array of entries.
 */
tatu.utils.inspect = function(loaders, node) {
    var entries = [];
    var loaders = loaders.all();
    for (var query in loaders) {
        var loader = loaders[query];
        var nodes = goog.dom.query(query, node);

        for (var i = 0; i < nodes['length']; i++) {
            var node = nodes[i];
            var settings = new tatu.Settings(loader, node);
            entries.push(new tatu.Entry(loader, node,
                settings.get('priority'),
                settings.get('timeout')));
        }
    }
    return entries;
};