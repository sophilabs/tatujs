var SRC = 'http://localhost:8080/build/tatu.js';

var SCRIPT = "var e = document.createElement('script');" +
             "e['src'] = '" + SRC + "';" +
             "document.body.appendChild(e);";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab["id"], {"code": SCRIPT});
});
