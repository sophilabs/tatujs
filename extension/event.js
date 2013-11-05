tatu.onEnqueue(function(e) {
    chrome.runtime.sendMessage({
        'entries': '' + tatu.Manager.getInstance().getQueue().getEntryCount()
    });
});

tatu.onDequeue(function(e) {
    chrome.runtime.sendMessage({
        'entries': '' + tatu.Manager.getInstance().getQueue().getEntryCount()
    });
});
