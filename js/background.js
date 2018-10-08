chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(['map'], function(result) {
        if(!result.map){
            chrome.storage.sync.set({'map': {}});
        }
    });
	chrome.commands.onCommand.addListener(function (command) {
		if (command === "toggle_popup") {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			});
        }
	});
});