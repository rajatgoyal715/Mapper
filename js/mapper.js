var keyInput, valueInput, spanMessage, addButton, itemsList;

window.onload = function() {
	keyInput = this.document.getElementById('keyInput');
	valueInput = this.document.getElementById('valueInput');

	addButton = this.document.getElementById('addItem');
	addButton.onclick = addItem;

	spanMessage = this.document.getElementById('message');
	itemsList = this.document.getElementById('itemsList');

	loadPairs();
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

function populateList(pairs) {
	itemsList.innerHTML = "";
	var key, value, item, divElement, keyElement, valueElement;
	for (var i in pairs) {
		item = document.createElement('li');
		key = i;
		value = pairs[key];
		keyElement = document.createElement('span');
		keyElement.className = 'key';
		keyElement.textContent = key;
		valueElement = document.createElement('span');
		valueElement.className = 'value';
		valueElement.textContent = value;
		divElement = document.createElement('DIV');
		divElement.className = 'itemDiv';
		divElement.appendChild(keyElement);
		divElement.appendChild(valueElement);
		item.appendChild(divElement);
		itemsList.appendChild(item);
		console.log("key:", i, " value:", pairs[i]);
	}
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
	console.log('storage on changed');
	loadPairs();
});

function loadPairs() {
	getPairs(function(result) {
		populateList(result.map);
	});
}
