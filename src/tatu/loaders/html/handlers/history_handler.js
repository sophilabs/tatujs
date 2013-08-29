goog.provide('tatu.loaders.html.handlers.HistoryHandler');


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
                    manager.get(handlers[i]).handle(state.selectors, state.contents, state.href, state.handlers,
                                                    state.loaderManager);
                }
            }
        }
    };

    window.onload = function() {
        window.history.replaceState({
            tatu: true,

            title: document.title,
            content: {
                'body': goog.global['document']['body'].innerHTML
            },
            context: {
                href: window.location.href,
                selectors: {
                    'body': 'body'
                },
                handlers: ['inner']
            }
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
    }, contents['title'], href);
};


tatu.loaders.html.handlers.HandlerManager.getInstance().getRegistry().register(
    'history', new tatu.loaders.html.handlers.HistoryHandler());
