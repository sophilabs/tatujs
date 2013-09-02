goog.provide('tatu.loaders.html.extractors.SilentDojoExtractor');

goog.require('tatu.loaders.html.extractors.DojoExtractor');
goog.require('tatu.loaders.html.extractors.ExtractorManager');


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
    var ORIGINAL = 'autoplay';
    var TRANSITORY = '__x__autoplay__';

    document = document.replace(ORIGINAL, TRANSITORY);

    var contents = goog.base(this, 'extract', document, sources);
    for (var query in contents) {
        contents[query] = contents[query].replace(TRANSITORY, ORIGINAL);
    }

    return contents;
};


tatu.loaders.html.extractors.ExtractorManager.getInstance().getRegistry().register(
    'silent', new tatu.loaders.html.extractors.SilentDojoExtractor());