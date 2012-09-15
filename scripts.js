var numEvents;
var eventArray = new Array();

function processEvents(response) {
	console.log(response);
	numEvents = response.data.length;
	console.log(numEvents);
	for (var i = 0; i < numEvents; i++) {
		eventArray[i] = response.data[i].name;
	}
	console.log(eventArray);
};

function main() {
	FB.api('/me/events', processEvents);
}



