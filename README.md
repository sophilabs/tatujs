# TatuJS
Convert your simple static site into a single-page application with a resource queue, history handling,
content pre-loading and local storage cache, using this configurable and extensible Javascript library.
[![Build Status](https://travis-ci.org/sophilabs/tatujs.png?branch=master)](https://travis-ci.org/sophilabs/tatujs)

## Installation
Add the latest build files to your HTML page and write your configuration object. Check out the example included.

## Configuration
This example configuration shows how to enable the HTML loader for page contents together with some nested media loaders.

```js
tatu.configuration.extractor = 'silent';
tatu.configuration.reload = false;
tatu.configuration.targetSymbol = '>>';
tatu.configuration.concurrency = 42;

tatu.configuration.sources = {
  /*
   * Pages of the menu
   */
  '.navbar a': {  // <- Links selectors
    'loader': 'html',

    'selectors': 'title,.container,.navbar',  // <- Sections of the page to download
    'handlers': 'title,outer,history,inspect,event',  // <- Handlers to call when a link is clicked
    'cache': 'object',  // <- Cache implementation to use

    'sources': {  // <- Nested media loaders
      'img': {
        'loader': 'image'
      },
      'video': {
        'loader': 'video',
        'minBuffered': 10
      }
    }
  },

  /*
   * Tabs inside Page 0
   */
  '.tatu-tabs a': {
    'loader': 'html',

    'selectors': 'title,.tatu-tab-content,.tatu-tabs',
    'handlers': 'title,outer,inspect,event',
    'cache': 'object'
  }
};
```
