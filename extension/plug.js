var active = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    active = !active;
    var tabId = tab["id"];

    chrome.browserAction.setBadgeText({
        "text": "0"
    });

    if (active) {
        chrome.tabs.executeScript(tabId, {
            "file": "tatu.js"
        }, function() {
            chrome.tabs.executeScript(tabId, {
                "file": "event.js"
            }, function() {
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse) {
                        chrome.browserAction.setBadgeText({
                            "text": request["entries"]
                        });
                    }
                );
            });
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
