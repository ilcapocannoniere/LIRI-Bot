//-------------------VARIABLES----------------------------------------------------

//Loading modules
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var tweetsArray = [];
var command = process.argv[2];
var commandParam = process.argv[3];



var twitterKeys = keys.twitterKeys;

console.log(twitterKeys.consumer_key);

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});



//-----------------------FUNCTIONS-----------------------------------------------

function getMyTweets(){

	var params = {screen_name: 'jincygeorge8388', count: 20, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
					//console.log(tweets);
					tweetsArray = tweets;

					for(i=0; i<tweetsArray.length; i++){
						console.log("Created at: " + tweetsArray[i].created_at);
						console.log("Text: " + tweetsArray[i].text);
						console.log('--------------------------------------');
					}
				}
				else{
					console.log(error);
				}
	});

}

function spotifyThis(){

	spotify.search({ type: 'track', query: commandParam}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

    //console.log(data.tracks.items[0]);
    var song = data.tracks.items[0];
    console.log("------Artists-----");
    for(i=0; i<song.artists.length; i++){
    	console.log(song.artists[i].name);
    }

    console.log("------Song Name-----");
    console.log(song.name);

	console.log("-------Preview Link-----");
    console.log(song.preview_url);

    console.log("-------Album-----");
    console.log(song.album.name);

	});

}

function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){

		if (err){ 
			return console.log(err);
		}

		console.log(data);
	});
}



//-------------------------MAIN PROCESS-------------------------------------------

switch(command){

	case 'my-tweets':
		getMyTweets(); break;
	case 'spotify-this-song':
		spotifyThis(); break;
	case 'movie-this':
	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
		console.log("Invalid command. Please type any of the following commnds: my-tweets spotify-this-song movie-this or do-what-it-says");
}