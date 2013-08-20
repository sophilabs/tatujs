goog.provide('tatu.Inspector');

goog.require('goog.dom.query');

goog.require('tatu.Registry');
goog.require('tatu.Entry');


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

        for (var node in goog.dom.query(query, node)) {
            entries.push(new tatu.Entry(loader, node));
        }
    }
    return entries;
};
