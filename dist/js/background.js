chrome.runtime.onInstalled.addListener(function(){chrome.storage.sync.get(["map"],function(e){e.map||chrome.storage.sync.set({map:{}})})});