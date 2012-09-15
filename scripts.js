var numEvents;
function processEvents(response) {console.log(response)};
FB.api('/me/events', processEvents);

/*
// creates array and adds all the user's events to it
var eventArray = new Array();
var addEventsToArray = function() {
	for (var i = 0; i < numEvents; i++) {
		FB.api('/me/events', function(response) {eventArray[i] = response.data[i].id});
	}
}

addEventsToArray();
*/