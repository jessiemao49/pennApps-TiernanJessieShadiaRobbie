var numEvents;
var eventArray = new Array();
var selectedEventID;
var numGuests;
var guestArray = new Array();
var artistArray = new Array();
var artistArrayCondensed = new Array();
var artistArrayCompiled = new Array();
var artistMap = new Map();

var userIndex = 0;

function Map()
{
    // members
    this.keyArray = new Array(); // indices
    this.valArray = new Array(); // artist

    // methods
    this.put = put;
    this.get = get;
    this.size = size;  
    this.clear = clear;
    this.keySet = keySet;
    this.valSet = valSet;
    this.showMe = showMe;   // returns a string with all keys and values in map.
    this.findIt = findIt;
    this.remove = remove;
}

function put( key, val )
{
    var elementIndex = this.findIt( key );
    
    if( elementIndex == (-1) )
    {
        this.keyArray.push( key );
        this.valArray.push( val );
    }
    else
    {
        this.valArray[ elementIndex ] = val + 1;
    }
}

function get( key )
{
    var result = null;
    var elementIndex = this.findIt( key );

    if( elementIndex != (-1) )
    {   
        result = this.valArray[ elementIndex ];
    }  
    
    return result;
}

function remove( key )
{
    var result = null;
    var elementIndex = this.findIt( key );

    if( elementIndex != (-1) )
    {
        this.keyArray = this.keyArray.removeAt(elementIndex);
        this.valArray = this.valArray.removeAt(elementIndex);
    }  
    
    return ;
}

function size()
{
    return (this.keyArray.length);  
}

function clear()
{
    for( var i = 0; i < this.keyArray.length; i++ )
    {
        this.keyArray.pop(); this.valArray.pop();   
    }
}

function keySet()
{
    return (this.keyArray);
}

function valSet()
{
    return (this.valArray);   
}

function showMe()
{
    var result = "";
    
    for( var i = 0; i < this.keyArray.length; i++ )
    {
        result += "Key: " + this.keyArray[ i ] + "\tValues: " + this.valArray[ i ] + "\n";
    }
    return result;
}

function findIt( key )
{
    var result = (-1);

    for( var i = 0; i < this.keyArray.length; i++ )
    {
        if( this.keyArray[ i ] == key )
        {
            result = i;
            break;
        }
    }
    return result;
}

function removeAt( index )
{
  var part1 = this.slice( 0, index);
  var part2 = this.slice( index+1 );

  return( part1.concat( part2 ) );
}
Array.prototype.removeAt = removeAt;


//puts events into array
function processEvents(response) {
	console.log(response);
	numEvents = response.data.length;
	console.log(numEvents);
	for (var i = 0; i < numEvents; i++) {
		eventArray[i] = response.data[i].name;
	}
	console.log(eventArray);
};


//prompts user to select which event they are hosting
function selectEvent(){
	// Awesome event made by jessie
	selectedEventID = 428640990505021;
};

// puts all guests 
function createGuestList(response) {
	selectEvent();
	console.log(response);
	numGuests = response.data.length;
	console.log(numGuests);
	for (var i = 0; i < numGuests; i++) {
		guestArray[i] = response.data[i].id;
	}
	console.log(guestArray);
}

// pulls last 50 music (max) listens from attendees
function createArtistMap(response) {
	var index = 0;

	var j = 0;

		while (j < Math.min(50, response.data.length)) {
			// pulls the artist
			artistArray[j] = response.data[j].data.musician.title;
		}
	console.log(artistArray);

		// array of 50 possibly repeating artists need to condense
		for (int i = 0; i < artistArray.length; i++) {
			var artistRepeated = false;
			for (int j = 0; j < artistArrayCondensed.length; j++) {
				if (artistArray[i] == artistArrayCondensed[j]) {
					artistRepeated = true;
				}
			}
			if (!artistRepeated) {
				artistArray[i] = artistArrayCondensed[index];
				index++;
			}
		}
	//add array to long array
	artistArrayCompiled = artistArrayCompiled.concat(artistArrayCondensed);

	//add artists to map
	var count = 0;
	for (var i = 0; i < artistArrayCompiled.length; i++) {
		for (var j = i+1; j < artistArrayCompiled.length; j++) {
			if (artistArrayCompiled[i] == artistArrayCompiled[j]) {
				count++;
				artistArrayCompiled.splice(j,1);
			}
		}
		artistMap.put(i, new Array(artistArrayCompiled[i], count));
	}
	// now we have a map with key (0,1,2,3, ) and value [artist, count]
	console.log(artistMap.showMe); 

	}



function main() {
	FB.api('/me/events', processEvents);
	// code here that display the events and asks user to pick  
	FB.api('/selectedEventID/attending', createGuestList);
	for (userIndex = 0; userIndex < numGuests; userIndex++){
		var guestID = guestArray[userIndex];
		FB.api('/guestID/music.listens', createArtistMap);
	}
}



