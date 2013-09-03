var active = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    active = !active;
    var tabId = tab["id"];

    if (active) {
        chrome.tabs.executeScript(tabId, {
            "file": "tatu.js"
        });
        chrome.browserAction.setIcon({
            "path": "icon_active.png"
        });
    } else {
        chrome.tabs.executeScript(tabId, {
            "code": "window.location.reload();"
        });
        chrome.browserAction.setIcon({
            "path": "icon.png"
        });
    }
});
