var numEvents;
var eventArray = new Array();

function processEvents(response) {console.log(response);
	for (var i = 0; i < numEvents; i++) {
		eventArray[i] = response.data[i].name;
	}
	console.log(eventArray);
};

function main() {
	FB.api('/me/events', processEvents);
}



/*
// creates array and adds all the user's events to it
var addEventsToArray = function() {
	for (var i = 0; i < numEvents; i++) {
		FB.api('/me/events', function(response) {eventArray[i] = response.data[i].id});
	}
}

addEventsToArray();
*/