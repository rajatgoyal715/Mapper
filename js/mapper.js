var keyInput, valueInput, spanMessage, addButton, itemsList;

window.onload = function() {
	keyInput = this.document.getElementById('keyInput');
	keyInput.textContent = "";

	valueInput = this.document.getElementById('valueInput');
	valueInput.textContent = "";

	addButton = this.document.getElementById('addItem');
	addButton.onclick = addItem;

	spanMessage = this.document.getElementById('message');
	spanMessage.textContent = "";

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
	spanMessage.textContent = message;
	spanMessage.style.visibility = "visible";
	setTimeout(function() {
		spanMessage.style.visibility = "hidden";
	}, 2000);
}

function deleteItem() {
	var key = this.parentNode.querySelector('.key').textContent;
	getPairs(function(result) {
		var newPairs = {};
		for (var item in result.map) {
			if (result.map.hasOwnProperty(item) && item !== key) {
				newPairs[item] = result.map[item];
			}
		}
		setPairs(newPairs, function() {
			message(key + ' successfully removed'); 
		});
	});
}

function copyItemValueToClipboard() {
	navigator.clipboard.writeText(this.parentNode.querySelector('.value').textContent)
		.then(function () {
			message('Value copied to clipboard.');
		})
		.catch(function () {
			message('Failed to copy value to clipboard.');
		});
}

function populateList(pairs) {
	itemsList.innerHTML = "";
	
	var key, value, item, divElement, deleteImgElement, deleteElement, keyElement, valueElement, copyImgElement, copyElement;

	for (var i in pairs) {
		key = i;
		value = pairs[key];

		deleteImgElement = document.createElement('img');
		deleteImgElement.src = '../images/delete_16.png';
		
		deleteElement = document.createElement('button');
		deleteElement.appendChild(deleteImgElement);
		deleteElement.onclick = deleteItem;
		
		keyElement = document.createElement('span');
		keyElement.className = 'key';
		keyElement.textContent = key;
		
		valueElement = document.createElement('span');
		valueElement.className = 'value';
		valueElement.textContent = value;

		copyImgElement = document.createElement('img');
		copyImgElement.src = '../images/copy_16.png';
		
		copyElement = document.createElement('button');
		copyElement.appendChild(copyImgElement);
		copyElement.onclick = copyItemValueToClipboard;
		
		divElement = document.createElement('DIV');
		divElement.className = 'itemDiv';
		divElement.appendChild(deleteElement);
		divElement.appendChild(keyElement);
		divElement.appendChild(valueElement);
		divElement.appendChild(copyElement);
		
		item = document.createElement('li');
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

	chrome.commands.onCommand.addListener(function (command) {
		if (command === "toggle_popup") {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			});
		}
	});

}
