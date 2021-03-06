require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
// Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";
var bandName = "";
var songName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
// MOVIE LOOP
for (var i = 4; i < nodeArgs.length; i++) {

    if (i > 4 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];

    }
}

// CONCERT LOOP
for (var i = 4; i < nodeArgs.length; i++) {

    if (i > 4 && i < nodeArgs.length) {
        bandName = bandName + "+" + nodeArgs[i];
    } else {
        bandName += nodeArgs[i];

    }
}

// SPOTIFY LOOP 
for (var i = 4; i < nodeArgs.length; i++) {

    if (i > 4 && i < nodeArgs.length) {
        songName = songName + "+" + nodeArgs[i];
    } else {
        songName += nodeArgs[i];

    }
}

// Then run a request with axios to the OMDB API with the movie specified
var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// console.log(omdbUrl);
var bandsUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
// console.log(bandsUrl);
var songUrl = { type: 'track', query: songName };
// console.log(songUrl);


var DigitalAssistant = function () {

    // MOVIE FUNCTION
    this.findMovie = function () {
        // We then run the request with axios module on a URL with a JSON
        axios.get(omdbUrl).then(
            function (response) {
                // Then we print out the movie info
                console.log(omdbUrl);
                console.log("============================================================================");
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);
                console.log("============================================================================");
            })
            .catch(function (error) {
                // handle error
                axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(function (response) {
                    console.log("============================================================================");
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Cast: " + response.data.Actors);
                    console.log("============================================================================");
                })
                // console.log(error);
            })
            .finally(function () {
                // always executed
            })

    };

    // CONCERT FUNCTION
    this.findConcert = function () {
        axios.get(bandsUrl).then(
            function (response) {
                // handle success
                console.log(bandsUrl);
                console.log("============================================================================");
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date: " + JSON.stringify({
                    datetime: moment().format("L")
                }));
                console.log("============================================================================");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })
    };

    // SPOTIFY FUNCTION
    this.spotify = function () {
        // Variable for Spotify id & secret
        var spotify = new Spotify({
            id: "632c7bb33dfd44c0bd974aad84faec95",
            secret: "08529520af314327b98ed30d791bf984"
        });

        spotify
            .search(songUrl)
            .then(function (response) {
                console.log(songUrl);
                console.log("============================================================================");
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Album: " + response.tracks.items[0].album.name);
                console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("============================================================================");
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    // RANDOM.TXT FUNCTION
    this.doWhatItSays = function () {
        // Running the readFile module that's inside of fs.
        // Stores the read information into the variable "data"
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            // Break the string down by comma separation and store the contents into the output array.
            var output = data.split(",");

            // Loop Through the newly created output array
            for (var i = 0; i < output.length; i++) {

                // Print each element (item) of the array/
                console.log(output[i]);
            }
        });

    }

    this.log = function () {
        // Running the readFile module that's inside of fs.
        // Stores the read information into the variable "data"
        fs.appendFile("random.txt", "utf8", DigitalAssistant, function (err, data) {
            if (err) {
                return console.log(err);
            }

            // Break the string down by comma separation and store the contents into the output array.
            var output = data.split(",");

            // Loop Through the newly created output array
            for (var i = 0; i < output.length; i++) {

                // Print each element (item) of the array/
                console.log(output[i]);
            }
        });

    }
}

var bots = {};

bots.Liri = new DigitalAssistant();

// var spotify = new Spotify(keys.spotify);

var bot = process.argv[2];
var method = process.argv[3];

bots[bot][method]();

// switch (method) {
//     case "total":
//       total();
//       break;
    
//     case "deposit":
//       deposit();
//       break;
    
//     case "withdraw":
//       withdraw();
//       break;
    
//     case "lotto":
//       lotto();
//       break;
//     }