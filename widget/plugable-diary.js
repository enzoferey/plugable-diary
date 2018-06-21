function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(JSON.parse(xmlHttp.responseText).data);
	};
	xmlHttp.open("GET", theUrl, true); // true for asynchronous
	xmlHttp.send(null);
}

function init(config) {
	function createEntriesAtId(data) {
		createEntries(config.id, data);
	}

	httpGetAsync("http://localhost:8000/", createEntriesAtId);
}

function createEntries(id, data) {
	var wrapper = document.getElementById(id);
	for (var i = 0; i < data.length; i++) {
		// Title
		var h3 = document.createElement("h3");
		var text = document.createTextNode(data[i].title);
		h3.appendChild(text);
		wrapper.appendChild(h3);

		// Date
		var h5 = document.createElement("h5");
		var text = document.createTextNode(data[i].timestamp);
		h5.appendChild(text);
		wrapper.appendChild(h5);

		// Text
		var p = document.createElement("p");
		var text = document.createTextNode(data[i].text);
		p.appendChild(text);
		wrapper.appendChild(p);
	}
}
