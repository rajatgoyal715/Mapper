chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'map': {}}, function() {
		console.log('Pairs set successfully');
	});

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    // pageUrl: {hostEquals: 'developer.chrome.com'},
                })
            ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});