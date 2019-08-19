require("dotenv").config();

var keys = require("./keys.js");
// Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var DigitalAssistant = function () {

    this.movie = function () {
        // We then run the request with axios module on a URL with a JSON
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // Then we print out the movie info
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })

    };

    this.concert = function () {
        axios.get("https://rest.bandsintown.com/artists/tyler+the+creator/events?app_id=codingbootcamp").then(
            function (response) {
                // handle success
                console.log("==============================================================");
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date: " + JSON.stringify({
                    datetime: moment().format("L")
                }));
                console.log("==============================================================");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })
    };

    this.spotify = function () {
        console.log("How about we add some Spotify too!");
        // Variable for Spotify id & secret
        var spotify = new Spotify({
            id: "632c7bb33dfd44c0bd974aad84faec95",
            secret: "08529520af314327b98ed30d791bf984"
        });

        spotify
            .search({ type: 'track', query: 'pyramids' })
            .then(function (response) {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Album: " + response.tracks.items[0].album.name);
                console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
            })
            .catch(function (err) {
                console.log(err);
            });
    };
}

var bots = {};

bots.Liri = new DigitalAssistant();

// var spotify = new Spotify(keys.spotify);

var bot = process.argv[2];
var method = process.argv[3];

bots[bot][method]();
