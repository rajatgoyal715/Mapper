chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.sync.get(['map'], function (result) {
		if (!result.map) {
			chrome.storage.sync.set({
				'map': {}
			});
		}
	});
});