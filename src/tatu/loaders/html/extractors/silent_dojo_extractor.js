goog.provide('tatu.loaders.html.extractors.SilentDojoExtractor');

goog.require('tatu.loaders.html.extractors.DojoExtractor');
goog.require('tatu.utils');


/**
 * Dojo extractor with workaround to avoid transitory autoplay of video and audio tags.
 * @implements {tatu.loaders.html.extractors.IExtractor}
 * @constructor
 */
tatu.loaders.html.extractors.SilentDojoExtractor = function() {
    tatu.loaders.html.extractors.DojoExtractor.call(this);
};

goog.inherits(tatu.loaders.html.extractors.SilentDojoExtractor,
              tatu.loaders.html.extractors.DojoExtractor);


tatu.loaders.html.extractors.SilentDojoExtractor.prototype.extract = function(document, sources) {
    var ORIGINAL = 'src';
    var TRANSITORY = '__x__src__';

    var contents = goog.base(this, 'extract', tatu.utils.replaceAll(ORIGINAL, TRANSITORY, document), sources);

    for (var query in contents) {
        contents[query] = tatu.utils.replaceAll(TRANSITORY, ORIGINAL, contents[query]);
    }

    return contents;
};
