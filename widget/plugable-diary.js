function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText).data);
    }
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
	for(var i = 0; i < data.length; i++) {
		var p = document.createElement("p");
		var text = document.createTextNode(data[i].text);
		p.appendChild(text);
		wrapper.appendChild(p);
	}
}
