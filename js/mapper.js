var keyInput, valueInput, spanMessage, addButton;

window.onload = function() {
	keyInput = this.document.getElementById('keyInput');
	valueInput = this.document.getElementById('valueInput');

	addButton = this.document.getElementById('addItem');
	addButton.onclick = addItem;

	spanMessage = this.document.getElementById('message');
}

function addItem() {
	var key = keyInput.value;
	if(!key) {
		message('Error: No key specified');
		return;
	}
	var value = valueInput.value;
	if(!value) {
		message('Error: No value specified');
		return;
	}
	addPair(key, value, function() {
		message('New pair added successfully');
	});
}

function addPair(key, value, callback) {
	console.log("key:", key);
	console.log("value:", value);
	getPairs(function(result) {
		pairs = result.map;
		console.log(pairs);
		pairs[key] = value;
		console.log(pairs);
		setPairs(pairs, callback);
	});
}

function getPairs(callback) {
	chrome.storage.sync.get(['map'], callback);
}

function setPairs(pairs, callback) {
	chrome.storage.sync.set({'map': pairs}, callback);
}

function message(message) {
	console.log(message);
	spanMessage.textContent = message;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
	console.log('storage on changed');
	for (key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
					'Old value was "%s", new value is "%s".',
					key,
					namespace,
					storageChange.oldValue,
					storageChange.newValue);
	}
});