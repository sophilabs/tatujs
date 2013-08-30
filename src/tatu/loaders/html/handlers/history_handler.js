goog.provide('tatu.loaders.html.handlers.HistoryHandler');

goog.require('tatu.loaders.html.handlers.HandlerManager');
goog.require('tatu.utils');


/**
 * History handler.
 * @implements {tatu.loaders.html.handlers.IHandler}
 * @constructor
 */
tatu.loaders.html.handlers.HistoryHandler = function() {
    window.onpopstate = function (event) {
        var state = event.state;

        if (state && state.tatu) {
            var manager = tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry();

            var handlers = state.handlers;
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] != 'history') {
                    manager.get(handlers[i]).handle(state.selectors, state.contents, state.href, state.handlers);
                }
            }
        }
    };

    window.onload = function() {
        window.history.replaceState({
            tatu: true,

            contents: {
                'body': '<body>' + goog.global['document']['body'].innerHTML + '</body>',
                'title': '<title>' + document.title + '</title>'
            },
            href: window.location.href,
            selectors: {
                'body': 'body'
            },
            handlers: ['inner']
        }, document.title, window.location.href);
    };
};


tatu.loaders.html.handlers.HistoryHandler.prototype.handle = function(selectors, contents, href, handlers) {
    window.history.pushState({
        tatu: true,

        selectors: selectors,
        contents: contents,
        href: href,
        handlers: handlers
    }, tatu.utils.stripTags(contents['title']), href);
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'history', new tatu.loaders.html.handlers.HistoryHandler());
