goog.provide('tatu.Inspector');

goog.require('goog.dom.query');

goog.require('tatu.Registry');
goog.require('tatu.Entry');
goog.require('tatu.Settings');


/**
 * Content inspector.
 * @constructor
 */
tatu.Inspector = function() {};


/**
 * Perform inspection.
 * @param {tatu.Registry} loaders Registry of loader instances.
 * @param {Node} node Node to inspect.
 * @return {Array} Array of entries.
 */
tatu.Inspector.prototype.inspect = function(loaders, node) {
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
