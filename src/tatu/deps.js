// This file was autogenerated by closure/library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../../src/tatu/conf/element_settings.js', ['tatu.conf.ElementSettings'], ['tatu.conf.Settings']);
goog.addDependency('../../../../src/tatu/conf/loader_settings.js', ['tatu.conf.LoaderSettings'], ['tatu.conf.Settings']);
goog.addDependency('../../../../src/tatu/conf/settings.js', ['tatu.conf.Settings'], []);
goog.addDependency('../../../../src/tatu/loader_manager.js', ['tatu.LoaderManager'], ['goog.string', 'tatu.Registry', 'tatu.conf.LoaderSettings']);
goog.addDependency('../../../../src/tatu/loaders/base_loader.js', ['tatu.loaders.BaseLoader'], ['tatu.Registry', 'tatu.loaders.ILoader']);
goog.addDependency('../../../../src/tatu/loaders/dummy/dummy_loader.js', ['tatu.loaders.dummy.DummyLoader'], ['goog.events', 'goog.math', 'goog.style', 'tatu.conf.ElementSettings', 'tatu.conf.Settings', 'tatu.loaders.BaseLoader', 'tatu.loaders.dummy.DummyResource', 'tatu.queue.Entry', 'tatu.queue.EntryEvent', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/dummy/dummy_resource.js', ['tatu.loaders.dummy.DummyResource'], ['tatu.loaders.IResource']);
goog.addDependency('../../../../src/tatu/loaders/iloader.js', ['tatu.loaders.ILoader'], []);
goog.addDependency('../../../../src/tatu/loaders/iresource.js', ['tatu.loaders.IResource'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/handler_manager.js', ['tatu.loaders.plain.handlers.HandlerManager'], ['tatu.Registry']);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/history_handler.js', ['tatu.loaders.plain.handlers.HistoryHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/ihandler.js', ['tatu.loaders.plain.handlers.IHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/inner_html_handler.js', ['tatu.loaders.plain.handlers.InnerHTMLHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/outer_html_handler.js', ['tatu.loaders.plain.handlers.OuterHTMLHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/handlers/title_handler.js', ['tatu.loaders.plain.handlers.TitleHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/plain_loader.js', ['tatu.loaders.plain.PlainLoader'], []);
goog.addDependency('../../../../src/tatu/loaders/plain/plain_resource.js', ['tatu.loaders.plain.PlainResource'], ['goog.net.XhrIo', 'tatu.loaders.IResource', 'tatu.loaders.plain.handlers.HandlerManager']);
goog.addDependency('../../../../src/tatu/manager.js', ['tatu.Manager'], ['goog.dom', 'goog.dom.query', 'tatu.LoaderManager', 'tatu.Registry', 'tatu.conf.Settings', 'tatu.loaders.dummy.DummyLoader', 'tatu.queue.Queue', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/queue/entry.js', ['tatu.queue.Entry'], ['goog.events.EventTarget', 'tatu.queue.EntryEvent']);
goog.addDependency('../../../../src/tatu/queue/entry_event.js', ['tatu.queue.EntryEvent'], ['goog.events.Event']);
goog.addDependency('../../../../src/tatu/queue/queue.js', ['tatu.queue.Queue'], ['goog.array', 'tatu.queue.Entry']);
goog.addDependency('../../../../src/tatu/registry.js', ['tatu.Registry'], []);
goog.addDependency('../../../../src/tatu/utils.js', ['tatu.utils'], ['goog.Uri']);
