var activeTabs = [];
var entriesCount = {};

chrome.browserAction.onClicked.addListener(function(tab) {
    var tabId = tab["id"];

    var active = false;
    var i;
    for (i = 0; i < activeTabs.length; i++) {
        if (activeTabs[i] == tabId) {
            active = true;
            break;
        }
    }

    if (!active) {
        activeTabs.push(tabId);
        active = true;
        entriesCount[tabId] = 0;
    } else {
        activeTabs.splice(i, 1);
        active = false;
    }

    if (active) {
        chrome.browserAction.setBadgeText({
            "text": entriesCount[tabId] + '',
            "tabId": tabId
        });

        chrome.tabs.executeScript(tabId, {
            "file": "tatu.js"
        }, function() {
            chrome.tabs.executeScript(tabId, {
                "file": "event.js"
            }, function() {
                chrome.runtime.onMessage.addListener(
                    function(request, sender, sendResponse) {
                        entriesCount[sender.tab.id] = request["entries"];

                        if (sender.tab.id == tabId) {
                            chrome.browserAction.setBadgeText({
                                "text": request["entries"],
                                "tabId": tabId
                            });
                        }
                    }
                );
            });
        });
        chrome.browserAction.setIcon({
            "path": "icon_active.png",
            "tabId": tabId
        });
    } else {
        chrome.tabs.executeScript(tabId, {
            "code": "window.location.reload();"
        });
        chrome.browserAction.setIcon({
            "path": "icon.png",
            "tabId": tabId
        });
        chrome.browserAction.setBadgeText({
            "text": "",
            "tabId": tabId
        });
    }
});
