// This file was autogenerated by closure/library/closure/bin/build/depswriter.py.
// Please do not edit.
goog.addDependency('../../../../src/tatu/conf/element_settings.js', ['tatu.conf.ElementSettings'], ['tatu.conf.Settings']);
goog.addDependency('../../../../src/tatu/conf/loader_settings.js', ['tatu.conf.LoaderSettings'], ['tatu.conf.Settings']);
goog.addDependency('../../../../src/tatu/conf/settings.js', ['tatu.conf.Settings'], []);
goog.addDependency('../../../../src/tatu/loaders/base_loader.js', ['tatu.loaders.BaseLoader'], ['tatu.Registry', 'tatu.loaders.ILoader']);
goog.addDependency('../../../../src/tatu/loaders/dummy/dummy_loader.js', ['tatu.loaders.dummy.DummyLoader'], ['goog.events', 'goog.math', 'goog.style', 'tatu.conf.ElementSettings', 'tatu.loaders.BaseLoader', 'tatu.loaders.dummy.DummyResource', 'tatu.queue.Entry', 'tatu.queue.EntryEvent', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/dummy/dummy_resource.js', ['tatu.loaders.dummy.DummyResource'], ['tatu.loaders.IResource']);
goog.addDependency('../../../../src/tatu/loaders/html/cache/cache_manager.js', ['tatu.loaders.html.cache.CacheManager'], ['tatu.Registry']);
goog.addDependency('../../../../src/tatu/loaders/html/cache/icache.js', ['tatu.loaders.html.cache.ICache'], []);
goog.addDependency('../../../../src/tatu/loaders/html/cache/local_storage_cache.js', ['tatu.loaders.html.cache.LocalStorageCache'], ['tatu.loaders.html.cache.ObjectCache']);
goog.addDependency('../../../../src/tatu/loaders/html/cache/object_cache.js', ['tatu.loaders.html.cache.ObjectCache'], []);
goog.addDependency('../../../../src/tatu/loaders/html/extractors/dojo_extractor.js', ['tatu.loaders.html.extractors.DojoExtractor'], ['goog.array', 'goog.dom', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/html/extractors/extractor_manager.js', ['tatu.loaders.html.extractors.ExtractorManager'], ['tatu.Registry']);
goog.addDependency('../../../../src/tatu/loaders/html/extractors/iextractor.js', ['tatu.loaders.html.extractors.IExtractor'], []);
goog.addDependency('../../../../src/tatu/loaders/html/extractors/silent_dojo_extractor.js', ['tatu.loaders.html.extractors.SilentDojoExtractor'], ['tatu.loaders.html.extractors.DojoExtractor', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/event_handler.js', ['tatu.loaders.html.handlers.EventHandler'], ['goog.events']);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/handler_manager.js', ['tatu.loaders.html.handlers.HandlerManager'], ['tatu.Registry']);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/history_handler.js', ['tatu.loaders.html.handlers.HistoryHandler'], ['tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/ihandler.js', ['tatu.loaders.html.handlers.IHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/inner_html_handler.js', ['tatu.loaders.html.handlers.InnerHTMLHandler'], ['goog.dom']);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/inspect_handler.js', ['tatu.loaders.html.handlers.InspectHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/outer_html_handler.js', ['tatu.loaders.html.handlers.OuterHTMLHandler'], []);
goog.addDependency('../../../../src/tatu/loaders/html/handlers/title_handler.js', ['tatu.loaders.html.handlers.TitleHandler'], ['tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/html/html_loader.js', ['tatu.loaders.html.HTMLLoader'], ['goog.events', 'tatu.conf.ElementSettings', 'tatu.loaders.BaseLoader', 'tatu.loaders.html.HTMLResource', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/html/html_resource.js', ['tatu.loaders.html.HTMLResource'], ['goog.Uri', 'goog.net.XhrIo', 'tatu.loaders.IResource', 'tatu.loaders.html.extractors.ExtractorManager', 'tatu.loaders.html.handlers.HandlerManager']);
goog.addDependency('../../../../src/tatu/loaders/iloader.js', ['tatu.loaders.ILoader'], []);
goog.addDependency('../../../../src/tatu/loaders/image/image_loader.js', ['tatu.loaders.image.ImageLoader'], ['tatu.loaders.BaseLoader', 'tatu.loaders.image.ImageResource']);
goog.addDependency('../../../../src/tatu/loaders/image/image_resource.js', ['tatu.loaders.image.ImageResource'], []);
goog.addDependency('../../../../src/tatu/loaders/iresource.js', ['tatu.loaders.IResource'], []);
goog.addDependency('../../../../src/tatu/loaders/loader_manager.js', ['tatu.loaders.LoaderManager'], ['goog.string', 'tatu.Registry', 'tatu.conf.LoaderSettings', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/loaders/video/video_loader.js', ['tatu.loaders.video.VideoLoader'], ['goog.array', 'goog.dom', 'tatu.loaders.BaseLoader', 'tatu.loaders.video.VideoResource']);
goog.addDependency('../../../../src/tatu/loaders/video/video_resource.js', ['tatu.loaders.video.VideoResource'], []);
goog.addDependency('../../../../src/tatu/manager.js', ['tatu.Manager'], ['goog.dom', 'goog.dom.query', 'goog.events', 'tatu.Registry', 'tatu.conf.Settings', 'tatu.loaders.LoaderManager', 'tatu.loaders.dummy.DummyLoader', 'tatu.loaders.html.HTMLLoader', 'tatu.loaders.html.cache.CacheManager', 'tatu.loaders.html.cache.LocalStorageCache', 'tatu.loaders.html.cache.ObjectCache', 'tatu.loaders.html.extractors.DojoExtractor', 'tatu.loaders.html.extractors.ExtractorManager', 'tatu.loaders.html.extractors.SilentDojoExtractor', 'tatu.loaders.html.handlers.EventHandler', 'tatu.loaders.html.handlers.HandlerManager', 'tatu.loaders.html.handlers.HistoryHandler', 'tatu.loaders.html.handlers.InnerHTMLHandler', 'tatu.loaders.html.handlers.InspectHandler', 'tatu.loaders.html.handlers.OuterHTMLHandler', 'tatu.loaders.html.handlers.TitleHandler', 'tatu.loaders.image.ImageLoader', 'tatu.loaders.video.VideoLoader', 'tatu.queue.Queue', 'tatu.queue.QueueEvent', 'tatu.utils']);
goog.addDependency('../../../../src/tatu/queue/entry.js', ['tatu.queue.Entry'], ['goog.events.EventTarget', 'tatu.queue.EntryEvent']);
goog.addDependency('../../../../src/tatu/queue/entry_event.js', ['tatu.queue.EntryEvent'], ['goog.events.Event']);
goog.addDependency('../../../../src/tatu/queue/queue.js', ['tatu.queue.Queue'], ['goog.array', 'goog.events.EventTarget', 'tatu.queue.Entry']);
goog.addDependency('../../../../src/tatu/queue/queue_event.js', ['tatu.queue.QueueEvent'], ['goog.events.Event']);
goog.addDependency('../../../../src/tatu/registry.js', ['tatu.Registry'], []);
goog.addDependency('../../../../src/tatu/utils.js', ['tatu.utils'], ['goog.Uri']);
